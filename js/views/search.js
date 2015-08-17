var _ = require( 'underscore' ),
	Backbone = require( 'backbone' ),
	BandsInTown = require( '../models/bands-in-town' ),
	SearchView;

SearchView = Backbone.View.extend({
	
	events: {
		'keyup': 'debouncedSearch'
	},

	debouncedSearch: _.debounce( function () {
		this.collection.model = BandsInTown;
		this.collection.opts = {
			artist: this.el.value
		};
		this.collection.fetch({ reset: true });
	}, 600 )

});

module.exports = SearchView;