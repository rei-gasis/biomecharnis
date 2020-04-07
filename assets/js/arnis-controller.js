angular.module('arnisApp', ['ngSanitize'])
    .controller('arnisListController', function($scope, $http, $q) {


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
                        response => {
                            $scope.arnisList = response.data;
                            $scope.arnisList = $scope.arnisList.filter(arnis => { return arnis.parent == "0" });

                            //set data for first arnis system
                            $scope.arnisSelected = $scope.arnisList[0];
                            getOnsiteImages($scope.arnisSelected);
                            getGMData($scope.arnisList[0]);

                            // console.log($scope.arnisSelected)


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





                function getGMData(arnis) {
                    // console.log(arnis)
                    
                    if (arnis) {
                        
                        $http.get($baseUrl + '/wp-json/wp/v2/arnis_system?parent=' + arnis.id)
                            .then(
                                async response => {
                                        arnis.GMData = await response.data;

                                        // console.log($scope.arnisSelected.GMData)
                                        /*Fetch Image URL*/
                                        angular.forEach(arnis.GMData, function(gm) {
                                            // console.log('looping gm data')
                                            if(gm.acf.grandmaster_image[0])
                                                $http.get($requestMediaUrl + gm.acf.grandmaster_image[0])
                                                .then(function(response) {
                                                    // console.log('gm image url fetched')
                                                    if (!angular.isUndefined(response.data.guid)) {
                                                        gm.GMImageUrl = response.data.guid.rendered;
                                                        // console.log('gm image url assigned')
                                                    }
                                                }, function(error) {
                                                    console.log(error);
                                                    return '';
                                                })
                                            // console.log($scope.arnisSelected.GMData)
                                        })
                                    },
                                    error => {
                                        console.log(error)
                                    }
                            )
                    }

                }


                function getOnsiteImages(arnis) {
                    if (arnis) {
                        $http.get($requestMediaUrl + arnis.acf.onsite_image_1)
                            .then(function(response) {
                                if (!angular.isUndefined(response.data.guid))
                                    $scope.arnisSelected.onsiteImage1 = response.data.guid.rendered;
                                else
                                    $scope.arnisSelected.onsiteImage1 = '';


                            }, function(error) {
                                $scope.arnisSelected.onsiteImage1 = '';
                                console.log(error);
                            })

                        //2
                        $http.get($requestMediaUrl + arnis.acf.onsite_image_2)
                            .then(function(response) {
                                if (!angular.isUndefined(response.data.guid))
                                    $scope.arnisSelected.onsiteImage2 = response.data.guid.rendered;
                                else
                                    $scope.arnisSelected.onsiteImage2 = '';


                            }, function(error) {
                                $scope.arnisSelected.onsiteImage2 = '';
                                console.log(error);
                            })

                        //3
                        $http.get($requestMediaUrl + arnis.acf.onsite_image_3)
                            .then(function(response) {
                                if (!angular.isUndefined(response.data.guid))
                                    $scope.arnisSelected.onsiteImage3 = response.data.guid.rendered;
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

                    // console.log($scope.arnisList[currentArnisSystem]);

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

                    // carousel.css({
                    //     "-webkit-transform": "rotate3d(0, 1, 0, " + deg + "deg)",
                    //     "-moz-transform": "rotate3d(0, 1, 0, " + deg + "deg)",
                    //     "-o-transform": "rotate3d(0, 1, 0, " + deg + "deg)",
                    //     "transform": "rotate3d(0, 1, 0, " + deg + "deg)"
                    // });

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


                    getOnsiteImages(arnis);

                    if (!arnis.GMData || typeof arnis.GMData === undefined)
                        getGMData(arnis);

                    $scope.arnisSelected = arnis;


                    // console.log($scope.arnisSelected.onsiteImage1)
                    // console.log($scope.arnisSelected.onsiteImage2)
                    // console.log($scope.arnisSelected.onsiteImage3)
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



$infoContainer.hover(function(){
                    // console.log($infoContainer.css('height'))
                    // if($infoContainer.css('height') == '220px'){
                    
                    // if(!animationDone){
                        $infoContainer.animate({
                            height: "+=150px",
                            marginTop: "-=150px"
                            }, 
                            100, 
                            // 'linear', 
                            // null,
                            // null,
                            // null,
                            // function(){
                            //     console.log('animating')
                            //     animationDone = false;
                            // },
                            function(){
                                // console.log('animationDone')
                                animationDone = true;
                            }
                        )

                        // console.log('hovered')
                    // }
                        // console.log($infoContentContainer.css('height'))
                        $infoContentContainer.css('height','+=150px');
                        $infoContentContainer.css('maxHeight','+=150px');

                        // $infoContentContainer.maxHeight('+=100');
                        // $infoContentContainer.css('maxHeight', $infoContentContainer.css('maxHeight') + 100)
                        // $infoContentContainer.animate({
                        //     height: "+=100",
                        //     maxHeight: "+=100"
                        //     // marginTop: "-=100"
                        // }, 400)
                     }   
                    
                    ,function() {
                    
                        $infoContainer.animate({
                            height: "-=150",
                            marginTop: "+=150"
                            }, 
                            100, 
                        )


                        $infoContentContainer.css('height','-=150');
                        $infoContentContainer.css('maxHeight','-=150');
                        
                    })

    //set first arnis tab to active
    $listNavigationContainer = $('.list-navigation-container')
    // $listNavigationContainer.find('ul li:first-child').addClass('active')    

    
    console.log($listNavigationContainer.find('.nav').find('.nav-item'))

})







