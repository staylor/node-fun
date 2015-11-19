//io09K9l3ebJxmxe2

var util = require( 'util' ),
	Q = require( 'q' ),
	_ = require( 'underscore' ),

	ApiMixin = require( './api-mixin' ),
	Spotify = require( './spotify' ),

	apiKey = 'io09K9l3ebJxmxe2',
	Songkick;

/**
 * @class
 */
Songkick = function () {
	this.baseUri = 'http://api.songkick.com/api/3.0';
	ApiMixin.call( this );
};

util.inherits( Songkick, ApiMixin );

/**
 *
 * @param {object} response
 * @returns {Promise}
 */
Songkick.prototype.parse = function ( response ) {
	var deferreds = [], items, spotify;

	if ( ! response.resultsPage || ! response.resultsPage.results ) {
		return this.promise();
	}

	this.stack = {};
	this.data = {};
	this.waiting = {};

	items = response.resultsPage.results.event;
	spotify = new Spotify();

	items.forEach( function ( resp ) {
		var performers = _.where( resp.performance, {
				billing: 'headline'
			} ),
			artists,
			headliner = _.findWhere( performers, {
				billing: 'headline'
			} ),
			asyncArtists,
			diff;

		artists = _.pluck( headliner || performers, 'displayName' );
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

		diff.forEach( function ( artist ) {
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
 * @param {string} metroId
 * @returns {Promise}
 */
Songkick.prototype.getMetroEvents = function ( metroId ) {
	this.requestUri = this.format(
		'/metro_areas/%s/calendar.json?apikey=%s',
		metroId,
		apiKey
	);

	return this.getUriData();
};

module.exports = new Songkick();
