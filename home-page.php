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
						<a class="nav-right" href="#main-content"><span>Begin Learning</a>	
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
						<li class="nav-item" ng-repeat="arnis in arnisList" ng-click="viewArnisSystemInfo(arnis, $event)">
							{{arnis.title.rendered}}
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
									<h3>{{arnisSelected.title.rendered}}</h3>
								</div>
								<div class="arnis-system-info-nav btn-group">	
									<button class="btn btn-primary view-arnis-style" data-toggle="tooltip" data-placement="top" title="View"><a href="{{arnisSelected.GMData[0].link}}"><i class="fas fa-eye"></i></a></button>
									<button class="btn btn-primary arnis-system-info-prev"><i class="fas fa-arrow-left"></i></button>
									<button class="btn btn-primary arnis-system-info-next"><i class="fas fa-arrow-right"></i></button>
								</div>	
							</div>
							
						  <div class="carousel-inner text-center card bg-dark text-white py-2">
						    <div class="carousel-item active arnis-system-desc">
						    	<div class="row">
						    		<div class="col-12">
						    			<p ng-bind-html="arnisSelected.content.rendered"></p>		
						    		</div>
						    	</div>
						    </div>
						    <div class="carousel-item onsite-images">
						    	<div class="row">
						    		<div class="col-4">
						    			<a href="#" ng-click="setSelectedOnsiteImage(arnisSelected.onsiteImage1)">
						    				<img ng-show="arnisSelected.onsiteImage1 != ''" class="img-fluid" id="onsiteImage1" ng-src="{{arnisSelected.onsiteImage1}}"/>
						    			</a>
						    		</div>
						    		<div class="col-4">
						    			<a href="#" ng-click="setSelectedOnsiteImage(arnisSelected.onsiteImage2)">
						    				<img ng-show="arnisSelected.onsiteImage2 != ''" class="img-fluid" id="onsiteImage2" ng-src="{{arnisSelected.onsiteImage2}}"/>	
						    			</a>
						    		</div>
						    		<div class="col-4">
						    			<a href="#" ng-click="setSelectedOnsiteImage(arnisSelected.onsiteImage3)">
						    				<img ng-show="arnisSelected.onsiteImage3 != ''" class="img-fluid" id="onsiteImage3" ng-src="{{arnisSelected.onsiteImage3}}"/>	
						    			</a>
						    		</div>
						    	</div>
						    </div>

						    <div class="carousel-item">
						    	<div class="row" >
						    		<div class="col-4" ng-repeat="gm in arnisSelected.GMData">
						    			<!-- data-toggle="tooltip" data-placement="top" title="{{gm.title.rendered}}" -->
						    			<a href="{{gm.link}}">
						    				<img ng-show="gm.id != ''" class="img-fluid" ng-src="{{gm.GMImageUrl}}"/>
						    			</a>
						    		</div>
						    	</div>
						    	<!-- <p ng-repeat="gm in arnisSelected.GMData">{{gm.id}}</p> -->
						    	<!-- <div class="carousel-item onsite-images">
							    	<div class="row">
							    		<div class="col-4">
							    			<a href="#" ng-click="setSelectedOnsiteImage(arnisSelected.onsiteImage1)">
							    				<img ng-show="arnisSelected.onsiteImage1 != ''" class="img-fluid" id="onsiteImage1" ng-src="{{arnisSelected.onsiteImage1}}"/>
							    			</a>
							    		</div>
							    		<div class="col-4">
							    			<a href="#" ng-click="setSelectedOnsiteImage(arnisSelected.onsiteImage2)">
							    				<img class="img-fluid" id="onsiteImage2" ng-src="{{arnisSelected.onsiteImage2}}"/>	
							    			</a>
							    		</div>
							    		<div class="col-4">
							    			<a href="#" ng-click="setSelectedOnsiteImage(arnisSelected.onsiteImage3)">
							    				<img class="img-fluid" id="onsiteImage3" ng-src="{{arnisSelected.onsiteImage3}}"/>	
							    			</a>
							    		</div>
							    	</div>
							    </div> -->
						    	
						      <!-- <img src="..." class="d-block w-100" alt="..."> -->
						    </div>
						  </div>
						  <!-- <a class="carousel-control-prev" href="#arnis-system-info-container" role="button" data-slide="prev">
						    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
						    <span class="sr-only">Previous</span>
						  </a>
						  <a class="carousel-control-next" href="#arnis-system-info-container" role="button" data-slide="next">
						    <span class="carousel-control-next-icon" aria-hidden="true"></span>
						    <span class="sr-only">Next</span>
						  </a> -->
						
						</div>
					</div>
				</div>
				
				
				<div id="onsiteImageModal" class="custom-modal">
				  <span class="close" ng-click="closeOnsiteImageModal()">&times;</span>
				  <img class="custom-modal-content" ng-src="{{selectedOnsiteImage}}"/>
				</div>	

			</section>


			<section class="container-fluid biomecharnis-section">
				<!-- <div class="room__container"> -->
					<!-- <div class="room room--current">
						<div class="room__side room__side--back ">
							 <h2></h2>What is BiomechArnis?</h2>
				             <p class="content__type">
				                	
				                    
				             </p>
						</div>
						<div class="room__side room__side--left">
						</div>
						<div class="room__side room__side--right">
						</div>
						<div class="room__side room__side--bottom"></div>
					</div> -->
					<div class="row h-100">
						<!-- <div class="col-5"> -->
							<div class="parallax-container">	
								<ul id="parallax-scene">
									<!-- <li class="layer" data-depth="0.1">
										<img id="pl-background" src="<?php echo get_stylesheet_directory_uri();?>/assets/images/3dbackground.png" class="img-fluid"/> -->
										<!-- class="img-fluid" -->
									</li>
									<li class="layer" data-depth="1">
										<img id="pl-actual" class="img-fluid" src="<?php echo get_stylesheet_directory_uri();?>/assets/images/actual_capture.png"/>
									</li>

									<li class="layer mt-5" data-depth="0.3">
										<img id="pl-mocap" class="img-fluid" src="<?php echo get_stylesheet_directory_uri();?>/assets/images/mocap.png"/>
									</li>
									
									
								</ul>	
							</div>
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
					
				<!-- </div> -->
				
				
				<!-- <div class="inner-row"> -->
					
				<!-- </div> -->

			    <!-- <div class="row h-10 page-navigation-container justify-content-between">
						<button class="nav-left">
						  <span data-title="PREV"><i class="fas fa-angle-left"></i></span>
						</button>
						<button class=" nav-right">
						  <span data-title="NEXT"><i class="fas fa-angle-right"></i></span>
						</button>
				</div> -->
				<!-- justify-content-between -->
					
					

				<!-- </div> -->
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


	<!-- for 3D scrolling -->

	<!-- <main>
				        <div class="content">
				            <div class="fold-content" id="base-content">

				                
				                
				                <h2 class="content__headline">Utopian dreamer</h2>
				                <p class="content__type">
				                    The Utopia of a modern dreamer must needs differ in one fundamental
				                    aspect from the Nowheres and Utopias men planned before Darwin
				                    quickened the thought of the world.
				                </p>
				                
				                <h2 class="content__headline">All perfect</h2>
				                <p class="content__type">
				                    Those were all perfect and
				                    static States, a balance of happiness won for ever against the
				                    forces of unrest and disorder that inhere in things.
				                    One beheld a
				                    healthy and simple generation enjoying the fruits of the earth in
				                    an atmosphere of virtue and happiness, to be followed by other
				                    virtuous, happy, and entirely similar generations, until the Gods
				                    grew weary.
				                </p>
				                
				                <h2 class="content__headline">Invincible dams</h2>
				                <p class="content__type">
				                    Change and development were dammed back by invincible
				                    dams for ever. But the Modern Utopia must be not static but kinetic,
				                    must shape not as a permanent state but as a hopeful stage, leading
				                    to a long ascent of stages.
				                </p>
				                				                <h2 class="content__headline">Do not resist</h2>
				                <p class="content__type">
				                    Nowadays we do not resist and overcome
				                    the great stream of things, but rather float upon it. We build now
				                    not citadels, but ships of state. For one ordered arrangement of
				                    citizens rejoicing in an equality of happiness safe and assured
				                    to them and their children for ever, we have to plan "a flexible
				                    common compromise, in which a perpetually novel succession of
				                    individualities may converge most effectually upon a comprehensive
				                    onward development."
				                </p>
				                
				                <h2 class="content__headline">Modern conceptions</h2>
				                <p class="content__type">
				                    That is the first, most generalised difference
				                    between a Utopia based upon modern conceptions and all the Utopias
				                    that were written in the former time.
				                </p>
				                <h2 class="content__headline"> What is BiomechArnis?</h2>
				                <p class="content__type">
				                	
				                    The BiomechArnis Filipino Martial Art Movement Archive is an online digital archive of our Filipino martial art movement literature. It aims to capture the key elements of Filipino martial art movement across practitioners and styles and to enable comparison and contrast of their similarities and differences via three dimensional (3D) motion capture. 3D motion capture (or ‘3D mocap’) is a type of digital recording technology that gives an additional dimension of depth to the performance of movement. It recreates real-time movement along three dimensions on a two-dimensional surface such as a computer screen. 
				                </p>
				                <h2 class="content__headline"> What is BiomechArnis?</h2>
				                <p class="content__type">
				                    The BiomechArnis Filipino Martial Art Movement Archive is an online digital archive of our Filipino martial art movement literature. It aims to capture the key elements of Filipino martial art movement across practitioners and styles and to enable comparison and contrast of their similarities and differences via three dimensional (3D) motion capture. 3D motion capture (or ‘3D mocap’) is a type of digital recording technology that gives an additional dimension of depth to the performance of movement. It recreates real-time movement along three dimensions on a two-dimensional surface such as a computer screen. 
				                </p>
				            </div>
				            
				            <button class="btn-debug" id="btn-debug">See Planes</button>
				        </div>
				    </main> -->
	<!-- <div class="screen show">
        <div class="folds" id="folds">
            <div class="fold fold-center" id="fold-center"></div>
            <div class="fold-3d fold-3d-top top-wrapper">
                <div class="fold fold-top" id="fold-top"></div>
            </div>
            <div class="fold-3d fold-3d-bottom bottom-wrapper">
                <div class="fold fold-bottom" id="fold-bottom"></div>
            </div>
        </div>
    </div> -->
	

	
	
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