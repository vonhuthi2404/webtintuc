/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Init Menu
3. InitHeader
4. Init Header Search
5. Init Home Slider


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var menu = $('.menu');
	var burger = $('.hamburger');
	var menuActive = false;
	var ctrl = new ScrollMagic.Controller();

	initMenu();
	initHeader();
	initHeaderSearch();
	initHomeSlider();

	/* 

	2. Init Menu

	*/

	function initMenu()
	{
		if(menu.length)
		{
			if($('.hamburger').length)
			{
				burger.on('click', function()
				{
					if(menuActive)
					{
						closeMenu();
					}
					else
					{
						openMenu();

						$(document).one('click', function cls(e)
						{
							if($(e.target).hasClass('menu_mm'))
							{
								$(document).one('click', cls);
							}
							else
							{
								closeMenu();
							}
						});
					}
				});
			}
		}
	}

	function openMenu()
	{
		menu.addClass('active');
		menuActive = true;
	}

	function closeMenu()
	{
		menu.removeClass('active');
		menuActive = false;
	}

	/* 

	3. InitHeader

	*/

	function initHeader()
	{
		var headerScene = new ScrollMagic.Scene(
		{
			triggerElement: "#header", // point of execution
			triggerHook: 'onLeave', // don't trigger until #pinned-trigger1 hits the top of the viewport
			pushFollowers: false
		})
		.setPin("#header") // the element we want to pin
		.setClassToggle('#header', 'scrolled')
		.addTo(ctrl);
	}

	/* 

	4. Init Header Search

	*/

	function initHeaderSearch()
	{
		if($('.header_search_activation').length)
		{
			var search = $('.header_search_activation');
			var headerSearch = $('.header_search');
			search.on('click', function()
			{
				headerSearch.toggleClass('active');
			});
		}
	}

	/* 

	5. Init Home Slider

	*/

	function initHomeSlider()
	{
		if($('.home_slider').length)
		{
			var homeSlider = $('.home_slider');
			homeSlider.owlCarousel(
			{
				items:1,
				loop:true,
				autoplay:true,
				autoplayTimeout: 8000,
				dots:false,
				nav:false,
				smartSpeed:1200
			});

			// Prev Navigation
			if($('.home_slider_prev').length)
			{
				var prev = $('.home_slider_prev');
				prev.on('click', function()
				{
					homeSlider.trigger('prev.owl.carousel');
				});
			}

			// Next Navigation
			if($('.home_slider_next').length)
			{
				var next = $('.home_slider_next');
				next.on('click', function()
				{
					homeSlider.trigger('next.owl.carousel');
				});
			}

			// add animate.css class(es) to the elements to be animated
			function setAnimation ( _elem, _InOut )
			{
				// Store all animationend event name in a string.
				// cf animate.css documentation
				var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

				_elem.each ( function ()
				{
					var $elem = $(this);
					var $animationType = 'animated ' + $elem.data( 'animation-' + _InOut );

					$elem.addClass($animationType).one(animationEndEvent, function ()
					{
						$elem.removeClass($animationType); // remove animate.css Class at the end of the animations
					});
				});
			}

			// Fired before current slide change
			homeSlider.on('change.owl.carousel', function(event)
			{
				var $currentItem = $('.home_slider_item', homeSlider).eq(event.item.index);
				var $elemsToanim = $currentItem.find("[data-animation-out]");
				setAnimation ($elemsToanim, 'out');
			});

			// Fired after current slide has been changed
			homeSlider.on('changed.owl.carousel', function(event)
			{
				var $currentItem = $('.home_slider_item', homeSlider).eq(event.item.index);
				var $elemsToanim = $currentItem.find("[data-animation-in]");
				setAnimation ($elemsToanim, 'in');
			})
		}
	}

});

// var li = document.querySelectorAll('ul#menu li');
//         //Duyệt tất cả các phần tử li đó
//         for(i=0; i < li.length; i++){
//             //và áp sự kiện click lên từng thẻ li
//             li[i].addEventListener('click',function()
//             {
//                 //chọn tất cả các thẻ ul con của thẻ li
//                 var ulc = document.querySelectorAll('ul#menu li ul');
//                 //Tiến hàn duyệt từng thẻ ul đó
//                 for(j=0; j< ulc.length; j++){
//                     //css cho display = none
//                     ulc[j].style.display = 'none';
//                 }
//                 //chọn thẻ ul con của thẻ li vừa click
//                 //this ở đây chính là đối tượng li vừa click
//                 var child = this.getElementsByTagName('ul');
//                 //nếu như có tồn tại ul con của li vừa click
//                 if(child.length >=1){
//                     //tiến hành css display=block
//                     child[0].style.display = 'block';
//                 }
//             });
//         }