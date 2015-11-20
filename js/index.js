var $ = require( 'jquery' ),
	Backbone = require( 'backbone' ),
	Songkick = require( './models/songkick' ),
	ShowsView = require( './views/shows' ),
	SongkickCollection = require( './collections/songkick' ),
	ShowsCollection;

Backbone.$ = $;

ShowsCollection = new SongkickCollection();

new ShowsView({
	el: $('#shows'),
	collection: ShowsCollection
});

ShowsCollection.fetch({ reset: true });