/*globals HoganTemplates */

var Backbone = require( 'backbone' ),
	templates = require( '../templates/compiled' ),
	ShowView;

ShowView = Backbone.View.extend({
	tagName: 'li',
	render: function () {
		var html = templates.show( this.model );

		this.$el.html( html );

		return this;
	}
});

module.exports = ShowView;