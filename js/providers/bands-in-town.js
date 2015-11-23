var util = require( 'util' ),
	_ = require( 'underscore' ),
	Q = require( 'q' ),
	ProviderBase = require( './provider-base' ),
	SpotifyMixin = require( './spotify-mixin' ),

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

	ProviderBase.call( this );
};

util.inherits( BandsInTown, ProviderBase );

BandsInTown.prototype.getHeadliner = function ( resp ) {
	return resp.artists[0];
};

/**
 * @param {object} response
 * @returns {Promise}
 */
BandsInTown.prototype.parse = function ( response ) {
	if ( ! response || response.errors ) {
		console.log( 'Errors', response.errors );
		return this.promise();
	}

	return this.getArtistData( response );
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

_.extend( BandsInTown.prototype, SpotifyMixin );

module.exports = BandsInTown;
