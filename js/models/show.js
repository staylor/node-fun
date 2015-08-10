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

	image: function () {
		if ( ! this.get( 'related' ) ) {
			return;
		}

		var related = this.get( 'related' ).relations,
			image;

		image = _.findWhere( related, { type: 'image' } );
		if ( image ) {
			return image.url.resource;
		}
	}
});

module.exports = Show;