var _ = require( 'underscore' ),
	Backbone = require('backbone'),
	isoParse = require( '../app/iso-8601-parse' ),
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

		return related[0].uri;
	},

	spotifyUrl: function () {
		var related = this.get( 'related' );
		if ( ! related || ! related[0].external_urls ) {
			return;
		}

		return related[0].external_urls.spotify;
	},

	images: function () {
		var images = [];

		if ( ! this.get( 'related' ) ) {
			return;
		}

		_.each( this.get( 'related' ), function ( artist ) {
			var found = _.find( artist.images, function ( image ) {
				return image.height > 100 && image.height <= 300;
			} );

			if ( found ) {
				images.push( found );
			}
		} );

		if ( ! images.length ) {
			return;
		}

		return images;
	}
});

module.exports = Show;