$().ready(function(){


  // let currentPage = 1;

  function PageTransitions() {
    const pages = $('#sections');

    const positions = {
      front: 0,
      right: -90,
      back: 180,
      left: 90 };


    const getCurrentTransform = () => {
      let currentTransform = pages[0].style.transform.match(/-?\d+/g) || 0;
      currentTransform !== 0 ? currentTransform = parseInt(currentTransform[0]) : currentTransform = 0;
      
      return currentTransform;
    };

    const moveCube = page => {
      let target = positions[page];
      animateCube(target);
    };


    
    const changePage = direction => {

      let veloIsAnimating = pages.attr('class');
      let end = direction === 1 ? -360 : 360;
      let step = direction === 1 ? 90 : -90;
      if (!veloIsAnimating) {
        let current = getCurrentTransform();
        if (current === end) {
          pages.velocity(
          {
            rotateY: [0] },

          {
            duration: 0,
            complete: () => {
              current = getCurrentTransform();
              let target = current + step;
              animateCube(target);
            } });


        } else {
          let target = current + step;
          animateCube(target);
        }
        
      }
    };

    const rotateSpeed = 1000; //

    const animateCube = target => {
      pages.velocity(
      {
        rotateY: [target] },

      {
        duration: rotateSpeed,
        easing: "easeOut" });

      // console.log('assigning current ' + target)
      // currentPage = target;

    };



    return {
      change: changePage,
      move: moveCube };


  }

  function Navigation(pagestrs) {
    const nav = $('nav');
    const buttons = nav.find('#buttons');
    const menu = nav.find('#menu');
    const buttonsNavi = buttons.find('.buttons-navi');
    const buttonPrev = buttonsNavi.find('.button:nth-child(1)');
    const buttonNext = buttonsNavi.find('.button:nth-child(2)');
    const buttonNextContent = buttonNext.find('.button-next');
    const buttonPrevContent = buttonPrev.find('.button-prev');
    const buttonMenu = buttons.find('.buttons-menu .button');
    const menuItems = menu.find('li');
    const buttonMenuContent = buttonMenu.find('.button-wrapper');
    const topSpan = buttonMenuContent.find('span:nth-child(1)');
    const middleSpan = buttonMenuContent.find('span:nth-child(2)');
    const bottomSpan = buttonMenuContent.find('span:nth-child(3)');
    const spans = [topSpan, middleSpan, bottomSpan];

    const windowOnUnload = fn => {
      const unload = () => {
        fn();
        window.removeEventListener('unload', unload);
      };
      window.addEventListener('unload', unload);
    };

    const animateChangePageButton = () => {
      const animateContent = event => {
        event.data.object.velocity(
        {
          scale: [1, 0] },

        {
          duration: 1000,
          easing: 'spring' });


      };

      buttonNext.on('mouseenter', { object: buttonNextContent }, animateContent);
      windowOnUnload(() => {
        buttonNext.off('mouseenter', animateContent);
      });

      buttonPrev.on('mouseenter', { object: buttonPrevContent }, animateContent);
      windowOnUnload(() => {
        buttonPrev.off('mouseenter', animateContent);
      });
    };

    const handleNextPageClick = () => {
      const buttonNext = $('.et_pb_button_0_tb_body_wrapper');

      // console.log(buttonNext.length)
      const clickEvent = () => {
        pagestrs.change(0);
      };
      buttonNext.on('click', clickEvent);
      windowOnUnload(() => {
        buttonNext.off('click', clickEvent);
      });
    };

    const handlePrevPageClick = () => {
      const buttonPrev = buttons.find('.buttons-navi .button:nth-child(1)');
      const clickEvent = () => {
        pagestrs.change(1);
      };
      buttonPrev.on('click', clickEvent);
      windowOnUnload(() => {
        buttonPrev.off('click', clickEvent);
      });
    };



    const animateManuButton = () => {
      topSpan.velocity(
      {
        rotateZ: '135deg',
        top: '12px' },

      {
        duration: 300 });


      middleSpan.velocity(
      {
        right: '40px',
        opacity: 0 },

      {
        duration: 300 });


      bottomSpan.velocity(
      {
        rotateZ: '-135deg',
        top: '12px' },

      {
        duration: 300 });


    };

    const reverseManuButtonAnimation = () => {
      spans.forEach(span => {
        span.velocity('reverse');
      });
    };

    const menuIn = () => {
      buttonsNavi.hide();
      menu.show();
      menu.velocity(
      {
        translateY: [0, -180],
        scale: [1, 0],
        opacity: [1, 0] },

      {
        duration: 2000,
        easing: "spring" });


    };

    const menuOut = () => {
      buttonsNavi.show();
      menu.velocity(
      "reverse",
      {
        duration: 1000,
        easing: "spring",
        complete: () => {
          menu.hide();
        } });


    };

    const menuItemsIn = () => {
      let delay = 200;
      menuItems.each((key, item) => {
        let it = $(item);
        it.show();
        it.velocity(
        {
          translateX: ["0vw", "-100vw"],
          backgroundColorAlpha: [0, 1] },

        {
          duration: 2000,
          easing: "spring",
          delay: delay });


        delay += 200;
      });
    };

    const naviInSeq = () => {
      const seq = [
      animateManuButton,
      menuIn,
      menuItemsIn];

      seq.forEach(anim => {
        anim();
      });
    };

    const naviOutSeq = () => {
      const seq = [
      reverseManuButtonAnimation,
      menuOut];

      seq.forEach(anim => {
        anim();
      });
    };

    const handleMenuButtonClick = () => {
      const handleToggle = () => {
        let veloIsAnimating = menu.attr('class');
        if (!veloIsAnimating) {
          let opacity = parseInt(middleSpan.css('opacity'));
          if (opacity === 1) {
            naviInSeq();
          } else {
            naviOutSeq();
          }
        }
      };
      buttonMenu.on('click', handleToggle);
      windowOnUnload(() => {
        buttonMenu.off('click', handleToggle);
      });
    };

    const menuItemClickSeq = [
    reverseManuButtonAnimation,
    menuOut,
    pagestrs.move];


    const handleManuItemClick = () => {
      const clickEvent = id => {
        menuItemClickSeq.forEach(anim => {
          anim(id);
        });
      };

      menuItems.each((key, item) => {
        let it = $(item);
        it.on('click', () => {
          clickEvent(it[0].id);
        });
        windowOnUnload(() => {
          it.off('click');
        });
      });
    };

    return {
      animateChangePageButton: animateChangePageButton,
      nextPage: handleNextPageClick,
      prevPage: handlePrevPageClick,
      menuButtonClick: handleMenuButtonClick,
      menuItemClick: handleManuItemClick };

  }

  function Apx(navigation, pagesTransition) {
    const pagesTrs = new pagesTransition();
    const navi = new navigation(pagesTrs);


    


  $(window).bind('keydown', function(e){
    if(e.key == "ArrowLeft"){
      pagesTrs.change(1)
      

    }else if(e.key == "ArrowRight"){
      pagesTrs.change(0)


    }
  })

  $('.page-navigation-container .nav-left').on('click', function(){
    pagesTrs.change(1)
  })


  $('.page-navigation-container .nav-right').on('click', function(){
    pagesTrs.change(0)
  })


  
    const domOnLoad = fn => {
      const unload = () => {
        window.removeEventListener('DOMContentLoaded', fn);
        window.removeEventListener('unload', unload);
      };
      window.addEventListener('DOMContentLoaded', fn);
      window.addEventListener('unload', unload);
    };

    const init = () => {
      const onInit = Object.values(navi);
      onInit.forEach(fn => {
        domOnLoad(fn);
      });
    };
    return {
      init: init };

  }

  const app = new Apx(Navigation, PageTransitions);
  app.init();

})
