var LocationCollection = require( '../collections/location' ),
	ShowsView = require( '../views/shows' ),
	Cookies = require( '../lib/js-cookie' ),
	savedLocation = Cookies.get( 'hft_location' ),

	list,
	showsCollection,
	coords;

function hftGetCoords( position ) {
	list.$el.html( '' );
	showsCollection.opts.coords = position.coords;
	showsCollection.fetch({ reset: true });
}

showsCollection = new LocationCollection();

list = new ShowsView({
	el: $('#shows'),
	collection: showsCollection
});

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

