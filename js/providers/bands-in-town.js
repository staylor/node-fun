var util = require( 'util' ),
	_ = require( 'underscore' ),
	ProviderBase = require( './provider-base' ),
	SpotifyMixin = require( './spotify-mixin' ),

	// 3 hours
	expiration = 60 * 60 * 3,
	app_id = 'scott_node_test',
	BandsInTown;

/**
 * @class
 * @augments ProviderBase
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
	return resp.artists[0].name;
};

BandsInTown.prototype.filter = function ( data ) {
	return data.filter( function ( show ) {
		return Date.parse( show.datetime ) > Date.now();
	} );
};

/**
 * @param {object} response
 * @returns {Promise}
 */
BandsInTown.prototype.parse = function ( response ) {
	if ( ! response || response.errors ) {
		console.error( 'Errors', response.errors );
		return {};
	}

	var filtered = this.filter( response );
	if ( ! filtered.length ) {
		return {};
	}

	return this.getArtistData( filtered );
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
