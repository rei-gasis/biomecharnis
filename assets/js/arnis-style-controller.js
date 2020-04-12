angular.module('arnisApp', ['ngSanitize'])
    .controller('arnisStyleController', function($scope, $http, $q, $sce) {

    	$baseUrl = 'http://localhost/biomecharnis/';
    	$hrefSegments = window.location.href.split('/')
		$slug = $hrefSegments.slice(-2, -1)[0]
		$requestMediaUrl = 'http://localhost/biomecharnis/wp-json/wp/v2/media/';

		$scope.arnisInfo = null;
		$scope.arnisSystem = null;
		
		// console.log($baseUrl + '/wp-json/wp/v2/arnis_system?slug=' + $slug)

		// const { decodeEntities } = wp.htmlEntities;
		//get Media
		$http.get($baseUrl + '/wp-json/wp/v2/arnis_system?slug=' + $slug)
		.then(response=> {
			$scope.arnisInfo = response.data[0];
			// console.log($scope.arnisInfo.title.rendered)
			// $scope.arnisInfo.title.rendered = encodeURI($scope.arnisInfo.title.rendered);//&#8211;
			
			// console.log($arnisInfo)

				//MoCap
				if(!angular.isUndefined(response.data[0].acf.mocap)){
                    $http.get($requestMediaUrl + response.data[0].acf.mocap)
                        .then(response => {
                        	if(response.data.guid.rendered)
                        		// $arnisInfo.mocapURL = response.data.guid.rendered

                        		initMocapPlayer(response.data.guid.rendered)
                        		// console.log($arnisInfo.mocapURL)
                        }, error => {
                            console.log(error);
                        })
				}

				//2D Video
				// console.log($scope.arnisInfo)
				if(!angular.isUndefined(response.data[0].acf.raw_video) && response.data[0].acf.raw_video.length > 0){
                    var videoID = getVideoID(response.data[0].acf.raw_video[0])
					$scope.arnisInfo.vidOneSrc = "https://www.youtube.com/embed/" + videoID + "?rel=0;controls=1;showinfo=0;theme=light;modestbranding=0";

				}


				//Compare Video
				if(!angular.isUndefined(response.data[0].acf.compare_video) && response.data[0].acf.compare_video.length > 0){
                    var videoID = getVideoID(response.data[0].acf.compare_video[0])
					$scope.arnisInfo.vidTwoSrc = "https://www.youtube.com/embed/" + videoID + "?rel=0;controls=1;showinfo=0;theme=light;modestbranding=0";

				}


				//Arnis Style - featured image
				// console.log($scope.arnisInfo)
	        	$featuredImageUrl = !angular.isUndefined($scope.arnisInfo._links['wp:featuredmedia']) ? $scope.arnisInfo._links['wp:featuredmedia'][0].href : null;
	        	if($featuredImageUrl){
	                $http.get($featuredImageUrl)
	                .then(
	                    function(response) {
	                        $scope.arnisInfo.thumbnail = !angular.isUndefined(response.data.guid.rendered) ? response.data.guid.rendered : null;

	                    },
	                    function(error) {
	                        console.log(error)
	                    }
	                )
	        	}


	        	//Grandmaster Image
				
	        	$GMImageID = !angular.isUndefined($scope.arnisInfo.acf.grandmaster_image[0]) ? $scope.arnisInfo.acf.grandmaster_image[0] : null;
	        	console.log($requestMediaUrl + $GMImageID)
	        	if($GMImageID){
	                $http.get($requestMediaUrl + $GMImageID)
	                .then(
	                    function(response) {
	                        $scope.arnisInfo.grandmasterImg = !angular.isUndefined(response.data.guid.rendered) ? response.data.guid.rendered : null;
	                    },
	                    function(error) {
	                        console.log(error)
	                    }
	                )
	        	}





				//Fetch parent system
				$http.get($baseUrl + '/wp-json/wp/v2/arnis_system?include[]=' + response.data[0].parent)
                .then(response => {
                	$scope.arnisSystem = response.data[0]


                	//parent system - featured image
                	$featuredImageUrl = !angular.isUndefined($scope.arnisSystem._links['wp:featuredmedia']) ? $scope.arnisSystem._links['wp:featuredmedia'][0].href : null;
                	if($featuredImageUrl){
	                    $http.get($featuredImageUrl)
                        .then(
                            function(response) {
                                $scope.arnisSystem.thumbnail = !angular.isUndefined(response.data.guid.rendered) ? response.data.guid.rendered : null;
                                // console.log($scope.arnisSystem)

                            },
                            function(error) {
                                console.log(error)
                            }
                        )
                	}


                }, error => {
                    console.log(error);
                })
				


				
		},error => {
			console.log(error)
		})

		$scope.trustSrc = function(src) {
		  return $sce.trustAsResourceUrl(src);
		}

		//YT video ID
		function getVideoID(str){
		    var n = str.search("v=") + 2;
			return str.substr(n);
		}
		
		function initMocapPlayer(marmosetURL){
			$params = { width: 350, height: 300, autoStart: false };
			marmoset.transparentBackground = true;
			$mViewer = marmoset.embed( marmosetURL, $params );


			$mContainer = $('.arnis-list-section .carousel-container .viewer .marmosetContainer')
			$mContainer.append($mViewer.domRoot)


			$marmosetUI = $mContainer.find('#marmosetUI')
			$mInitPayBtn = $mContainer.find('#marmosetUI > input[type="image"]')
			
			
			$mInitPayBtn.attr('src','http://localhost/biomecharnis/wp-content/themes/wp-bootstrap-starter - child/assets/images/biomecharnis-logo.png')
			$mInitPayBtn.css('transform','translate(-50%, -50%) scale(0.25)')

			

			$vidOneContainer = $('.arnis-list-section .carousel-container .viewer_8');
			$vidTwoContainer = $('.arnis-list-section .carousel-container .viewer_2');

			

			// console.log($mViewer)
			// $mViewer.hostImage = "<?php echo get_stylesheet_directory_uri();?>/assets/images/checkered-1280x1280.jpg";
			// // myviewer.resize( "400px", "350px" );
				
			
			// $mViewer.ui.viewer.scene.sceneAnimator.pause(!0)
			$mPlayBtn = null;
			$mPauseBtn = null;
			$mViewer.onLoad = function(){
				$vidOneContainer.fadeOut(1000);
				$vidTwoContainer.fadeOut(1000);

				waitPlayBtn('.arnis-list-section .carousel-container .viewer .marmosetContainer #marmosetUI > div > div > input[title="animationplay1x.png"]', 1000)
				waitPauseBtn('.arnis-list-section .carousel-container .viewer .marmosetContainer #marmosetUI > div > div > input[title="animationpause1x.png"]', 1000)
				
			}


			

			function waitPauseBtn(selector, time) {
				
				if($(selector).length > 0 ){
				
					$mPauseBtn = $(selector)
					$mPauseBtn.on('click',function(){
						$vidOneContainer.fadeIn(1000);
						$vidTwoContainer.fadeIn(1000);
					})
				}
		        else {
		            setTimeout(function() {
		            	
		                waitPauseBtn(selector, time);
		            }, time);
		        }
		    }

		    function waitPlayBtn(selector, time) {
				
				if($(selector).length > 0 ){
				
					$mPlayBtn = $(selector)
					$mPlayBtn.on('click',function(){
						$vidOneContainer.fadeOut(1000);
						$vidTwoContainer.fadeOut(1000);
					})
				}
		        else {
		            setTimeout(function() {
		                waitPlayBtn(selector, time);
		            }, time);
		        }
		    }

		}

		


	    /*Arnis Style Viewer - Controls*/
        let currViewer = 1
           ,carousel = $(".carousel-container .carousel")
           ,currdeg = 0;
            
        ;
        $vidOneContainer = $('.arnis-list-section .carousel-container .viewer_8');
        $vidTwoContainer = $('.arnis-list-section .carousel-container .viewer_2');

        $scope.prevViewer = function() {

            if(currViewer <= 0){
                currViewer = 0;
                return;
            }
            else{
                currViewer--;
            }

            

            currdeg = currdeg + 60;
            pause3DViewer();




            carousel.css({
                "-webkit-transform": "rotateY(" + currdeg + "deg)",
                "-moz-transform": "rotateY(" + currdeg + "deg)",
                "-o-transform": "rotateY(" + currdeg + "deg)",
                "transform": "rotateY(" + currdeg + "deg)"
            });

            // console.log($scope.arnisList[currentArnisSystem]);

        }

        function pause3DViewer(){
            if($mViewer.ui.viewer.scene){
                $mViewer.ui.viewer.scene.sceneAnimator.pause(!0)
                $vidOneContainer.fadeIn(1000);
                $vidTwoContainer.fadeIn(1000);
                $mPauseBtn.hide();
                $mPlayBtn.show();

            }
            
        }

        $scope.nextViewer = function() {
            if(currViewer >= 2){
                currViewer = 2;
                return;
            }
            else{
                currViewer++;
            }

            
            

            currdeg = currdeg - 60;
            pause3DViewer();

            // $mViewer.unload();
            // $mViewer.loadScene();

            carousel.css({
                "-webkit-transform": "rotateY(" + currdeg + "deg)",
                "-moz-transform": "rotateY(" + currdeg + "deg)",
                "-o-transform": "rotateY(" + currdeg + "deg)",
                "transform": "rotateY(" + currdeg + "deg)"
            });

            // console.log($scope.arnisList[currentArnisSystem]);

        }

        $scope.prevPage = function(){
        	window.history.back();
        }


        $modal = $('.custom-modal')
        $modalContent = $('.custom-modal .custom-modal-content')
        $infoContent = $('.custom-modal .custom-modal-content .info-content')

        	

        $scope.showArnisInfo = function(){
            $modal.css('display', 'block');

            // $modalContent.fadeIn(1000);
            $modalContent.animate({
        			// "margin": '0 auto',
        			"opacity": "1"
        		   }, 400);
        }


        $scope.hideArnisInfo = function(){        	
        	$modal.css('display', 'none');
        	$modalContent.css('opacity', '0.5');
        }


        
        // $('a[href*="#"]').on('click', function(e) {
        $("a[href^='#']").click(function(e) {
			e.preventDefault();
			var position = $($(this).attr("href")).prop("offsetTop")

			$infoContent.animate({
				scrollTop: position
			}, 1000 );
		  
		})


        $scope.view2D = function($event){


        	let position = 1; //
            let deg = position * (60);
			
			currViewer = 0;
            currdeg = deg;




            carousel.css({
                "-webkit-transform": "rotate3d(0, 1, 0, " + deg + "deg)",
                "-moz-transform": "rotate3d(0, 1, 0, " + deg + "deg)",
                "-o-transform": "rotate3d(0, 1, 0, " + deg + "deg)",
                "transform": "rotate3d(0, 1, 0, " + deg + "deg)"
            });


        	$($event.currentTarget).parent().children().removeClass('active')
            $($event.currentTarget).addClass('active')
        }

        $scope.view3D = function($event){
        	let position = 2; //
            let deg = position * (0); //
			
			currViewer = 1; //
            currdeg = deg;


            carousel.css({
                "-webkit-transform": "rotate3d(0, 1, 0, " + deg + "deg)",
                "-moz-transform": "rotate3d(0, 1, 0, " + deg + "deg)",
                "-o-transform": "rotate3d(0, 1, 0, " + deg + "deg)",
                "transform": "rotate3d(0, 1, 0, " + deg + "deg)"
            });


        	$($event.currentTarget).parent().children().removeClass('active')
            $($event.currentTarget).addClass('active')
        }

        


        $scope.viewSideBySide = function($event){
        	let position = 1; 
            let deg = position * (-60); //
			
			currViewer = 2; //
            currdeg = deg;


            carousel.css({
                "-webkit-transform": "rotate3d(0, 1, 0, " + deg + "deg)",
                "-moz-transform": "rotate3d(0, 1, 0, " + deg + "deg)",
                "-o-transform": "rotate3d(0, 1, 0, " + deg + "deg)",
                "transform": "rotate3d(0, 1, 0, " + deg + "deg)"
            });

        	$($event.currentTarget).parent().children().removeClass('active')
            $($event.currentTarget).addClass('active')
        }



	    /*YT controls*/
	    // var vidOnePlayer;
	    // function initYTPlayer(){
	    // 	// callback();
	    // 	vidOnePlayer = new YT.Player('vidOneContainer', 
			  //   {
			  //     height: '300',
			  //     width: '350',
			  //     videoId: '_S-8MeQmC4o',
			  //  //    events: {
				 //  //     'onReady': onPlayerReady,
				 //  //     'onStateChange': onPlayerStateChange
				 //  // }
			  //   }
			  //  );
	    // }
	    // initYTPlayer();

	    // initYTAPI();
	    
	    // initYTPlayer(initYTAPI);
	    	
	    

	   //  function initYTAPI(){
	   //  	var tag = document.createElement('script');
		  // 	tag.src = "https://www.youtube.com/player_api";
		  // 	var firstScriptTag = document.getElementsByTagName('script')[0];
		  // 	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	   // }

    });