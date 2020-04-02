var carousel = $(".carousel-container .carousel"),
    currdeg  = 0,
    curr_item = 2;
;

$(".next-arnis").on("click", { d: "n" }, rotate);
$(".prev-arnis").on("click", { d: "p" }, rotate);


// $(".carousel > .item:first-child").on("click", { d: "p" }, rotate);
// $(".carousel > .item:last-child").on("click", { d: "n" }, rotate);
// $(".carousel .item").on("click", { d: "n" }, { alert('hi') });

function rotate(e){
  
  var currentItem = $('carousel-container carousel .item')
  // if(currentItem)
  //   console.log("yes")    
  // console.log(JSON.stringify(currentItem, null, 4))
  
  // if(curr_item === 1 || curr_item === 3) {
  //   return;
  // }
    
  
  if(e.data.d=="n"){
    // if(curr_item === 3)
    //   return;
    
    currdeg = currdeg - 45;
    curr_item = curr_item + 1;
    
  }
  if(e.data.d=="p"){
    
    // if(curr_item === 1)
    //   return;
    
    currdeg = currdeg + 45;
    curr_item = curr_item - 1;
  }
  
  carousel.css({
    "-webkit-transform": "rotateY("+currdeg+"deg)",
    "-moz-transform": "rotateY("+currdeg+"deg)",
    "-o-transform": "rotateY("+currdeg+"deg)",
    "transform": "rotateY("+currdeg+"deg)"
  });
  
}