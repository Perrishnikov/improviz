/* ---------- VARIABLES --------- */


/* ---------- READY ---------- */
$(document).ready(function(){
	$('.grid').masonry({
	  itemSelector: '.grid-item', // use a separate class for itemSelector, other than .col-
	  columnWidth: '.grid-sizer',
	  percentPosition: true
	});

	$('.grid').on('click', function(e){
		console.log(e);
		console.dir(e);
	});

	(function revealMenu() {	//reveal Menu button (starts hidden in html)

		$(window).keydown(function(event) {
			if ( event.which == 77 ) {
				$("#menu").toggle()
				event.preventDefault();
			}
		});
	}());

});


/* ---------- RESIZE ---------- */
$(window).resize(function(){

});

/* ------------------------- FUNCTIONS ---------------------------- */

function revealMenu() {	//reveal Menu button (starts hidden in html)

	$(window).keydown(function(event) {
		if ( event.which == 77 ) {
			$("#menu").toggle()
			event.preventDefault();
		}
	});
}
