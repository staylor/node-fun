var _ = require( 'underscore' ),
	express = require( 'express' ),
	router;

router = express.Router();

router.get( '/', function ( req, res ) {
	res.render( 'index', {
		name: 'ON THE SERVER'
	} );
} );

module.exports = router;
