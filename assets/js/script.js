$( document ).ready(function() {
    
    $('.home-slider').slick({
	  dots: true,
	  arrows: false,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 1,
	  slidesToScroll: 1,

	});

	setTimeout(function(){
	  $(".preloder").fadeOut()
	},3000);


	$(".close").click(function(){
	  $(".home-model").addClass("addNewClass")
	})

	// drag and drop icon

	const { fromEvent, interval } = rxjs;
	const { takeUntil, mergeMap, flatMap, map, merge } = rxjs.operators;
	// dom element
	const target = document.querySelector(".box");
	// event
	const mousemove = fromEvent(document, "mousemove").pipe(
	  merge(fromEvent(document, "touchmove"))
	);
	const mouseup = fromEvent(target, "mouseup").pipe(
	  merge(fromEvent(target, "touchend"))
	);
	const mousedown = fromEvent(target, "mousedown").pipe(
	  merge(fromEvent(target, "touchstart"))
	);
	// create drag observerble
	const drag = mousedown.pipe(
	  flatMap(md => {
	    let startX, startY, startLeft, startTop;

	    if (md.type.startsWith("mouse")) {
	      startX = md.clientX + window.scrollX;
	      startY = md.clientY + window.scrollY;
	      startLeft = parseInt(md.target.style.left, 10) || 0;
	      startTop = parseInt(md.target.style.top, 10) || 0;
	      console.log(startTop, ' ', startLeft)
	    } else {
	      startX = md.touches[0].clientX + window.scrollX;
	      startY = md.touches[0].clientY + window.scrollY;
	      startLeft = parseInt(md.target.style.left, 10) || 0;
	      startTop = parseInt(md.target.style.top, 10) || 0;
	    }

	    return mousemove.pipe(
	      map(mm => {
	        if (mm.type.startsWith("mouse")) {
	          return {
	            left: startLeft + mm.x - startX,
	            top: startTop + mm.y - startY
	          };
	        } else {
	          return {
	            left: startLeft + mm.touches[0].clientX - startX,
	            top: startTop + mm.touches[0].clientY - startY
	          };
	        }
	      }),
	      takeUntil(mouseup)
	    );
	  })
	);
	// subscription
	const subscription = drag.subscribe(pos => {
	  target.style.top = pos.top + "px";
	  target.style.left = pos.left + "px";
	});


});

