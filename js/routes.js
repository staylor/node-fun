var _ = require( 'underscore' ),
	routeHelper = require( './route-helper' ),
	express = require( 'express' ),
	router,
	routes;

router = express.Router();

routes = [
	{
		path: '/',
		data: {
			name: 'Scott motherfucking Taylor'
		}
	},
	{
		path: '/hogan',
		template: 'hogan'
	},
	{
		path: '/bands/:artist',
		data: function ( req ) {
			return {
				name: req.params.artist
			};
		}
	}
];

_.each( routes, function ( route ) {
	routeHelper( router, route );
} );

module.exports = router;
