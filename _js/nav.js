//navbar
$('body').prepend(" \
	<nav class='navbar navbar-inverse navbar-fixed-top'> \
		<div class='container'> \
			<ul class='nav navbar-nav navbar-left'> \
				<li class='lead'><a href='index.html'>ImproViz</a></li> \
				<li class='dropdown'><a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button'> 3D <span class='caret'></span></a> \
					<ul class = 'dropdown-menu'> \
					<!-- <li class='dropdown-header'><a>The 3d stuff</a></li> --> \
					<li><a href='3d_Cube.html'>3d Cube</a></li> \
					<li class= 'divider'></li> \
					<!-- <li><a href='3d_Cube.html'>3d Cube</a></li> --> \
					</ul> \
				</li> \
				<li><a href='contact.html'>Contact</a></li> \
			</ul> \
			<ul class='nav navbar-nav navbar-right'> \
				<li class='open' style='display: none' id='menu'><a href = '#' class='dropdown-toggle' data-toggle='dropdown' role='button'>Menu <b class= 'caret'></b></a> \
					<ul class ='dropdown-menu'> \
						<li class='dropdown-header'><a>View Info</a></li> \
						<li><a>Aspect Ratio: </a></li> \
							<div class='btn-group btn-group-justified' id='toggleAspect'> \
								<div class='btn-group' role='button'> \
								<button class='btn btn-default' id='1.33'>4:3</button> \
								</div> \
								<div class='btn-group' role='button'> \
								<button class='btn btn-default' id='1.77'>16:9</button> \
								</div> \
								<div class='btn-group' role='button'> \
								<button class='btn btn-default active' id='full'>Full</button> \
								</div> \
							</div> \
						<li class='divider'></li> \
						<li><a id='aspect'>Aspect Ratio: <span></span></a></li> \
						<li><a id='div3Width'>div3 Width: <span></span></a></li> \
						<li><a id='div3Height'>div3 Height: <span></span></a></li> \
						<li class='divider'></li> \
						<li><a id='windowWidth'>Window Width: <span></span></a></li> \
						<li><a id='windowHeight'>Window Height: <span></span></a></li> \
						<li><a id='baselineWidth'>Baseline Width: <span></span></a></li> \
					</ul> \
				</li> \
			</ul> \
		</div> \
	</nav> \
");
