var _ = require( 'underscore' ),
	express = require( 'express' ),
	ShowsController = require( './controllers/shows' ),
	router;

router = express.Router();

router.get( '/', function ( req, res ) {
	res.render( 'index', {} );
} );

router.get( '/data/shows', ShowsController );

module.exports = router;
