var _ = require( 'underscore' ),
	Backbone = require( 'backbone' ),
	SearchView;

SearchView = Backbone.View.extend({

	intialize: function () {
		this.events.keyup = _.debounce( this.debouncedSearch, 600 );
	},

	debouncedSearch: function () {
		this.collection.opts = {
			artist: this.el.value
		};
		this.collection.fetch({ reset: true });
	}

});

module.exports = SearchView;
