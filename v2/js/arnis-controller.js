app = angular.module('arnisApp', ['ngSanitize'])
app.controller('arnisListController', function($scope, $http, $q, $rootScope) {

    $scope.$on('navController', function (event, arnis) {
        
        var deg = arnis.position * (-30);

        setCurrentViewer($($viewers[arnis.position]))
        setArnisInfo($rootScope.arnisList[arnis.position])

        // currentArnisSystem = position;
        currDeg = deg;
        currViewer = arnis.position + 1


        $(arnisCarousel).css({
            "-webkit-transform": "rotate3d(0, 1, 0, " + deg + "deg)",
            "-moz-transform": "rotate3d(0, 1, 0, " + deg + "deg)",
            "-o-transform": "rotate3d(0, 1, 0, " + deg + "deg)",
            "transform": "rotate3d(0, 1, 0, " + deg + "deg)"
        });
    });

                        
        $scope.slides = [];
        $scope.arnisStyles = []; //for view icon button
        var maxViewer = 0;
        var rotateDeg = 0;



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

                                //capture gmData
                                $scope.arnisStyles = response.data;
                                // $scope.currentArnisStyleURL = response.data[0].link

                                
                                angular.forEach(response.data, gm => {
                                    gmData.push(gm)
                                })

                                /*Fetch Image URL and preview mocap*/
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
                                            // return '';
                                        })
                                    }


                                    if(gm.acf.preview_mocap){
                                        $http.get($requestMediaUrl + gm.acf.preview_mocap[0])
                                        .then(function(response) {
                                            // console.log('fetched')
                                            if (!angular.isUndefined(response.data.guid)) {
                                                gm.preview_mocap = response.data.guid.rendered;
                                            }
                                        }, function(error) {
                                            console.log(error);
                                            // return '';
                                        })
                                    }
                                })

                                $scope.arnisStyles = gmData

                                // console.log($scope.arnisStyles)
                                // $scope.slides.push({'gmData': gmData})

                            })
                        })
                }

        $baseUrl = '';
        $rootScope.arnisList = null;

        $getBaseURL = getBaseURL();
        $getBaseURL
            .then(response => {
                // console.log('fetch')
                $baseUrl = response;
                $requestMediaUrl = 'http://localhost/biomecharnis/wp-json/wp/v2/media/';
                
                $scope.arnisSelected = null;
                $scope.selectedOnsiteImage = '';

                $http.get($baseUrl + '/wp-json/wp/v2/arnis_system?parent=0&per_page=100&orderby=title&order=asc') //base arnis systems
                    .then(
                        async response => {
                            $rootScope.arnisList = response.data;
                            $rootScope.arnisList = $rootScope.arnisList.filter(arnis => { return arnis.parent == "0" });
                            // $rootScope.arnisList = $rootScope.arnisList.filter(arnis => { return arnis.id == "931" });
                            maxViewer = $rootScope.arnisList.length
                            rotateDeg = 360 / $rootScope.arnisList.length

                            // setArnisInfo($rootScope.arnisList[0])


                            $listCtr = 1;
                            angular.forEach($rootScope.arnisList, function(arnis) {
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
                        
                    }
                }


                $scope.currentArnisStyleURL = '';
                $scope.setCurrentArnisStyle = url =>{
                    console.log(url)
                    $scope.currentArnisStyleURL = url;
                }


                $scope.setSelectedOnsiteImage = function(img) {
                    $scope.selectedOnsiteImage = img;

                    $modal = $('.arnis-list-section #onsiteImageModal');
                    $modal.css('display', 'block');

                }

                $scope.closeOnsiteImageModal = function() {
                    $modal = $('.arnis-list-section #onsiteImageModal');
                    $modal.css('display', 'none');
                }


                // let carousel = $(".arnis-list-section .carousel-container .carousel"),
                //     currdeg = 0,
                //     currentArnisSystem = 0;
            });

    

    //interactions

    //loaded Arnis Styles

    var arnisStyleList = document.querySelector('#arnis-style-list-section .arnis-style-list')

    // console.log(arnisStyleList)
    var arnisStyleListObserver = new MutationObserver(mutations => {

        var arnisStyleList = $('.arnis-style-list .arnis-style-item')
        fadeEach(arnisStyleList)

    })

    var config = { characterData: false, attributes: false, childList: true, subtree: true };
    arnisStyleListObserver.observe(arnisStyleList,config)



    $viewers = []
    $activeViewer = null;
    var arnisCarousel = document.querySelector('.carousel-container .carousel')
    var arnisSystemListObserver = new MutationObserver(mutations => {

        
        $viewers = $('.carousel .viewer')
        $activeViewer = $($viewers[0])
        $activeViewer.css({'cursor': 'pointer',
                            'box-shadow': 'rgb(113, 23, 18) 0px 0px 10px 1px, rgb(113, 23, 18) 0px 10px 20px 1px',
        })

        $activeViewer.on('click', () => {
            $('.arnis-modal').modal({'show': true})
        })


        // $(arnisCarousel).css('dislay','block')
        // $(arnisCarousel).delay(1000).fadeIn('slow')

    })

    var config = { characterData: false, attributes: false, childList: true, subtree: true };
    arnisSystemListObserver.observe(arnisCarousel,config)

    
    

    $carouselLeftBtn = $($('.carousel-nav button')[0])
    $carouselRightBtn = $($('.carousel-nav button')[1])


    $carouselLeftBtn.on('click', { direction: 'LEFT' }, rotate)
    $carouselRightBtn.on('click', { direction: 'RIGHT' }, rotate)

    var currDeg = 0
       ,currViewer = 1
       // ,maxViewer = 8;


    function rotate(e){

        

        if(e.data.direction === "LEFT"){
            currDeg = currDeg + rotateDeg;

            if(currViewer==1){
                currViewer = maxViewer
            }else{
                currViewer--
            }
            
        }else if(e.data.direction === "RIGHT"){
            currDeg = currDeg - rotateDeg;

            if(currViewer== maxViewer){
                currViewer = 1 
            }else{
                currViewer++
            }
        }
        

        // console.log(currViewer)
        
        
        setCurrentViewer($($viewers[currViewer-1]))

        

        $(arnisCarousel).css({'transform': 'rotateY(' +  currDeg + 'deg)'})

        setArnisInfo($rootScope.arnisList[currViewer-1]);

        // var arnisStyleList = $('.arnis-style-list .arnis-style-item')
        // fadeEach(arnisStyleList)

        // getArnisStyles()

    }


    function setCurrentViewer(viewer){

        //reset prev
        if($activeViewer){
            $activeViewer.off('click')
            $activeViewer.css({'cursor': 'none',
                               'box-shadow': '0px 20px 30px -20px black',
            })    
        }
        

        //assign new
        $activeViewer = viewer
        $activeViewer.on('click', ()=>{
            $('.arnis-modal').modal({'show': true})
        })

        $activeViewer.css({'cursor': 'pointer',
                           'box-shadow': 'rgb(113, 23, 18) 0px 0px 10px 1px, rgb(113, 23, 18) 0px 10px 20px 1px',
                        })

    }


})


//arnis style controller
app.controller('arnisStyleController', function($scope, $http, $q, $sce) {

        $baseUrl = 'http://localhost/biomecharnis/'
        $currentArnisStyleURL = ''
        $requestMediaUrl = 'http://localhost/biomecharnis/wp-json/wp/v2/media/'

        $scope.arnisInfo = null
        $scope.arnisSystem = null
        $scope.relatedStyles = []

        $scope.selectedTab = '3D MoCap'


        setArnisStyle()


        function setArnisStyle(){

            $hrefSegments = window.location.href.split('/')

            $slug = $hrefSegments.slice(-2, -1)[0]

            // get Media
            $http.get($baseUrl + '/wp-json/wp/v2/arnis_system?slug=' + $slug)
            .then(response=> {
                $scope.arnisInfo = response.data[0]

                getRelatedStyles()
                console.log($scope.arnisInfo)
                    
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

        

            $mViewer = null;
            $mContainer = $('#arnis-style .carousel-container .viewer .marmosetContainer')
            function initMocapPlayer(marmosetURL){

                //remove previous
                if($mContainer)
                    $mContainer.children().remove()

                // console.log('initmocap')
                
                // console.log('offset: ' + $mConta/iner[0].offsetWidth)
                

                $params = { width: $mContainer[0].offsetWidth, height: 450, autoStart: false };
                marmoset.transparentBackground = false;
                $mViewer = marmoset.embed( marmosetURL, $params );

                


                $mContainer.append($mViewer.domRoot)

                //resize
                $marmosetUI = $mContainer.find('#marmosetUI')
                $marmosetUICanvas = $mContainer.find('canvas')

                // console.log($marmosetUICanvas[0])

                $marmosetUIDiv = $mContainer.find('div:first-child')
                console.log($marmosetUI)
                $marmosetUI.addClass('arnis-style-viewer')
                // $marmosetUICanvas.addClass('arnis-style-viewer')
                $marmosetUIDiv.addClass('arnis-style-viewer')


                $mInitPayBtn = $mContainer.find('#marmosetUI > input[type="image"]')
                
                
                $mInitPayBtn.attr('src','http://localhost/biomecharnis/wp-content/themes/wp-bootstrap-starter - child v2/assets/images/biomecharnis-logo.png')
                $mInitPayBtn.css({'transform': 'translate(-50%, -50%) scale(0.25)',
                                  'opacity': '1',
                                  // 'cursor': 'pointer'
                                })

                

                // $vidOneContainer = $('.arnis-style-section .carousel-container .viewer_8');
                // $vidTwoContainer = $('.arnis-style-section .carousel-container .viewer_2');
            
                
                // $mViewer.ui.viewer.scene.sceneAnimator.pause(!0)
                $mPlayBtn = null;
                $mPauseBtn = null;
                $mViewer.onLoad = function(){
                    // $vidOneContainer.fadeOut(1000);
                    // $vidTwoContainer.fadeOut(1000);

                    waitPlayBtn('.arnis-style-section .carousel-container .viewer .marmosetContainer #marmosetUI > div > div > input[title="animationplay1x.png"]', 1000)
                    waitPauseBtn('.arnis-style-section .carousel-container .viewer .marmosetContainer #marmosetUI > div > div > input[title="animationpause1x.png"]', 1000)
                    
                }


                

                function waitPauseBtn(selector, time) {
                    
                    if($(selector).length > 0 ){
                    
                        $mPauseBtn = $(selector)
                        $mPauseBtn.on('click',function(){
                            // $vidOneContainer.fadeIn(1000);
                            // $vidTwoContainer.fadeIn(1000);
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
                            // $vidOneContainer.fadeOut(1000);
                            // $vidTwoContainer.fadeOut(1000);
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

        function getRelatedStyles(){

            //exclude current style
            $http.get($baseUrl + '/wp-json/wp/v2/arnis_system?parent=' + $scope.arnisInfo.parent + '&per_page=20&orderby=title&order=asc&exclude=' + $scope.arnisInfo.id)
            .then(response => {
                $scope.relatedStyles = response.data

                console.log(response)



            }, error => {
                console.log(error);
            })
        }
            
        
        $scope.trustSrc = function(src) {
          return $sce.trustAsResourceUrl(src);
        }

        //YT video ID
        function getVideoID(str){
            var n = str.search("v=") + 2;
            return str.substr(n);
        }
        
        


        $scope.nextViewer = function() {
       

        }



        $scope.view2D = function($event){

        }

        $scope.view3D = function($event){
            $scope.selectedTab = '3D MoCap'

        }

        


        $scope.viewSideBySide = function($event){
            
        }

        //controls
        $mContainer = $('#arnis-style .marmosetContainer')
        // initMocapPlayer('http://localhost/biomecharnis/wp-content/uploads/2019/12/dovie-13-counts-dosepares-1.mview') 
        
        $currentViewer = 1

        $viewerBtnLeft = $('.viewer-button.left')
        $viewerBtnRight = $('.viewer-button.right')

        $('.viewer-button.left').on('click', {direction: 'LEFT'} , changeViewer)
        $('.viewer-button.right').on('click', {direction: 'RIGHT'} , changeViewer)

        function changeViewer(e){

            
            if(e.data.direction == 'LEFT'){
                
                if($currentViewer == 0){
                    return
                }
                else{
                    if($currentViewer == 1)
                        $('a[href="#mocap"]').tab('show')
                    else if($currentViewer == 2)
                        $('a[href="#actual"]').tab('show')

                    $currentViewer--;
                }
            }


            if(e.data.direction == 'RIGHT'){
                
                if($currentViewer == 2){
                    return
                }
                else{
                    if($currentViewer == 0)
                        $('a[href="#actual"]').tab('show')
                    else if($currentViewer == 1)
                        $('a[href="#compare"]').tab('show')

                    $currentViewer++;
                }
            }
        }




    });




app.controller('navController', function($scope, $http, $rootScope) {
    // console.log('nav')
    $rootScope.arnisList = []

    $baseUrl = 'http://localhost/biomecharnis'

    $http.get($baseUrl + '/wp-json/wp/v2/arnis_system?parent=0&per_page=100&orderby=title&order=asc') //base arnis systems
        .then(
            response => {
                $rootScope.arnisList = response.data;

                // console.log('called')

                $(window).on('load', ()=>{

                    $hrefSegments = window.location.href.split('/')
                    $slug = $hrefSegments.slice(-2, -1)[0]
                    // console.log($slug)

                    $selectedArnis = null;


                    //home
                    if($slug == 'arnis-system'){
                        $selectedArnis = $rootScope.arnisList[0]
                        
                    }else{
                        $selectedArnis = $rootScope.arnisList.filter(arnis=>{ return arnis.slug == $slug })[0]    
                    }

                    $scope.viewArnisSystem($selectedArnis)
                })
                // console.log(response.data)
            })


    $scope.viewArnisSystem = function(arnis){

        let position = $rootScope.arnisList.indexOf(arnis)
        $scope.$emit('navController', {'position': position,
                                       'arnisSystem': arnis}
                                       );
    }    


    

    
})






