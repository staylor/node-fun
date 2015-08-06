var Backbone = require('backbone'),
	Shows;

Shows = Backbone.Collection.extend({
	url: function () {
		return '/bands/' + encodeURIComponent( this.artist );
	}
});

module.exports = Shows;