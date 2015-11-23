var BandsInTown = require( '../models/bands-in-town' ),
	SearchView = require( '../views/search' ),
	ShowsView = require( '../views/shows' ),
	BandsInTownCollection = require( '../collections/bands-in-town' ),
	ShowsCollection;

ShowsCollection = new BandsInTownCollection({
	model: BandsInTown
});

new SearchView({
	el: $('#search-field'),
	collection: ShowsCollection
});

new ShowsView({
	el: $('#shows'),
	collection: ShowsCollection
});
