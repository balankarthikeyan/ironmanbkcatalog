function SKCarousel() {
	
		this.grParent 		 = null;
		this.itemsParent	 = null;
		
		this.width			 = 0;
		this.height			 = 0;
		this.type			 = "horizontal";
		this.oneItemWidth	 = 0;
		this.oneItemHeight	 = 0;
		this.viewCount 		 = 0;
		this.horizontalPadding = 0;
		this.verticalPadding = 0;
		
		this.activeSlideIndex = 0;
		this.totalItems 	 = 0;
		this.totalSlides 	 = 0;
		
		this.leftArrow		 = null;
		this.rightArrow		 = null;
		
		this.arrows 		 = {
				left : {class: "skimgc_arw_left"},
				right: {class: "skimgc_arw_right"}
		}; 
		
		this.hideArrows 	 = false;
		this.enableNavigator = true;
		this.addDimensions 	 = true;
		this.doAvoidPadding	 = false;
		
		this.classNameList	= {
				grandparent: "skimgc_g_pr",
				itemsparent: "skimgc_items_pr",
				arrowdisable: "skimgc_arw_disable"
		};
		
		this.isTablet = false;
		
		this.arrowImgUrl	= "";
	
};


SKCarousel.prototype = {
		
		
		showError: function(msg) {
			
				if(msg && msg.length > 0) {
					console.log(msg);
				}
			
		},
		
		configure: function() {
			
				var _self = this;
				
				_self.viewCount = (_self.viewCount ? _self.viewCount : 1);
				
				var firstItem = $($(_self.itemsParent).children()[0]);
				var enableArrows = true;
				
				if(_self.totalItems == 0) {
					_self.totalItems = $(_self.itemsParent).children().length;
				}
				
				if(_self.totalSlides == 0) {
					_self.totalSlides = Math.ceil(_self.totalItems / _self.viewCount);
				}
				
				_self.oneItemWidth   = _self.oneItemWidth   || $(firstItem).outerWidth();
				_self.oneItemHeight  = _self.oneItemHeight  || $(firstItem).outerHeight();
				
				if(!_self.doAvoidPadding) {
					_self.horizontalPadding = _self.horizontalPadding || ($(firstItem).outerWidth(true)  - _self.oneItemWidth);
					_self.verticalPadding 	= _self.verticalPadding   || ($(firstItem).outerHeight(true) - _self.oneItemHeight);
				}
				
				enableArrows = (!_self.hideArrows && (_self.totalItems > _self.viewCount));
				
				if(enableArrows) {
					
					if(!_self.leftArrow) {
						_self.leftArrow  = $("<div>", _self.arrows.left).prependTo(_self.grParent);
					}
					
					if(!_self.rightArrow) {
						_self.rightArrow = $("<div>", _self.arrows.right).appendTo(_self.grParent);
					}
					
					if(_self.arrowImgUrl && _self.arrowImgUrl.length > 0) {
						_self.leftArrow.add(_self.rightArrow).css("background", "url("+ _self.arrowImgUrl +") no-repeat");
					}
			    	
					if(!_self.isTablet) {
						_self.leftArrow.add(_self.rightArrow).hide();
					}
			    }
				
				if(_self.type == "horizontal") {
					
					_self.width  = _self.viewCount * (_self.oneItemWidth + _self.horizontalPadding);
					_self.height = _self.oneItemHeight + _self.verticalPadding;
					
					if(enableArrows) {
						_self.leftArrow.attr('arrowview', 'left');
					    _self.rightArrow.attr('arrowview', 'right');
					}
					
				}
				else {
				    
					_self.width  = _self.oneItemWidth + _self.horizontalPadding;
					_self.height = _self.viewCount * (_self.oneItemHeight + _self.verticalPadding);
					
					if(enableArrows) {
						_self.leftArrow.attr('arrowview', 'top');
						_self.rightArrow.attr('arrowview', 'bottom');
					}
					
				}
				
				if(_self.addDimensions) {
					_self.grParent.css( { 'width' : _self.width, 'height' : _self.height });
					_self.itemsParent.children().css('width', _self.oneItemWidth);
				}
				
				var padding = ((_self.type == "horizontal") ? _self.horizontalPadding : _self.verticalPadding);
			    _self.itemsParent.css(((_self.type == "vertical") ? 'height' : 'width'), (_self.totalItems * (_self.oneItemWidth + padding)));
			
		},
		
		slideByIndex: function(idx) {
			
				var _self = this;
				_self.activeSlideIndex = idx;
				
				_self.slide(null, true);
			
		},
		
		slide: function(arrowview, isAutoCall) {
			
				var _self = this;
				
				_self.leftArrow.add(_self.rightArrow).removeClass(_self.classNameList.arrowdisable);
		    	
		    	var nextVisibleCount = 0;
		    	
		    	if(!isAutoCall) {
		    		if(arrowview == "left" || arrowview == "top") {
			    		_self.activeSlideIndex--;
		    		}
		    		else if(arrowview == "right" || arrowview == "bottom") {			    		
			    		_self.activeSlideIndex++;
		    		}
		    	}
		    	else {
		    		
		    		//if is not single slider
		    		if(_self.viewCount > 1) {
		    			_self.activeSlideIndex = Math.floor(_self.activeSlideIndex / _self.viewCount);
		    		}
		    		
		    	}
		    	if(_self.activeSlideIndex == 0) {
		    		_self.leftArrow.addClass(_self.classNameList.arrowdisable);
	    		}		
		    	else if(_self.activeSlideIndex == (_self.totalSlides-1)) {
		    		_self.rightArrow.addClass(_self.classNameList.arrowdisable);
	    			nextVisibleCount =  _self.viewCount - (_self.totalItems - (_self.viewCount * _self.activeSlideIndex)); 
	    		}
		    	
		    	var dimension = _self.oneItemWidth + _self.horizontalPadding;
		    	
		    	if(_self.type == "vertical") {
		    		dimension = _self.oneItemHeight + _self.verticalPadding;
		    	}
		    	
		    	var pos = -((_self.activeSlideIndex * (_self.viewCount * dimension)) - (nextVisibleCount * dimension));
		    	_self.itemsParent.css('transform', 'translate'+(_self.type == "vertical" ? "Y" : "X")+'('+ pos +'px)');
			
		},
		
		registerEvents: function() {
			
				var _self = this;
				
				
				if(_self.leftArrow && _self.leftArrow.length > 0 && _self.rightArrow && _self.rightArrow.length > 0) {
					
					if(!_self.isTablet) {
						_self.grParent.unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function(e) {
							_self.leftArrow.add(_self.rightArrow)[(e.type == "mouseenter" ? 'show' : 'hide')]();
					    });
					}
					
					//initial setup
					_self.slide();
					
					_self.leftArrow.add(_self.rightArrow).unbind('click').bind('click', function(e, isAutoCall) {
			    		
			    		e.stopImmediatePropagation();
			    		
			    		if(!$(this).hasClass(_self.classNameList.arrowdisable) || isAutoCall) {
			    			var aw = $(this).attr('arrowview');
			    			_self.slide(aw, isAutoCall);
			    		}
			    		
			    	});
					
				}
			
		},
		
		init: function() {
			
				var _self = this;
					
				if(!_self.grParent || _self.grParent.length == 0) {				
					_self.showError("ERROR: Grant parent is missing!");
					return;
				}
				
				if(!_self.itemsParent || _self.itemsParent.length == 0) {				
					_self.showError("ERROR: Items parent is missing!");
					return;
				}
				
				if($(_self.itemsParent).children().length == 0) {				
					_self.showError("ERROR: Items length should not be empty!");
					return;
				}
				
				_self.grParent.addClass(_self.classNameList.grandparent + " skimgc_type_"+_self.type);
				_self.itemsParent.addClass(_self.classNameList.itemsparent);
				
				_self.configure();
				_self.registerEvents();
			
		}
		
};
