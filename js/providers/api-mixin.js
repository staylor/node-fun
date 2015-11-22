
var util = require( 'util' ),
	_ = require( 'underscore' ),
	Q = require( 'q' ),
	request = require( 'request' ),
	redis = require( '../lib/redis' ),
	ApiMixin;

ApiMixin = function () {
	this.client = request.defaults( this.config || {} );
};

ApiMixin.prototype = {
	defaultExpiration: 300,

	cacheGroup: 'default',

	promise: function () {
		return Q.fcall( function () {
			return {};
		} );
	},

	format: function ( s ) {
		var args = Array.prototype.slice.call( arguments, 1 );

		args = args.map( function ( arg ) {
			return encodeURIComponent( arg );
		} );

		args.unshift( s );

		return util.format.apply( null, args );
	},

	getClient: function () {
		return this.client;
	},

	getCacheKey: function () {
		var key = 'string' === typeof this.requestUri ? this.requestUri : JSON.stringify( this.requestUri );
		return [ key, this.cacheGroup ].join( ':' );
	},

	setUriData: function ( data ) {
		var key = this.getCacheKey();
		redis.set( key, JSON.stringify( data ) );
		redis.expire( key, this.expiration || this.defaultExpiration );
	},

	getUriData: function () {
		var self = this, deferred = Q.defer();

		redis.get( this.getCacheKey(), function ( err, value ) {
			if ( err ) {
				console.log( err );
				deferred.reject( err );
				return;
			}

			if ( value && 'false' !== String( value ) ) {

				if ( _.isString( value ) ) {
					deferred.resolve( JSON.parse( value ) );
				} else {
					deferred.resolve( value );
				}

				return;
			}

			this.getAsync( this.requestUri ).then( function ( response ) {
				return self.parse( response ).then( function ( data ) {
					self.setUriData( data );

					return deferred.resolve( data );
				} );
			}, function ( reason ) {
				console.log( reason );
				deferred.reject( reason );
			} );
		}.bind( this ) );

		return deferred.promise;
	},

	getAsync: function ( requestUri ) {
		var client = this.getClient();

		return Q.Promise( function ( resolve, reject ) {
			client( requestUri, function ( err, response, body ) {
				var data = body;

				if ( err || response.statusCode >= 400 ) {
					console.log( 'Rejected...', err || response.body );
					reject( err );
					return;
				}

				if ( 0 === response.headers['content-type'].indexOf( 'application/json' ) ) {
					data = JSON.parse( body );
				}

				resolve( data );
			} );
		} );
	}
};

module.exports = ApiMixin;
