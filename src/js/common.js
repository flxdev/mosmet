$(window).on('load', function() {
	stickinit();
	lazyImage();
	vrachRait();
});
document.addEventListener("DOMContentLoaded", function() {

	var conf = {
		body: $('body'),
		header: $('.page__header'),
		html: $('html'),
		hidden: 'is-hidden',
		wrpr: $('.wrapper'),
		stick: $('.js-stick'),
		arnextcontent: '<button type="button" class="slick-next slick-arrow"><div class="icon"><svg class="icon icon-drop"><use xlink:href="#smallarr" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></div></button>',
		arnprevcontent: '<button type="button" class="slick-prev slick-arrow"><div class="icon"><svg class="icon icon-drop"><use xlink:href="#smallarr" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></div></button>',
	};
	(function() {
		var mainHeader = document.querySelector('.cd-auto-hide-header');
		$(window).on('scroll', function() {
			requestAnimationFrame(autoHideHeader);
		});

		function autoHideHeader() {
			var currentTop = $(document).scrollTop();
			checkSimpleNavigation(currentTop);
		}

		function checkSimpleNavigation(currentTop) {
			if (currentTop <= 100) {
				mainHeader.classList.remove(conf.hidden);
			} else {
				mainHeader.classList.add(conf.hidden);
			}
		}
	})();
	function focusInp(){
		var inp = $('.biginput');
		inp.each(function(){
			var _ = $(this);
				parent = _.closest('.suggest-wrapper')
			_.on('input',function(){
				var len = _.val().length;
				if(len >= 3){
					parent.addClass('focus');
				}else{
					parent.removeClass('focus');
				}
			});
		});
	}focusInp();
	function Menu() {
		var trigger = $('.js-menu'),
			target = $('.mainmenu'),
			OpenClass = 'active',
			OpenClass2 = 'menu-open';

		trigger.add(target).on('click', function() {

			if (!trigger.hasClass('anim')) {
				trigger.addClass('anim');
				
				target.toggleClass(OpenClass);
				
				if(trigger.hasClass(OpenClass)){
					
					trigger.removeClass(OpenClass);
					conf.body.add(conf.header).removeClass(OpenClass2);

					window.__prevScrollTop && (window.scroll(0, window.__prevScrollTop));
					window.__prevScrollTop = null;
				}else{
					var top = $(window).scrollTop();
					window.__prevScrollTop = top;
					trigger.addClass(OpenClass);
					
					document.body.style.top = -top + "px";
					window.scroll(0, window.__prevScrollTop);
					setTimeout(function(){
						conf.body.add(conf.header).addClass(OpenClass2);
					},51)
					
				}
				setTimeout(function() {
					trigger.removeClass('anim')
				}, 500);
			}
		})
		$('.mainmenu-inner').click(function(e) {
			e.stopPropagation();
		});
	}
	Menu();
	function AddExpand(){
		var trigger = $('.js-showmore');
		trigger.each(function(){
			var _ = $(this);
			var target = _.parent().find('.js-showmore-target');
			var slider;
			
			setTimeout(function(){
				target.addClass('ready').hide();
			},500);
			_.on('click',function(){
				slider = target.find('.slick-slider');
				if(_.hasClass('active')){
					target.slideUp('normal');
					_.removeClass('active')
				}else{
					target.slideDown('normal',function(){
						setTimeout(function(){
							slider[0].slick.refresh();
						},300)

					})
					_.addClass('active')
				}
				_.toggleText();
			});
		});
	} AddExpand();
	function DesktopMenu(){
		var mainCont = $('.header-row-nav'),
			items = mainCont.find('.dropdown'),
			targetWrap = $('.page__header-drop'),
			blocks = $('.page__header-drop-item'),
			shown = 'is-shown',
			current = 'is-shown';

		items.each(function(){
			var _ = $(this),
				id = parseInt(_.data('id'));
			_.on('mouseenter touchstart',function(){
				if(targetWrap.find("[data-id="+ id +"]").length){
					_.addClass('active').siblings().removeClass('active');

					targetWrap.addClass(shown);
					targetWrap.find("[data-id="+ id +"]").addClass(current).siblings().removeClass(current);
				}else{
					targetWrap.removeClass(shown);
					items.removeClass('active')
				}
			})
		});
		items.add(targetWrap).on('mouseleave touchstart',function(){
			setTimeout(function(){
				if ($('.page__header-drop:hover').length != 1 && !$('.dropdown:hover').length != 0 ) {
					targetWrap.removeClass(shown).attr('style','');
					blocks.removeClass(current);
					items.removeClass('active');
				}
			},1)

		})
	}DesktopMenu();
	function Accordeon(){
		if($('.js-accordion-trigger').length){
			// $(".aside-stick").trigger("sticky_kit:detach");
			$(".aside-stick").stick_in_parent({
				offset_top : 73,
				// recalc_every: 1
			});
			var maintrigger = $('.js-accordion-trigger'),
				body = $('.js-accordion-body'),
				truetrigger = maintrigger.children('.table-item').not('.table-status').not('.table-btn');
			maintrigger.not('.active').find(body).hide();
			truetrigger.on('click',function(event){
				var parent = $(this).parent(),
					target = parent.find(body);

				if(parent.hasClass('active')){
					parent.siblings().removeClass('active').find(body).slideUp(200);
					parent.removeClass('active').find(body).slideUp(300);

				}else{
					parent.siblings().removeClass('active').find(body).slideUp(200);
					parent.addClass('active').find(body).slideDown(300, function(){
						var pos = parent.offset().top;
						jQuery("body:not(:animated)").animate({scrollTop: pos -80}, 500);
					});
				}
				setTimeout(function(){
					$('body').trigger('scroll')
				},801)
			});
		}
	}Accordeon();
	function indexslider(){
		$(".js-indexSlider").each(function() {
			var _this = $(this),
					parent = _this.parent();
			slidesCount(_this)
			_this.slick({
				accessibility: false,
				lazyLoad: 'ondemand',
				arrows: true,
				autoplay: true,
				autoplaySpeed: 8000,
				dots: false,
				fade: true,
				touchMove: false,
				dragable: false,
				infinite: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				adaptiveHeight: true,
				appendArrows: parent.find('.arr-wrap-inner'),
				prevArrow: conf.arnprevcontent,
				nextArrow: conf.arnextcontent,
			})
		});
	}indexslider();
	function contentslider(){
		$(".js-contentslider").each(function() {
			var _this = $(this),
					parent = _this.parent();
			slidesCount(_this)
			_this.slick({
				accessibility: false,
				lazyLoad: 'progressive',
				arrows: true,
				dots: false,
				fade: false,
				touchMove: false,
				dragable: false,
				infinite: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				adaptiveHeight: true,
				appendArrows: parent.find('.arr-wrap-inner'),
				prevArrow: conf.arnprevcontent,
				nextArrow: conf.arnextcontent,
			})
		});
	}contentslider();
	function sideslider(){
		$(".js-sideslider").each(function() {
			var _this = $(this),
					parent = _this.parent();
			_this.slick({
				accessibility: false,
				lazyLoad: 'ondemand',
				arrows: false,
				dots: true,
				fade: true,
				touchMove: false,
				dragable: false,
				infinite: false,
				autoplay: true,
				autoplaySpeed: 8000,
				slidesToShow: 1,
				slidesToScroll: 1,
				appendDots: parent.find('.dots-wrap'),
			})
		});
	}sideslider();
	function asideDrop(){
		var elem = document.querySelectorAll('.js-aside-drop');
		for(i=0; i<elem.length;i++){
			elem[i].addEventListener('click',function(e){
				if(e.target.classList.contains('aside-nav-link') && e.target.classList.contains('dropdown')) {
					e.preventDefault();
					var _ = this;
					if(_.classList.contains('active')){
						_.classList.remove('active');
					}else{
						for(i=0; i<elem.length;i++){
							elem[i].classList.remove('active');
						}
						_.classList.add('active');
					}
					setTimeout(function(){
						conf.stick.trigger("sticky_kit:recalc");
					},302)
				}
			});
		}
	}asideDrop();
	function player(){
		var players = $('.video-wrap');
		players.each(function(){
			var _ = $(this);
			_.on('click', function(e){
				_.addClass('played').find('iframe')[0].src += "?&autoplay=1";
				e.preventDefault();
			});
		});
	}player();
	function MobileDropdown(trigger, parent, target) {
		var trg = $(trigger),
			prnt = trg.closest(parent),
			trgt = prnt.find(target);
		trg.each(function() {
			$(this).on('click', function() {

				var item = prnt.find(trgt);
				if (item.hasClass('active')) {

					item.add($(this)).removeClass('active');
				} else {
					prnt.siblings().find(trgt).removeClass('active');
					item.add($(this)).addClass('active');
				}
			});
		});
	}
	MobileDropdown('.js-dropdown', '.js-dropdown-parent', '.js-dropdown-target');

	function Tabs() {
		if ($('.js-tabs-wrap').length) {

			var parent = $('.js-tabs-wrap');
			parent.each(function() {
				var _ = $(this),
					trigger = _.find('.js-tab-trigger'),
					tabbody = _.find('.tabs-body'),
					tabcont = tabbody.find('.tabs-cont'),
					triggerCur = _.find(trigger).filter('.active'),
					triggerIndex = triggerCur.index();

				if (!triggerCur.length) {
					tabcont.not(':first').hide();
					trigger.first().addClass('active');
				} else {
					tabcont.hide().eq(triggerIndex).show();
				}
				trigger.on('click', function(e) {
					var _ = $(this);
					e.preventDefault();
					if (!_.hasClass('active')) {
						_.addClass('active').siblings().removeClass('active');
						var triggerA = parent.find(trigger).filter('.active');
						tabcont.hide().eq($(triggerA).index()).fadeIn();
					}
				});
			});
		}
	}Tabs();
	$(".js-scroll-to").on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		var elementClick = $(this).data("href");
		var target = $('body').find('[data-id="' + elementClick + '"]');
		$(".aside-stick").trigger("sticky_kit:recalc");
		if(target.length){
			var destination = $(target).offset().top,
				pad = window.matchMedia('(max-width: 991px)').matches ? 70 : 118;
			$("html, body:not(:animated), .out:not(:animated)").animate({scrollTop: destination - pad}, 500);
		}
	});
	function otdelslider(){
		$(".js-otdel").each(function() {
			var _this = $(this),
					parent = _this.parent();
			slidesCount(_this)
			_this.slick({
				accessibility: false,
				lazyLoad: 'progressive',
				arrows: true,
				dots: true,
				touchMove: false,
				dragable: false,
				infinite: false,
				slidesToShow: 4,
				slidesToScroll: 4,
				appendDots: parent.find('.dots-wrap'),
				appendArrows: parent.parent().find('.arr-wrap-inner'),
				prevArrow: conf.arnprevcontent,
				nextArrow: conf.arnextcontent,
				responsive: [
					{
						breakpoint: 996,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
						}
					},
					{
						breakpoint: 675,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
							lazyLoad: 'ondemand',
						}
					},
					{
						breakpoint: 490,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,

						}
					},
				]
			})
		});
	}otdelslider();
	function diplomSlider(){
		$(".diplom-slider-inner").each(function() {
			var _this = $(this);
			var parent = _this.parent();
			slidesCount(_this)
			_this.slick({
				accessibility: true,
				lazyLoad: 'ondemand',
				arrows: true,
				draggable: false,
				autoplay: false,
				dots: false,
				fade: false,
				touchMove: false,
				infinite: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				appendArrows: parent.find('.arr-wrap-inner'),
				prevArrow: conf.arnprevcontent,
				nextArrow: conf.arnextcontent,
			});
		});
	}diplomSlider();

	function wideslider(){
		$(".js-wide").each(function() {
			var _this = $(this),
				parent = _this.parent();
			_this.slick({
				accessibility: false,
				lazyLoad: 'ondemand',
				arrows: true,
				dots: false,
				touchMove: false,
				dragable: false,
				infinite: true,
				slidesToShow: 5,
				slidesToScroll: 1,
				appendDots: parent.find('.dots-wrap'),
				appendArrows: parent.parent().find('.arr-wrap-inner'),
				prevArrow: conf.arnprevcontent,
				nextArrow: conf.arnextcontent,
				responsive: [
					{
						breakpoint: 1980,
						settings: {
							slidesToShow: 4,
						}

					},
					{
						breakpoint: 996,
						settings: {
							slidesToShow: 3,
						}
					},
					{
						breakpoint: 675,
						settings: {
							slidesToShow: 2,
						}
					},
					{
						breakpoint: 490,
						settings: {
							slidesToShow: 1,
						}
					},
				]
			})
		});
	}wideslider();

	function spec(){
		$(".js-specialist").each(function() {
			var _this = $(this),
					parent = _this.parent();
			slidesCount(_this)
			_this.slick({
				accessibility: false,
				lazyLoad: 'ondemand',
				arrows: true,
				dots: true,
				touchMove: false,
				dragable: false,
				infinite: true,
				slidesToShow: _this.hasClass('inner') ? 4 :8,
				slidesToScroll: _this.hasClass('inner') ? 4 :8,
				appendDots: parent.find('.dots-wrap'),
				appendArrows: parent.parent().find('.arr-wrap-inner'),
				prevArrow: conf.arnprevcontent,
				nextArrow: conf.arnextcontent,
				responsive: [
					{
						breakpoint: 1980,
						settings: {
							slidesToShow: _this.hasClass('inner') ? 4 :8,
							slidesToScroll: _this.hasClass('inner') ? 4 :8,
						}

					},
					{
						breakpoint: 1500,
						settings: {
							slidesToShow: _this.hasClass('inner') ? 4 :6,
							slidesToScroll: _this.hasClass('inner') ? 4 :5,
						}
					},
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: _this.hasClass('inner') ? 3 :5,
							slidesToScroll: _this.hasClass('inner') ? 3 :5,
						}
					},
					{
						breakpoint: 900,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4,
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
						}
					},
					{
						breakpoint: 600,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
						}
					},
					{
						breakpoint: 490,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						}
					},
				]
			})
		});
	}spec();
	function scaleVideo(){
		if($('.video-container').length){
			// if(isMobile()){
			// 	$('.video-container').find('.video-container-inner').remove();
			// }
			scaleVideoContainer();
			initBannerVideoSize('.video-container .poster img');
			initBannerVideoSize('.video-container .filter');
			initBannerVideoSize('.video-container video');

			$(window).on('resize', function() {
				scaleVideoContainer();
				scaleBannerVideoSize('.video-container .poster img');
				scaleBannerVideoSize('.video-container .filter');
				scaleBannerVideoSize('.video-container video');
			});
		}
	}
	scaleVideo();

	var suggestin = document.querySelectorAll('.js-suggest');
	suggesinput = new suggest(suggestin);

	popUpsInit();
	initCustomSelectList();
	validateForms();
	comenthide();
	var ajax = new AjaxLoading($(".ajax-trigger"));
	// initMap();
//end of document.ready
});
//end of document.ready
function scaleVideoContainer() {

	var height = $('.video-container').height() + 5;
	var unitHeight = parseInt(height) + 'px';
	$('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

	$(element).each(function(){
		$(this).data('height', $(this).height());
		$(this).data('width', $(this).width());
	});

	scaleBannerVideoSize(element);

}
// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) {
      return;
    }
    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();
        
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        
        this.appendChild(docFrag);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

function scaleBannerVideoSize(element){

	var windowWidth = $('.video-container').width(),
	windowHeight = $('.video-container').outerHeight() + 5,
	videoWidth,
	videoHeight;

	$(element).each(function(){
		var videoAspectRatio = $(this).data('height')/$(this).data('width');

		$(this).width(windowWidth);

		if(windowWidth < 1000){
			videoHeight = windowHeight;
			videoWidth = videoHeight / videoAspectRatio;
			$(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

			$(this).width(videoWidth).height(videoHeight);
		}

		$('.homepage-hero-module .video-container video').addClass('fadeIn animated');

	});
}
function stickinit() {
	setTimeout(function() {
		$(".js-stick").stick_in_parent({
			parent: ".aside-menu",
			offset_top: 110,
			// recalc_every: 1
		});
	}, 1)
}

function vrachRait(){
	var rait = $('.js-vrach-rait.start');
	rait.each(function(){
		var _ = $(this);
		var svg = _.find('svg .bar');
		var data = parseFloat(_.data('raiting'));
		var raiting = (100 * data) / 5;
		if (isNaN(raiting)) {
			raiting = 0; 
		}else{
			var r = svg.attr('r');
			var c = Math.PI*(r*2);
			if (raiting < 0) { raiting = 0;}
			if (raiting > 100) { raiting = 100;}

			var pct = ((100-raiting)/100)*c;
			svg.css({ strokeDashoffset: pct});
			rait.removeClass('start')
		}
	});
}
if (!window.Promise) {
  window.Promise = Promise;
}


function lazyImage(){
	// Get all of the images that are marked up to lazy load
	var arr = document.querySelectorAll('.js-image');
	var images = [];
	for(var i = 0; i < arr.length; i++){
		images.push(arr[i]);
	}

	var config = {
		rootMargin: '0px 0px',
		threshold: 0.01
	};

	var imageCount = images.length;
	var observer = void 0;
	// If we don't have support for intersection observer, loads the images immediately
	if (!('IntersectionObserver' in window)) {
		for(var i = 0; i < imageCount; i++){
			preloadImage(images[i]);
		}

	} else {
		// It is supported, load the images
		observer = new IntersectionObserver(onIntersection, config);

		for(var i = 0; i< imageCount; i++){
			if (images[i].classList.contains('js-image-handled')) {
				return;
			}

			observer.observe(images[i]);
		}
	}

	/**
	 * Fetchs the image for the given URL
	 * @param {string} url 
	 */
	function fetchImage(url) {

		return new Promise(function (resolve, reject) {
			var image = new Image();
			image.src = url;
			image.onload = resolve;
			image.onerror = reject;
		});
	}

	/**
	 * Preloads the image
	 * @param {object} image 
	 */
	function preloadImage(image) {
		
		var src = image.dataset.src;

		if (!src) {

			return;
		}

		return fetchImage(src).then(function () {

			applyImage(image, src);
		});
	}

	/**
	 * Load all of the images immediately
	 * @param {array} images 
	 */
	function loadImagesImmediately(images) {
		for(var i = 0; i< images.length; i++){
			return preloadImage(images[i]);
		}
		// Array.from(images).forEach(function (image) {
		// 	return preloadImage(image);
		// });
	}

	/**
	 * Disconnect the observer
	 */
	function disconnect() {
		if (!observer) {
			return;
		}

		observer.disconnect();
	}

	/**
	 * On intersection
	 * @param {array} entries 
	 */
	function onIntersection(entries) {
		// Disconnect if we've already loaded all of the images
		if (imageCount === 0) {
			observer.disconnect();
		}

		// Loop through the entries

		entries.forEach(function (entry) {
			// Are we in viewport?
			if (entry.intersectionRatio > 0) {
				imageCount--;

				// Stop watching and load the image
				observer.unobserve(entry.target);
				preloadImage(entry.target);
			}
		});
	}

	/**
	 * Apply the image
	 * @param {object} img 
	 * @param {string} src 
	 */
	function applyImage(img, src) {
		// Prevent this from being lazy loaded a second time.
		img.classList.add('js-image-handled');
		if(img.classList.contains('bg')){

			img.style.backgroundImage = "url("+src+")";
		}else{
			img.src = src;

		}
		img.classList.add('fade-in');
	}	
}
function modalDiplomSlider(){
	$(".big-image-slider-inner").each(function() {
		var _this = $(this);
		var parent = _this.parent();
		_this.slick({
			accessibility: false,
			lazyLoad: 'ondemand',
			arrows: false,
			draggable: false,
			autoplay: false,
			dots: false,
			fade: false,
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			asNavFor: parent.parent().find('.modal-container-slider-inner')
		});
	});
	$(".modal-container-slider-inner").each(function() {
		var _this = $(this);
		var parent = _this.parent();
		slidesCount(_this)
		_this.slick({
			accessibility: false,
			lazyLoad: 'ondemand',
			arrows: true,
			draggable: false,
			autoplay: false,
			dots: false,
			fade: false,
			touchMove: false,
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			appendArrows: parent.parent().find('.arr-wrap-inner'),
			prevArrow: '<button type="button" class="slick-prev slick-arrow"><div class="icon"><svg class="icon icon-drop"><use xlink:href="#smallarr" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></div></button>',
			nextArrow: '<button type="button" class="slick-next slick-arrow"><div class="icon"><svg class="icon icon-drop"><use xlink:href="#smallarr" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></div></button>',
			asNavFor: _this.closest('.modal-container').find('.big-image-slider-inner')
		});
	});
};
function initCustomSelectList() {
	var _conf = {
			initClass: 'cs-active',
			f: {}
		},
		_items = $('.js-select-custom');
	$.each(_items, function () {
		var _select = $(this),
			_button = _select.find('button'),
			placeholder = _button.data('placeholder'),
			_list = _select.find('.select-list');
		_select.on('reinit', function() {
			var _active = _list.find('input:checked');
			if(_active.length) {
				_button.children('.btn-text').addClass('active').text(''+_active.siblings('span').text()+'').parent().addClass('is-checked')
			}
			else {
				_button.children('.btn-text').removeClass('active').text(_button.data('placeholder')).parent().removeClass('is-checked');
			}
			 CheckForSelect($(this).parents('form'));
		});

		_button.off('click').on('click', function() {
			$(this).parent().toggleClass('active').siblings().removeClass('active');
			return false;
		});

		_list.off('change').on('change', 'input', function() {
			var _input = $(this);
			_input.prop('checked', true);
			_button.parent().removeClass('active');
			_select.trigger('reinit');

		});

		_select.trigger('reinit');
		_select.addClass(_conf.initClass);

		 $(document).on('mouseup', function (e){
			if (!_select.is(e.target)
				&& _select.has(e.target).length === 0) {
				_select.removeClass('active');
			}
		});
	});
}
function slidesCount(elem){
	var container = elem.parent().find('.slider-counter'),
		curSlideCont = container.find('.slider-curr'),
		totatSlideCont= container.find('.slider-total'),
		pages;

	elem.on('init reInit breakpoint beforeChange', function (event, slick, currentSlide, nextSlide) {
		var slidesShown = parseInt(slick.slickGetOption('slidesToShow')),
			slidesScroll = parseInt(slick.slickGetOption('slidesToScroll')),
			slidesNext = parseInt(nextSlide),
			totalSlides = parseInt(slick.slideCount),
			totalPages = Math.ceil(totalSlides / slidesShown),
			curPage = event.type == 'init' || event.type == 'reInit' || event.type == 'breakpoint'? 0 : parseInt(slidesNext/slidesScroll);
			totatSlideCont.text(slidesShown == 1 ? totalSlides : totalPages)
			curSlideCont.text(curPage + 1)
	});
}
jQuery.fn.toggleText = function() {
	var altText = this.data("alt-text");
	if (altText) {
		this.data("alt-text", this.text());
		this.text(altText);
	}
};
function initMap() {
	var trel = $('.map-element');
	var map,map2;
	var mapopts = {
				zoom: 16,
				fullscreenControl: true,
				scrollwheel: false,
				mapTypeControl: false,
				scaleControl: false,
				// center: centercords,
				streetViewControl: false,
				gestureHandling: "greedy",
				zoomControlOptions: {
						position: google.maps.ControlPosition.RIGHT_CENTER
				},
				 styles:[
					{
						"featureType": "administrative",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#444444"
							}
						]
					},
					{
						"featureType": "landscape",
						"elementType": "all",
						"stylers": [
							{
								"color": "#ffffff"
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "simplified"
							},
							{
								"color": "#377041"
							},
							{
								"lightness": "79"
							},
							{
								"saturation": "0"
							}
						]
					},
					{
						"featureType": "poi.attraction",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "poi.business",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "all",
						"stylers": [
							{
								"saturation": -100
							},
							{
								"lightness": 45
							},
							{
								"visibility": "simplified"
							},
							{
								"color": "#f0f0f0"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "labels",
						"stylers": [
							{
								"visibility": "simplified"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "labels.text",
						"stylers": [
							{
								"color": "#b0b0b0"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "simplified"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"visibility": "simplified"
							},
							{
								"color": "#b0b0b0"
							}
						]
					},
					{
						"featureType": "road.arterial",
						"elementType": "labels.icon",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "transit",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "simplified"
							},
							{
								"lightness": "29"
							},
							{
								"saturation": "9"
							}
						]
					},
					{
						"featureType": "transit",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "transit",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "transit",
						"elementType": "labels.text",
						"stylers": [
							{
								"visibility": "simplified"
							},
							{
								"lightness": "0"
							},
							{
								"saturation": "0"
							},
							{
								"gamma": "3.84"
							},
							{
								"color": "#5d5353"
							}
						]
					},
					{
						"featureType": "transit",
						"elementType": "labels.icon",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "all",
						"stylers": [
							{
								"color": "#cadfe7"
							},
							{
								"visibility": "on"
							}
						]
					}
				]
			}; 
	if(trel.length){

		var element1 = document.getElementById('map');
		var element2 = document.getElementById('map2');

		element1 != null && !element1.classList.contains('inited') ? initialize(element1,map) : 0;
		element2 != null && !element2.classList.contains('inited') ? initialize(element2,map2) : 0;
		// for(var i = 0; i<element.length;i++){

		// }
	}
	function initialize(elem,mapcont){
		var _ = elem;
		var latcord = parseFloat(_.getAttribute('data-lat'));
		var loncord = parseFloat(_.getAttribute('data-lon'));
		var imgpath = _.getAttribute('data-icon');
		var centercords = new google.maps.LatLng(latcord, loncord);
		mapvar = new google.maps.Map(_,mapopts);
		mapvar.setCenter(centercords)
		var img = {
			url: imgpath,
			size: new google.maps.Size(76, 114),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(38, 114),
			scaledSize: new google.maps.Size(38, 57)
		};

		var marker = new google.maps.Marker({
			position: centercords,
			map: mapvar,
			icon: img,
			zIndex: 99999
		});
		elem.classList.add('inited');
	}
	trel.on('update',function(){
		var _ = $(this);
		var el = _.get(0)
		el != null && !el.classList.contains('inited') ? initialize(el,map2) : 0;
	})
}


function AjaxLoading(el){
	var _this = this;

	_this.ajaxLink = el;
	_this.appendMain = $("body").find('.modal-layout[data-modal="'+ el.data('modal')+'"]');


	_this.initEvents = function(){

		$(".ajax-trigger").off("click.trigger").on("click.trigger", function(e){
			var link = $(this).data("href");
			var slideto = $(this).data("slideto");
			_this.appendMain.removeClass('active')
			_this.action(link,slideto)
			e.preventDefault();
			return false;
		});
	};

	_this.action = function(link,slide) {
		$.ajax({
			url: link,
			dataType: "html",
			success: function(content) {
				var mainContent = $(content).html();
				_this.appendMain.html(mainContent).promise().done(function(){
					_this.initEvents();
					modalDiplomSlider();
					_this.appendMain.addClass('active').trigger('reinit');

					if(typeof slide != 'undefined'){
						_this.appendMain.find('.big-image-slider-inner').slick('slickGoTo',slide)
					}
				});
			}
		})
	};
	_this.initEvents();
}

function comenthide(){
	var target = $('.js-coment');
	target.each(function(){
		var _ = $(this),
			len = _.height(),
			item = _.find('.feedback-item-content-inner').height(),
			trigger = _.parent().find('.js-list-more');
		$(window).on('resize', function(){
			setTimeout(function(){
				item = _.find('.feedback-item-content-inner').height();
				Checkh();
				
			},600)
		});
		function Checkh(){
			if(len >= item){
				trigger.css('display', 'none');
			}else{
				trigger.removeAttr('style');
				initclick();
			}
		}Checkh();
		function initclick(){
			trigger.off('click').on('click', function(e){
				if(_.attr('style')){
					// len.removeAtttr('style');
					_.css('max-height', '');
					$(this).toggleText();
				}else{
					_.css('max-height', item);
					$(this).toggleText();
				}

				// $(".aside-stick").trigger("sticky_kit:recalc");
			});
		}
	})
}


function validateForms() {
	var form_form = $('.js-validate');
	if (form_form.length) {
		form_form.each(function() {
			var form_this = $(this);
			var parent = form_this.parent();
			$.validate({
				form: form_this,
				modules: 'logic',
				borderColorOnError: true,
				scrollToTopOnError: false,
				onValidate: function($form) {
					CheckForSelect(form_this);
				},
				onSuccess: function($form) {
					formResponse(form_this);
					// resetForm(form_this);
					return false
				},
			});
		});
	}
}
function CheckForSelect(form){
	if(form.find('.select-check').length){
		var wrap = form.find('.select-check');

		wrap.each(function(){
			var _ = $(this),
				btn = _.find('.selects'),
				option = _.find('.option.has-error');
			if(option.length){
				_.addClass('error');

			}else{
				_.removeClass('error');
			}
		});
		wrap.hasClass('error') ? false : true
	}
}
function resetForm(form){
		form[0].reset();
		form.find('.star-item').removeClass('active');
};
function popUpsInit() {
	var _this = this;
	_this.b = {
		open: $('.js-popup-button')
	};
	_this.c = {
		popup: $('.js-popup-container'),
		body: $('body'),
		header: $('.page__header'),
	};
	_this.f = {};
	_this.conf = {
		body_class: 'modal_open',
		active_class: 'active',
		close_selector: '.closePopup',
		initial_class: 'popup-initialed',
		header_class: 'is-hidden'
	};
	var _h;
	_this.f.initModalActions = function(_popup) {
		/**
		 * Close buttons.
		 */
		$(_popup).on('click', '.modal-container', function(e) {
			if (!$(_this.conf.close_selector).is(e.target)) {
				e.stopPropagation();
			}
		});
		_popup.find(_this.conf.close_selector).add(_popup).off('click.popup').on('click.popup', function() {
			_this.f.closePopup(_popup);
		});
	};
	_this.f.closePopup = function(_popup) {
		var _res = Math.abs(_h),
			_cont = _popup.find('.modal-container-content:not(.response)')
		_response = _popup.find('.response');
		if (!_res > 0) _this.c.header.removeClass(_this.conf.header_class);
		_popup.removeClass(_this.conf.active_class);
		_this.c.body.removeClass(_this.conf.body_class).removeAttr('style');
		
		$(window).scrollTop(_res);
		setTimeout(function() {
			_cont.removeAttr('style');
			_response.removeClass('visible');
			var _select = _popup.find('.js-select-custom'),
				_input = _popup.find('input');
			_input.prop('checked', false);
			_select.trigger('reinit');
		}, 500);
	};
	_this.f.openPopup = function(_popup) {
		_h = _this.c.body.scrollTop();
		if (_h === 0) {
			_h = $('html').scrollTop();
		}
		_popup.addClass(_this.conf.active_class);
		_this.c.body.addClass(_this.conf.body_class).css('top', -_h);
		setTimeout(function() {
			_this.c.header.addClass(_this.conf.header_class);
		}, 40)
		
	};
	/**
	 * Initial.
	 */
	$.each(_this.c.popup.not('.' + _this.conf.initial_class), function() {
		var _popup = $(this);
		_this.f.initModalActions(_popup);
		_popup.off('reinit').on('reinit', function() {
			_this.f.initModalActions(_popup);
		});
		_popup.addClass(_this.conf.initial_class);
	});
	_this.b.open.off('click.popup').on('click.popup', function(e) {
		e.preventDefault();
		var _b = $(this),
			_popup = _this.c.popup.filter('[data-modal="' + _b.data('modal') + '"]'),
			_spec = _b.data('spec');
			if(typeof _spec != 'undefined'){
				_select = _popup.find('.js-select-custom'),
				_input = _popup.find('input[value="'+_spec+'"]');
				_input.prop('checked', true);
				_select.trigger('reinit');	
			}


		_this.f.openPopup(_popup);
		return false;
	});
}



function formResponse(form) {
	if (form.closest('.modal-container').length) {
		var cont = form.closest('.modal-container'),
			resp = cont.next('.response');
		if (resp.length) {
			cont.fadeOut("slow", function() {
				resp.fadeIn("normal");
			});
		}
	}
}
function isMobile()
{
	 return (/Android|webOS|iPhone|iPod|BlackBerry|Windows Phone|iemobile/i.test(navigator.userAgent) );
}

function Parse(items){
	this.item = items;
	this.container = document.querySelector('.service-items');
	this.list;
	this.count = 0;
	if(this.container){
		this.init();
	}
}

Parse.prototype ={
	init: function(){
		this.list = this.item.section;
		this.len = this.list.length;
		this.parseSections();
	},
	parseSections: function(){
		for(var i=0; i<this.len; i++){
			var curr = this.list[i];
			//фрагмент документа
			var frag = document.createDocumentFragment();
			// создаем первую обертку
			var fragItem = document.createElement('div');
			//создаем вторую обертку
			
			//даем этим оберткам классы и дата-атрибуты
			fragItem.classList.add('service-item');
			fragItem.setAttribute('data-id','#'+(i+1))
			
			// если есть заголвок - пихаем перед списком
			if(curr.name != null){
				$(fragItem).append('<div class="service-item-title"><div class="title h2">'+curr.name+'</div></div>');
			}
			// помещаем их во фрагмент
			frag.appendChild(fragItem);
			// идем дальше
			this.appendSubList(frag,curr.subsection)
		}
	},
	appendSubList: function(fragment,list){
		// создаем обертку списка
		var lLen = list.length;

		for(var i=0; i<lLen; i++){
			var cur = list[i];
			var fragCont = document.createElement('div');
			fragCont.classList.add('service-item-container');
			// если есть заголвок - пихаем перед списком
			if(cur.name != null){
				$(fragCont).append('<div class="service-item-subtitle"><div class="title h3">'+cur.name+'</div></div>');
			}
			$(fragCont).append(this.appendLetters(fragCont,cur.letters))
			$(fragment).find('.service-item').append(fragCont);
		}
		this.container.append(fragment);
		this.checkBlocksLength();
		this.InitFilter();
	},
	// возвращает секцию с буквой и списком ссылок, полученных из appendItems()
	appendLetters: function(fragment,letters){

		// забираем буквы
		var letLen = letters.length;
		//основной фрагмент, куда поместим все блоки с буквами
		var letterFragment = document.createDocumentFragment();
		for(var i=0; i<letLen; i++){
			var cur = letters[i];
			var fragIteminner = document.createElement('div');
			fragIteminner.classList.add('service-item-item');

			$(fragIteminner).append('<div class="service-item-letter" data-filter="'+cur.letter+'">'+cur.letter+'</div>').append(this.appendItems(fragIteminner,cur.items));
			letterFragment.append(fragIteminner);
		}
		return letterFragment
	},
	// возвращает список сформированных ссылок, для вставки в нужное место
	appendItems: function(fragment,items){
		var ilen = items.length;
		var listwrap = document.createElement('ul');
		var links = document.createDocumentFragment();

		listwrap.classList.add('service-item-links');

		for(var i=0; i<ilen; i++){
			var cur = items[i];
			var link = document.createElement('li');
			$(link).append('<a class="text" href="'+cur.link+'">'+cur.name+'</a>');
			this.count++;
			links.append(link);
		}
		listwrap.append(links)
		return listwrap
	},
	checkBlocksLength: function(){
		this.blocks = this.container.querySelectorAll('.service-item-item');
		if(!this.container.classList.contains('fullsize')){
			this.blocks.length > 3 ? this.hideBlocks() : false
		}
	},
	hideBlocks: function(){
		this.container.classList.add('blocks-hidden');
		$(this.container).append('<div class="btn light js-expandlist"><span data-alt-text="Свернуть список услуг">Смотреть все '+this.count+' услуг</span></div>');
		this.initExpand();
	},
	initExpand: function(){
		var self = this;
		this.trigger = this.container.querySelector('.js-expandlist');
		this.span = $(this.trigger).find('span');
		this.trigger.addEventListener('click',function(){
			if(self.container.classList.contains('blocks-hidden')){
				self.container.classList.remove('blocks-hidden');
				self.span.toggleText();
			}else{
				self.container.classList.add('blocks-hidden');
				self.span.toggleText();
				$("html, body:not(:animated), .out:not(:animated)").animate({scrollTop: $(self.container).offset().top -110}, 500);
			}
			$(".js-stick").trigger("sticky_kit:recalc");
		});
	},
	InitFilter: function(){
		this.ActiveLetters = this.item.activeLetters;
		this.filterwrap = document.querySelectorAll('.service-letter');
		for(var i = 0;i<this.ActiveLetters.length;i++){
			var cur = this.ActiveLetters[i].letter;
			var item = $(this.filterwrap).filter('[data-letter="'+cur+'"]');
			item.addClass('selected');
		}
		this.filterBlocks();
	},
	filterBlocks: function(){
		var self = this;
		var trigger = $(this.filterwrap).filter('.selected');
		// var blocks = this.container.querySelectorAll('.service-item-item')
		trigger.each(function(){
			var _ = $(this),
				letter = _.data('letter').toLowerCase();
			_.off('click').on('click',function(){
				if(!_.hasClass('active')){
					_.addClass('active').siblings().removeClass('active');
				}else{
					_.removeClass('active');
				}
				filterElems(letter,_)
			});
		});
		filterElems = function (letter,btn) {
			var first = false;
			if(btn.hasClass('active')){
				for (i = 0; i < self.blocks.length; i++) {
					var cur = self.blocks[i];
					var id = $(cur).find('.service-item-letter').data('filter').toLowerCase();
					// If is same category or category not picked
					if (id === letter) {
						cur.classList.remove('hidden');
						if(first === false){
							first = cur;
						}
					}else {
						cur.classList.add('hidden');
					}
				}
				if(!self.container.classList.contains('fullsize')){
					if(self.container.classList.contains('blocks-hidden')){
						self.container.classList.remove('blocks-hidden');
						self.trigger.classList.add('hidden')
					}else{
						self.trigger.classList.add('hidden')
						self.span.toggleText();
					}

				}
				$("html, body:not(:animated), .out:not(:animated)").animate({scrollTop: $(first).offset().top -110}, 500);
			}else{
				for (i = 0; i < self.blocks.length; i++) {
					var cur = self.blocks[i];
					cur.classList.remove('hidden');
				}
				if(!self.container.classList.contains('fullsize')){
					if(self.container.classList.contains('blocks-hidden')){
						self.trigger.classList.remove('hidden')
					}else{
						self.container.classList.add('blocks-hidden');
						self.trigger.classList.remove('hidden')
					}
				}
			}
		}
	}
}

function suggest(el){
	this.el = el;
	this.options = {
		input: '.biginput',
		sugglist: '.js-suggest-list',
		focus: 'focus',
	};
	this.keys ={
		ESC: 27,
		TAB: 9,
		RETURN: 13,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40
	};
	this.counter = 1;
	this.init();


}
suggest.prototype = {
	init: function(){
		this.elements = this.el;
		this.findelements();
	},
	findelements: function(){
		var self = this;
		var lng = this.elements.length;
		for(i = 0; i < lng; i++){
			this.search = this.elements[i].querySelectorAll(this.options.input);
			this.suggest = this.elements[i].querySelectorAll(this.options.sugglist);
			this.seggestInner = this.elements[i].querySelectorAll('.suggest-list-inner');
			$(this.suggest[0]).slideUp();
			this.search[0].addEventListener('input', function(event){
				self.dosearch(searchArr.items)
			});
			this.search[0].addEventListener('keydown', function(event){
				self.doKeypress(this.keys, event);
			});
			this.search[0].addEventListener('blur', function(event){
				$(self.suggest[0]).slideUp();
			});
		}
	},
	dosearch: function(array){
		var query = this.search[0].value;
		if(query.length >= 3){
			var results = $.grep(searchArr.items, function(item) {
				return item.name.search(RegExp(query, "i")) != -1;
			});
			if (results.length >= 1) {
				/*Start things fresh by removing the suggestions div and emptying the live region before we start*/
				this.removeChildren();
				$(this.suggest[0]).slideDown();
				counter = 1;
			}

			for(var i=0; i< results.length;i++){
				var cur = results[i];
				$(this.seggestInner).append("<a href="+cur.link+" role='option' tabindex='-1' class='autocomplete-suggestion' id='suggestion-" + counter + "'>" + cur.name + "</a>");
				counter = counter + 1;
			}
			$(this.seggestInner).children().eq(0).addClass('highligt')

		}else{
			this.removeChildren();
			$(this.suggest[0]).slideUp();
		}
		this.addClickToItem();
	},
	addClickToItem: function(){
		var self = this;
		this.seggestInner[0].addEventListener('click',function(e){
			if (e.target.matches('a')) {
				var elem = e.target;
				var val = elem.textContent;
				self.search[0].value = val;
				self.removeChildren();
				$(self.suggest[0]).slideUp();
			}
		});
	},
	removeChildren: function(){
		while(this.seggestInner[0].firstChild) this.seggestInner[0].removeChild(this.seggestInner[0].firstChild)
	},
	doKeypress: function(keys, event){
		var self = this;
		var highligted = false;
		highligted = $(this.seggestInner[0]).children('a').hasClass('highligt');
		switch (event.which) {

			case this.keys.ESC:
				self.removeChildren();
				$(this.suggest[0]).slideUp();
				break;

			case this.keys.RIGHT:

				return self.selectOption(highligted)
				break;

			case this.keys.TAB:
				self.removeChildren();
				$(this.suggest[0]).slideUp()
				break;

			case this.keys.RETURN:
				if (highligted) {
					event.preventDefault();
					event.stopPropagation();
					return self.selectOption(highligted)
				}

			case this.keys.UP:
				event.preventDefault();
				event.stopPropagation();
				return self.moveUp(highligted);
				break;

			case this.keys.DOWN:
				event.preventDefault();
				event.stopPropagation();

				return self.moveDown(highligted);
				break;
			default:
				return;
		}
	},
	moveUp: function(highligted){
		var current;
		if (highligted) {
			current = $(this.seggestInner[0]).find('.highligt');
			current.removeClass('highligt').prev('a').addClass('highligt');
			highligted = false;
		} else {
			current = $(this.seggestInner[0]).children().last('a');
			current.addClass('highligt');
		}
	},
	moveDown: function(highligted){
		var current;
		if (highligted) {
			current = $(this.seggestInner[0]).find('.highligt');
			current.removeClass('highligt').next('a').addClass('highligt');
			highligted = false;
		} else {
			current = $(this.seggestInner[0]).children().first('a');
			current.addClass('highligt');
		}
	},
	selectOption: function(highligted){
		var self = this;
		if (highligted) {
			var target = $(this.seggestInner[0]).find('.highligt');
			$(this.search[0]).val(target.text()).focus();
			window.location.replace(target.attr('href'))
			self.removeChildren();
			$(this.suggest[0]).slideUp();
		} else {
			return;
		}
	}

}