var _ = require( 'underscore' ),
	Backbone = require( 'backbone' ),
	Songkick = require( '../models/songkick' ),
	NYCView;

NYCView = Backbone.View.extend({
	events: {
		'click': 'debouncedSearch'
	},

	debouncedSearch: _.debounce( function () {
		this.collection.model = Songkick;
		this.collection.opts = {};
		this.collection.fetch({ reset: true });
	}, 600 )

});

module.exports = NYCView;