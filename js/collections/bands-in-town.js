var BandsInTown = require( '../models/bands-in-town' ),
	Backbone = require( 'backbone' ),
	BandsInTownCollection;

BandsInTownCollection = Backbone.Collection.extend({
	model: BandsInTown,

	comparator: function ( show ) {
		return Date.parse( show.datetime );
	},

	url: function () {
		return '/data/shows?artist=' + encodeURIComponent( this.opts.artist );
	}
});

module.exports = BandsInTownCollection;