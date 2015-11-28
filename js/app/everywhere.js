var BandsInTown = require( '../models/bands-in-town' ),
	SearchView = require( '../views/search' ),
	ShowsView = require( '../views/shows' ),
	BandsInTownCollection = require( '../collections/bands-in-town' ),
	appLinks = require( './app-links' ),
	showsCollection;

appLinks();

showsCollection = new BandsInTownCollection({
	model: BandsInTown
});

new SearchView({
	el: $('#search-field'),
	collection: showsCollection
});

new ShowsView({
	el: $('#shows'),
	collection: showsCollection
});
