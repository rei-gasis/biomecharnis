angular.module('arnisApp', ['ngSanitize'])
    .controller('arnisListController', function($scope, $http, $q) {

        // $scope.slides = [{"arnisSystemDesc": "This is a description"},
        //                  {"onsiteImages": [{"image1": "img"},
        //                                     {"image2": "img"}
        //                                     ]
        //                  },
        //                  {"gmData": [{"gm1": "nene"},
        //                              {"gm2": "rey"}
        //                             ]
        //                  },
        //                  ]
                        
                        
        $scope.slides = [];

        // console.table($scope.slides)

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



                    



                    // $($event.currentTarget).parent().children().removeClass('active')
                    // $($event.currentTarget).addClass('active')




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

    


    // $listNavigationContainer.find('ul li:first-child').addClass('active')    

    
    // console.log($listNavigationContainer.find('.nav').find('.nav-item'))

})







