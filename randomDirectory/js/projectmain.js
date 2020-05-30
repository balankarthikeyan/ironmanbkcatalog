$(document).ready(function() {
  var o = new SKStage();
  o.parentEl = ".epic-wrapper";
  o.init();
  var windowItm = $(window);
  //   bannerSizing();

  function bannerSizing() {
    var elem = $("body");
    var scale = windowItm.outerWidth(true) / 1920;

    $(elem).css({ transform: " scale(" + scale + ")" });
  }
  //  windowItm.resize(function() {

  //         bannerSizing();
  //     });
  //     bannerSizing();
});
