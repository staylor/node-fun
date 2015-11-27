var _ = require( 'underscore' ),
	Q = require( 'q' ),
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
			}, function ( reason ) {
				console.error( 'Rejecting: ', artist );
				stack[ id ].spotify = {};
				requested[ artist ] = {};
				deferred.reject( reason );
			} );

			deferreds.push( deferred.promise );
		}, this );

		return Q.allSettled( deferreds ).then( function () {
			_.each( requested, function ( resp, artist ) {
				if ( ! waiting[ artist ] ) {
					return;
				}

				waiting[ artist ].forEach( function ( artistId ) {
					stack[ artistId ].spotify = resp;
				} );
			} );

			return _.values( stack );
		} );
	}
};

module.exports = SpotifyMixin;
