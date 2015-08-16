//Client ID
//b791653f8886473db15526cc8ea24588
//Client Secret
//fddc22b8fd85445db6477b5fe502ab90

var _ = require( 'underscore' ),
	request = require( 'request' ),
	ApiMixin = require( './api-mixin' ),

	artistUri = '/artists/{0}',

	Spotify,
	api;

Spotify = function () {

};

api = {
	getClient: function () {
		if ( ! this.client ) {
			this.client = request.defaults({
				baseUrl: 'https://api.spotify.com/v1'
			});
		}

		return this.client;
	},

	search: function ( artist, callback ) {
		this.getAsync( {
			url: '/search',
			qs: {
				type: 'artist',
				q: artist
			}
		}, function ( resp ) {
			var best, items;

			if ( ! resp.artists || ! resp.artists.items.length ) {
				callback( false );
			}

			items = _.filter( resp.artists.items, function ( item ) {
				return item.name.toLowerCase().trim() === artist.toLowerCase().trim();
			} );

			best = _.max( items, function ( artist ) {
				return artist.followers.total;
			} );

			callback( best );
		} );
	},


};

_.extend( Spotify.prototype, ApiMixin );
_.extend( Spotify.prototype, api );

module.exports = Spotify;