/* ---------- VARIABLES --------- */
var isPopup = false;

/* ---------- READY ---------- */
$(document).ready(function(){
	$('.Collage').removeWhitespace().collagePlus();
	$('.Collage').collagePlus( {
            /*
             * The ideal height you want your row to be. It won't set it exactly to this as
             * plugin adjusts the row height to get the correct width
             */
            'targetHeight'    : 300,

            /*
             * how quickly you want images to fade in once ready can be in ms, "slow" or "fast"
             * This is only used in the default fade in effect. Timing of the other effects is
             * controlled in CSS
             */
            'fadeSpeed'       : "slow",

            /*
             * which effect you want to use for revealing the images (note CSS3 browsers only),
             * Options are effect-1 to effect-6 but you can also code your own
             * Default is the safest option for supporting older browsers
             */
            'effect'          : 'effect-6',

            /*
             * vertical: effects applied per row to give the impression of descending appearance
             * horizontal: effects applied in order of appearance in the row to give a horizontal appearance
             */
            'direction'       : 'horizontal',

            /*
            * Sometimes there is just one image on the last row and it gets blown up to a huge size to fit the
            * parent div width. To stop this behaviour, set this to true
            */
            'allowPartialLastRow'       : true
        }
    );
});


/* ---------- RESIZE ---------- */
$(window).resize(function(){
	$('.Collage').collagePlus( {
			'targetHeight'    : 300,
			'fadeSpeed'       : "slow",
			'effect'          : 'effect-6',
			'direction'       : 'horizontal',
			'allowPartialLastRow'       : true
		}
	);

	if (isPopup) {
		object.sizeDiv();
		object.sizeImage();
	}
});


/* ------------------------- FUNCTIONS ---------------------------- */

(function revealMenu() {	//reveal Menu button (starts hidden in html)
	$(window).keydown(function(event) {
		if ( event.which == 77 ) {
			$("#menu").toggle()
			event.preventDefault();
		}
	});
}());

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
		var h = $('body').height();
		$('#popup').css({width: w, height: h });
	},

	sizeImage: function () { //size the image
		var winWidth = $(window).width();
		var winHeight = ($(window).height()) - 60;
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
			var screenCenter = $(window).width()/2;	//find middle of screen
			var imageCenter = width/2; //find middle of image
			var formula = screenCenter - imageCenter; //location to place image in screen center
			$('#popup img').css({width: width, height: height, marginLeft: formula });
		}
	}
}

$(window).click(function(e) {

	if (e.target.tagName === 'IMG' && isPopup === false) {
		var w = e.target.naturalWidth;
		var h = e.target.naturalHeight; //496W * 360H,
		var s = e.target.src;
		isPopup = true;

		object.setDimensions(w, h, s);

	} else if (isPopup){
		isPopup = false;
		$('#popup').remove();

	} else {
		console.log("we have a problem");
	}
});
