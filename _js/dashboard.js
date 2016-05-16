// ========================== dashboard ============================ //

    $(window).keydown(function(event) {
        if ( event.which == 77 ) {
            $("#menu").toggle()
            $("#menu").attr('class', 'open'); //automatically opens menu
        }
    });


function updateDashboard(){		//sends info to menu panel

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
