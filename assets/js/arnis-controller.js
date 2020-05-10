app = angular.module('arnisApp', ['ngSanitize'])
app.controller('arnisListController', function($scope, $http, $q) {

    // console.log(JSON.stringify(cube, null, 3))

                        
        $scope.slides = [];
        $scope.gmData = []; //for view icon button


        function getBaseURL() {
            return $q((resolve, reject) => {
                $http.get('http://localhost/biomecharnis/wp-json/')
                    .then(response => {
                        
                        resolve(response.data.url);
                    }, error => {
                        reject(error);
                    })
            })
        };
        $baseUrl = '';

        $getBaseURL = getBaseURL();
        $getBaseURL
            .then(response => {
                // console.log('fetch')
                $baseUrl = response;
                $requestMediaUrl = 'http://localhost/biomecharnis/wp-json/wp/v2/media/';
                $scope.arnisList = null;
                $scope.arnisSelected = null;
                $scope.selectedOnsiteImage = '';

                $http.get($baseUrl + '/wp-json/wp/v2/arnis_system?parent=0') //base arnis systems
                    .then(
                        async response => {
                            $scope.arnisList = response.data;
                            $scope.arnisList = $scope.arnisList.filter(arnis => { return arnis.parent == "0" });

                            //set data for first arnis system
                            // $scope.arnisSelected = $scope.arnisList[0];
                            // $scope.slides = [$scope.arnisSelected]

                            setArnisInfo($scope.arnisList[0])


                            $listCtr = 1;
                            angular.forEach($scope.arnisList, function(arnis) {
                                arnis.viewerClass = "viewer_" + $listCtr++;

                                //get thumbnail image
                                if (!angular.isUndefined(arnis._links['wp:featuredmedia'])) {
                                    $featuredImageUrl = !angular.isUndefined(arnis._links['wp:featuredmedia'][0].href) ? arnis._links['wp:featuredmedia'][0].href : null;
                                    $http.get($featuredImageUrl)
                                        .then(
                                            function(response) {
                                                // console.log(response.data)
                                                arnis.thumbnail = !angular.isUndefined(response.data.guid.rendered) ? response.data.guid.rendered : null;
                                            },
                                            function(error) {
                                                console.log(error)
                                            }
                                        )
                                }


                            })
                        }, error => {
                            console.log(error.data)
                        });


                function getOnsiteImages(arnis) {
                    let onsiteImages = [];


                    if (arnis) {
                        $http.get($requestMediaUrl + arnis.acf.onsite_image_1)
                            .then(function(response) {
                                if (!angular.isUndefined(response.data.guid)){

                                    onsiteImages.push(response.data.guid.rendered)
                                    // $scope.arnisSelected.onsiteImages = angular.extend({}, onsiteImages)
                                    $scope.slides.push({"onsiteImages": onsiteImages})
                                    // console.log($scope.slides)
                                    
                                }
                                    
                                else
                                    $scope.arnisSelected.onsiteImage1 = '';


                            }, function(error) {
                                $scope.arnisSelected.onsiteImage1 = '';
                                console.log(error);
                            })

                        //2
                        // setTimeOut
                        $http.get($requestMediaUrl + arnis.acf.onsite_image_2)
                            .then(function(response) {
                                if (!angular.isUndefined(response.data.guid)){
                                    onsiteImages.push(response.data.guid.rendered)
                                }
                                else
                                    $scope.arnisSelected.onsiteImage2 = '';


                            }, function(error) {
                                $scope.arnisSelected.onsiteImage2 = '';
                                console.log(error);
                            })

                        //3
                        $http.get($requestMediaUrl + arnis.acf.onsite_image_3)
                            .then(function(response) {
                                if (!angular.isUndefined(response.data.guid)){
                                    
                                    onsiteImages.push(response.data.guid.rendered)
                                    
                                }
                                else
                                    $scope.arnisSelected.onsiteImage3 = '';

                            }, function(error) {
                                $scope.arnisSelected.onsiteImage3 = '';
                                console.log(error);
                            })
                    } else {
                        // $scope.arnisSelected.onsiteImage1 = '';
                        // $scope.arnisSelected.onsiteImage2 = '';
                        // $scope.arnisSelected.onsiteImage3 = '';
                    }
                }


                $scope.currentArnisStyleURL = '';
                $scope.setCurrentArnisStyle = url =>{
                    $scope.currentArnisStyleURL = url;
                }



                function getGMData(arnis) {
                    
                    
                    if (arnis) {
                        
                        $http.get($baseUrl + '/wp-json/wp/v2/arnis_system?parent=' + arnis.id)
                            .then(
                                response => {
                                        // arnis.GMData =  response.data;

                                        
                                        $scope.slides.push({'gmData': response.data})
                                        // console.log($scope.slides)
                                        // console.log($scope.slides['gmData'])
                                        
                                        /*Fetch Image URL*/
                                        // angular.forEach($scope.slides[2], gm => {
                                        //     console.log(gm)
                                        //     if(gm.acf)
                                        //         $http.get($requestMediaUrl + gm.acf.grandmaster_image[0])
                                        //         .then(function(response) {
                                        //             // console.log('gm image url fetched')
                                        //             if (!angular.isUndefined(response.data.guid)) {

                                        //                 gm.GMImageUrl = response.data.guid.rendered;
                                        //                 // console.log('gm image url assigned')
                                        //             }
                                        //         }, function(error) {
                                        //             console.log(error);
                                        //             return '';
                                        //         })
                                            
                                        // })

                                        // console.log($scope.slides)

                                        
                                    },
                                    error => {
                                        console.log(error)
                                    }
                            )
                    }

                }


                

                // function getOnsiteImage2($id) {
                //     if ($id) {
                //         $http.get($requestMediaUrl + $id)
                //             .then(function(response) {
                //                 if (!angular.isUndefined(response.data.guid))
                //                     $scope.arnisSelected.onsiteImage2 = response.data.guid.rendered;
                //                 else
                //                     $scope.arnisSelected.onsiteImage2 = '';
                //             }, function(error) {
                //                 console.log(error);
                //             })
                //     } else {
                //         $scope.arnisSelected.onsiteImage2 = '';
                //     }
                // }




                // function getOnsiteImage3($id) {
                //     if ($id) {
                //         $http.get($requestMediaUrl + $id)
                //             .then(function(response) {
                //                 if (!angular.isUndefined(response.data.guid))
                //                     $scope.arnisSelected.onsiteImage3 = response.data.guid.rendered;
                //                 else
                //                     $scope.arnisSelected.onsiteImage3 = '';
                //             }, function(error) {
                //                 console.log(error);
                //             })
                //     } else {
                //         $scope.arnisSelected.onsiteImage3 = '';
                //     }

                // }

                $scope.setSelectedOnsiteImage = function(img) {
                    $scope.selectedOnsiteImage = img;

                    $modal = $('.arnis-list-section #onsiteImageModal');
                    $modal.css('display', 'block');

                }

                $scope.closeOnsiteImageModal = function() {
                    $modal = $('.arnis-list-section #onsiteImageModal');
                    $modal.css('display', 'none');
                }


                let carousel = $(".carousel-container .carousel"),
                    currdeg = 0,
                    currentArnisSystem = 0;;

                function getMediaUrl($id) {
                    // console.log('mediaid:' + $id)
                    if (!$id)
                        return '';

                    $http.get($requestMediaUrl + $id)
                        .then(function(response) {
                            if (!angular.isUndefined(response.data.guid)) {
                                return response.data.guid.rendered;
                            }
                        }, function(error) {
                            console.log(error);
                            return '';
                        })
                }


                //set first arnis tab to active
                $listNavigationContainer = $('.list-navigation-container')
                


                $scope.nextArnis = function() {
                    currdeg = currdeg - 45;


                    if (currentArnisSystem > 6) {
                        currentArnisSystem = 0
                    } else {
                        currentArnisSystem = currentArnisSystem + 1;
                    }

                    // $scope.arnisSelected = $scope.arnisList[currentArnisSystem];


                    setArnisInfo($scope.arnisList[currentArnisSystem]);

                    // console.log('currentArnisSystem:', currentArnisSystem)


                    carousel.css({
                        "-webkit-transform": "rotateY(" + currdeg + "deg)",
                        "-moz-transform": "rotateY(" + currdeg + "deg)",
                        "-o-transform": "rotateY(" + currdeg + "deg)",
                        "transform": "rotateY(" + currdeg + "deg)"
                    });


                    $activeArnis = $listNavigationContainer.find('ul li.active')


                    if($activeArnis.next().length > 0){
                        $activeArnis.next().addClass('active')
                    }else{
                        $listNavigationContainer.find('ul li').first().addClass('active')
                    }
                    
                    $activeArnis.removeClass('active')


                }




                $scope.prevArnis = function() {

                    // console.log('currentArnisSystem:', currentArnisSystem)
                    currdeg = currdeg + 45;

                    if (currentArnisSystem < 1) {
                        currentArnisSystem = 7
                    } else {
                        currentArnisSystem = currentArnisSystem - 1;
                    }

                    // $scope.arnisSelected = $scope.arnisList[currentArnisSystem];


                    setArnisInfo($scope.arnisList[currentArnisSystem]);


                    carousel.css({
                        "-webkit-transform": "rotateY(" + currdeg + "deg)",
                        "-moz-transform": "rotateY(" + currdeg + "deg)",
                        "-o-transform": "rotateY(" + currdeg + "deg)",
                        "transform": "rotateY(" + currdeg + "deg)"
                    });


                    $activeArnis = $listNavigationContainer.find('ul li.active')

                    
                    


                    if($activeArnis.prev().length > 0){
                        $activeArnis.prev().addClass('active')
                    }else{
                        $listNavigationContainer.find('ul li').last().addClass('active')
                    }

                    $activeArnis.removeClass('active')
                }



                //rotate carousel and show info
                $scope.viewArnisSystemInfo = function(arnis, $event){
                    //get position, sets 0-7
                    var position = arnis.viewerClass.substr(-1) - 1; 
                    var deg = position * (-45);

                    setArnisInfo($scope.arnisList[position]);

                    currentArnisSystem = position;
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



                function setArnisInfo(arnis){

                    //init 1st array
                    $scope.slides = [arnis]

                    let onsiteImages = []
                    let gmData = []

                    let onsiteImageCall = []
                    let gmDataCall = []



                    //2nd array
                    if(arnis.acf.onsite_image_1[0] != '')
                        onsiteImageCall.push($http.get($requestMediaUrl + arnis.acf.onsite_image_1))
                    if(arnis.acf.onsite_image_2[0] != '')
                        onsiteImageCall.push($http.get($requestMediaUrl + arnis.acf.onsite_image_2))
                    if(arnis.acf.onsite_image_3[0] != '')
                        onsiteImageCall.push($http.get($requestMediaUrl + arnis.acf.onsite_image_3))
                    




                    $q.all(onsiteImageCall)
                        .then(response => {
                            

                            angular.forEach(response, res => {
                                // console.log(res)
                                if(res.data.guid)
                                    onsiteImages.push(res.data.guid.rendered)
                            })

                            if(onsiteImages.length > 0)
                                $scope.slides.push({"onsiteImages": onsiteImages})





                            //3rd array
                            $http.get($baseUrl + '/wp-json/wp/v2/arnis_system?parent=' + arnis.id)
                            .then(response => { 

                                //capture gmData for view icon button
                                $scope.gmData = response.data;
                                
                                angular.forEach(response.data, gm => {
                                    gmData.push(gm)
                                })

                                /*Fetch Image URL*/
                                angular.forEach(gmData, gm => {
                                    
                                    if(gm.acf.grandmaster_image){
                                        $http.get($requestMediaUrl + gm.acf.grandmaster_image[0])
                                        .then(function(response) {
                                            // console.log('fetched')
                                            if (!angular.isUndefined(response.data.guid)) {
                                                gm.GMImageUrl = response.data.guid.rendered;
                                            }
                                        }, function(error) {
                                            console.log(error);
                                            return '';
                                        })
                                    }
                                })

                                $scope.slides.push({'gmData': gmData})


                                    
                            })
                        })
                }


                /*Arnis info controls*/

                $arnisInfoCarousel = $('.arnis-system-info-container.carousel');
                $arnisInfoPrev = $('.arnis-system-info-container .arnis-system-info-nav .arnis-system-info-prev')
                $arnisInfoNext = $('.arnis-system-info-container .arnis-system-info-nav .arnis-system-info-next')



                $arnisInfoPrev.on('click', function() {
                    $arnisInfoCarousel.carousel('prev');

                    // $scope.activeCarouselIdx = getActiveCarouselIdx();
                    // console.log(getActiveCarouselIdx())

                })

                $arnisInfoNext.on('click', function() {

                    $arnisInfoCarousel.carousel('next');

                })




                // let getActiveCarouselIdx = function(){
                // 	// console.log('executing')

                // 	$index = 0;
                // 	$('.arnis-list-section .arnis-system-info-container .carousel-inner .carousel-item').each(function(index, item){
                // 		// console.log(index)
                // 		if($(item).hasClass('active')){
                // 			console.log('item:' + $(item))
                // 			console.log('index:' + index)
                // 			$index = index;	
                // 		}
                // 	})
                // 	return $index;
                //   }

                //   //init
                //   $scope.activeCarouselIdx = getActiveCarouselIdx();


                


                function rotate(e) {
                    if (e.data.d == "n") {

                        currdeg = currdeg - 45;


                        //reset if reached limit
                        if (currentArnisSystem > 6) {
                            currentArnisSystem = 0
                        } else {
                            currentArnisSystem = currentArnisSystem + 1;
                        }
                    }

                    if (e.data.d == "p") {

                        currdeg = currdeg + 45;

                        //reset if reached limits
                        if (currentArnisSystem < 1) {
                            currentArnisSystem = 7
                        } else {
                            currentArnisSystem = currentArnisSystem - 1;
                        }
                    }


                    $scope.arnisSelected = $scope.arnisList[currentArnisSystem];

                    console.log($scope.arnisList[currentArnisSystem]);


                    carousel.css({
                        "-webkit-transform": "rotateY(" + currdeg + "deg)",
                        "-moz-transform": "rotateY(" + currdeg + "deg)",
                        "-o-transform": "rotateY(" + currdeg + "deg)",
                        "transform": "rotateY(" + currdeg + "deg)"
                    });
                }




            });


    })






//enable tooltip
$(function() {
    $('[data-toggle="tooltip"]').tooltip()

    $infoContainer = $('.arnis-system-info-container');
    $infoContentContainer = $('.arnis-system-info-container .carousel-inner');


//increase  size of Arnis info container
$infoContainer.hover(function(){  //mousein
    $infoContainer.animate({
        height: "+=150px",
        marginTop: "-=150px"
        }, 
        100, 
        function(){
            // console.log('animationDone')
            animationDone = true;
        }
    )

    
    $infoContentContainer.css('height','+=150px');
    $infoContentContainer.css('maxHeight','+=150px');
    
    }
    ,function() { //mouseout

        $infoContainer.animate({
            height: "-=150",
            marginTop: "+=150"
            }, 
            100, 
        )


        $infoContentContainer.css('height','-=150');
        $infoContentContainer.css('maxHeight','-=150');
        
    })

})





//arnis style controller
app.controller('arnisStyleController', function($scope, $http, $q, $sce) {


        

        var sel = document.querySelector('.current-arnis-style')

        $baseUrl = 'http://localhost/biomecharnis/';
        $currentArnisStyleURL = ''
        $requestMediaUrl = 'http://localhost/biomecharnis/wp-json/wp/v2/media/';

        $scope.arnisInfo = null;
        $scope.arnisSystem = null;


        //observe changes and capture URL of arnisStyle
        var observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                $currentArnisStyleURL = sel.innerHTML
                // console.log()
                if($currentArnisStyleURL){
                    // console.log($currentArnisStyleURL)
                    setArnisStyle();
                }
            })
        })

        var config = { characterData: true, attributes: false, childList: false, subtree: true };
        observer.observe(sel,config)


        function setArnisStyle(){

            $hrefSegments = $currentArnisStyleURL.split('/')
            $slug = $hrefSegments.slice(-2, -1)[0]


            // get Media
            $http.get($baseUrl + '/wp-json/wp/v2/arnis_system?slug=' + $slug)
            .then(response=> {
                $scope.arnisInfo = response.data[0]
                // console.log('data:' + JSON.stringify(response.data[0], null, 3))
                    
                    console.log(response.data[0].acf.mocap[0])

                    //MoCap
                    if(!angular.isUndefined(response.data[0].acf.mocap)){
                        $http.get($requestMediaUrl + response.data[0].acf.mocap[0])
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

        


            function initMocapPlayer(marmosetURL){
                // console.log('initmocap')
                $params = { width: 350, height: 300, autoStart: false };
                marmoset.transparentBackground = true;
                $mViewer = marmoset.embed( marmosetURL, $params );

                
                $mContainer = $('.arnis-style-section .carousel-container .viewer .marmosetContainer')
                // console.log($mContainer)

                $mContainer.append($mViewer.domRoot)


                $marmosetUI = $mContainer.find('#marmosetUI')
                $mInitPayBtn = $mContainer.find('#marmosetUI > input[type="image"]')
                
                
                $mInitPayBtn.attr('src','http://localhost/biomecharnis/wp-content/themes/wp-bootstrap-starter - child/assets/images/biomecharnis-logo.png')
                $mInitPayBtn.css('transform','translate(-50%, -50%) scale(0.25)')

                

                $vidOneContainer = $('.arnis-style-section .carousel-container .viewer_8');
                $vidTwoContainer = $('.arnis-style-section .carousel-container .viewer_2');

                

                // console.log($mViewer)
                // $mViewer.hostImage = "<?php echo get_stylesheet_directory_uri();?>/assets/images/checkered-1280x1280.jpg";
                // // myviewer.resize( "400px", "350px" );
                    
                
                // $mViewer.ui.viewer.scene.sceneAnimator.pause(!0)
                $mPlayBtn = null;
                $mPauseBtn = null;
                $mViewer.onLoad = function(){
                    $vidOneContainer.fadeOut(1000);
                    $vidTwoContainer.fadeOut(1000);

                    waitPlayBtn('.arnis-style-section .carousel-container .viewer .marmosetContainer #marmosetUI > div > div > input[title="animationplay1x.png"]', 1000)
                    waitPauseBtn('.arnis-style-section .carousel-container .viewer .marmosetContainer #marmosetUI > div > div > input[title="animationpause1x.png"]', 1000)
                    
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
        }
            
            

        

        
        

        
        
        

        $scope.trustSrc = function(src) {
          return $sce.trustAsResourceUrl(src);
        }

        //YT video ID
        function getVideoID(str){
            var n = str.search("v=") + 2;
            return str.substr(n);
        }
        
        

        


        /*Arnis Style Viewer - Controls*/
        let currViewer = 1
           ,carousel = $(".carousel-container .carousel")
           ,currdeg = 0;
            
        ;
        $vidOneContainer = $('.arnis-style-section .carousel-container .viewer_8');
        $vidTwoContainer = $('.arnis-style-section .carousel-container .viewer_2');

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
        //  // callback();
        //  vidOnePlayer = new YT.Player('vidOneContainer', 
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
       //   var tag = document.createElement('script');
          //    tag.src = "https://www.youtube.com/player_api";
          //    var firstScriptTag = document.getElementsByTagName('script')[0];
          //    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
       // }

    });






