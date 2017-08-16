$(window).on('load', function() {
	stickinit();
	lazyImage();
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

	function scaleVideo(){
		if($('.video-container').length){
			if(isMobile()){
				$('.video-container').find('.video-container-inner').remove();
			}
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
});
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
		windowHeight = $('.video-container').height() + 5,
		videoWidth,
		videoHeight;

	// console.log(windowHeight);

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


if (!window.Promise) {
	window.Promise = Promise;
}


function lazyImage(){
	// Get all of the images that are marked up to lazy load
	var images = document.querySelectorAll('.js-image');
	var config = {
		// If the image gets within 50px in the Y axis, start the download.
		rootMargin: '50px 0px',
		threshold: 0.01
	};

	var imageCount = images.length;
	var observer = void 0;
	// If we don't have support for intersection observer, loads the images immediately
	if (!('IntersectionObserver' in window)) {
		for(var i = 0; i< images.length; i++){
			return preloadImage(images[i]);
		}
	} else {
		// It is supported, load the images
		observer = new IntersectionObserver(onIntersection, config);
		for(var i = 0; i< images.length; i++){
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
	var altText = this.data("alt-text"),
		target = this.find('span');
	if (altText) {
		this.data("alt-text", target.text());
		target.text(altText);
	}
};



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
				onSuccess: function($form) {
					formResponse(form_this);
					resetForm(form_this);
					return false
				},
			});
		});
	}
}
function resetForm(form){
	form[0].reset();
	form.find('.star-item').removeClass('active');
}
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
		if($('html').hasClass('fp-enabled')){
			$('body').hasClass('fp-viewing-0') ? _this.c.header.removeClass(_this.conf.header_class) : false;
		}else{
			_this.c.header.removeClass(_this.conf.header_class);
		}

		_popup.removeClass(_this.conf.active_class);
		_this.c.body.removeClass(_this.conf.body_class).removeAttr('style');
		$(window).scrollTop(_res);
		setTimeout(function() {
			_cont.removeAttr('style');
			_response.removeClass('visible');
		}, 500);
	};
	_this.f.openPopup = function(_popup) {
		_h = _this.c.body.scrollTop();
		if (_h === 0) {
			_h = $('html').scrollTop();
		}

		setTimeout(function() {
			_popup.addClass(_this.conf.active_class);
			_this.c.body.addClass(_this.conf.body_class).css('top', -_h);
		}, 10);
		setTimeout(function() {
			_this.c.header.addClass(_this.conf.header_class);
		}, 50)

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
			_popup = _this.c.popup.filter('[data-modal="' + _b.data('modal') + '"]');
		_this.f.openPopup(_popup);
		return false;
	});
}



function formResponse(form) {
	if (form.closest('.modal-container-content').length) {
		var cont = form.closest('.modal-container-content'),
			resp = cont.next('.response');
		if (resp.length) {
			cont.fadeOut("slow", function() {
				resp.addClass("visible");
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
				console.log($(this.suggest).length)
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