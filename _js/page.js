/* ---------- VARIABLES --------- */


/* ---------- READY ---------- */
$(document).ready(function(){

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

/* ------- Data Store ----------- */
var dataStore = {
	lastNumber: "null",
	activeAspect: "null",
	otherAspect: "null",
	formula: function(x){
		dataStore.otherAspect = (1/x).toFixed(2)}
		// console.log(dataStore.lastNumber);}
}
