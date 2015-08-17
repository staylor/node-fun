//Client ID
//b791653f8886473db15526cc8ea24588
//Client Secret
//fddc22b8fd85445db6477b5fe502ab90

var _ = require( 'underscore' ),
	request = require( 'request' ),
	ApiMixin = require( './api-mixin' ),
	redis = require( './redis' ),

	artistUri = '/artists/{0}',

	Spotify,
	api;

Spotify = function () {
	this.client = request.defaults({
		baseUrl: 'https://api.spotify.com/v1'
	});
};

api = {

	getSearchCacheKey: function ( artist ) {
		return [
			'spotify_artist_search',
			artist,
			'v2'
		].join( ':' );
	},

	searchRequest: function ( artist, callback ) {
		this.getAsync( {
			url: '/search',
			qs: {
				type: 'artist',
				q: artist
			}
		}, function ( resp ) {
			var best, items;

			redis.set( this.getSearchCacheKey( artist ), resp );

			if ( ! resp.artists || ! resp.artists.items.length ) {
				callback( false );
				return;
			}

			items = _.filter( resp.artists.items, function ( item ) {
				return item.name.toLowerCase().trim() === artist.toLowerCase().trim();
			} );

			if ( ! items || ! items.length ) {
				callback( false );
				return;
			}

			best = _.max( items, function ( artist ) {
				return artist.followers.total;
			} );

			callback( best );
		} );
	},

	search: function ( artist, callback ) {
		redis.get( this.getSearchCacheKey( artist ), _.bind( function ( err, value ) {
			if ( value && 'false' !== String( value ) ) {
				console.log( value );
				callback( value );
			} else {
				this.searchRequest( artist, callback );
			}
		}, this ) );
	}

};

_.extend( Spotify.prototype, ApiMixin, api );

module.exports = Spotify;