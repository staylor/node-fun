var util = require( 'util' ),
	_ = require( 'underscore' ),
	Q = require( 'q' ),

	ApiMixin = require( './api-mixin' ),
	Spotify = require( './spotify' ),

	app_id = 'scott_node_test',
	BandsInTown;

/**
 * @class
 */
BandsInTown = function () {
	this.config = {
		baseUrl: 'http://api.bandsintown.com'
	};

	ApiMixin.call( this );
};

util.inherits( BandsInTown, ApiMixin );

/**
 * @param {object} response
 * @returns {Promise}
 */
BandsInTown.prototype.parse = function ( response ) {
	var deferreds = [], spotify;

	if ( response.errors ) {
		console.log( 'Errors', response.errors );
		return this.promise();
	}

	this.stack = {};
	this.data = {};
	this.waiting = {};

	spotify = new Spotify();

	_.each( response, function ( resp ) {
		var artists = _.pluck( resp.artists, 'name' ),
			asyncArtists,
			diff;

		artists = _.map( artists, function ( artist ) {
			return artist.toLowerCase();
		} );

		this.stack[ resp.id ] = resp;
		this.waiting[ resp.id ] = artists;

		asyncArtists = _.keys( this.data );
		diff = _.difference( artists, asyncArtists );

		if ( ! diff.length ) {
			return;
		}

		_.each( diff, function ( artist ) {
			var deferred = Q.defer();

			this.data[ artist ] = true;

			spotify.search( artist ).then( function ( resp ) {
				if ( ! resp ) {
					delete this.data[ artist ];
				} else {
					this.data[ artist ] = resp;
				}

				deferred.resolve();
			}.bind( this ) );

			deferreds.push( deferred.promise );
		}, this );
	}, this );

	return Q.allSettled( deferreds ).then( function () {
		return this.parseRelated();
	}.bind( this ) );
};

/**
 *
 * @param {string} artist
 * @returns {Promise}
 */
BandsInTown.prototype.getArtistEvents = function ( artist ) {
	this.requestUri = this.format(
		'/artists/%s/events.json?app_id=%s',
		artist.toLowerCase(),
		app_id
	);

	return this.getUriData();
};

module.exports = new BandsInTown();
