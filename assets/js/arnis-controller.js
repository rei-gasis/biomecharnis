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
                            getOnsiteImage1($scope.arnisSelected.acf.onsite_image_1);
                            getOnsiteImage2($scope.arnisSelected.acf.onsite_image_2);
                            getOnsiteImage3($scope.arnisSelected.acf.onsite_image_3);
                            getGMData($scope.arnisSelected.id);

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





                function getGMData($arnisId) {
                    // console.log($arnisId)
                    // let gm = new Object();
                    if ($arnisId) {
                        $http.get($baseUrl + '/wp-json/wp/v2/arnis_system?parent=' + $arnisId)
                            .then(
                                async response => {
                                        $scope.arnisSelected.GMData = await response.data;

                                        // console.log($scope.arnisSelected.GMData)
                                        /*Fetch Image URL*/
                                        angular.forEach($scope.arnisSelected.GMData, function(gm) {
                                            // console.log('looping gm data')
                                            if (gm.acf.grandmaster_image[0])
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


                function getOnsiteImage1($id) {
                    if ($id) {
                        $http.get($requestMediaUrl + $id)
                            .then(function(response) {

                                // console.log(response)
                                if (!angular.isUndefined(response.data.guid))
                                    $scope.arnisSelected.onsiteImage1 = response.data.guid.rendered;
                                else
                                    $scope.arnisSelected.onsiteImage1 = '';


                            }, function(error) {
                                console.log(error);
                            })
                    } else {
                        // console.log('no img id')
                        $scope.arnisSelected.onsiteImage1 = '';
                    }
                }

                function getOnsiteImage2($id) {
                    if ($id) {
                        $http.get($requestMediaUrl + $id)
                            .then(function(response) {
                                if (!angular.isUndefined(response.data.guid))
                                    $scope.arnisSelected.onsiteImage2 = response.data.guid.rendered;
                                else
                                    $scope.arnisSelected.onsiteImage2 = '';
                            }, function(error) {
                                console.log(error);
                            })
                    } else {
                        $scope.arnisSelected.onsiteImage2 = '';
                    }
                }




                function getOnsiteImage3($id) {
                    if ($id) {
                        $http.get($requestMediaUrl + $id)
                            .then(function(response) {
                                if (!angular.isUndefined(response.data.guid))
                                    $scope.arnisSelected.onsiteImage3 = response.data.guid.rendered;
                                else
                                    $scope.arnisSelected.onsiteImage3 = '';
                            }, function(error) {
                                console.log(error);
                            })
                    } else {
                        $scope.arnisSelected.onsiteImage3 = '';
                    }

                }

                $scope.setSelectedOnsiteImage = function(img) {
                    // console.log('clicked');
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

                    $scope.arnisSelected = $scope.arnisList[currentArnisSystem];



                    // let getOnsiteImages = async() => {
                    // 	$scope.arnisSelected.onsiteImage1 = getMediaUrl($scope.arnisSelected.acf.onsite_image_1)
                    // 	$scope.arnisSelected.onsiteImage2 = getMediaUrl($scope.arnisSelected.acf.onsite_image_2)
                    // 	$scope.arnisSelected.onsiteImage3 = getMediaUrl($scope.arnisSelected.acf.onsite_image_3)
                    // 		result = await Promise.all([$scope.arnisSelected.onsite_image_1
                    // 								   ,$scope.arnisSelected.onsite_image_2
                    // 								   ,$scope.arnisSelected.onsite_image_3])
                    // 		return result;
                    // }

                    // console.log($scope.arnisList[currentArnisSystem])

                    setArnisInfo();


                    carousel.css({
                        "-webkit-transform": "rotateY(" + currdeg + "deg)",
                        "-moz-transform": "rotateY(" + currdeg + "deg)",
                        "-o-transform": "rotateY(" + currdeg + "deg)",
                        "transform": "rotateY(" + currdeg + "deg)"
                    });

                    // console.log($scope.arnisList[currentArnisSystem]);

                }


                function setArnisInfo(){
                	if (!$scope.arnisList[currentArnisSystem].onsiteImage1 || typeof $scope.arnisList[currentArnisSystem].onsiteImage1 === undefined)
                        getOnsiteImage1($scope.arnisSelected.acf.onsite_image_1);

                    if (!$scope.arnisList[currentArnisSystem].onsiteImage2 || typeof $scope.arnisList[currentArnisSystem].onsiteImage2 === undefined)
                        getOnsiteImage2($scope.arnisSelected.acf.onsite_image_2);

                    if (!$scope.arnisList[currentArnisSystem].onsiteImage3 || typeof $scope.arnisList[currentArnisSystem].onsiteImage3 === undefined)
                        getOnsiteImage3($scope.arnisSelected.acf.onsite_image_3);

                    if (!$scope.arnisList[currentArnisSystem].GMData || typeof $scope.arnisList[currentArnisSystem].GMData === undefined)
                        getGMData($scope.arnisList[currentArnisSystem].id);
                }


                $scope.prevArnis = function() {


                    currdeg = currdeg + 45;

                    if (currentArnisSystem < 1) {
                        currentArnisSystem = 7
                    } else {
                        currentArnisSystem = currentArnisSystem - 1;
                    }

                    $scope.arnisSelected = $scope.arnisList[currentArnisSystem];

                    setArnisInfo();
                    


                    // console.log($scope.arnisList[currentArnisSystem]);


                    carousel.css({
                        "-webkit-transform": "rotateY(" + currdeg + "deg)",
                        "-moz-transform": "rotateY(" + currdeg + "deg)",
                        "-o-transform": "rotateY(" + currdeg + "deg)",
                        "transform": "rotateY(" + currdeg + "deg)"
                    });

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

                    // $scope.activeCarouselIdx = getActiveCarouselIdx();

                    // console.log(getActiveCarouselIdx())

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

})

