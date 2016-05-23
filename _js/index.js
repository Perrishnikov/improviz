/* ------------------------- VARIABLES --------------------------- */
var isPopup = false;

/* -------------------------- READY ------------------------------- */
$(document).ready(function(){
	$('body').append().spin({ lines: 10, length: 24, width: 8, radius: 24 }); //http://fgnass.github.io/spin.js/
	getImages();
	loadSketchfab();
});

/* -------------------------- RESIZE ------------------------------ */
$(window).resize(function(){
	collagePlus();

	if (isPopup) {
		object.sizeDiv();
		object.sizeImage();
	}
});

/* ------------------------- FUNCTIONS ---------------------------- */

function getImages() {
	var folder = "_images/";
	var imageArray = [];
	$.ajax({
		url : "_images/",
		success: function (data) {
			$(data).find("a").attr("href", function (index, val) {

				if( val.match(/\.(jpe?g|png|gif)$/) ) {
					imageArray.push("<img src='" + folder + val + "'>");
				}
			});
		},
		complete: function (){
			$('.Collage').append(imageArray);
			$('.container').imagesLoaded( function() { //https://github.com/desandro/imagesloaded
				$('.Collage').removeWhitespace();
				collagePlus();
				$('body').spin(false);
			});
		}
	});
}

function collagePlus() {
	$('.Collage').collagePlus( {
        'targetHeight': 300, //The ideal height you want your row to be. It won't set it exactly to this as plugin adjusts the row height to get the correct width
        'fadeSpeed': "slow", //how quickly you want images to fade in once ready can be in ms, "slow" or "fast" This is only used in the default fade in effect. Timing of the other effects is controlled in CSS
        'effect': 'effect-6', //which effect you want to use for revealing the images (note CSS3 browsers only), Options are effect-1 to effect-6 but you can also code your own Default is the safest option for supporting older browsers
        'direction': 'horizontal', //vertical: effects applied per row to give the impression of descending appearance horizontal: effects applied in order of appearance in the row to give a horizontal appearance
        'allowPartialLastRow': true //Sometimes there is just one image on the last row and it gets blown up to a huge size to fit the parent div width. To stop this behaviour, set this to true
        }
    );
}

var object = { //object to hold DIV and image
	naturalHeight: "null",
	naturalWidth: "null",
	bigAspect: "null",
	smallAspect: "null",
	winWidth: "null",
	winHeight: "null",
	imageSrc: "null",

	setDimensions: function (w,h,s) { //initial click setup for variables, DIV, and image
		object.naturalHeight = h; //496W * 360H,
		object.naturalWidth = w;
		object.imageSrc = s;
		object.bigAspect = Math.round((w/h)*100)/100;
		object.smallAspect = (1/object.bigAspect).toFixed(2);

		(function(){ //create DIV and image and append them to DOM
			var newDiv = $('<div id="popup"></div>');
			$('body').prepend(newDiv);
			object.sizeDiv();

			var popImage = $('<img src= "' + s + '">');
			$('#popup').append(popImage);
			object.sizeImage();
		})();

		// console.log("natural height: " + naturalHeight + " natural width: " + naturalWidth);
		// console.log("big aspect: " + bigAspect + " smallAspect: " + smallAspect);
		// console.log("winWidth: " + winWidth + " winHeight: " + winHeight);
		// console.log("bigAspect: " + bigAspect + "smallAspect: " + smallAspect);
	},

	sizeDiv: function(){ //size DIV
		var w = $(window).outerWidth();
		var bh = $('body').height();
		var wh = $(window).height();
		var h = Math.max(bh,wh); //choose larger of window or body height
		$('#popup').css({width: w, height: h });
	},

	sizeImage: function () { //size the image
		var winWidth = $(window).width();
		var winHeight = ($(window).height());
		var height = "null";
		var width = "null";

		if (object.naturalWidth >= winWidth){	//if image is wider than window, use image width
			width = winWidth;
			height = Math.round(width * object.smallAspect);
			updateImage();
			// console.log("too wide");

		} else if (object.naturalHeight > winHeight){ //if image is taller than window, dont worry about it
			height = object.naturalHeight;
			width = Math.round(height * object.bigAspect); //or naturalWidth
			updateImage();
			// console.log("too tall");

		} else if (winWidth <= object.naturalWidth){ //if window is narrower than image, use window width
			width = winWidth;
			height = Math.round(width * object.smallAspect);
			updateImage();
			// console.log("too skinny");
		}
		else { //if the image fits, dont worry about it
			width = object.naturalWidth;
			height = object.naturalHeight;
			updateImage();
			// console.log("just right");
		}

		function updateImage(){
			var screenXCenter = $(window).width()/2;	//find middle of screen X
			var imageXCenter = width/2; //find middle of image X
			var formulaX = screenXCenter - imageXCenter; //location to place image in screen center X
			var scrollTopOnClick = $(document).scrollTop()	//top of window

			$('#popup img').css({width: width, height: height, marginLeft: formulaX, marginTop: scrollTopOnClick });
		}
	}
}

function loadSketchfab() { //load sketchfab images //https://sketchfab.com/developers/oembed //http://oembed.com//
	var sketchArray = [
		"https://sketchfab.com/oembed?url=https://sketchfab.com/models/255dc96cb1a24355bbc267ca5b71bab1",//tooth
		"https://sketchfab.com/oembed?url=https://sketchfab.com/models/33c0d994fbc24e978c49f2fe201d7e29",//60 unit
		"https://sketchfab.com/oembed?url=https://sketchfab.com/models/a15240420f884e4f80c28af33a342459",//lantern
		"https://sketchfab.com/oembed?url=https://sketchfab.com/models/ca2023f1ac6d4d34b902043bbade5aec",//mandibular
	];

	for (var i = 0; i < sketchArray.length; i++) {
		var updatedSketch = sketchArray[i];

		$.get(updatedSketch, function( data ) {
			var a = data.html;
			var b = '<div class="col-xs-12 col-sm-6 sketchfab">' + a + '</div>';
			$( "#sketch .row" ).append(b);
		});
	}
}

//============================== Click ======================================//
$(window).click(function(e) { //click image for popup

	if (e.target.tagName === 'IMG' && isPopup === false) {
		var w = e.target.naturalWidth;
		var h = e.target.naturalHeight; //496W * 360H,
		var s = e.target.src;
		isPopup = true;
		e.preventDefault();

		object.setDimensions(w, h, s);

	} else if (isPopup){
		isPopup = false;
		$('#popup').remove();

	} else {
		// console.log("no problem");
	}
});

$(window).keydown(function(e) {  //remove popup window with esc keydown
	if ( e.which == 27 ) {
		isPopup = false;
		$('#popup').remove();
	}
});
