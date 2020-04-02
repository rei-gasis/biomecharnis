angular.module('arnisApp', [])
  .controller('ArnisListController', function($scope) {

  	


    // var todoList = this;
    // todoList.todos = [
    //   {text:'learn AngularJS', done:true},
    //   {text:'build an AngularJS app', done:false}];
 
    // todoList.addTodo = function() {
    //   todoList.todos.push({text:todoList.todoText, done:false});
    //   todoList.todoText = '';
    // };
 
    // todoList.remaining = function() {
    //   var count = 0;
    //   angular.forEach(todoList.todos, function(todo) {
    //     count += todo.done ? 0 : 1;
    //   });
    //   return count;
    // };
 
    // todoList.archive = function() {
    //   var oldTodos = todoList.todos;
    //   todoList.todos = [];
    //   angular.forEach(oldTodos, function(todo) {
    //     if (!todo.done) todoList.todos.push(todo);
    //   });
    // };
  });


$().ready(function(){
	$container = $('.arnis-system-info-container')
	$card = $('.arnis-system-info-container .card')
	$cardHeight = $('.arnis-system-info-container .card').css("height")
	$arnisDesc = $('.arnis-system-info-container .card .arnis-desc')
	$carouselOnsite = $('.arnis-system-info-container .card .card-body #carouselOnsite')
	
	$animationSpeed = 1000;
	


	$arrowUp = $('.arnis-system-info-container .card-body .show-more-info')
	$arrowDown = $('.arnis-system-info-container .card-body .hide-more-info')


	// $arnisSystemImageContainer = $('.arnis-system-info-container .img-container')

	/*Init elements*/
	$arnisDesc.hide();
	$carouselOnsite.hide();
	$arrowDown.hide();
	// $arnisSystemImageContainer.hide();

	


	/*Arrow Up*/
	$arrowUp.on('click', function(){
		// if($container)
		// 	($container).animate({
		// 		top: "5%",

		// 	}, 
		// 	$animationSpeed, 
		// 	function(){
		// 		$arrowUp.hide();
		// 		$arrowDown.show();
				
		// 	});

		// if($card)
		// 	($card).animate({
		// 		height: "800px"
		// 	},
		// 	$animationSpeed
		// 	)
		if($arnisDesc)
			($arnisDesc).fadeOut("slow", showOnsite());


	});


	function showOnsite(){
		// alert('a')
	}




	/*Arrow Down*/
	$arrowDown.on('click', function(){
		if($container)
			($container).animate({
				top: "60%",
				
			}, 
			$animationSpeed, 
			function(){
				$arrowUp.show();
				$arrowDown.hide();
				
			});

		if($card)
			($card).animate({
				height: $cardHeight
			},
			$animationSpeed,
			null
			)
	});

})