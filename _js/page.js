// NO SCROLL  ON MOBILE

/* ---------- VARIABLES --------- */
var WIDTH, HEIGHT;// Global so threejs can access

/* ---------- READY ---------- */
$(document).ready(function(){
	selectAspect();		//sets initial aspect ratio from "active" button
	load3js();		//script3.js
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

	$("#toggleAspect button").click(function() {	//on button click, update the ACTIVE status and value
		aspectRatio = this.id;	//assign id value 1.77, 1.33, or "full"
		$("#toggleAspect button").removeClass("active"); 	  // remove "active" classes from all
		$(this).addClass("active");		// add "active" class to the one we clicked
		// console.log("Onclick: " + Number(aspectRatio));
		resizeCanvas(aspectRatio);	//sets new ratio on button click //convert to number from string
	});

	resizeCanvas(aspectRatio);	//only sets inital ratio //4.3 //convert to number from string
	console.log("Initial: " + aspectRatio);
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
	// console.log(aR);
	updateDashboard();

	if ($.isNumeric(aR)){
		dataStore.lastNumber = aR;
		dataStore.activeAspect = aR;
		dataStore.formula(aR);
		numericalAspect();
	} else if (aR == "resize" && dataStore.activeAspect != "fullsize"){
		dataStore.activeAspect = dataStore.lastNumber;
		numericalAspect();
	} else if (aR == "full" || dataStore.activeAspect == "fullsize"){
		dataStore.activeAspect = "fullsize";
		fullsizeAspect();
	} else {
		console.log("Aspet Ratio is not valid");
	}

	function numericalAspect(){ //set aspect ratio to preset value
		var maxWidth = $('#baseline').width();
		var minHeight = ($(window).height()) - 60; //300 breakHeight //if maxheight is too small, break maxWidth to minWidth
		var maxHeight = Math.round(maxWidth * dataStore.otherAspect);
		var minWidth = Math.round(minHeight * dataStore.activeAspect);

		if (minHeight < maxHeight) {	//primary resizing work
			$("#div3").css({"height": minHeight, "width": minWidth});
				HEIGHT = minHeight;
				WIDTH = minWidth;
				// console.log("if HEIGHT " + HEIGHT + "-WIDTH " + WIDTH);
		}
		else {	//kicks in on small size y movements
			$("#div3").css({"height": maxHeight, "width": maxWidth});
				HEIGHT = maxHeight;
				WIDTH = maxWidth;
				// console.log("else HEIGHT " + HEIGHT + "-WIDTH " + WIDTH);
		}
	}
	function fullsizeAspect() {	//set aspect ratio to window size
		HEIGHT = $(window).height() - 60;
		WIDTH = $(window).width();
		$("#div3").css({"height": HEIGHT, "width": WIDTH});
	}
}
