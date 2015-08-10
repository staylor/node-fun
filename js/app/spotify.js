//Client ID
//b791653f8886473db15526cc8ea24588
//Client Secret
//fddc22b8fd85445db6477b5fe502ab90

var _ = require( 'underscore' ),
	request = require( 'request' ),
	base = 'https://api.spotify.com',
	searchUri = '/v1/search?type=artist&q=',
	artistUri = '/v1/artists/{0}',

	Spotify = function () {};

_.extend( Spotify.prototype, {
	search: function ( artist, callback ) {
		var url = searchUri + encodeURIComponent( artist );
		request( url, function ( err, resp, body ) {
			var parsed = JSON.parse( body );
			if ( ! parsed || ! parsed.items ) {
				callback();
				return;
			}

			callback( parsed.items );
		} );
	}
} );

module.exports = Spotify;