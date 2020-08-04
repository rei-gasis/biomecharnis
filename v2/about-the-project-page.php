<?
/**
* Template Name: About the Project Page
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
	<link href="<?php echo get_stylesheet_directory_uri()?>/assets/css/footer.css" rel="stylesheet" type="text/css"/>
	<link href="<?php echo get_stylesheet_directory_uri()?>/assets/css/all.min.css" rel="stylesheet" type="text/css"/>
	

</head>
<body ng-app="arnisApp">
		<?php get_template_part('template-parts/navbar'); ?>


		<div class="container-fluid tab-container my-3">
			<!-- <div class="tab-container container my-5" id="about-the-project"> -->
				<section id="what-is-biomecharnis">
					<div class="row">
						<div class="col-12 h-100">
							<div class="vertical-masonry">
								<div class="masonry-brick">
									<h1 class="mt-3">
										WHAT IS BIOMECHARNIS?
										<div class="underline mt-3"></div>
									</h1>
									<article class="my-3">
										<p>
											The BiomechArnis Filipino Martial Art Movement Archive is an online digital archive of 
											our Filipino martial art movement literature. It aims to capture the key elements of Filipino 
											martial art movement across practitioners and styles and to enable comparison and 
											contrast of their similarities and differences via three dimensional (3D) motion capture. 
											3D motion capture (or ‘3D mocap’) is a type of digital recording technology that gives 
											an additional dimension of depth to the performance of movement. It recreates real-time 
											movement along three dimensions on a two-dimensional surface such as a computer screen. 
										</p>
									</article>	
								</div>
								<div class="masonry-brick-img mt-3">
									<img src="<?php echo get_stylesheet_directory_uri()?>/assets/images/pugay.png" class="img-fluid"/>
								</div>
							</div>
						</div>
					</div>
					
					<div class="row py-3">
						<div class="col-12 col-md-6 fadeIn">
							<img src="<?php echo get_stylesheet_directory_uri()?>/assets/images/IMG_20190824_101707.jpg" class="img-fluid"/>
						</div>
						<div class="col-12 col-md-6 fadeIn">
							<h3 class="mt-3">
								3D Motion Capture
								<div class="underline mt-3"></div>
							</h3>
							<p>
								As it is a dynamic activity, the recording, preservation, learning and understanding of Filipino martial arts is better facilitated with digital motion capture. Digital motion capture provides more movement information than text, still photographs, or video because motion is recorded in three dimensions. This in turn allows you to also to view the recording as the motion sequence transpires in running time. In this archive, a corresponding video recording is placed alongside the motion capture, for reference and context. 
							</p>
						</div>
					</div>
					<div class="row py-3">
						<div class="col-12 col-md-6 order-md-1 fadeIn order-2">
							<h3 class="mt-3">
								Collaboration
								<div class="underline mt-3"></div>
							</h3>
							<p>
									As an art form, there are numerous recordings of the grand masters, masters, experts, and artists for future generations to study and appreciate. However, many of the grand masters, the inheritors and standard-bearers, are in their senior years. This lends urgency to this initiative to record their distinct movements that demonstrate expertise and the unique characteristics of their respective systems. 
								</p>
								<p>
									Since it is within the nature of a database to be cumulative, the art can be brought to light with these initial elements to begin with and then built upon over time. We invite scholars, artists and enthusiasts from different fields, and hope to collaborate to expand the depth and scope of this archive.   
								</p>
						</div>
						<div class="col-12 col-md-6 fadeIn order-md-2 order-1">
							<div class="row">
								<!-- <h3 class="mt-3">
									Collaboration
									<div class="underline mt-3"></div>
								</h3> -->
								<div class="img-col">
									<img src="<?php echo get_stylesheet_directory_uri()?>/assets/images/DSC_0181.JPG" class="img-fluid"/>	
										<!-- <img src="<?php echo get_stylesheet_directory_uri()?>/assets/images/DSC_0124.JPG" class="img-fluid"/>	 -->
								</div>
								<div class="img-col">
										<img src="<?php echo get_stylesheet_directory_uri()?>/assets/images/IMG_20190921_140503.jpg" class="img-fluid"/>	
										<img src="<?php echo get_stylesheet_directory_uri()?>/assets/images/IMG_20190916_155602.jpg" class="img-fluid"/>	
								</div>	
							</div>
							
							
							
						</div>
					</div>
				

					
				<div class="break"></div>
				<div class="col-md-6 col-12 mt-5 d-flex justify-content-start fadeIn	">
					<div>
						<h6>
							IN COLLABORATION OF
							<div class="underline mt-1"></div>
						</h6>
						<div class="collaboration-logos mt-3">
							<img src="<?php echo get_stylesheet_directory_uri()?>/assets/images//chk_logo.png">
							<img src="<?php echo get_stylesheet_directory_uri()?>/assets/images//CHED-LOGO.png">
							<img src="<?php echo get_stylesheet_directory_uri()?>/assets/images//NCCA_Logo_2.png">
							<img src="<?php echo get_stylesheet_directory_uri()?>/assets/images//Salikha_logo.png">

						</div>
					</div>
					
				</div>	
				</section>
			<!-- </div> -->
		</div>
		<?php get_template_part('template-parts/footer'); ?>
			
	<!-- <script src="<?php echo get_stylesheet_directory_uri()?>/assets/js/marmoset.js"></script>	 -->
	<script src="<?php echo get_stylesheet_directory_uri()?>/assets/js/main.js"></script>
	<script src="<?php echo get_stylesheet_directory_uri()?>/assets/js/arnis-controller.js"></script>

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