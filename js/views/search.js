var _ = require( 'underscore' ),
	Backbone = require( 'backbone' ),
	SearchView;

SearchView = Backbone.View.extend({
	events: {
		'keyup' : 'debouncedSearch'
	},

	debouncedSearch: _.debounce( function () {
		if ( ! this.el.value.trim() ) {
			return;
		}

		this.collection.opts = {
			artist: this.el.value.trim()
		};
		this.collection.fetch({ reset: true });
	}, 600 )

});

module.exports = SearchView;
