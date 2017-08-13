$(window).on('load', function() {

});
document.addEventListener("DOMContentLoaded", function() {

	var conf = {
		body: $('body'),
		header: $('.page__header'),
		html: $('html'),
		hidden: 'is-hidden',
		wrpr: $('.wrapper'),
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
					// var h = targetWrap.find("[data-id="+ id +"]").find('.page__header-drop-item').outerHeight();
					// targetWrap.css('height',h + 65);
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
	function otdelslider(){
		$(".js-otdel").each(function() {
			var _this = $(this),
					parent = _this.parent();
			_this.slick({
				accessibility: false,
				lazyLoad: 'ondemand',
				arrows: false,
				dots: true,
				touchMove: false,
				dragable: false,
				infinite: false,
				slidesToShow: 4,
				slidesToScroll: 4,
				appendDots: parent.find('.dots-wrap')
			})
		});
	}otdelslider();
	lazyImage();
});
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
				Array.from(images).forEach(function (image) {
					return preloadImage(image);
				});
			} else {
				// It is supported, load the images
				observer = new IntersectionObserver(onIntersection, config);
				images.forEach(function (image) {
					if (image.classList.contains('js-image-handled')) {
						return;
					}

					observer.observe(image);
				});
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
				Array.from(images).forEach(function (image) {
					return preloadImage(image);
				});
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