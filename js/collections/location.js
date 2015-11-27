var SongkickCollection = require( './songkick' ),
	LocationCollection;

LocationCollection = SongkickCollection.extend({
	initialize: function () {
		this.opts = {};

		SongkickCollection.prototype.initialize.apply( this, arguments );
	},

	url: function () {
		var coords = [ this.opts.coords.latitude, this.opts.coords.longitude ].join( ',' );
		return '/data/shows?location=' + encodeURIComponent( coords );
	}
});

module.exports = LocationCollection;