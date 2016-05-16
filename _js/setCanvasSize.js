/* ----------------------- GLOBAL VARIABLES -------------------------------- */
var scene = "null";
var camera = "null";
var renderer = "null";
var WIDTH, HEIGHT; // Global so threejs can access

{/* ----------------------------- READY ------------------------------------ */
$(document).ready(function(){
	selectAspect();		//sets initial aspect ratio from "active" button
});

/* ------------------------------ RESIZE ----------------------------------- */
$(window).resize(function(){
	resizeCanvas("resize");
	updateDashboard();	//DOM dashboard
	camera.aspect = WIDTH / HEIGHT;
	// camera.updateProjectionMatrix();
	// renderer.setSize( WIDTH, HEIGHT );
});

/* ------------------------- FUNCTIONS ---------------------------- */
$("#toggleAspect button").click(function() {	//on button click, update the ACTIVE status and value
	camera.aspect = WIDTH / HEIGHT;
	// camera.updateProjectionMatrix();
	// renderer.setSize( WIDTH, HEIGHT );
});

function selectAspect() {	//button click event for 16:9 and 4:3 toggles "active"
	var aspectRatio = $("#toggleAspect .active").attr('id');	//set inital aspect ratio on ready

	$("#toggleAspect button").click(function() {	//on button click, update the ACTIVE status and value
		aspectRatio = this.id;	//assign id value 1.77, 1.33, or "full"
		$("#toggleAspect button").removeClass("active"); 	  // remove "active" classes from all
		$(this).addClass("active");		// add "active" class to the one we clicked
		// console.log("Onclick: " + Number(aspectRatio));

		resizeCanvas(aspectRatio); //sets new ratio on button click //convert to number from string

	});

	resizeCanvas(aspectRatio);	//only sets inital ratio //4.3 //convert to number from string
	// console.log("Initial: " + aspectRatio);
};

/* ------- Data Store ----------- */
var dataStore = {
	lastNumber: "null",
	activeAspect: "null",
	otherAspect: "null",
	formula: function(x){
		dataStore.otherAspect = (1/x).toFixed(2)}
		// console.log(dataStore.lastNumber);}
}

/* --------Resize Cavas ------------ */
function resizeCanvas(aR){ //resizes the canvas on initialize and click
	// console.log(aR);
	updateDashboard();

	if ($.isNumeric(aR)){	//if parameter is a number, do this (1.77 and 1.33)
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
		var minHeight = ($(window).height()) - 60; //margin from top for navbar
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
}}
