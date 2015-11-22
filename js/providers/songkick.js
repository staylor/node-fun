//io09K9l3ebJxmxe2

'use strict';

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
	this.cacheGroup = 'songkick1';
	this.expiration = expiration;
	this.config = {
		baseUrl: 'http://api.songkick.com/api/3.0'
	};

	ApiMixin.call( this );
};

util.inherits( Songkick, ApiMixin );

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

/**
 *
 * @param {object} response
 * @returns {Promise}
 */
Songkick.prototype.parse = function ( response ) {
	var deferreds = [], events,
		waiting = {},
		requested = {},
		stack = {};

	if ( ! response.resultsPage || ! response.resultsPage.results ) {
		return this.promise();
	}

	events = response.resultsPage.results.event;

	events.forEach( function ( resp ) {
		var deferred,
			spotify,
			artist,
			id = resp.id,
			headliner = _.findWhere( resp.performance, {
				billing: 'headline'
			} );

		if ( ! headliner ) {
			return;
		}

		stack[ id ] = resp;
		artist = headliner.displayName.toLowerCase();
		if ( requested[ artist ] ) {
			if ( waiting[ artist ] ) {
				waiting[ artist ].push( id );
			} else {
				waiting[ artist ] = [ id ];
			}
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
	} );
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

module.exports = Songkick;
