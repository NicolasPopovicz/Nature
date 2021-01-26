// Debounce do Lodash

debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// Mudar tab ao click

$('[data-group]').each(function(){
	const $allTarget = $(this).find('[data-target]'),
				$allClick = $(this).find('[data-click]'),
				activeClass = 'active';
	
	$allTarget.first().addClass(activeClass);
	$allClick.first().addClass(activeClass);
	
	$allClick.click(function(e){
		e.preventDefault();
		
		const id = $(this).data('click'),
					$target = $('[data-target="' + id + '"]');
		
		$allClick.removeClass(activeClass);
		$allTarget.removeClass(activeClass);
		
		$target.addClass(activeClass);
		$(this).addClass(activeClass);
	});
});

// Scroll suave link interno

$('.menu-nav a[href^="#"]').click(function(e) {
	e.preventDefault();
	const id = $(this).attr('href'),
				menuHeight = $('.menu').innerHeight(),
				targetOffset = $(id).offset().top;

	$('html, body').animate({
		scrollTop: targetOffset - menuHeight
	}, 500);
});

// Scroll suave p/ topo

$('.logo').click(function(e) {
	e.preventDefault();
	$('html, body').animate({
		scrollTop: 0
	}, 500);
});

// Mudar p/ active o menu de acordo com a área

$('section').each(function() {
	const height = $(this).height(),
				offsetTop = $(this).offset().top - 1,
				menuHeight = $('.menu').innerHeight(),
				id = $(this).attr('id'),
				$itemMenu = $('a[href="#' + id + '"]');
	
	$(window).scroll(debounce(function() {
		const scrollTop = $(window).scrollTop();
		if(offsetTop - menuHeight < scrollTop && offsetTop + height - menuHeight > scrollTop) {
			$itemMenu.addClass('active');
		} else {
			$itemMenu.removeClass('active');
		}
	}, 200));
});

// Botão menu mobile

$('.mobile-btn').click(function() {
	$(this).toggleClass('active');
	$('.mobile-menu').toggleClass('active');
});

// Slider

(function() {
	function slider(sliderName, velocidade){
		let sliderClass = '.' + sliderName,
				activeClass = 'active',
				rotate = setInterval(rotateSlide, velocidade);

		$(sliderClass + ' > :first').addClass(activeClass);

		$(sliderClass).hover(function() {
			clearInterval(rotate);
		}, function() {
			rotate = setInterval(rotateSlide, velocidade);
		});

		function rotateSlide() {
			let activeSlide = $(sliderClass + ' > .' + activeClass),
					nextSlide   = activeSlide.next();

			if(nextSlide.length == 0) {
				nextSlide = $(sliderClass + ' > :first');
			}
			activeSlide.removeClass(activeClass);
			nextSlide.addClass(activeClass);
		}
	}

	slider('introducao', 2000);
})();

// Animação ao scroll
(function(){
	let $target = $('[data-anime="scroll"]'),
			animationClass = 'animate',
			offset = $(window).height() * 3/4;

	function animeScroll() {
		let documentTop = $(window).scrollTop();

		$target.each(function() {
			let itemTop = $(this).offset().top;
			if(documentTop > itemTop - offset) {
				$(this).addClass(animationClass);
			} else {
				$(this).removeClass(animationClass);
			}
		});
	}

	animeScroll();

	$(document).scroll(debounce(function() {
		animeScroll();
	}, 200));
})();