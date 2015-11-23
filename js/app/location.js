var LocationCollection = require( '../collections/location' ),
	ShowsView = require( '../views/shows' ),
	Cookies = require( '../lib/js-cookie' ),
	list,
	ShowsCollection,
	savedLocation, coords;

savedLocation = Cookies.get( 'hft_location' );

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

if ( savedLocation ) {
	coords = savedLocation.split( ',' );
	hftGetCoords( {
		coords: {
			latitude: coords[0],
			longitude: coords[1]
		}
	} );
} else if ( navigator.geolocation ) {
	list.$el.html( '<li>Getting your location...</li>' );
	navigator.geolocation.getCurrentPosition( hftGetCoords );
} else {
	list.$el.html( '<li>Location is not available.</li>' );
}

