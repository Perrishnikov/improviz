// NO SCROLL  ON MOBILE

/* ---------- VARIABLES --------- */
var WIDTH = $('#baseline').innerWidth(); // DONT USE TARGET DIV, use empty div container
var HEIGHT;// Global so threejs can access
// console.log(HEIGHT);
// console.log(WIDTH);

/* ---------- READY ---------- */
$(document).ready(function(){
	selectAspect();		//sets initial ratio from "active" button
	updateDashboard();	//DOM dashboard
	load3js();
});

/* ---------- RESIZE ---------- */
$(window).resize(function(){
	resizeCanvas("resize");
	updateDashboard();	//DOM dashboard
});

// ========================== dashboard ============================ //
function updateDashboard(){		//sends info to menu panel

	// console.log(div3Width + " " + div3Height);
	$(function displayWindowWidth() {		//displays widows width
		$("#windowWidth span").text(function() {
			var windowWidth = $(window).width();
			$(this).text(windowWidth);
		});
	});
	$(function displayWindowHeight() {		//displays widows height
		$("#windowHeight span").text(function() {
			var windowHeight = $(window).height();
			$(this).text(windowHeight);
		});
	});
	$(function displayBaselineWidth() {		//displays baseline's width
		$("#baselineWidth span").text(function() {
			var baselineWidth = $("#baseline").width(); 	//use width, not innerWidth
			$(this).text(baselineWidth);
		});
	});
	$(function displaydiv3Props() {		//displays div3's width and height. Call displayAspectRatio
		var div3Width, div3Height;
		$("#div3Height span").text(function() {
			div3Height = Math.round($("#div3").height());
			$(this).text(div3Height);
		});
		$("#div3Width span").text(function() {
			div3Width = Math.round($("#div3").width());
			$(this).text(div3Width);
		});
		displayAspectRatio(div3Width, div3Height);	//calls displayAspectRatio below
	});
	function displayAspectRatio(W,H) {		//displays actual (not desired) value to test against.
		$("#aspect span").text(function() {
			var currentRatio = Math.round((W/H)*100)/100;
			$(this).text(currentRatio);
		});
	}
}
// ====================== end dashboard ============================ //

/* ------------------------- FUNCTIONS ---------------------------- */

function selectAspect() {	//button click event for 16:9 and 4:3 toggles "active"
	var aspectRatio = $("#toggleAspect .active").attr('id');	//set inital aspect ratio on ready
	// console.log(aspectRatio);
	$("#toggleAspect button").click(function() {	//on button click, update the ACTIVE status and value
		aspectRatio = this.id;	//assign id value 1.77 or 1.33
		// console.log(aspectRatio);
		$("#toggleAspect button").removeClass("active"); 	  // remove "active" classes from all
		$(this).addClass("active");		// add "active" class to the one we clicked

		console.log("Onclick: " + Number(aspectRatio));
		resizeCanvas(Number(aspectRatio));	//sets new ratio on button click //convert to number from string
	});
	resizeCanvas(Number(aspectRatio));	//only sets inital ratio //4.3 //convert to number from string
	// console.log("Initial: " + aspectRatio);
};

var dataStore = {
	lastNumber: "null",
	activeAspect: "null",
	otherAspect: "null",
	formula: function(x){
		dataStore.otherAspect = (1/x).toFixed(2)}
		// console.log(dataStore.lastNumber);}
}

function resizeCanvas(aR){
console.log(aR);
	if ($.isNumeric(aR)){
		dataStore.lastNumber = aR;
		dataStore.activeAspect = aR;
		dataStore.formula(aR);

	} else if (aR == "resize"){
		dataStore.activeAspect = dataStore.lastNumber;

	} else if (aR == "full"){
		// full size
	} else {
		console.log("Aspet Ratio is not valid");
	}

	var maxWidth = $('#baseline').width();
	var minHeight = ($(window).height()) - 60; //300 breakHeight //if maxheight is too small, break maxWidth to minWidth
	var maxHeight = Math.round(maxWidth * dataStore.otherAspect);
	var minWidth = Math.round(minHeight * dataStore.activeAspect);

	// console.log(otherAspect);
	// console.log((1/dataStore.activeAspect).toFixed(2));
	console.log("minWidth" + minWidth);
	console.log("maxWidth" + maxWidth);
	// console.log("maxHeight" + maxHeight);

	if (minHeight < maxHeight) {	//primary resizing work
		$("#div3").css({"height": minHeight, "width": minWidth});
			HEIGHT = minHeight;
			WIDTH = minWidth;
			console.log("HEIGHT" + HEIGHT);
			//send these values to threejs and remove global variables ====================
	}
	else {	//kicks in on small size y movements
		$("#div3").css({"height": maxHeight, "width": maxWidth});
			HEIGHT = maxHeight;
			WIDTH = maxWidth;
			// console.log("else");

	}

}
