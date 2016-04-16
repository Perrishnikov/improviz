// NO SCROLL  ON MOBILE

/* ---------- VARIABLES --------- */
var WIDTH = $('#baseline').innerWidth(); // DONT USE TARGET DIV, use empty div container
var HEIGHT = Math.round(WIDTH * .75); //(WIDTH/4)*3 Global so threejs can access

/* ---------- READY ---------- */
$(document).ready(function(){
	selectAspect();		//sets initial ratio from "active" button
	updateDashboard();	//DOM dashboard
	load3js();
});

/* ---------- RESIZE ---------- */
$(window).resize(function(){
	resizeCanvas("0");
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

		resizeCanvas(Number(aspectRatio));	//sets new ratio on button click //convert to number from string
	});
	resizeCanvas(Number(aspectRatio));	//only sets inital ratio //4.3 //convert to number from string
};

function resizeCanvas(){
	// var argument = aR;
	// var activeAspect;
		// console.log(aR);
		// if(argument > 1){
		// 	activeAspect = argument;
		// 	console.log("true " + activeAspect);
		// } else {
		// 	console.log("lies " + activeAspect);
		// }
		//
		// console.log(activeAspect);

// ==================================================================
	var activeAspect = 1.33;
	var otherAspect = .75; //(maxWidth/4)*3) 75%

	// var windowWidth = $(window).width();
	var maxWidth = $('#baseline').width(); //400
	var minHeight = ($(window).height()) - 60; //300 breakHeight //if maxheight is too small, break maxWidth to minWidth
	var maxHeight = Math.round(maxWidth * .75);
	var minWidth = Math.round(minHeight * 1.33);

if (minHeight < maxHeight) {	//primary resizing work
		$("#div3").css({"height": minHeight, "width": minWidth});
			HEIGHT = minHeight;
			WIDTH = minWidth;
			console.log("if true");
	}
	else {	//kicks in on small size y movements
		$("#div3").css({"height": maxHeight, "width": maxWidth});
			HEIGHT = maxHeight;
			WIDTH = maxWidth;
			console.log("else if");
	}




console.log("maxwidth: " + maxWidth);
console.log("minwidth: " + minWidth);
console.log("maxheight: " + maxHeight);
console.log("minheight: " + minHeight);

}
