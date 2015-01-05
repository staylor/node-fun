var express = require('express'),
	path = require('path'),
	FandangoApi = require( './app/fandango.js' ),
	BandsInTownApi = require( './app/bands-in-town.js' ),
	fandango,
	bandsInTown,
	app,
	port = 5000;

app = express();

app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});

app.use( express.static( __dirname + '/' ) );

app.get( '/', function ( req, res ) {
	res.sendFile( path.join( __dirname, 'index.html' ) );
} );

app.get( '/fandango/:zip', function( req, res ) {
	var params = 'op=theatersbypostalcodesearch&postalcode=' + req.params.zip;
	fandango = fandango || new FandangoApi();
	fandango.getResponse(params, res);
});

app.get( '/bands/:artist', function( req, res ) {
	bandsInTown = bandsInTown || new BandsInTownApi();
	bandsInTown.getArtistEvents(req.params.artist, res);
});