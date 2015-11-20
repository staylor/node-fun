var _ = require( 'underscore' ),
	Backbone = require( 'backbone' ),
	isoParse = require( '../lib/iso-8601-parse' ),
	Show;

Show = Backbone.Model.extend({

	dateString: function () {
		var timestamp = isoParse( this.get( 'datetime' ) ), date;
		date = new Date( timestamp );
		return date.toLocaleString();
	},

	artistNames: function () {
		return _.pluck( this.get( 'artists' ), 'name' ).join( ', ' );
	},

	venue: function () {
		return this.get( 'venue' );
	},

	spotifyUri: function () {
		var related = this.get( 'related' );
		if ( ! related ) {
			return;
		}

		return related.uri;
	},

	spotifyUrl: function () {
		var related = this.get( 'spotify' );
		if ( ! related || ! related.external_urls ) {
			return;
		}

		return related.external_urls.spotify;
	},

	images: function () {
		var images = [];

		if ( ! this.get( 'spotify' ) ) {
			return;
		}

		images = _.find( this.get( 'spotify' ).images, function ( image ) {
			return image.height > 100 && image.height <= 300;
		} );

		return images;
	}
});

module.exports = Show;
