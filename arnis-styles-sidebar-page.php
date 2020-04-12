<?php
/**
* Template Name: Arnis Style - Sidebar Template
* Template Post Type: arnis_system
*/

?>
<!DOCTYPE html>
<html>
<head>

    <meta charset="UTF-8">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">


    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri();?>/assets/css/bootstrap.min.css"/>
	
	<link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri();?>/assets/css/xx-home.css"/>
	<link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri();?>/assets/css/xx-arnis-style.css"/>

	<!-- fontawesome -->
	<link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri();?>/assets/css/all.min.css"/>
	<link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri();?>/assets/css/fontawesome.css"/>
	


	
	<!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
	<title>BiomechArnis | Motion Capture of Filipino Martial Arts</title>
</head>
<body ng-app="arnisApp">
	
  	<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>

	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.9/angular.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.9/angular-sanitize.js"></script>

	<script src="https://viewer.marmoset.co/main/marmoset.js"></script>
	<script src="https://www.youtube.com/player_api"></script>


	<section class="container-fluid arnis-list-section h-100" ng-controller="arnisStyleController">
		
		<div class="row" style="height: 100vh; display: contents;">
			<div class="offset-2 col-8">
				<div class="list-navigation-container">
					<ul class="nav flex-row d-flex flex-row justify-content-center">
						<li class="nav-item" ng-click="view2D($event)">
							2D
						</li>
						<li class="nav-item active" ng-click="view3D($event)">
							3D
						</li>
						<li class="nav-item" ng-click="viewSideBySide($event)">
							SideBySide
						</li>
					</ul>		
				</div>
				<div class="carousel-container">
					<div class="carousel">

						<!-- id="vidOneContainer" -->
						<div class="videoContainer viewer viewer_8 btm-shadow">
							<!-- {{arnisInfo.vidOneID}} -->
							<iframe width="350px" height="300px" class="videoContainer_video" ng-src="{{trustSrc(arnisInfo.vidOneSrc)}}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
						</div>
						<div class="viewer viewer_1 btm-shadow">
							<div class="marmosetContainer"></div>
						</div>
						<div class="videoContainer viewer viewer_2 btm-shadow">
							<!-- <iframe width="350px" height="300px" src="https://www.youtube.com/embed/_S-8MeQmC4o?rel=0;controls=0;showinfo=0;theme=light;modestbranding=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
							<iframe width="350px" height="300px" class="videoContainer_video" ng-src="{{trustSrc(arnisInfo.vidTwoSrc)}}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
						</div>
					</div>
				</div>
			  	<div class="carousel-left-btn float-left">
					<h1 class="left-arnis">
						<i class="fas fa-angle-double-left" ng-click="prevViewer()"></i>
					</h1>
				</div>

				<div class="carousel-right-btn float-right">
					<h1 class="next-arnis">
						<i class="fas fa-angle-double-right" ng-click="nextViewer()"></i>
					</h1>
				</div>
				<div class="floor-container d-flex flex-row align-items-center">
		  			<svg id="grid-floor" width="100%" height="100%" xml	ns="http://www.w3.org/2000/svg">
					    <defs>
					      <pattern id="smallGrid" width="22" height="22" patternUnits="userSpaceOnUse">
					        <path d="M 22 0 L 0 0 0 22" fill="none" stroke="rgba(0, 0, 0, 1)" stroke-width="2" />
					      </pattern></defs>
					    <rect width="100%" height="100%" fill="url(#smallGrid)" />
					</svg>	
		  		</div>

		  		<div class="arnis-form-container d-flex flex-row justify-content-around">

		  			<p>Form: {{arnisInfo.title}}</p>
		  			<p>Model</p>
		  			
		  		</div>
		  		

			</div>
			
		</div>

		<!-- <div class="page-navigation-container d-flex flex-row align-items-end">
			<span class="btn nav-left"><i class="fas fa-long-arrow-alt-left"></i></span>
			<span class="btn nav-right"><i class="fas fa-long-arrow-alt-right"></i></span>
		</div> -->

		<span ng-click="prevPage()" class="back-icon-container">
			<i class="fas fa-arrow-circle-left"></i>
		</span>

		<span ng-click="showArnisInfo()" class="info-icon-container">
			<i class="fas fa-question-circle"></i>
			
		</span>


		<div class="arnis-style-info-container custom-modal"> <!-- modal background -->
			<div class="custom-modal-content row">
				<aside class="info-sidebar col-3">
					<h3>{{arnisSystem.title}}</h3>
					<img class="img-fluid " ng-src="{{arnisSystem.thumbnail}}">

					<ul class="sidebar-nav nav flex-column">
	                    <li class="nav-item"> <a href="#about-the-style">About the Style</a></li>
	                    <li class="nav-item"> <a href="#grandmaster">Grandmaster</a></li>
	                    <li class="nav-item"> <a href="#about-the-system">About the System</a></li>
	                </ul>
				</aside>
				

				<article class="info-content p-5 col-9 d-flex justify-content-between">
					<div class="container-fluid d-flex h-100">
						<!-- <div class="row" style="display: flex;">
							<div class="offset-11 col">
								hey
							</div>
						</div> -->
						<div class="row justify-content-center align-self-center">
							<div class="col-11">
								 <!-- class="d-flex flex-column align-self-center -->
								<div id="about-the-style"">
									<img class="img-fluid mb-2" ng-src="{{arnisInfo.thumbnail}}">
									<p ng-bind-html="arnisInfo.content.rendered"></p>
								</div>
								<hr>
								<div id="grandmaster">
									<img class="img-fluid mb-2" ng-src="{{arnisInfo.grandmasterImg}}">
									<p>{{arnisInfo.acf.grandmaster_name[0]}}</p>
									<p>{{arnisInfo.acf.about_grandmaster[0]}}</p>
									<!-- <p ng-bind-html="arnisInfo.content.rendered"></p> -->
								</div>
								<hr>
								<div id="about-the-system">
									<p ng-bind-html="arnisSystem.content.rendered"></p>
								</div>
							</div>
							<div class="col-1">
								<span class="close" ng-click="hideArnisInfo()">&times;</span>
							</div>
						</div>
					</div>
				</article>

			</div>
		</div>

	</section>

	




	



	
	<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri();?>/assets/js/xx-arnis-show-info.js"></script>

	<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri();?>/assets/js/arnis-style-controller.js"></script>




	


	</body>
</html>



