function SKStage() {
  this.parentEl = "body";
  this.paralexBg = config.paralexBg;
  this.homePageCf = config.HomePage;
  this.stageEl = null;
  this.backgroundEl = null;
  this.cloudsEl = null;
  this.cloudsEllrg = null;
  this.bgHill = null;
  this.getStartBtnEl = null;
  this.homePageEl = null;
  this.window = $(window);
  this.el = [];
  this.sliderCount = 2;
  this.LEFTARROW_IDX = 0;
  this.RIGHTARROW_IDX = 1;
  this.curIdx = 0;
  this.paralexTranslateVal = 120;
  this.getstartedTXT = "get started";
  this.pushSliderEl = [];
}

SKStage.prototype = {
  stageParalexMove: function() {
    var _self = this;
    var pos = _self.curIdx * _self.window.width();

    _self.stageEl.css({ "-webkit-transform": "translateX(-" + pos + "px)" });
    _self.stageEl.css({ transform: "translateX(-" + pos + "px)" });

    $.each(_self.el, function(i, dom) {
      var count = _self.paralexTranslateVal * i * _self.curIdx;
      dom.css({ "-webkit-transform": "translateX(-" + count + "px)" });
      dom.css({ transform: "translateX(-" + count + "px)" });
    });
  },
  registerEvents: function() {
    var _self = this;

    $(".sk-arw-itm")
      .off()
      .on("click", function(e) {
        e.stopImmediatePropagation();

        var left = 0;
        if ($(this).attr("indx") == _self.LEFTARROW_IDX) {
          _self.curIdx--;
          _self.curIdx = -1 == _self.curIdx ? 0 : _self.curIdx;

          setTimeout(function() {
            $("#popup-youtube-player")[0].contentWindow.postMessage(
              '{"event":"command","func":"' + "pauseVideo" + '","args":""}',
              "*"
            );
          }, 1000);
        } else {
          if (_self.sliderCount > _self.curIdx) {
            _self.curIdx++;
          }
        }

        _self.stageParalexMove();
        console.log(_self.curIdx);
      });

    _self.getStartBtnEl.off().on("click", function(e) {
      e.stopImmediatePropagation();

      var sliderfirst = _self.stageEl.width() / _self.sliderCount;
      _self.stageEl.css({ transform: "translateX(-" + sliderfirst + "px)" });

      $.each(_self.el, function(i, dom) {
        var count = _self.paralexTranslateVal * i * 1;
        dom.css({ "-webkit-transform": "translateX(-" + count + "px)" });
        dom.css({ transform: "translateX(-" + count + "px)" });
      });
      _self.curIdx++;
      //console.log(_self.curIdx);
    });
  },
  createPage: function() {
    var _self = this;

    _self.homePageEl = $("<div>", { class: "hp-mainwrapper-el anim" })
      .width(_self.window.width())
      .height(_self.window.height())
      .appendTo(_self.stageEl);

    $.each(_self.homePageCf, function(i, val) {
      var el = $("<img>", {
        class: "hp-el anim " + val.name + "",
        idx: i,
        src: val.imgUrl
      })
        .css({
          top: val.top,
          height: val.height,
          left: val.left,
          "z-index": _self.homePageCf.length - i + 5,
          "transition-delay": (i + 10) * 80 + "ms",
          "-webkit-transition-delay": i * 80 + "ms"
        })
        .appendTo(_self.homePageEl);
      _self.el.push(el);
      console.log();
    });

    _self.getStartBtnEl = $("<div>", {
      class: "hp-getstarted-btn anim",
      text: _self.getstartedTXT
    }).appendTo(_self.homePageEl);

    for (var i = 0; i < _self.sliderCount; i++) {
      var paralxSliderPageEl = $("<div>", {
        class: "slidr-paralxSliderPage-el anim",
        id: "id-paralxSliderPage-" + i + 1,
        indx: i + 1
      })
        .css({
          left: _self.window.width() * (i + 1) + "px"
        })
        .width(_self.window.width())
        .height(_self.window.height())
        .appendTo(_self.stageEl);
      _self.pushSliderEl.push(paralxSliderPageEl);
    }
  },
  renderUI: function() {
    var _self = this;
    var el = null;

    _self.mainWrapper = $("<div>", { class: "sk-main-wrapper" }).appendTo(
      _self.parentEl
    );
    _self.mainWrapper.width(_self.window.width()).height(_self.window.height());

    _self.stageEl = $("<div>", {
      class: "sk-stage-wrapper active anim"
    }).appendTo(_self.mainWrapper);
    _self.stageEl.width(_self.window.width() * _self.sliderCount);

    _self.createPage();

    $.each(_self.paralexBg, function(i, val) {
      el = $("<div>", { class: "paralex-el anim " + val.name + "", idx: i })
        .css({
          background: "url(" + val.imgUrl + ")",
          "z-index": _self.paralexBg.length - i,
          "transition-delay": i * 80 + "ms"
        })
        .appendTo(_self.stageEl);
      el.width(_self.window.width() * _self.sliderCount + 7000);

      _self.el.push(el);
    });

    var stgChild = _self.stageEl.children();
    stgChild.addClass("starter");

    var hompageChil = _self.stageEl.find(_self.homePageEl).children();
    hompageChil.addClass("starter");

    $("<div>", { class: "sk-arw-itm left", indx: 0 }).appendTo(
      _self.mainWrapper
    );
    $("<div>", { class: "sk-arw-itm right", indx: 1 }).appendTo(
      _self.mainWrapper
    );

    _self.registerEvents();
  },
  init: function() {
    var _self = this;
    var localIndxChngClbk = function(booleanVal) {
      if (booleanVal) {
        _self.curIdx++;
        _self.stageParalexMove();
      }
      //return booleanVal;
    };
    _self.renderUI();
    _self.paralexslider = new SKParalexSlider();
    _self.paralexslider.getSliderEl = _self.pushSliderEl;
    _self.paralexslider.parentEl = _self.stageEl;
    _self.paralexslider.sliderCount = _self.sliderCount;
    _self.paralexslider.onbackSetclbk = function(idx) {
      localIndxChngClbk(idx);
    };
    _self.paralexslider.renderUi();
  }
};
