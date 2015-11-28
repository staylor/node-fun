var _ = require( 'underscore' ),
	Backbone = require( 'backbone' ),
	moment = require( 'moment' ),
	Show;

Show = Backbone.Model.extend({
	initialize: function () {
		this.related = this.get( 'spotify' ) || {};
	},

	dateString: function () {
		var dt = this.get( 'datetime' ),
			formatted;

		if ( dt.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) ) {
			formatted = moment( dt, 'YYYY-MM-DD' ).format( 'dddd, MMMM D' );
		} else {
			formatted = moment( dt, moment.ISO_8601 ).utcOffset( dt ).format( 'dddd, MMMM D, h:mma' );
		}

		return formatted;
	},

	artistNames: function () {
		return _.pluck( this.get( 'artists' ), 'name' ).join( ', ' );
	},

	venue: function () {
		return this.get( 'venue' );
	},

	popularity: function () {
		return this.related.popularity;
	},

	spotifyUri: function () {
		return this.related.uri;
	},

	spotifyUrl: function () {
		if ( ! this.related.external_urls ) {
			return;
		}

		return this.related.external_urls.spotify;
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
