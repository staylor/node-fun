//io09K9l3ebJxmxe2

var util = require( 'util' ),
	Q = require( 'q' ),
	_ = require( 'underscore' ),

	ApiMixin = require( './api-mixin' ),
	Spotify = require( './spotify' ),

	// 15 minutes
	expiration = 60 * 15,
	apiKey = 'io09K9l3ebJxmxe2',
	Songkick;

/**
 * @class
 */
Songkick = function () {
	this.cacheGroup = 'songkick';
	this.expiration = expiration;
	this.config = {
		baseUrl: 'http://api.songkick.com/api/3.0'
	};

	ApiMixin.call( this );
};

util.inherits( Songkick, ApiMixin );

/**
 *
 * @param {object} response
 * @returns {Promise}
 */
Songkick.prototype.parse = function ( response ) {
	var deferreds = [], items;

	if ( ! response.resultsPage || ! response.resultsPage.results ) {
		return this.promise();
	}

	this.stack = {};
	this.data = {};
	this.waiting = {};

	items = response.resultsPage.results.event;

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

		if ( ! headliner && ! performers ) {
			return;
		}

		if ( headliner ) {
			artists = _.pluck( [ headliner ], 'displayName' );
		} else if ( performers ) {
			artists = _.pluck( performers, 'displayName' );
		}

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
			if ( this.data[ artist ] ) {
				return;
			}

			var deferred = Q.defer(),
				spotify = new Spotify();

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
