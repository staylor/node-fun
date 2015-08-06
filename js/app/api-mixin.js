
var http = require('http'),
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

	sendJson: function (requestUri, res) {
		http.get(requestUri, function(apiRes) {
			var response = '';

			apiRes.on('data', function(data) {
				response += data;
			});

			apiRes.on('end', function() {
				res.set('Content-Type', 'application/json');
				res.send(response);
			});
		});
	}
};

module.exports = ApiMixin;