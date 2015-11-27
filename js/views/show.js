var templates = require( '../templates/compiled' ),
	ShowView;

ShowView = Backbone.View.extend({
	tagName: 'li',
	render: function () {
		var html = templates.show.render( this.model );

		this.$el.html( html );

		return this;
	}
});

module.exports = ShowView;
