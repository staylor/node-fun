var _ = require( 'underscore' ),
	RouteHelper;

RouteHelper = function ( router, params ) {
	var config = _.defaults( params, {
		type: 'get',
		path: '/',
		template: 'index',
		data: {}
	} );

	router[ config.type ]( config.path, function ( req, res ) {
		var data = config.data;
		if ( _.isFunction( config.data ) ) {
			data = config.data( req );
		}

		res.render( 'layout', _.extend( data, {
			partials: {
				content : config.template
			}
		} ) );

	} );
};

module.exports = RouteHelper;