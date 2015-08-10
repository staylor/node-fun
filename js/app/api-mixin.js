
var _ = require( 'underscore' ),
	request = require( 'request' ),
	ApiMixin;

ApiMixin = {
	format: function (s) {
		var args = Array.prototype.slice.call(arguments, 1), i;
		i = args.length;

		while (i--) {
			s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i]);
		}
		return s;
	},

	getClient: function () {
		return request;
	},

	getAsync: function (requestUri, callback) {
		var client = this.getClient(),
			boundCallback = _.bind( callback, this );

		client( requestUri, function ( err, response, body ) {
			var data = body;

			if ( 0 === response.headers['content-type'].indexOf( 'application/json' ) ) {
				data = JSON.parse( body );
			}

			boundCallback( data );
		} );
	}
};

module.exports = ApiMixin;