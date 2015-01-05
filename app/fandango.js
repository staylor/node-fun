var _ = require('underscore'),
	ApiMixin = require( '../app/api-mixin.js' ),
	crypto = require('crypto'),
	apiKey = '997zd5b3k7szue7fmpck6nfx',
	sharedSecret = 'wtev8kpnDQ',
	baseUri = 'http://api.fandango.com',
	apiVersion = '1',
	Fandango;

Fandango = function () {
	var api = {
		sha256Encode: function (stringToEncode) {
			return crypto.createHash('sha256').update(stringToEncode).digest('hex');
		},

		getAuthParams: function () {
			var seconds = Math.floor(new Date() / 1000),
				paramsToEncode;

			paramsToEncode = apiKey + sharedSecret + seconds;

			return this.format('apikey={0}&sig={1}', apiKey, sha256Encode(paramsToEncode));
		},

		getResponse: function (parameters, res) {
			var requestUri = this.format(
				'{0}/v{1}/?{2}&{3}',
				baseUri,
				apiVersion,
				parameters,
				getAuthParams()
			);

			this.sendJson( requestUri, res );
		}
	};

	return _.extend( {}, ApiMixin, api );
};

module.exports = Fandango;