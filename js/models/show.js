var _ = require( 'underscore' ),
	Backbone = require('backbone'),
	Show;

Show = Backbone.Model.extend({

	datetime: function () {
		var dt = new Date( this.get( 'datetime' ) );
		return dt.toLocaleString();
	},

	artistNames: function () {
		return _.pluck( this.get( 'artists' ), 'name' ).join( ', ' );
	},

	venue: function () {
		return this.get( 'venue' );
	},

	images: function () {
		var images = [];

		if ( ! this.get( 'related' ) ) {
			return;
		}

		_.each( this.get( 'related' ), function ( artist ) {
			var found = _.find( artist.images, function ( image ) {
				return image.height > 100 && image.height < 300;
			} );

			if ( found ) {
				images.push( found );
			}
		} );

		return images;
	}
});

module.exports = Show;