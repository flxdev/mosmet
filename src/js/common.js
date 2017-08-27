$(window).on('load', function() {
	stickinit();
	lazyImage();
	vrachRait();
});
document.addEventListener("DOMContentLoaded", function() {
	var elems = {
			'section': [
				{
					'id': 1,
					'name': 'Клинико-диагностическая лаборатория',
					'link': '#',
					'subsection' :[
						{
							'name': "Травматология",
							'link': '#',
							'letters': [
								{
									'letter': 'a',
									'items': [
										{
											'name': 'Аэрозольтерапия через небулайзер (без препарата)',
											'link': '#',
										},
										{
											'name': 'Аэрозольтерапия через небулайзер (без препарата)',
											'link': '#',
										},
										{
											'name': 'Аэрозольтерапия через небулайзер (без препарата)',
											'link': '#',
										},
										{
											'name': 'Аэрозольтерапия через небулайзер (без препарата)',
											'link': '#',
										},
										{
											'name': 'Аэрозольтерапия через небулайзер (без препарата)',
											'link': '#',
										},
										{
											'name': 'Аэрозольтерапия через небулайзер (без препарата)',
											'link': '#',
										},
										{
											'name': 'Аэрозольтерапия через небулайзер (без препарата)',
											'link': '#',
										},
									]
								}
							]
						}
					]	
				},
			],
	};
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
							slidesToShow: 5,
							slidesToScroll: 4,
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
		rootMargin: '-100px 0px',
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
						        "featureType": "administrative.land_parcel",
						        "elementType": "all",
						        "stylers": [
						            {
						                "visibility": "off"
						            }
						        ]
						    },
						    {
						        "featureType": "landscape",
						        "elementType": "all",
						        "stylers": [
						            {
						                "visibility": "off"
						            }
						        ]
						    },
						    {
						        "featureType": "landscape.man_made",
						        "elementType": "all",
						        "stylers": [
						            {
						                "visibility": "simplified"
						            },
						            {
						                "hue": "#ff0000"
						            },
						            {
						                "saturation": "-100"
						            },
						            {
						                "lightness": "1"
						            },
						            {
						                "gamma": "1.53"
						            },
						            {
						                "weight": "2.60"
						            }
						        ]
						    },
						    {
						        "featureType": "landscape.man_made",
						        "elementType": "geometry.stroke",
						        "stylers": [
						            {
						                "visibility": "simplified"
						            },
						            {
						                "color": "#e4e8ec"
						            },
						            {
						                "weight": "1.96"
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
						                "color": "#a2b59c"
						            }
						        ]
						    },
						    {
						        "featureType": "poi",
						        "elementType": "labels",
						        "stylers": [
						            {
						                "visibility": "off"
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
						        "featureType": "poi.government",
						        "elementType": "all",
						        "stylers": [
						            {
						                "visibility": "off"
						            }
						        ]
						    },
						    {
						        "featureType": "poi.park",
						        "elementType": "all",
						        "stylers": [
						            {
						                "color": "#a2b59c"
						            }
						        ]
						    },
						    {
						        "featureType": "road",
						        "elementType": "labels",
						        "stylers": [
						            {
						                "visibility": "on"
						            },
						            {
						                "lightness": 20
						            }
						        ]
						    },
						    {
						        "featureType": "road",
						        "elementType": "labels.text.fill",
						        "stylers": [
						            {
						                "color": "#79400c"
						            }
						        ]
						    },
						    {
						        "featureType": "road",
						        "elementType": "labels.text.stroke",
						        "stylers": [
						            {
						                "color": "#ffffff"
						            },
						            {
						                "weight": "1.56"
						            },
						            {
						                "visibility": "simplified"
						            },
						            {
						                "invert_lightness": true
						            }
						        ]
						    },
						    {
						        "featureType": "road.highway",
						        "elementType": "geometry",
						        "stylers": [
						            {
						                "color": "#d7bcb2"
						            }
						        ]
						    },
						    {
						        "featureType": "road.highway",
						        "elementType": "geometry.stroke",
						        "stylers": [
						            {
						                "visibility": "on"
						            },
						            {
						                "color": "#ad8d81"
						            },
						            {
						                "weight": "2.00"
						            }
						        ]
						    },
						    {
						        "featureType": "road.highway",
						        "elementType": "labels",
						        "stylers": [
						            {
						                "visibility": "on"
						            }
						        ]
						    },
						    {
						        "featureType": "road.highway",
						        "elementType": "labels.text",
						        "stylers": [
						            {
						                "visibility": "simplified"
						            },
						            {
						                "weight": "2.50"
						            }
						        ]
						    },
						    {
						        "featureType": "road.highway",
						        "elementType": "labels.text.fill",
						        "stylers": [
						            {
						                "visibility": "on"
						            },
						            {
						                "color": "#855226"
						            },
						            {
						                "weight": "10.00"
						            }
						        ]
						    },
						    {
						        "featureType": "road.highway",
						        "elementType": "labels.text.stroke",
						        "stylers": [
						            {
						                "visibility": "on"
						            },
						            {
						                "color": "#f3f5f7"
						            }
						        ]
						    },
						    {
						        "featureType": "road.arterial",
						        "elementType": "geometry",
						        "stylers": [
						            {
						                "hue": "#fad959"
						            }
						        ]
						    },
						    {
						        "featureType": "road.arterial",
						        "elementType": "labels",
						        "stylers": [
						            {
						                "visibility": "off"
						            }
						        ]
						    },
						    {
						        "featureType": "road.local",
						        "elementType": "geometry",
						        "stylers": [
						            {
						                "visibility": "simplified"
						            }
						        ]
						    },
						    {
						        "featureType": "road.local",
						        "elementType": "labels",
						        "stylers": [
						            {
						                "visibility": "simplified"
						            }
						        ]
						    },
						    {
						        "featureType": "transit",
						        "elementType": "all",
						        "stylers": [
						            {
						                "visibility": "off"
						            }
						        ]
						    },
						    {
						        "featureType": "transit.station",
						        "elementType": "all",
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
						                "saturation": 30
						            },
						            {
						                "lightness": 49
						            },
						            {
						                "color": "#6ea1ad"
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
			size: new google.maps.Size(90, 123),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(45, 120),
			scaledSize: new google.maps.Size(45, 62)
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
		console.log(slide)
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
			console.log(len)
			console.log(item)
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
		console.log(_res)
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

var suburbs = ["Aberfeldy Township", "Altona", "Arthurs Creek", "Arthurs Seat", "Ashwood", "Bacchus Marsh Werribee River", "Ballan", "Beaconsfield Upper", "Beenak", "Berwick", "Blackburn", "Blackburn North", "Blue Mountain", "Box Hill", "Braeside", "Braeside Park", "Broadmeadows", "Brooklyn", "Bulla", "Bulla North", "Bulleen", "Bundoora", "Burnley", "Burwood East", "Cambarville", "Cardinia", "Caulfield", "Caulfield North", "Cement Creek", "Christmas Hills", "Clarkefield", "Clarkefield", "Clayton", "Clearwater Aqueduct", "Coburg", "Coldstream", "Collingwood", "Craigieburn", "Craigieburn East", "Cranbourne", "Dandenong", "Dandenong South", "Dandenong West", "Darraweit", "Deer Park", "Devilbend Reservoir", "Diggers Rest", "Dixons Creek", "Doncaster", "Doncaster East", "Drouin West", "Durdidwarrah", "Eastern G.C. Doncaster", "Elsternwick", "Eltham", "Emerald", "Epping", "Essendon", "Fairfield", "Fawkner", "Fiskville", "Flemington", "Footscray", "Frankston North", "Frankston Pier", "Gardiner", "Glen Forbes South", "Glen Waverley", "Graceburn", "Graceburn Creek Aqueduct", "Greensborough", "Greenvale Reservoir", "Groom's Hill", "Hampton", "Hampton Park", "Hawthorn", "Headworks", "Healesville", "Heathmont", "Heidelberg", "Hurstbridge", "Iona", "Ivanhoe", "Kangaroo Ground", "Keilor", "Keilor North", "Kew", "Keysborough", "Kinglake", "Knox", "Konagaderra", "Kooweerup", "Lake Borrie", "Lancefield", "Lancefield North", "Launching Place", "Lilydale Lake", "Little River", "Loch", "Longwarry North", "Lower Plenty", "Lyndhurst", "Lysterfield", "Maribyrnong", "Maroondah Reservoir", "Melton Reservoir", "Melton Sth Toolern Creek", "Mentone", "Mernda", "Millgrove", "Mitcham", "Montrose", "Mooroolbark", "Mornington", "Mount Dandenong", "Mount Evelyn", "Mount View", "Mt Blackwood", "Mt Bullengarook", "Mt Donna Buang", "Mt Evelyn Stringybark Creek", "Mt Gregory", "Mt Hope", "Mt Horsfall", "Mt Juliet", "Mt Macedon", "Mt St Gwinear", "Mt St Leonard", "Mt Waverley", "Myrrhee", "Narre Warren North", "Nayook", "Neerim South", "Neerim-Elton Rd", "Neerim-Neerim Creek", "Neerim-Tarago East Branch", "Neerim-Tarago West Branch", "North Wharf", "Northcote", "Notting Hill", "Nutfield", "O'Shannassy Reservoir", "Oakleigh South", "Officer", "Officer South", "Olinda", "Pakenham", "Pakenham East", "Pakenham West", "Parwon Parwan Creek", "Poley Tower", "Preston", "Reservoir", "Ringwood", "Rockbank", "Romsey", "Rosslynne Reservoir", "Rowville", "Sandringham", "Scoresby", "Seaford", "Seaford North", "Seville East", "Silvan", "Smiths Gully", "Somerton", "Southbank", "Spotswood", "Springvale", "St Albans", "St Kilda Marina", "Sunbury", "Sunshine", "Surrey Hills", "Tarago Reservoir", "Tarrawarra", "Templestowe", "The Basin", "Thomson Dam", "Tonimbuk", "Toolern Vale", "Torourrong Reservoir", "U/S Goodman Creek Lerderderg River", "Upper Lang Lang", "Upper Pakenham", "Upper Yarra Dam", "Wallaby Creek", "Wallan", "Wantirna South", "Warrandyte", "Williamstown", "Woori Yallock", "Woori Yallock Creek", "Wyndham Vale", "Yallock outflow Cora Lyn", "Yannathan", "Yarra Glen", "Yarra Glen Steels Creek", "Yarra Junction", "Yarra River downstream Doctors Creek", "Yellingbo", "Yering"];
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
				self.dosearch(suburbs)
			});
			this.search[0].addEventListener('keydown', function(event){
				self.doKeypress(this.keys, event);
			});
		}
	},
	dosearch: function(array){
		var query = this.search[0].value;
		if(query.length >= 3){
			var results = $.grep(suburbs, function(item) {
				return item.search(RegExp("^" + query, "i")) != -1;
			});
			if (results.length >= 1) {
				/*Start things fresh by removing the suggestions div and emptying the live region before we start*/
				this.removeChildren();
				$(this.suggest[0]).slideDown();
				counter = 1;
			}

			for (term in results) {
				$(this.seggestInner).append("<div role='option' tabindex='-1' class='autocomplete-suggestion' id='suggestion-" + counter + "'>" + results[term] + "</div>");
				counter = counter + 1;
			}
		}else{
			this.removeChildren();
			$(this.suggest[0]).slideUp();
		}
		this.addClickToItem();
	},
	addClickToItem: function(){
		var self = this;
		this.seggestInner[0].addEventListener('click',function(e){
			if (e.target.matches('div')) {
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
		highligted = $(this.seggestInner[0]).children('div').hasClass('highligt');
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
			current.removeClass('highligt').prev('div').addClass('highligt');
			highligted = false;
		} else {
			current = $(this.seggestInner[0]).children().last('div');
			current.addClass('highligt');
		}
	},
	moveDown: function(highligted){
		var current;
		if (highligted) {
			current = $(this.seggestInner[0]).find('.highligt');
			current.removeClass('highligt').next('div').addClass('highligt');
			highligted = false;
		} else {
			current = $(this.seggestInner[0]).children().first('div');
			current.addClass('highligt');
		}
	},
	selectOption: function(highligted){
		var self = this;
		if (highligted) {
			$(this.search[0]).val($(this.seggestInner[0]).find('.highligt').text()).focus();
			self.removeChildren();
			$(this.suggest[0]).slideUp();
		} else {
			return;
		}
	}

}