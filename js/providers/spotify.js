//Client ID
//b791653f8886473db15526cc8ea24588
//Client Secret
//fddc22b8fd85445db6477b5fe502ab90

var util = require( 'util' ),
	_ = require( 'underscore' ),
	Q = require( 'q' ),
	ProviderBase = require( './provider-base' ),

	// 7 days
	expiration = 60 * 60 * 24 * 7,
	Spotify;

Spotify = function () {
	this.cacheGroup = 'spotify2';
	this.expiration = expiration;
	this.config = {
		baseUrl: 'https://api.spotify.com/v1'
	};

	ProviderBase.call( this );
};

util.inherits( Spotify, ProviderBase );

Spotify.prototype.parse = function ( resp ) {
	var item = {}, trimmed;

	if ( ! resp.artists || ! resp.artists.items.length ) {
		return this.promise();
	}

	trimmed = this.artist.toLowerCase().trim();
	item = _.find( resp.artists.items, function ( item ) {
		return item.name.toLowerCase().trim() === trimmed;
	} );

	if ( ! item ) {
		return this.promise();
	}

	return Q.fcall( function () {
		return item;
	} );
};

Spotify.prototype.search = function ( artist ) {
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