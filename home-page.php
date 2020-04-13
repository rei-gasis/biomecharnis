<?php
/**
* Template Name: Home Page
 */

?>
<!DOCTYPE html>
<html>
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri();?>/assets/css/bootstrap.min.css"/>
	
	<link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri();?>/assets/css/xx-home.css"/>
	<link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri();?>/assets/css/xx-arnis-list.css"/>
	<!-- <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri();?>/assets/css/xx-scroll-page.css"/> -->
	
    
	
	<!-- fontawesome -->
	<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/> -->
	<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/regular.min.css">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous"> -->
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

	

	<div class="cube-container">
		<div id="sections">
			<section class="container-fluid home-section">
				<!-- <div class="row h-20" style="height: 20%; max-height: 20%;">
					
				</div> -->
				<article class="row h-100">
					<div class="bg-container">
						
					</div>
					
					<div class="mid-box offset-3 col-6">
						<div class="d-flex flex-column w-100 align-items-center">
							<div class="row py-3">
								<div class="col-3 d-flex align-self-center pl-4">
									<img class="img-fluid" src="<?php echo get_stylesheet_directory_uri();?>/assets/images/biomecharnis-logo.png"/>
								</div>
								<div class="col-9 d-flex flex-column align-self-center">
									<h1>BIOMECHARNIS</h1>
									<h5>Motion Capture of Filipino Martial Arts</h5>		
								</div>
							</div>

						</div>
					</div>
					
						
				</article>

				<div class="home-section-btn d-flex justify-content-center">
					<!-- <div class="col-12 d-flex justify-content-center"> -->
						<a class="nav-right" href="#what-is-biomecharnis"><span>Begin Learning</a>	
					<!-- </div> -->
					
				</div>
			</section> 


			<section class="container-fluid arnis-list-section" ng-controller="arnisListController">
				<div class="row page-navigation-container justify-content-between">
						<button class="nav-left">
						  <span data-title="PREV"><i class="fas fa-angle-left"></i></span>
						</button>

						<h1 class="page-title">Arnis Systems</h1>


						<button class=" nav-right">
						  <span data-title="NEXT"><i class="fas fa-angle-right"></i></span>
						</button>
				</div>
				<div class="row list-navigation-container justify-content-center">
					<ul class="nav flex-row">
						<li class="nav-item" ng-class="{active: $index==0}" ng-repeat="arnis in arnisList" ng-click="viewArnisSystemInfo(arnis, $event)">
							{{arnis.title}}
						</li>
					</ul>
				</div>
				<div class="row arnis-list-carousel-row">
					<div class="offset-2 col-8 clearfix">
						<div class="carousel-container">
						    <div class="carousel">
						      	<div class="viewer {{arnis.viewerClass}} btm-shadow" ng-repeat="arnis in arnisList">
							      	<img class="img-fluid" ng-src="{{arnis.thumbnail}}"/>
							    </div>
						    </div>
					  	</div>
					  	<div class="carousel-right-btn float-left">
							<h1 class="left-arnis">
								<i class="fas fa-angle-double-left" ng-click="prevArnis()"></i>
							</h1>
						</div>

						<div class="carousel-left-btn float-right">
							<h1 class="next-arnis">
								<i class="fas fa-angle-double-right" ng-click="nextArnis()"></i>
							</h1>
						</div>
						<div class="floor-container d-flex flex-row align-items-center">
				  			<!-- <div class="floor"> -->
				  				<svg id="grid-floor" width="100%" height="100%" xml	ns="http://www.w3.org/2000/svg">
								    <defs>
								      <pattern id="smallGrid" width="22" height="22" patternUnits="userSpaceOnUse">
								        <path d="M 22 0 L 0 0 0 22" fill="none" stroke="rgba(0, 0, 0, 1)" stroke-width="2" />
								      </pattern></defs>
								    <rect width="100%" height="100%" fill="url(#smallGrid)" />
								</svg>
								<!-- <img class="img-fluid" src="<?php echo get_stylesheet_directory_uri();?>/assets/images/checkered-1280x1280.jpg"> -->
							<!-- </div>	 -->
						</div>
					</div>
					
				</div>
				<div class="row arnis-list-container mt-3">
					<div class="offset-2 col-8 text-center">
						<div class="arnis-system-info-container carousel slide clearfix" data-interval="false" data-ride="carousel">
							<div class="arnis-system-info-header mb-1 d-flex justify-content-between">
								<div class="arnis-system-title">
									<!-- <h3>{{arnisSelected.title}}</h3> -->
									<h3>{{slides[0].title}}</h3>
								</div>
								<div class="arnis-system-info-nav btn-group">	
									<button class="btn btn-primary view-arnis-style" data-toggle="tooltip" data-placement="top" title="View"><a href="{{arnisSelected.GMData[0].link}}"><i class="fas fa-eye"></i></a></button>
									<button class="btn btn-primary arnis-system-info-prev"><i class="fas fa-arrow-left"></i></button>
									<button class="btn btn-primary arnis-system-info-next"><i class="fas fa-arrow-right"></i></button>
								</div>	
							</div>
							
						  <div class="carousel-inner text-center card bg-dark text-white py-2">
						  	<div class="carousel-item" ng-class="{active: $index==0}" ng-repeat="slide in slides">
						  		<div class="row" ng-if="$index==0">
						    		<div class="col-12">
						    			<p ng-bind-html="slide.content.rendered"></p>
						    		</div>
						    	</div>



						    	<div ng-if="$index==1 && slides[1]['onsiteImages']">
						    		<div class="row">
							    		<div class="col-4" ng-if="slides[1]['onsiteImages']" ng-repeat="image in slides[1]['onsiteImages']">
							    			<a href="#" ng-click="setSelectedOnsiteImage(image)">
							    				<img class="img-fluid" id="onsiteImage1" ng-src="{{image}}"/>
							    			</a>
							    		</div>
							    	</div>	
						    	</div>


						    	<div ng-if="$index==1 && slides[1]['gmData']">
						    		<div class="row">
							    		<div class="col-4" ng-repeat="gm in slides[1]['gmData']">
							    			<a href="{{gm.link}}" style="text-decoration: none; color: white;">
							    				<div class="card bg-transparent">
							    					<div class="card-header">
							    						{{gm.title}}
							    					</div>
							    					<div class="card-body">
							    						<img class="img-fluid" ng-src="{{gm.GMImageUrl}}"/>		
							    					</div>
							    				</div>
							    			</a>
							    		</div>
							    	</div>
						    	</div>

						    	<div ng-if="$index==2">
						    		<div class="row">
							    		<div class="col-4" ng-repeat="gm in slides[2]['gmData']">
							    			<a href="{{gm.link}}" style="text-decoration: none; color: white;">
							    				<div class="card bg-transparent">
							    					<div class="card-header">
							    						{{gm.title}}
							    					</div>
							    					<div class="card-body">
							    						<img class="img-fluid" ng-src="{{gm.GMImageUrl}}"/>		
							    					</div>
							    				</div>
							    			</a>
							    		</div>
							    	</div>
						    	</div>
						    

						    </div>
						  </div>
						
						</div>
					</div>
				</div>
				
				
				<div id="onsiteImageModal" class="custom-modal">
				  <span class="close" ng-click="closeOnsiteImageModal()">&times;</span>
				  <img class="custom-modal-content" ng-src="{{selectedOnsiteImage}}"/>
				</div>	

			</section>


			<section class="container-fluid biomecharnis-section">
						<nav class="nav biomecharnis-section-nav">
							<ul>
								<li><a href="#what-is-biomecharnis">What is BiomechArnis</a></li>
								<li><a href="#the-team">The Team</a></li>
								<li><a href="#">Contact Us</a></li>
							</ul>	
						</nav>

					<div id="what-is-biomecharnis" class="">
						<div class="parallax-container">	
							<ul id="parallax-scene">

								<li class="layer mt-5" data-depth=".4">
									<img id="pl-mocap" class="img-fluid" src="<?php echo get_stylesheet_directory_uri();?>/assets/images/mocap.png"/>
								</li>
								
								
							</ul>	
						</div>
						<div class="row h-100">
							<!-- <div class="col-5"> -->
								
							<!-- </div> -->
							<div id="biomecharnis-content" class="offset-5 col-6 d-flex flex-column align-self-center">
								<!-- <div class="tab-content" id="biomecharnis-content"> -->
									<article id="main-content" class="tab-pane active mb-5">
										<h1>What is BiomechArnis?</h1>
										<p>
											The BiomechArnis Filipino Martial Art Movement Archive is an online digital archive of our Filipino martial art movement literature. It aims to capture the key elements of Filipino martial art movement across practitioners and styles and to enable comparison and contrast of their similarities and differences via three dimensional (3D) motion capture. 3D motion capture (or ‘3D mocap’) is a type of digital recording technology that gives an additional dimension of depth to the performance of movement. It recreates real-time movement along three dimensions on a two-dimensional surface such as a computer screen. 
										</p>	
									</article>
									
									<article id="content-1" class="tab-pane">
										<p>
											As it is a dynamic activity, the recording, preservation, learning and understanding of Filipino martial arts is better facilitated with digital motion capture. Digital motion capture provides more movement information than text, still photographs, or video because motion is recorded in three dimensions. This in turn allows you to also to view the recording as the motion sequence transpires in running time. In this archive, a corresponding video recording is placed alongside the motion capture, for reference and context. 
										</p>
									</article>

									<article id="content-2" class="tab-pane">
										<p>
											The BiomechArnis Filipino Martial Art Movement Archive is our first attempt to digitally document our Filipino martial art movement culture and heritage.  This repository is a constant work in progress that aims to include as many Philippine indigenous martial arts to represent the multitude and diversity of our ethnicity. The arnis systems currently included were facilitated through the generosity of friends in the Filipino martial art community, as well as the Philippine Eskrima Kali Arnis Federation (PEKAF). It is from this starting point that we intend to build this digital library, for reference of students, teachers, enthusiasts and fans of Filipino martial arts. 
										</p>
									</article>

									<article id="content-3" class="tab-pane">
										<p>
											As an art form, there are numerous recordings of the grand masters, masters, experts, and artists for future generations to study and appreciate. However, many of the grand masters, the inheritors and standard-bearers, are in their senior years. This lends urgency to this initiative to record their distinct movements that demonstrate expertise and the unique characteristics of their respective systems. 
										</p>
									</article>
									<article id="content-4" class="tab-pane">
										<p>
											Since it is within the nature of a database to be cumulative, the art can be brought to light with these initial elements to begin with and then built upon over time. We invite scholars, artists and enthusiasts from different fields, and hope to collaborate to expand the depth and scope of this archive.   
											<br/>
											<br/>
											<br/>
											<br/>
											<br/>
											<br/>
											<br/>
											<br/>
										</p>
									</article>
								<!-- </div> -->
							</div>
							<div class="col-1 d-flex flex-column align-self-center">
								<ul class="nav flex-column" id="biomecharnis-tab">
								  <li class="nav-item">
								  	<a class="nav-link active" id="main-content-tab" data-toggle="tab" href="#main-content">
								    </a>
								  </li>
								  <li class="nav-item">
								  	<a class="nav-link" id="main-content-tab" data-toggle="tab" href="#content-1">
								    </a>
								  </li>
								  <li class="nav-item">
								  	<a class="nav-link" id="main-content-tab" data-toggle="tab" href="#content-2">
								    </a>
								  </li>
								  <li class="nav-item">
								  	<a class="nav-link" id="main-content-tab" data-toggle="tab" href="#content-3">
								    </a>
								  </li>
								  <li class="nav-item">
								  	<a class="nav-link" id="main-content-tab" data-toggle="tab" href="#content-4">
								    </a>
								  </li>
								</ul>
							</div>
						</div>	
					</div>

					<div id="the-team">
						<div class="the-team-bg">
						</div>
						<div class="row text-center" style="margin: 10%">
            				<div class="col-xl-3 col-sm-6 mb-5">
								<div class="card text-center shadow-sm">
	                				<div class="bg-white rounded shadow-sm py-5 px-3">
					                    <img src="<?php echo site_url() . '/wp-content/uploads/2020/04/thor-150x150.png';?>" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-md" />
					                    						  <!-- img-fluid rounded-circle mb-3 img-thumbnail shadow-md -->
					                    <h4 class="mb-0 text-dark">Thor Manlangit</h4>
					                    <span class="small text-uppercase text-muted">Team Leader</span>    
					                    <ul class="social mb-0 list-inline mt-3">
					                        <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-envelope"></i></a></li>
					                        <li class="list-inline-item"><a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a></li>
					                    </ul>
					                </div>
								</div>
							</div>
							<div class="col-xl-3 col-sm-6 mb-5">
								<div class="card text-center shadow-sm">
	                				<div class="bg-white rounded shadow-sm py-5 px-3">
					                    <img src="<?php echo site_url() . '/wp-content/uploads/2020/04/babs2-150x150.jpg';?>" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-md" />
					                    						  <!-- img-fluid rounded-circle mb-3 img-thumbnail shadow-md -->
					                    <h4 class="mb-0 text-dark">Rachell Peneyra</h4>
					                    <span class="small text-uppercase text-muted">Team Member</span>    
					                    <ul class="social mb-0 list-inline mt-3">
					                        <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-envelope"></i></a></li>
					                        <li class="list-inline-item"><a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a></li>
					                    </ul>
					                </div>
								</div>
							</div>
							<div class="col-xl-3 col-sm-6 mb-5">
								<div class="card text-center shadow-sm">
	                				<div class="bg-white rounded shadow-sm py-5 px-3">
					                    <img src="<?php echo site_url() . '/wp-content/uploads/2020/04/bert-150x150.jpg';?>" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-md" />
					                    						  <!-- img-fluid rounded-circle mb-3 img-thumbnail shadow-md -->
					                    <h4 class="mb-0 text-dark">Bert Madrigal</h4>
					                    <span class="small text-uppercase text-muted">Team Member</span>    
					                    <ul class="social mb-0 list-inline mt-3">
					                        <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-envelope"></i></a></li>
					                        <li class="list-inline-item"><a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a></li>
					                    </ul>
					                </div>
								</div>
							</div>
							<div class="col-xl-3 col-sm-6 mb-5">
								<div class="card text-center shadow-sm">
	                				<div class="bg-white rounded shadow-sm py-5 px-3">
					                    <img src="<?php echo site_url() . '/wp-content/uploads/2020/04/placeholder-150x150.jpg';?>" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-md" />
					                    						  <!-- img-fluid rounded-circle mb-3 img-thumbnail shadow-md -->
					                    <h4 class="mb-0 text-dark">Felipe Jocano</h4>
					                    <span class="small text-uppercase text-muted">Anthropologist</span>    
					                    <ul class="social mb-0 list-inline mt-3">
					                        <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-envelope"></i></a></li>
					                        <li class="list-inline-item"><a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a></li>
					                    </ul>
					                </div>
								</div>
							</div>
							<div class="col-xl-3 col-sm-6 mb-5">
								<div class="card text-center shadow-sm">
	                				<div class="bg-white rounded shadow-sm py-5 px-3">
					                    <img src="<?php echo site_url() . '/wp-content/uploads/2020/04/dave1-150x150.jpg';?>" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-md" />
					                    						  <!-- img-fluid rounded-circle mb-3 img-thumbnail shadow-md -->
					                    <h4 class="mb-0 text-dark">Dave Bercades</h4>
					                    <span class="small text-uppercase text-muted">Technical Consultant</span>    
					                    <ul class="social mb-0 list-inline mt-3">
					                        <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-envelope"></i></a></li>
					                        <li class="list-inline-item"><a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a></li>
					                    </ul>
					                </div>
								</div>
							</div>
							<div class="col-xl-3 col-sm-6 mb-5">
								<div class="card text-center shadow-sm">
	                				<div class="bg-white rounded shadow-sm py-5 px-3">
					                    <img src="<?php echo site_url() . '/wp-content/uploads/2020/04/kevin1-150x150.jpg';?>" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-md" />
					                    						  <!-- img-fluid rounded-circle mb-3 img-thumbnail shadow-md -->
					                    <h4 class="mb-0 text-dark">Kevin Buenviaje</h4>
					                    <span class="small text-uppercase text-muted">3D Generalist / Technical Artist</span>    
					                    <ul class="social mb-0 list-inline mt-3">
					                        <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-envelope"></i></a></li>
					                        <li class="list-inline-item"><a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a></li>
					                    </ul>
					                </div>
								</div>
							</div>
							<div class="col-xl-3 col-sm-6 mb-5">
								<div class="card text-center shadow-sm">
	                				<div class="bg-white rounded shadow-sm py-5 px-3">
					                    <img src="<?php echo site_url() . '/wp-content/uploads/2020/04/winson-150x150.jpg';?>" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-md" />
					                    						  <!-- img-fluid rounded-circle mb-3 img-thumbnail shadow-md -->
					                    <h4 class="mb-0 text-dark">Winson Gasis</h4>
					                    <span class="small text-uppercase text-muted">Web Developer</span>    
					                    <ul class="social mb-0 list-inline mt-3">
					                        <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-envelope"></i></a></li>
					                        <li class="list-inline-item"><a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a></li>
					                    </ul>
					                </div>
								</div>
							</div>
							<div class="col-xl-3 col-sm-6 mb-5">
								<div class="card text-center shadow-sm">
	                				<div class="bg-white rounded shadow-sm py-5 px-3">
					                    <img src="<?php echo site_url() . '/wp-content/uploads/2020/04/glez-150x150.png';?>" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-md" />
					                    						  <!-- img-fluid rounded-circle mb-3 img-thumbnail shadow-md -->
					                    <h4 class="mb-0 text-dark">Glez Aparato</h4>
					                    <span class="small text-uppercase text-muted">Admin Assistant</span>    
					                    <ul class="social mb-0 list-inline mt-3">
					                        <li class="list-inline-item"><a href="#" class="social-link"><i class="fa fa-envelope"></i></a></li>
					                        <li class="list-inline-item"><a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a></li>
					                    </ul>
					                </div>
								</div>
							</div>

						</div>

					</div> <!-- the team-->

					<!-- <script>
							$biomechArnisSectionNav = $('.biomecharnis-section-nav')
							$theTeamSection = $('#the-team')
							// $prevPos = $theTeamSection[0].offsetTop
							$prevPos = $theTeamSection.prop("offsetTop")

							$theTeamSection.on('scroll', function(){
								$newPos = $theTeamSection.prop("offsetTop")
								// $newPos = $theTeamSection[0].offsetTop

								console.log('newPos', $newPos) 
								console.log('prevPos', $prevPos)

								if($newPos > $prevPos){
									$biomechArnisSectionNav.hide(slow)
								}
								// console.log('test')
							})

							console.log($prevPos)

						</script> -->
					
					
			</section>

			<section class="container-fluid filler-2">
				<!-- <div class="row h-10 page-navigation-container justify-content-between">
						<button class="nav-left">
						  <span data-title="PREV"><i class="fas fa-angle-left"></i></span>
						</button>


						<button class=" nav-right">
						  <span data-title="NEXT"><i class="fas fa-angle-right"></i></span>
						</button>
				</div> -->
				<div class="row h-100 justify-content-center">
					<img class="img-fluid" src="<?php echo get_stylesheet_directory_uri();?>/assets/images/coming-soon.png"/>
				</div>
			</section>
		</div>
	</div>


	
	
	<script type="text/javascript" src="https://cdn.jsdelivr.net/velocity/1.0.0/velocity.min.js"></script>
	<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri();?>/assets/js/xx-cube.js"></script>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js"></script>
	<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri();?>/assets/js/xx-home.js"></script>
	<!-- <script type="text/javascript" src="<?php echo get_stylesheet_directory_uri();?>/assets/js/imagesloaded.pkgd.min.js"></script>
	<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri();?>/assets/js/xx-scroll-page.js"></script> -->

	<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri();?>/assets/js/xx-arnis-show-info.js"></script>
	<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri();?>/assets/js/arnis-controller.js"></script>





	</body>
</html>