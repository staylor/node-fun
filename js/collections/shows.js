var _ = require( 'underscore' ),
	Backbone = require( 'backbone' ),
	Shows;

Shows = Backbone.Collection.extend({
	comparator: function ( show ) {
		return Date.parse( show.get( 'datetime' ) );
	},

	url: function () {
		if ( this.opts && this.opts.artist ) {
			return '/data/shows?artist=' + encodeURIComponent( this.opts.artist );
		}

		// NYC
		return '/data/shows?metro=7644';
	}
});

module.exports = Shows;