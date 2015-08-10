var _ = require('underscore'),
	ApiMixin = require( './api-mixin' ),
	async = require( 'async' ),
	http = require( 'http' ),
	app_id = 'scott_node_test',
	baseUri = 'http://api.bandsintown.com',
	BandsInTown = function () {};

BandsInTown.prototype.getArtistEvents = function (artist, res) {
	var self = this,
		requestUri = this.format(
			'{0}/artists/{1}/events.json?app_id={2}',
			baseUri,
			encodeURIComponent(artist),
			encodeURIComponent(app_id)
		);

	this.getJSON( requestUri, function ( response ) {
		var calls = [],
			urls = {},
			waiting = {},
			stack = {},
			parsed = JSON.parse( response );

		_.each( parsed, function ( data ) {
			var url = self.format(
				'http://musicbrainz.org/ws/2/artist/{0}?inc=url-rels&fmt=json',
				data.artists[0].mbid
			);

			stack[ data.id ] = data;

			if ( urls[ url ] ) {
				waiting[ data.id ] = url;
				return;
			}

			urls[ url ] = true;

			calls.push( function ( callback ) {
				http.get( url, function ( resp ) {
					var response = '';

					resp.on( 'data', function ( data ) {
						response += data;
					});

					resp.on( 'end', function () {
						parsed = JSON.parse( response );

						urls[ url ] = parsed;
						stack[ data.id ].related = parsed;
						callback( true );
					});
				} );
			} );

		}, self );

		async.parallel( calls, function ( err ) {
			_.each( waiting, function ( value, key ) {
				stack[ key ].related = urls[ value ];
			} );

			res.json( _.values( stack ) );
		} );
	} );
};

_.extend( BandsInTown.prototype, ApiMixin );

module.exports = BandsInTown;