/* ---------- VARIABLES --------- */
var WIDTH = $('#baseline').innerWidth(); // DONT USE TARGET DIV, use empty div container
var HEIGHT = (WIDTH/4)*3; //Global so threejs can access

/* ---------- READY ---------- */
$(document).ready(function(){
	getActiveButton();	//gets me active button & its id value (1.33)
	sizeCanvas();	//resizes canvas to match desired aspect ratio
	updateDashboard();	//DOM dashboard
	load3js();
});

/* ---------- RESIZE ---------- */
$(window).resize(function(){
	sizeCanvas();
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
			div3Height = $("#div3").height();
			$(this).text(div3Height);
		});
		$("#div3Width span").text(function() {
			div3Width = $("#div3").width();
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
// ===================== end dashboard ============================ //

/* ------------------------- FUNCTIONS ---------------------------- */
function getActiveButton(){ //gets me active button & its id value (1.33)
	var activeId = $("#toggleAspect .active").attr('id');
}

$(function toggleAspect() {	//button click event for 16:9 and 4:3 toggles "active"
	$("#toggleAspect button").click(function() {
		var aspectRatio = this.id;	//assign id value 1.77 or 1.33
		console.log(aspectRatio);
		$("button").removeClass("active"); 	  // remove "active" classes from all
		$(this).addClass("active");		// add "active" class to the one we clicked

		getActiveButton();
		updateCanvasSize(aspectRatio);
	});
});

function updateCanvasSize(aR) {
	//
}

function sizeCanvas(){
 	/*Canvas Variables*/
	// var presentRatio = Math.round(WIDTH/HEIGHT*100)/100;

	var maxWidth = $('#baseline').innerWidth(); //width of // DONT USE TARGET DIV, use empty div container
	var cssHeight = $("#div3").css("height"); //height from div3.css     starts at 0px
	var cssHeightSliced =	cssHeight.slice(0, -2); //slicing 'px' off
	var cssWidth = $("#div3").css("width"); //width from div3.css   //same as maxWidth, with px
	var cssWidthSliced =	cssWidth.slice(0, -2); //slicing 'px' off
	var windowY = $(window).height(); //window height
	var canTop = Math.round($("#div3").position().top); //canvas distance from top
	var canPad = $("#div3").outerHeight(true) - $("#div3").outerHeight(); //get padding value from canvas
	var allPad = (canTop + canPad); //~82px
	var breakHeight = windowY - allPad; //gives padding to new canvas height	//800-82

	// $("#resolution span").text(presentRatio);//add presentRation to DOM Menu

	fourThree();
	// displayAspectRatio();

	/*4:3 Variables, 1.33*/ //http://andrew.hedges.name/experiments/aspect_ratio/
	function fourThree() {
		var maxHeight = Math.round((maxWidth/4)*3); //formula for 4:3 height
		var minHeight = Math.round((breakHeight)*1.33);	//formula for 4:3 height

		if (breakHeight < maxHeight){
			$("#div3").css({"height": breakHeight, "width": minHeight});
				HEIGHT = breakHeight;
				WIDTH = minHeight;
		} else {
			$("#div3").css({"width": "100%", "height": maxHeight});
		    	HEIGHT = maxHeight;
				WIDTH = cssWidthSliced;
		}
	}

	/*16:9 Variables 1.77*/
	function sixteenNine(){
		var maxHeight = Math.round((maxWidth/16)*9); //formula for 16:9 height
		var minHeight = Math.round((breakHeight)*1.77);	//formula for 16:9 height

		if (breakHeight < maxHeight){
			$("#div3").css({"height": breakHeight, "width": minHeight});
				HEIGHT = breakHeight;
				WIDTH = minHeight;
		} else {
			$("#div3").css({"width": maxWidth, "height": maxHeight});
		    	HEIGHT = maxHeight;
				WIDTH = cssWidthSliced;
		}
	}
}
