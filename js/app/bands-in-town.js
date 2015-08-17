var _ = require('underscore'),
	request = require( 'request' ),
	async = require( 'async' ),

	ApiMixin = require( './api-mixin' ),
	Spotify = require( './spotify' ),

	app_id = 'scott_node_test',
	baseUri = 'http://api.bandsintown.com',
	api,
	BandsInTown;

BandsInTown = function () {
	this.client = request.defaults({
		baseUrl: baseUri
	});
};

api = {

	eventsCallback: function ( response ) {
		if ( response.errors ) {
			console.log( 'Errors', response.errors );
			return;
		}

		this.stack = {};
		this.data = {};
		this.waiting = {};

		var calls = [],
			spotify = new Spotify();

		_.each( response, function ( resp ) {
			var artists = _.pluck( resp.artists, 'name' ),
				asyncArtists,
				diff;

			this.stack[ resp.id ] = resp;
			this.waiting[ resp.id ] = artists;

			asyncArtists = _.keys( this.data );
			diff = _.difference( artists, asyncArtists );

			if ( ! diff.length ) {
				return;
			}

			_.each( diff, function ( artist ) {
				var ctx = this;
				this.data[ artist ] = true;

				calls.push( function ( callback ) {
					spotify.search( artist, function ( resp ) {
						if ( ! resp ) {
							delete ctx.data[ artist ];
						} else {
							ctx.data[ artist ] = resp;
						}

						callback( true );
					} );
				} );
			}, this );

		}, this );

		async.parallel( calls, this.parallelCallback() );
	},

	getArtistEvents : function (artist, res) {
		this.artist = artist;
		this.response = res;
		this.requestUri = this.format( '/artists/{0}/events.json?app_id={1}', artist, app_id );

		this.getUriData( this.eventsCallback );
	}
};

_.extend( BandsInTown.prototype, ApiMixin, api );

module.exports = BandsInTown;