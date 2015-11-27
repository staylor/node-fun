
var util = require( 'util' ),
	_ = require( 'underscore' ),
	Q = require( 'q' ),
	request = require( 'request' ),
	redis = require( '../lib/redis' ),
	ProviderBase;

ProviderBase = function () {
	this.defaultExpiration = 300;
	this.cacheGroup = 'default';
	this.client = request.defaults( this.config || {} );
};

ProviderBase.prototype.format = function ( s ) {
	var args = Array.prototype.slice.call( arguments, 1 );

	args = args.map( function ( arg ) {
		return encodeURIComponent( arg );
	} );

	args.unshift( s );

	return util.format.apply( null, args );
};

ProviderBase.prototype.getCacheKey = function () {
	var key = 'string' === typeof this.requestUri ? this.requestUri : JSON.stringify( this.requestUri );
	return [ key, this.cacheGroup ].join( ':' );
};

ProviderBase.prototype.setUriData = function ( data ) {
	var key = this.getCacheKey();
	redis.set( key, JSON.stringify( data ) );
	redis.expire( key, this.expiration || this.defaultExpiration );
};

ProviderBase.prototype.getUriData = function () {
	var deferred = Q.defer();

	redis.get( this.getCacheKey(), function ( err, value ) {
		if ( err ) {
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

		this.getAsync( this.requestUri )
			.then(
				this.parse.bind( this ),
				function ( reason ) {
					deferred.reject( reason );
				}
			)
			.then( function ( data ) {
				this.setUriData( data );

				deferred.resolve( data );

				return data;
			}.bind( this ), function ( reason ) {
				deferred.reject( reason );
			} );

	}.bind( this ) );

	return deferred.promise;
};

ProviderBase.prototype.getAsync = function ( requestUri ) {
	return Q.Promise( function ( resolve, reject ) {

		this.client( requestUri, function ( err, response, body ) {
			var data = body;

			console.log( 'REQUEST:', response.request.uri.href );

			if ( err || response.statusCode >= 400 ) {
				console.error( 'Rejected...', err || response.body );
				reject( err );
				return;
			}

			if ( 0 === response.headers['content-type'].indexOf( 'application/json' ) ) {
				data = JSON.parse( body );
			}

			resolve( data );
		} );
	}.bind( this ) );
};

module.exports = ProviderBase;
