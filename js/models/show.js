var _ = require( 'underscore' ),
	Backbone = require( 'backbone' ),
	moment = require( 'moment' ),
	Show;

Show = Backbone.Model.extend({
	dateString: function () {
		var dt = this.get( 'datetime' );
		return moment( dt, moment.ISO_8601 ).utcOffset( dt ).format( 'dddd, MMMM D, h:mma' );
	},

	artistNames: function () {
		return _.pluck( this.get( 'artists' ), 'name' ).join( ', ' );
	},

	venue: function () {
		return this.get( 'venue' );
	},

	popularity: function () {
		if ( this.get( 'spotify' ) ) {
			return this.get( 'spotify' ).popularity;
		}
	},

	spotifyUri: function () {
		var related = this.get( 'spotify' );
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
