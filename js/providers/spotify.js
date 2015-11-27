//Client ID
//b791653f8886473db15526cc8ea24588
//Client Secret
//fddc22b8fd85445db6477b5fe502ab90

var util = require( 'util' ),
	ProviderBase = require( './provider-base' ),

	// 7 days
	expiration = 60 * 60 * 24 * 7,
	Spotify;

/**
 * @class
 * @augments ProviderBase
 */
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
	var item = {}, trimmed, i, t;

	if ( ! resp.artists || ! resp.artists.items.length ) {
		return item;
	}

	trimmed = this.artist.toLowerCase().trim();
	for ( i = 0; i < resp.artists.items.length; i++ ) {
		t = resp.artists.items[i].name.toLowerCase().trim();
		if ( t !== trimmed ) {
			continue;
		}

		item = resp.artists.items[i];
		break;
	}

	if ( ! item ) {
		return {};
	}

	return item;
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