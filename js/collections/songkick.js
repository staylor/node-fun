var Songkick = require( '../models/songkick' ),
	Backbone = require( 'backbone' ),
	SongkickCollection;

SongkickCollection = Backbone.Collection.extend({
	model: Songkick,
	comparator: function ( event ) {
		if ( event.get( 'spotify' ) ) {
			return -1 * event.get( 'spotify' ).popularity;
		}
		return -1 * event.get( 'popularity' );
	},

	url: function () {
		// NYC
		return '/data/shows?metro=7644';
	}
});

module.exports = SongkickCollection;
