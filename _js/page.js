/* ---------- VARIABLES --------- */
var WIDTH = $('#black').innerWidth(); // DONT USE TARGET DIV, use empty div container
var HEIGHT = (WIDTH/4)*3; //Global so threejs can access

/* ---------- READY ---------- */
$(document).ready(function(){
	sizeCanvas();
	load3js();


});

/* ---------- RESIZE ---------- */
$(window).resize(function(){
	sizeCanvas();
});

/* ----------- FUNCTIONS --------- */
function sizeCanvas(){
 	/*Canvas Variables*/
	var presentRatio = Math.round(WIDTH/HEIGHT*100)/100;
	
	var maxWidth = $('#black').innerWidth(); //width of // DONT USE TARGET DIV, use empty div container
	var cssHeight = $("#div3").css("height"); //height from div3.css     starts at 0px
	var cssHeightSliced =	cssHeight.slice(0, -2); //slicing 'px' off
	var cssWidth = $("#div3").css("width"); //width from div3.css   //same as maxWidth, with px
	var cssWidthSliced =	cssWidth.slice(0, -2); //slicing 'px' off
	var windowY = $(window).height(); //window height
	var canTop = Math.round($("#div3").position().top); //canvas distance from top
	var canPad = $("#div3").outerHeight(true) - $("#div3").outerHeight(); //get padding value from canvas
	var allPad = (canTop + canPad); //~82px
	var breakHeight = windowY - allPad; //gives padding to new canvas height	//800-82

	$("#resolution span").text(presentRatio);//add presentRation to DOM Menu

	// select Resolution //
	$(function() {
	   $("#toggleResolution button").click(function() {
		  // remove classes from all
		  $("button").removeClass("active");
		  // add class to the one we clicked
		  $(this).addClass("active");

		  if(this.innerHTML == "16:9"){
			  sixteenNine();
		  } else if (this.innerHTML == "4:3") {
			  fourThree();
		  } else {
			  alert("error");		  }
	   });
	});

	fourThree();

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
			$("#div3").css({"width": "100%", "height": maxHeight});
		    	HEIGHT = maxHeight;
				WIDTH = cssWidthSliced;
		}
	}
}
