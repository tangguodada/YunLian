$(function() {
  $(window).scroll(function() {
    var headtop = $(window).scrollTop();
    var height = 700 + 60 - $(window).height() ;
    if (headtop > height){
      $(window).scrollTop(height);
    }else {
      var slidertop = $(window).scrollTop() + 60;
      $('.sidermenu').css({top: slidertop + 'px'});
      $('.firstHeader').css({top: headtop + 'px'});
    }
  });
});
