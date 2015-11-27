var Q = require( 'q' ),
	Spotify = require( './spotify' ),
	SpotifyMixin;

/**
 * Clases that use this must implement {ProviderBase}.getHeadliner()
 *
 * @mixin
 */
SpotifyMixin = {
	getArtistData: function ( items ) {
		var deferreds = [],
			waiting = {},
			requested = {},
			stack = {};

		items.forEach( function ( resp ) {
			var deferred,
				spotify,
				artist,
				id = resp.id,
				headliner = this.getHeadliner( resp );

			if ( ! headliner ) {
				return;
			}

			stack[ id ] = resp;
			artist = headliner.toLowerCase();
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
				// store this to resolve all waitings at once
				requested[ artist ] = resp;

				deferred.resolve();

				return resp;

			}, function ( reason ) {
				console.error( 'Rejecting:', artist, reason );
				stack[ id ].spotify = {};
				requested[ artist ] = {};
				deferred.reject( reason );
			} );

			deferreds.push( deferred.promise );
		}, this );

		return Q.allSettled( deferreds ).then( function () {
			var id, response = [],
				assignResponse = function ( artistId ) {
					stack[ artistId ].spotify = requested[ id ];
				};

			for ( id in requested ) {
				if ( ! waiting[ id ] ) {
					continue;
				}

				waiting[ id ].forEach( assignResponse );
			}

			for ( id in stack ) {
				response.push( stack[ id ] );
			}

			return response;
		} );
	}
};

module.exports = SpotifyMixin;
