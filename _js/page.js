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
            'targetHeight'    : 400,

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
			'targetHeight'    : 400,
			'fadeSpeed'       : "slow",
			'effect'          : 'effect-6',
			'direction'       : 'horizontal',
			'allowPartialLastRow'       : true
		}
	);
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

$(window).click(function(e) {

	if (e.target.tagName === 'IMG' && isPopup === false) {

		var imageSrc = e.target.src;
		var height = e.target.naturalHeight; //496W * 360H,
		var width = e.target.naturalWidth;

		var newDiv = $('<div/>', { id:'popup'});
		$('#baseline').prepend(newDiv);

		var popImage = $('<img src= "' + imageSrc + '" style="width: ' + width + 'px; height: ' + height + 'px">');
		$('#popup').append(popImage);

		isPopup = true;

	} else if (isPopup){
		$('#popup').remove();
		isPopup = false;
	}
}); // click event


// e.target.click(function()) {
// 	var myNode = d.target.parentNode.querySelector('div.preview');
// 	myNode.parentNode.removeChild(myNode);
// 	e.target.removeEventListener('mouseout', handler, false);
// }, false);
