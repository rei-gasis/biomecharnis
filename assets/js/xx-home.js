$().ready(function(){

	/*Biomecharnis section*/
	var parallaxScene = document.getElementById('parallax-scene')
	var parallaxInstance = new Parallax(parallaxScene)

	

	$biomecharnisContent = $('#biomecharnis-content')
	$biomecharnisContent.children().css('opacity', '0')
	$biomecharnisContent.find('#biomecharnis-tab').css('opacity', '1')
	$biomecharnisContent.find('#main-content').css('opacity', '1')
	

	$("#biomecharnis-tab a[href^='#']").click(function(e) {
		e.preventDefault()

		$biomecharnisContent.children().css('opacity', '0') //hide others
		$($(this).attr("href")).css('opacity', '1') //show elected

		// var position = $($(this).attr("href")).offset().top
		var position = $($(this).attr("href")).prop("offsetTop")

		$biomecharnisContent.animate({
			scrollTop: position
		}, 50 );

		// console.log(position)
		// console.log($($(this).attr("href")).prop("offsetTop"))
		// console.log($($(this).attr("href")).offset())



	})


	



})