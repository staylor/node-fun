/*globals HoganTemplates */

var Backbone = require( 'backbone' ),
	ShowView;

ShowView = Backbone.View.extend({
	tagName: 'li',
	render: function () {
		var html = HoganTemplates.show( this.model );

		this.$el.html( html );

		return this;
	}
});

module.exports = ShowView;