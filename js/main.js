var $ = require( 'jquery' ),
	_ = require( 'underscore' ),
	Backbone = require( 'backbone' ),
	SearchView,
	ShowsCollection = require( './collections/shows' );

Backbone.$ = $;

SearchView = Backbone.View.extend({
	events: {
		'keyup': 'debouncedSearch'
	},

	debouncedSearch: _.debounce( function () {
		this.artist = this.el.value;
		console.log( this.artist );
	}, 600 )

});

new SearchView({
	el: $('#search-field'),
	collection: new ShowsCollection()
});