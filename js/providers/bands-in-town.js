var util = require( 'util' ),
	_ = require( 'underscore' ),
	Q = require( 'q' ),

	ApiMixin = require( './api-mixin' ),
	Spotify = require( './spotify' ),

	// 3 hours
	expiration = 60 * 60 * 3,
	app_id = 'scott_node_test',
	BandsInTown;

/**
 * @class
 */
BandsInTown = function () {
	this.cacheGroup = 'bandsintown1';
	this.expiration = expiration;
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
	var deferreds = [],
		waiting = {},
		requested = {},
		stack = {};

	if ( ! response || response.errors ) {
		console.log( 'Errors', response.errors );
		return this.promise();
	}

	response.forEach( function ( resp ) {
		var deferred = Q.defer(),
			spotify = new Spotify(),
			artist,
			id = resp.id,
			headliner = resp.artists[0];

		if ( ! headliner ) {
			return;
		}

		stack[ id ] = resp;
		artist = headliner.name.toLowerCase();
		if ( requested[ artist ] ) {
			if ( waiting[ artist ] ) {
				waiting[ artist ].push( id );
			} else {
				waiting[ artist ] = [ id ];
			}
			console.log( 'Already querying.' );
			return;
		}

		requested[ artist ] = true;
		deferred = Q.defer();

		spotify = new Spotify();
		spotify.search( artist ).then( function ( resp ) {
			stack[ id ].spotify = resp;
			if ( waiting[ artist ] ) {
				waiting[ artist ].forEach( function ( artistId ) {
					stack[ artistId ].spotify = resp;
				} );
			}
			deferred.resolve();
		}, function ( reason ) {
			console.log( 'Rejecting: ', artist );
			stack[ id ].spotify = {};
			deferred.reject( reason );
		} );

		deferreds.push( deferred.promise );
	} );

	return Q.allSettled( deferreds ).then( function () {
		return _.values( stack );
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

module.exports = BandsInTown;
