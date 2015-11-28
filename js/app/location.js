var LocationCollection = require( '../collections/location' ),
	ShowsView = require( '../views/shows' ),
	Cookies = require( '../lib/js-cookie' ),
	appLinks = require( './app-links' ),

	savedLocation,
	list,
	showsCollection,
	coords;

function hftGetCoords( position ) {
	list.$el.html( '' );
	showsCollection.opts.coords = position.coords;
	showsCollection.fetch({ reset: true });
}

appLinks();

showsCollection = new LocationCollection();

list = new ShowsView({
	el: $('#shows'),
	collection: showsCollection
});

savedLocation = Cookies.get( 'hft_location' );

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

