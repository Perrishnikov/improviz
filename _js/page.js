/* ---------- VARIABLES --------- */


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

/* ------------------------- FUNCTIONS ---------------------------- */

(function revealMenu() {	//reveal Menu button (starts hidden in html)

	$(window).keydown(function(event) {
		if ( event.which == 77 ) {
			$("#menu").toggle()
			event.preventDefault();
		}
	});
}());
