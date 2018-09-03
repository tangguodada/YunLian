$(document).ready(function(){
  var menu = $('.sidermenu .navmenu');
  menu.click(function () {
    for (var i=0;i<menu.length;i++) {
      menu[i].className ="navmenu";
    }
    this.className ="current";
  })
});
