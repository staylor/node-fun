
var _ = require( 'underscore' ),
	request = require( 'request' ),
	redis = require( './redis' ),
	ApiMixin;

ApiMixin = {

	cacheGroup: 'v5',

	format: function (s) {
		var args = Array.prototype.slice.call(arguments, 1), i;
		i = args.length;

		while (i--) {
			s = s.replace( new RegExp( '\\{' + i + '\\}', 'gm' ), encodeURIComponent( args[i] ) );
		}
		return s;
	},

	getClient: function () {
		return this.client;
	},

	getCacheKey: function ( url ) {
		return [this.requestUri, this.cacheGroup].join( ':' );
	},

	getUriData: function ( callback ) {
		redis.get( this.getCacheKey(), _.bind( function ( err, value ) {

			if ( value && 'false' !== String( value ) ) {

				if ( _.isString( value ) ) {
					this.response.json( JSON.parse( value ) );
				} else {
					this.response.json( value );
				}

			} else {
				this.getAsync( this.requestUri, callback );
			}
		}, this ) );
	},

	setUriData: function ( data ) {
		redis.set( this.getCacheKey(), JSON.stringify( data ) );
	},

	getAsync: function (requestUri, callback) {
		var client = this.getClient(),
			boundCallback = _.bind( callback, this );

		client( requestUri, function ( err, response, body ) {
			var data = body;

			if ( response.statusCode >= 400 ) {
				boundCallback( false );
				return;
			}

			if ( 0 === response.headers['content-type'].indexOf( 'application/json' ) ) {
				data = JSON.parse( body );
			}

			boundCallback( data );
		} );
	},

	parallelCallback: function () {
		var response;

		return _.bind( function ( err ) {

			_.each( this.waiting, function ( items, key ) {
				_.each( items, function ( item ) {
					if ( ! this.data[ item ] ) {
						return;
					}

					if ( ! this.stack[ key ].related ) {
						this.stack[ key ].related = [];
					}

					this.stack[ key ].related.push( this.data[ item ] );
				}, this );
			}, this );

			response = _.values( this.stack );

			console.log( 'SETTING' );
			this.setUriData( response );

			this.response.json( response );
		}, this );
	}
};

module.exports = ApiMixin;