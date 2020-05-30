function SKParalexSlider() {
  this.parentEl = "body";
  this.getSliderEl = null;
  this.overlaySliderWrpEl = null;
  this.overlaySliderWidth = 1300;
  this.overlaySliderHeight = 750;
  this.window = $(window);
  this.skCarousel = null;
  this.titleTXT = "characters";
  this.paralexSliderCf = config.ParalexSlider;
  this.sliderCount = null;
  this.specLargeImgEl = null;
  this.onbackSetclbk = null;
}

SKParalexSlider.prototype = {
  registerEvents: function () {
    var _self = this;
    var spanelItem = $(".sk-ovrlysldr-spanel");

    spanelItem.on("click", function () {
      _self.getSliderEl[1].empty();

      setTimeout(function () {
        _self.parentEl.css({
          transform:
            "translateX(-" + _self.window.width() * _self.sliderCount + "px)",
        });
      }, 200);
      //$('#popup-youtube-player')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');

      _self.specfiItemPage($(this).attr("indx"));
      _self.onbackSetclbk("true");
    });
  },
  specfiItemPage: function (indx) {
    var _self = this;

    _self.specfiWrapper = $("<div>", { class: "sk-spec-wrapper" }).appendTo(
      _self.getSliderEl[1]
    );
    _self.specLargeImgEl = $("<img>", {
      class: "sk-spec-img-panel",
      src: _self.paralexSliderCf[indx].LrgImgUrl,
    }).appendTo(_self.specfiWrapper);

    _self.popOverlay = $("<div>", { class: "sk-spec-overlay" }).appendTo(
      _self.specfiWrapper
    );
    _self.popOverlaySubKit = $("<div>", {
      class: "sk-spec-overlay-sub",
    }).appendTo(_self.popOverlay);

    $("<div>", {
      class: "sk-spec-title",
      text: _self.paralexSliderCf[indx].name || "Title",
    }).appendTo(_self.popOverlaySubKit);

    _self.contentEl = $("<div>", { class: "sk-spec-overly-cont" }).appendTo(
      _self.popOverlaySubKit
    );

    _self.videoEl = $("<div>", { class: "sk-spec-video" }).appendTo(
      _self.contentEl
    );
    $("<iframe >", {
      id: "popup-youtube-player",
      class: "sk-spec-video",
      width: "650",
      height: "360",
      src:
        "https://www.youtube.com/embed/" +
        _self.paralexSliderCf[indx].youtubeId +
        "?enablejsapi=1&version=3&playerapiid=ytplayer",
    }).appendTo(_self.videoEl);
    $("<p>", {
      class: "sk-spec-desc",
      text: _self.paralexSliderCf[indx].description,
    }).appendTo(_self.contentEl);
  },
  sliderListItem: function () {
    var _self = this;
    _self.overlaySliderWrpEl = $("<div>", { class: "sk-ovrly-bg-slider" })
      .css({
        width: _self.overlaySliderWidth + "px",
        height: _self.overlaySliderHeight + "px",
        left: (_self.window.width() - _self.overlaySliderWidth) / 2 + "px",
        top: (_self.window.height() - _self.overlaySliderHeight) / 2 + "px",
      })
      .appendTo(_self.getSliderEl[0]);

    var title = $("<div>", {
      class: "sk-ovrly-title-txt",
      text: _self.titleTXT,
    }).appendTo(_self.overlaySliderWrpEl);
    var sliderEl = $("<div>", { class: "sk-ovrly-sliderCont" }).appendTo(
      _self.overlaySliderWrpEl
    );
    var grnyParent = $("<div>", { class: "sk-ovrly-grnyParent anim" }).appendTo(
      sliderEl
    );
    var itmParent = $("<div>", {
      class: "sk-ovrlysldr-grParent-el anim",
    }).appendTo(grnyParent);

    $.each(_self.paralexSliderCf, function (i, val) {
      var el = $("<div>", { class: "sk-ovrlysldr-spanel", indx: i }).appendTo(
        itmParent
      );

      var photoEl = $("<img>", {
        class: "sk-photo-el anim",
        src: val.thumImgUrl,
        indx: i,
      }).appendTo(el);

      var titlePhotoEl = $("<div>", {
        class: "sk-photo-titl",
        text: val.name,
        indx: i,
      }).appendTo(el);

      console.log(val.thumImgUrl);
    });

    _self.skCarousel = new SKCarousel();
    _self.skCarousel.grParent = grnyParent;
    _self.skCarousel.itemsParent = itmParent;
    _self.skCarousel.isTablet = true;
    //_self.skCarousel.arrowImgUrl   = ""; // read the image url value from widget property and assign

    _self.skCarousel.viewCount = 3;
    _self.skCarousel.type = "horizontal";
    _self.skCarousel.addDimensions = true;
    _self.skCarousel.init();
  },
  renderUi: function () {
    var _self = this;

    _self.sliderListItem();

    _self.specfiItemPage(0);
    _self.registerEvents();
  },
};
