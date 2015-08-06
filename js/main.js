var $ = require( 'jquery' ),
	_ = require( 'underscore' ),
	Backbone = require( 'backbone' );

Backbone.$ = $;

View = Backbone.View.extend({
	events: {
		'keyup': 'debouncedSearch'
	},

	debouncedSearch: _.debounce( function () {
		$.ajax({
			url: '/data/shows',
			data: {
				artist: this.el.value
			},
			context: this
		}).done( thos/ );
	}, 600 )


});