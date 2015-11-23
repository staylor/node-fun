var express = require( 'express' ),
	ShowsController = require( './controllers/shows' ),
	LocationController = require( './controllers/location' ),
	SongkickController = require( './controllers/songkick' ),
	router;

router = express.Router();

router.get( '/everywhere', function ( req, res ) {
	res.render( 'everywhere', {} );
} );

router.get( '/data/shows', ShowsController );

router.get( '/metro/:metro_id', SongkickController );

router.get( '/you', LocationController );

router.get( '/', SongkickController );

module.exports = router;
