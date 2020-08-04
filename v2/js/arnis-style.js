$().ready(()=>{
    $mContainer = $('#arnis-style .marmosetContainer')
    initMocapPlayer('http://localhost/biomecharnis/wp-content/uploads/2019/12/dovie-13-counts-dosepares-1.mview') 
    




    $currentViewer = 1

    $viewerBtnLeft = $('.viewer-button.left')
    $viewerBtnRight = $('.viewer-button.right')

    $('.viewer-button.left').on('click', {direction: 'LEFT'} , changeViewer)
    $('.viewer-button.right').on('click', {direction: 'RIGHT'} , changeViewer)

    function changeViewer(e){

        // console.log(e.data)
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
    

    function initMocapPlayer(marmosetURL){

        //remove previous
        if($mContainer)
            $mContainer.children().remove()

        // console.log('initmocap')
        $params = { width: 300, height: 450, autoStart: false };
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

        

        $vidOneContainer = $('.arnis-style-section .carousel-container .viewer_8');
        $vidTwoContainer = $('.arnis-style-section .carousel-container .viewer_2');
    
        
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
})


