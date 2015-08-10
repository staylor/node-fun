var _ = require('underscore'),
	async = require( 'async' ),

	ApiMixin = require( './api-mixin' ),
	Spotify = require( './spotify' ),

	app_id = 'scott_node_test',
	baseUri = 'http://api.bandsintown.com',
	api = {},
	BandsInTown;

BandsInTown = function () {};

api = {
	eventsCallback: function ( response ) {
		var res = this.response,
			calls = [],
			names = {},
			waiting = {},
			stack = {},
			spotify = new Spotify();

		_.each( response, function ( data ) {
			var artists = _.pluck( data.artists, 'name' ),
				asyncArtists,
				diff;

			stack[ data.id ] = data;
			waiting[ data.id ] = artists;

			asyncArtists = _.keys( names );
			diff = _.difference( artists, asyncArtists );

			if ( ! diff.length ) {
				return;
			}

			_.each( diff, function ( artist ) {
				names[ artist ] = true;

				calls.push( function ( callback ) {
					spotify.search( artist, function ( resp ) {
						var best;
						if ( ! resp.artists || ! resp.artists.items.length ) {
							callback( false );
						}

						best = _.max( resp.artists.items, function ( artist ) {
							return artist.followers.total;
						} );

						names[ artist ] = best;

						callback( true );
					} );
				} );
			} );

		}, this );

		async.parallel( calls, function ( err ) {
			_.each( waiting, function ( artists, key ) {
				stack[ key ].related = [];
				_.each( artists, function ( artist ) {
					stack[ key ].related.push( names[ artist ] );
				} );
			} );

			res.json( _.values( stack ) );
		} );
	},

	getArtistEvents : function (artist, res) {
		var requestUri = this.format(
				'{0}/artists/{1}/events.json?app_id={2}',
				baseUri,
				encodeURIComponent(artist),
				encodeURIComponent(app_id)
			);

		this.artist = artist;
		this.response = res;
		this.getAsync( requestUri, this.eventsCallback );
	}
};

_.extend( BandsInTown.prototype, ApiMixin );
_.extend( BandsInTown.prototype, api );

module.exports = BandsInTown;