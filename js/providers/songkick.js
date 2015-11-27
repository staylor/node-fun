//io09K9l3ebJxmxe2

var util = require( 'util' ),
	_ = require( 'underscore' ),

	ProviderBase = require( './provider-base' ),
	SpotifyMixin = require( './spotify-mixin' ),

	// 15 minutes
	expiration = 60 * 15,
	apiKey = 'io09K9l3ebJxmxe2',
	Songkick;

/**
 * @class
 * @augments ProviderBase
 */
Songkick = function () {
	this.cacheGroup = 'songkick2';
	this.expiration = expiration;
	this.config = {
		baseUrl: 'http://api.songkick.com/api/3.0'
	};

	ProviderBase.call( this );
};

util.inherits( Songkick, ProviderBase );

Songkick.Locations = {};

Songkick.METRO = {
	NYC: {
		id: 7644,
		name: 'NYC'
	},
	SF: {
		id: 26330,
		name: 'SF'
	},
	LA: {
		id: 17835,
		name: 'LA'
	},
	CHICAGO: {
		id: 9426,
		name: 'Chicago'
	},
	PHILLY: {
		id: 5202,
		name: 'Philly'
	}
};

_.each( Songkick.METRO, function ( value ) {
	Songkick.Locations[ value.id ] = value.name;
} );

Songkick.prototype.getHeadliner = function ( resp ) {
	var headliner =  _.findWhere( resp.performance, {
		billing: 'headline'
	} );

	if ( headliner ) {
		return headliner.displayName;
	}

	return '';
};

Songkick.prototype.filter = function ( data ) {
	return data.filter( function ( show ) {
		return Date.parse( show.start.datetime || show.start.date ) > Date.now();
	} );
};

/**
 *
 * @param {object} response
 * @returns {Promise}
 */
Songkick.prototype.parse = function ( response ) {
	var events, filtered;

	if ( ! response.resultsPage || ! response.resultsPage.results ) {
		console.error( 'No Response from Songkick.' );
		return {};
	}

	events = response.resultsPage.results.event;

	filtered = this.filter( events );

	if ( ! filtered.length ) {
		return {};
	}

	return this.getArtistData( filtered );
};

/**
 *
 * @param {string} coords
 * @returns {Promise}
 */
Songkick.prototype.getLocationEvents = function ( coords ) {
	this.requestUri = this.format(
		'/events.json?location=geo:%s&apikey=%s',
		coords,
		apiKey
	);

	return this.getUriData();
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

_.extend( Songkick.prototype, SpotifyMixin );

module.exports = Songkick;
