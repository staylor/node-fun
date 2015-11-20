var express = require( 'express' ),
	ShowsController = require( './controllers/shows' ),
	SongkickController = require( './controllers/songkick' ),
	router;

router = express.Router();

router.get( '/', SongkickController );

router.get( '/everywhere', function ( req, res ) {
	res.render( 'everywhere', {} );
} );

router.get( '/data/shows', ShowsController );

module.exports = router;
