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
