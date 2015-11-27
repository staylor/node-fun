// ensure that web apps work

module.exports = function () {
	$('.app-links a').click( function ( e ) {
		e.preventDefault();

		window.location.href = this.href;
	} );
};