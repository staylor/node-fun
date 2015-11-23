var express = require( 'express' ),
	path = require( 'path' ),
	cookieParser = require( 'cookie-parser' ),
	app,
	AppRouter = require( './js/routes.js' ),
	port = 5000;

app = express();

app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});

app.use( cookieParser() );
app.use( express.static( __dirname + '/' ) );
app.set( 'views', path.join( __dirname, 'templates' ) );
app.set( 'view engine', 'mustache' );
app.set( 'layout', 'layout' );
app.engine( 'mustache', require( 'hogan-express' ) );

app.use( '/', AppRouter );

process.on( 'unhandledRejection', function ( reason, p ) {
    console.log( 'Unhandled Rejection at: Promise ', p, ' reason: ', reason );
} );
