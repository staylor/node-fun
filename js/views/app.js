var $ = require('jquery'),
	Backbone = require('backbone'),
	App,
	BandsInTownView = require('./bands-in-town.js');

Backbone.$ = $;

App = Backbone.View.extend({
	el: '#app',
	initialize: function () {
		this.bandsInTown = new BandsInTownView();
	},

	render: function () {
		this.$el.append([
			this.bandsInTown.render().el
		]);
		return this;
	}
});

module.exports = App;