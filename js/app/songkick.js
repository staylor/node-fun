//io09K9l3ebJxmxe2

var _ = require('underscore'),
	async = require( 'async' ),

	request = require( 'request' ),
	ApiMixin = require( './api-mixin' ),
	Spotify = require( './spotify' ),

	baseUri = 'http://api.songkick.com/api/3.0',
	apiKey = 'io09K9l3ebJxmxe2',
	api,
	Songkick;

Songkick = function () {
	this.client = request.defaults({
		baseUrl: baseUri
	});
};

api = {

	metroCallback: function ( response ) {
		if ( ! response.resultsPage || ! response.resultsPage.results ) {
			return;
		}

		this.stack = {};
		this.data = {};
		this.waiting = {};

		var calls = [],
			items = response.resultsPage.results.event,
			spotify = new Spotify();

		_.each( items, function ( resp ) {
			var performers = _.where( resp.performance, {
					billing: 'headline'
				} ),
				artists,
				headliner = _.findWhere( performers, {
					billing: 'headline'
				} ),
				asyncArtists,
				diff;


			artists = _.pluck( headliner || performers, 'displayName' );

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

	getMetroEvents: function ( metroId, res ) {
		this.response = res;
		this.requestUri = this.format(
			'/metro_areas/{0}/calendar.json?apikey={1}',
			metroId,
			apiKey
		);

		this.getUriData( this.metroCallback );
	}
};

_.extend( Songkick.prototype, ApiMixin, api );

module.exports = Songkick;