<?php
/**
* Template Name: Arnis System Page
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
	
	<link href="<?php echo get_stylesheet_directory_uri()?>/assets/css/bootstrap.min.css" rel="stylesheet"/>

	

	<script src="<?php echo get_stylesheet_directory_uri()?>/assets/js/popper.js"></script>
	<script src="<?php echo get_stylesheet_directory_uri()?>/assets/js/jquery.min.js"></script>
	<script src="<?php echo get_stylesheet_directory_uri()?>/assets/js/bootstrap.min.js"></script>
	<script src="<?php echo get_stylesheet_directory_uri()?>/assets/js/marmoset.js"></script> 

	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.9/angular.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.9/angular-sanitize.js"></script>

	<!-- <script src="https://viewer.marmoset.co/main/marmoset.js"></script> -->
	


	<link href="<?php echo get_stylesheet_directory_uri()?>/assets/css/main.css" rel="stylesheet" type="text/css"/>
	<link href="<?php echo get_stylesheet_directory_uri()?>/assets/css/arnis-system.css" rel="stylesheet" type="text/css"/>
	<link href="<?php echo get_stylesheet_directory_uri()?>/assets/css/footer.css" rel="stylesheet" type="text/css"/>
	<link href="<?php echo get_stylesheet_directory_uri()?>/assets/css/all.min.css" rel="stylesheet" type="text/css"/>
	
	
</head>
<body ng-app="arnisApp" ng-controller="arnisListController">
		<?php get_template_part('template-parts/arnis-system-navbar') ?>


		<div class="container-fluid p-5">
			<!-- <div class="container my-5" > -->
				<section id="arnis-system">
					<div class="row">
						<div class="col-md-7 col-12" style="clip-path: polygon(2% 0, 95% 0, 95% 100%, 2% 100%);">
							<div style="width: 100%;">
								<h1 class="section-title mb-5 ml-4">Arnis Systems
									<div class="underline mt-1"></div>
								</h1>
							</div>
							<div class="carousel-container">
								<!-- <div style="height: 30px">
									<span class="arnis-system-info-modal-btn"><i class="fa fa-eye" aria-hidden="true"></i></span>
								</div> -->
							    <div class="carousel">
							    	<div class="carousel">
								      	<div class="viewer {{arnis.viewerClass}} btm-shadow light-border" ng-repeat="arnis in arnisList">
									      	<img class="img-fluid" ng-src="{{arnis.thumbnail}}"/>
									    </div>
								    </div>
							    	<!-- data-toggle="modal" data-target=".arnis-modal" -->
							      	<!-- <div class="viewer viewer_1 btm-shadow">
								      	<img class="img-fluid" src="<?php echo get_stylesheet_directory_uri()?>/assets/images/doce-pares-transparent-300x300.png"/>
								    </div>
									-->
							    </div>
						  	</div>
						  	<div class="carousel-nav justify-content-between">
						  		<button class="btn btn-default"><i class="fa fa-angle-left" aria-hidden="true"></i></button>
								<h3 class="text-center">
									{{slides[0].title}}
								</h3>
						  		<button class="btn btn-default"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
						  	</div>

						</div>
						<div id="arnis-style-list-section" class="col-md-5 col-12 border-left">
							<h5 style="width: 50%">Styles
								<div class="underline mt-2"></div>
							</h5>
							<ul class="list-group arnis-style-list mt-1">
								<li class="list-group-item arnis-style-item" ng-repeat="arnisStyle in arnisStyles">

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
									<a href="http://localhost/biomecharnis/arnis-style">
										<div class="row" style="margin-left: 0px !important; margin-right: 0px !important">
											<div class="video-container col-6">
												<!-- onmouseenter="playToggle(this)" 
												<video muted loop onmouseenter="playToggle(this)" onmouseleave="playToggle(this)">
													<source src="<?php echo get_stylesheet_directory_uri()?>/assets/images/doce.webm" type="video/webm">
												</video>	
											</div>
											<div class="col-6">
												<div class="info p-2">
													<h6 class="title">
														13 Counts
													</h6>
													<p class="description">
														Doce Pares is one of the most well-known styles in the world today, due to its presence in several countries such as the USA, UK, India, and so on. The name Doce Pares was chosen in reference to the 12 bodyguards of the emperor of France, Charlemagne.
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
			<!-- </div> -->
		</div>
		<?php get_template_part('template-parts/footer') ?>


		<div class="arnis-modal modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
		  <div class="modal-dialog modal-lg">
		    <div class="modal-content">
		    	<ul id="myTab" class="nav nav-tabs justify-content-around">
				  <li class="nav-item">
				    <a class="nav-link active" data-toggle="tab" href="#about-the-system">About the System</a>
				  </li>
				  <li class="nav-item">
				    <a class="nav-link" data-toggle="tab" href="#styles">Styles</a>
				  </li>
				  <!-- <li class="nav-item justify-content-end"> -->
				    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
				  <!-- </li> -->
				</ul>

		    	<div class="tab-content" id="myTabContent">
		    		<div id="about-the-system" class="tab-pane fade show active" role="tabpanel" aria-labelledby="home-tab">
		    			<div class="row">
		    				<div class="col-12 col-md-8">
								<h3>
									{{ slides[0].title }}
								</h3>
								<p ng-bind-html="slides[0].content.rendered"></p>
				    		</div>
				    		<div class="col-12 col-md-4 border-left">
				    			
								<h1 class="group-title mb-3">Onsite
									<div class="underline mt-1"></div>
								</h1>
								<img ng-repeat="image in slides[1]['onsiteImages']" ng-src="{{image}}" class="img-fluid mb-3"/>
				    		</div>
		    			</div>
			    		
			    	</div>

			    	<div id="styles" class="row tab-pane fade" role="tabpanel" aria-labelledby="home-tab">
			    		<div class="col-12">
			    			<h5 style="width: 50%" class="group-title">Styles
								<div class="underline mt-2"></div>
							</h5>
							<ul class="list-group arnis-style-list mt-1">
								<li class="list-group-item arnis-style-item">
									<a href="#">
										<div class="row" style="margin-left: 0px !important; margin-right: 0px !important">
											<div class="video-container col-6">
												<!-- onmouseenter="playToggle(this)" -->
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
									
								</li>
								<li class="list-group-item arnis-style-item">
									<div class="row" style="margin-left: 0px !important; margin-right: 0px !important">
										<div class="video-container col-6">
											<video muted loop onmouseenter="playToggle(this)" onmouseleave="playToggle(this)">
												<source src="<?php echo get_stylesheet_directory_uri()?>/assets/images/lee_wood_museum.mp4" type="video/mp4">
											</video>	
										</div>
										<div class="col-6">
											<div class="info p-2">
												<h6 class="title">
													14 Strikes
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
								</li>
							</ul>
			    		</div>
			    	</div>
		    	</div>
		    </div>
		  </div>
		</div>
		
	
	<!-- <script src="<?php echo get_stylesheet_directory_uri()?>/assets/js/marmoset.js"></script>	 -->
	<script src="<?php echo get_stylesheet_directory_uri()?>/assets/js/main.js"></script>
	<script src="<?php echo get_stylesheet_directory_uri();?>/assets/js/arnis-controller.js"></script>
	<!-- <script src="<?php echo get_stylesheet_directory_uri()?>/assets/js/arnis-style.js"></script> -->


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