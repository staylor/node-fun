var $ = require( 'jquery' ),
	Backbone = require( 'backbone' ),
	LocationCollection = require( '../collections/location' ),
	ShowsView = require( '../views/shows' ),
	list,
	ShowsCollection;

Backbone.$ = $;

ShowsCollection = new LocationCollection({});

list = new ShowsView({
	el: $('#shows'),
	collection: ShowsCollection
});

if ( ! window.highforthis ) {
	window.highforthis = {};
}

function hftGetCoords( position ) {
	window.highforthis.coords = position.coords;
	list.$el.html( '' );
	ShowsCollection.fetch({ reset: true });
}

if ( navigator.geolocation ) {
	list.$el.html( '<li>Getting your location...</li>' );
	navigator.geolocation.getCurrentPosition( hftGetCoords );
} else {
	list.$el.html( '<li>Location is not available.</li>' );
}

