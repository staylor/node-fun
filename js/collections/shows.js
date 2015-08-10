var Backbone = require( 'backbone' ),
	Show = require( '../models/show' ),
	Shows;

Shows = Backbone.Collection.extend({
	model: Show,
	url: function () {
		return '/data/shows?artist=' + encodeURIComponent( this.artist );
	}
});

module.exports = Shows;