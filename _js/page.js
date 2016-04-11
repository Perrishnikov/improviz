
/* ---------- VARIABLES --------- */
var WIDTH = $('#baseline').innerWidth();
var HEIGHT = Math.round((WIDTH/4)*3);

/* ---------- READY ---------- */
$(document).ready(function(){
	sizeCanvas();
	load3js();
});

/* ---------- RESIZE ---------- */
$(window).resize(function() {
	sizeCanvas();
});

/* ----------- FUNCTIONS --------- */
function sizeCanvas () {
 	/*Canvas Variables*/
	var maxWidth = $('#baseline').innerWidth(); //width of row - updated on resize
	var cssHeight = $("#canvasThree").css("height"); //height from canvasThree.css
	var cssHeightSliced =	cssHeight.slice(0, -2); //slicing 'px' off
	var cssWidth = $("#canvasThree").css("width"); //width from canvasThree.css
	var cssWidthSliced =	cssWidth.slice(0, -2); //slicing 'px' off
	var windowY = $(window).height(); //window height
	var canTop = Math.round($("#canvasThree").position().top); //canvas distance from top
	var canPad = $("#canvasThree").outerHeight(true) - $("#canvasThree").outerHeight(); //get padding value from canvas
	var allPad = (canTop + canPad); //~82px
	var breakHeight = windowY - allPad; //gives padding to new canvas height	//800-82
console.log($("#canvasThree"));

	//4:3 Canvas Size http://andrew.hedges.name/experiments/aspect_ratio/
	(function fourThree() {
		/*4:3 Variables, 1.33*/
		var maxHeight = Math.round((maxWidth/4)*3); //formula for 4:3 height
		var minHeight = Math.round((breakHeight)*1.33);	//formula for 4:3 height

		if (breakHeight < maxHeight){
			$("#canvasThree").css({"height": breakHeight, "width": minHeight});
				HEIGHT = breakHeight;
				WIDTH = minHeight;
		} else {
			$("#canvasThree").css({"width": "100%", "height": maxHeight});
		    HEIGHT = maxHeight;
				WIDTH = cssWidthSliced;
		}
		/*16:9 Variables 1.77*/
	}());
}
