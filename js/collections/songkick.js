var Songkick = require( '../models/songkick' ),
	Backbone = require( 'backbone' ),
	SongkickCollection;

SongkickCollection = Backbone.Collection.extend({
	model: Songkick,
	comparator: function ( a, b ) {
		var aPop = a.popularity(),
			bPop = b.popularity();

		// #2 exists
		if ( bPop ) {

			// both exist
			if ( aPop ) {
				if ( aPop === bPop ) {
					return 0;
				} else if ( aPop > bPop ) {
					return -1;
				} else {
					return 1;
				}

			// only #2 exists
			} else {
				return 1;
			}

		// #1 exists
		} else if ( aPop ) {
			return -1;
		}

		// neither exist
		return 0;
	},

	url: function () {
		// NYC
		return '/data/shows?metro=7644';
	}
});

module.exports = SongkickCollection;
