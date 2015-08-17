var $ = require( 'jquery' ),
	_ = require( 'underscore' ),
	Backbone = require( 'backbone' ),
	NYCView = require( './views/nyc-button' ),
	SearchView = require( './views/search' ),
	ShowsView = require( './views/shows' ),
	Collection = require( './collections/shows' ),
	ShowsCollection;

Backbone.$ = $;

ShowsCollection = new Collection();

new NYCView({
	el: $('#search-nyc'),
	collection: ShowsCollection
});

new SearchView({
	el: $('#search-field'),
	collection: ShowsCollection
});

new ShowsView({
	el: $('#shows'),
	collection: ShowsCollection
});