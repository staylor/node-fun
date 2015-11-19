//Client ID
//b791653f8886473db15526cc8ea24588
//Client Secret
//fddc22b8fd85445db6477b5fe502ab90

var util = require( 'util' ),
	_ = require( 'underscore' ),
	Q = require( 'q' ),
	request = require( 'request' ),
	ApiMixin = require( './api-mixin' ),

	Spotify;

Spotify = function () {
	this.client = request.defaults({
		baseUrl: 'https://api.spotify.com/v1'
	});
};

util.inherits( Spotify, ApiMixin );

Spotify.prototype.parseSearch = function ( resp ) {
	var items, trimmed;

	if ( ! resp.artists || ! resp.artists.items.length ) {
		return this.promise();
	}

	trimmed = this.artist.toLowerCase().trim();
	items = _.filter( resp.artists.items, function ( item ) {
		return item.name.toLowerCase().trim() === trimmed;
	} );

	if ( ! items || ! items.length ) {
		return this.promise();
	}

	return Q.fcall( function () {
		return _.max( items, function ( artist ) {
			return artist.followers.total;
		} );
	} );
};

Spotify.prototype.search = function ( artist ) {
	this.parse = this.parseSearch;
	this.artist = artist;
	this.requestUri =  {
		url: '/search',
		qs: {
			type: 'artist',
			q: artist
		}
	};

	return this.getUriData();
};

module.exports = Spotify;