$(function() {
	const owl = $('.owl-carousel');
	const prices = $('.prices-list.scroll');
	const pricesItems = $('.prices--item');
	const selConf = $('.prices--item .item-title');
	const mainSel = $('select');
	const cstSel = customSelect("select");


	const header = $('header');

	document.addEventListener('scroll', function headerParalax() {
		let amount = $(document).scrollTop();

    if (amount < header.height()) {
    	$('header .info').css('transform', `translateY(${-amount / 5}px)`);
    	$('header .info').css('filter', `blur(${(amount * 2 / header.height())}px)`);
    }

	});

	let animate = {
		list: new Set(),
		globalOffset: 0,

		add: function(el, anim) {
			let offsetTop = $(el).offset().top + this.globalOffset;

			this.list.add({
				el: el, 
				anim: anim,
				offsetTop: offsetTop,
			});

			$(el).css('opacity', '0');
		},

		init: function() {
			window.addEventListener('scroll', () => {
				let scroll = $(document).scrollTop() + $(window).height();

				for (let item of [...this.list]) {
					if (item.offsetTop < scroll) {
						$(item.el).addClass('animated').addClass(item.anim);
						this.list.delete(item);
					}
				}
			});

			$(window).resize(() => {
				for (let item of [...this.list]) {
					let offsetTop = $(item.el).offset().top + this.globalOffset;

					item.offsetTop = offsetTop;
				}
			});

		}
	}

	animate.add('.owl-carousel', 'fadeIn');
	animate.add('.services .left-side', 'slideInLeft');
	animate.add('.prices', 'fadeInUp');
	animate.add('.callback .container', 'zoomIn');
	animate.add('.reviews', 'fadeIn');
	animate.add('.contacts .left-side', 'fadeInLeftBig');
	animate.add('.contacts .right-side', 'fadeIn');
	animate.init();

	owl.owlCarousel({
		margin: 30,
		items: 1,
		autoWidth: true,
		nav: true,
		navText: ['<img src="img/arrows.svg" alt="left">','<img src="img/arrows.svg" alt="right">'],
		loop: true,
		smartSpeed: 600
	});

	$.mCustomScrollbar.defaults.scrollButtons.enable=true;

	prices.mCustomScrollbar({
		theme: 'dark-thick',
	});

	for (let i = 0; i < selConf.length; i++) {
		let option = document.createElement('option');

		option.text = $(selConf[i]).text().toUpperCase();
		option.value = i;
		cstSel[0].append(option);
	}

	cstSel[0].select.addEventListener('change', (e) => {
		pricesItems.removeClass('active');
		$(pricesItems[mainSel.val()]).addClass('active');
	});

	$("#tel").mask("8 (999) 999-99-99");

	$("form").submit(function() {
		let name = $(this).find('input[name="name"]').val();
		let phone = $(this).find('input[name="phone"]').val();

		if (name.length < 2 || phone.length < 17) {
			$(this).addClass('notValid');
			return false
		}

		sendData(this);

		return false; 
	});

	function sendData(el) {
		$.ajax({
			url: $(el).attr('action'),
			type: "GET",
			dataType: "html",
			data: $(el).serialize(),

			success: function(response) {
				let height = $('.callback').height();
				$('.callback').css('min-height', height);

				$(el).fadeOut();
				$('.success-window').delay(1000).fadeIn();
	    }
	 	});
	}

	let reviews = {
		items: $('.review--item'),
		current: 0,

		init: function() {
			$('.reviews-nav .nav-prev').click(()=> {
				this.goToPrev();
			});

			$('.reviews-nav .nav-next').click(()=> {
				this.goToNext();
			});

			this.changeWrapp();
		},

		getNext: function() {
			let next = this.current + 1; 

			if (next > this.items.length - 1) {
				next = 0;
			}

			return next
		},

		getPrev: function() {
			let prev = this.current - 1; 
			
			if (prev < 0) {
				prev = this.items.length - 1;
			}

			return prev
		},

		goToNext: function() {
			this.current = this.getNext();
			this.changeWrapp();
		}, 

		goToPrev: function() {
			this.current = this.getPrev();
			this.changeWrapp();
		},

		changeWrapp: function() {
			let height = $('.reviews-wrapp').height();

			$('.reviews-wrapp').css('min-height', height);
			this.items.fadeOut();

			setTimeout(()=> {
				$(this.items[this.current]).fadeIn();
			}, 500)
		}
	}

	reviews.init()
});