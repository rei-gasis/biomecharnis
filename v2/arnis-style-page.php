<?php
/**
* Template Name: Arnis Style Page
* Template Post Type: arnis_system
 */

?>
<!DOCTYPE html>
<html>
 <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> 
    

    <title>BiomechArnis</title>

	<title></title>
	
	<link href="<?php echo get_stylesheet_directory_uri()?>/assets/css/bootstrap.min.css" rel="stylesheet"/>

	

	<script src="<?php echo get_stylesheet_directory_uri()?>/assets/js/popper.js"></script>
	<script src="<?php echo get_stylesheet_directory_uri()?>/assets/js/jquery.min.js"></script>
	<script src="<?php echo get_stylesheet_directory_uri()?>/assets/js/bootstrap.min.js"></script>
	<script src="<?php echo get_stylesheet_directory_uri()?>/assets/js/marmoset.js"></script> 
	<!-- <script src="https://viewer.marmoset.co/main/marmoset.js"></script> -->

	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.9/angular.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.9/angular-sanitize.js"></script>
	


	<link href="<?php echo get_stylesheet_directory_uri()?>/assets/css/main.css" rel="stylesheet" type="text/css"/>
	<!-- <link href="<?php echo get_stylesheet_directory_uri()?>/assets/css/carousel.css" rel="stylesheet" type="text/css"/> -->
	<link href="<?php echo get_stylesheet_directory_uri()?>/assets/css/footer.css" rel="stylesheet" type="text/css"/>
	<link href="<?php echo get_stylesheet_directory_uri()?>/assets/css/all.min.css" rel="stylesheet" type="text/css"/>
	





</head>
<body ng-app='arnisApp' ng-controller='arnisStyleController'>	
		<?php get_template_part('template-parts/navbar'); ?>

		<div class="container-fluid p-5">
				<section id="arnis-style">
					<div class="row">
						<div class="offset-md-1 col-md-10 col-12">
							<ul class="nav nav-tabs justify-content-around">
							  <li id="dropdown-view" class="nav-item dropdown ">
							    <a class="nav-link active dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">View</a>
							    <div class="dropdown-menu">
							      <a class="dropdown-item active" data-toggle="tab" href="#mocap" ng-click="selectedTab='3D MoCap'">3D MoCap</a>
							      <a class="dropdown-item" data-toggle="tab" href="#actual" ng-click="selectedTab='2D'">2D</a>
							      <a class="dropdown-item" data-toggle="tab" href="#compare" ng-click="selectedTab='Side By Side'">Side by Side</a>
							    </div>
							  </li>
							 <li class="nav-item d-none d-sm-block"">
							    <span class="nav-link">{{ arnisInfo.title }}</span>
							  </li>
							  <li class="nav-item d-none d-sm-block"">
							    <span class="nav-link viewer-tag">{{ selectedTab }}</span>
							  </li>
							</ul>		
						</div>
					</div>
					<div class="row">
						<div class="col-1 d-none d-md-block">
							<div class="centered">
								<div class="viewer-button left">
									<span><i class="fa fa-caret-left"></i></span>
								</div>
							</div>
						</div>
						<div class="col-md-10 col-12">
							<div class="tab-content">
								<div id="mocap" class="tab-pane fade show active" role="tabpanel" aria-labelledby="home-tab">
									<div class="marmosetContainer"></div>
								</div>

								<div id="actual" class="tab-pane fade" role="tabpanel" aria-labelledby="home-tab">
									<div class="videoContainer viewer">
										<!-- {{ arnisInfo.vidOneSrc }} -->
										<iframe width="100%" height="450px" class="videoContainer_video" 
											ng-src="{{ trustSrc(arnisInfo.vidOneSrc) }}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
										}
									</div>
								</div>

								<div id="compare" class="tab-pane fade" role="tabpanel" aria-labelledby="home-tab">
									<div class="videoContainer viewer">
										<iframe width="100%" height="450px" class="videoContainer_video" ng-src="{{trustSrc(arnisInfo.vidTwoSrc)}}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
									</div>
								</div>
							</div>
						</div>
						<div class="col-1 d-none d-md-block">
							<div class="centered">
								<div class="viewer-button right">
									<span><i class="fa fa-caret-right"></i></span>
								</div>
							</div>
						</div>
					</div>
					<div class="row mt-3">
						<div class="offset-md-1 col-md-4 col-12">
							<h3>
								{{ arnisInfo.title }}
							</h3>

			    			<p ng-bind-html="arnisInfo.content.rendered"></p>
							
							<h1 class="group-title my-3">Arnisador
								<div class="underline mt-1"></div>
							</h1>
							<div class="col-8 mb-1" style="padding: 0px !important">
								<img ng-src="{{ arnisInfo.grandmasterImg }}" class="img-fluid"/>	
							</div>
							<p ng-bind-html="arnisInfo.acf.about_grandmaster[0]"></p>
							
							
							
							
						</div>
						<div class="col-md-6 col-12 border-left">
							<h5 style="width: 50%" class="group-title">Other Styles
								<div class="underline mt-2"></div>
							</h5>
							<ul class="list-group arnis-style-list mt-1">
								<li class="list-group-item arnis-style-item" ng-repeat="arnisStyle in relatedStyles">

									<a href="{{ arnisStyle.link }}">
										<div class="row" style="margin-left: 0px !important; margin-right: 0px !important">
											<div class="video-container col-6">
												<!-- onmouseenter="playToggle(this)" -->
												<video poster="{{ arnisStyle.preview_mocap ? '' : '<?php echo get_stylesheet_directory_uri()?>/assets/images/video-placeholder1.png?>' }}" muted loop onmouseenter="playToggle(this)" onmouseleave="playToggle(this)"
													<source ng-src="{{ arnisStyle.preview_mocap }}" type="video/webm">
												</video>	
											</div>
											<div class="col-6">
												<div class="info p-2">
													<h6 class="title">
														{{ arnisStyle.title }}
													</h6>
													<!-- <p class="description">
														{{arnisStyle. }}
													</p> -->
													<div class="description fade">
														<p ng-bind-html="arnisStyle.content.rendered"></p>
													</div>
													
												</div>
											</div>	
										</div>	
									</a>
								</li>
								<!-- <li class="list-group-item arnis-style-item">
									<a href="#">
										<div class="row" style="margin-left: 0px !important; margin-right: 0px !important">
											<div class="video-container col-6">
												<!-- onmouseenter="playToggle(this)" -
												<video muted loop onmouseenter="playToggle(this)" onmouseleave="playToggle(this)">
													<source src="<?php echo get_stylesheet_directory_uri()?>/assets/images/lee_wood_museum.mp4" type="video/mp4">
												</video>	
											</div>
											<div class="col-6">
												<div class="info p-2">
													<h6 class="title">
														13 Counts
													</h6>
													<p class="description">
														Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniamsda
														eiusmod tempor I
														ncididunt ut labore et dolore magna 
														aliqua. Ut enim ad minim veniamsda
													</p>
												</div>
											</div>	
										</div>	
									</a>
									
								</li> -->
								
							</ul>
						</div>
					</div>

				</section>
		</div>
		<?php get_template_part('template-parts/footer'); ?>
		
	
	<!-- <script src="<?php echo get_stylesheet_directory_uri()?>/assets/js/marmoset.js"></script>	 -->
	<script src="<?php echo get_stylesheet_directory_uri()?>/assets/js/main.js"></script>
	<!-- <script src="<?php echo get_stylesheet_directory_uri()?>/assets/js/arnis-style.js"></script> -->
	<script src="<?php echo get_stylesheet_directory_uri()?>/assets/js/arnis-controller.js"></script>


	<script type="text/javascript">
			$().ready(()=>{

				
				// $linkArnisSystem = $("a[href='#arnis-systems']")
				// $linkAboutTheProject = $("a[href='#about-the-project']")
				// $mainCarousel = $('#mainCarousel')
				// // console.log($mainCarousel[0])
				// // $mainCarousel.carousel()

				// $linkArnisSystem.on('click', () => {
				// 	$mainCarousel.carousel(0)
				// })

				// $linkAboutTheProject.on('click', () => {
				// 	$mainCarousel.carousel(1)
				// })
				
			})
		</script>
</body>
</html>