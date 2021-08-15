(function ($) {

	/* ---------------------------------------------- /*
	 * Preloader
	/* ---------------------------------------------- */

	$(window).load(function () {
		$('#status').fadeOut();
		$('#preloader').delay(300).fadeOut('slow');
	});

	$(document).ready(function () {

		/* ---------------------------------------------- /*
		 * Smooth scroll / Scroll To Top
		/* ---------------------------------------------- */

		$('a[href*=#]').bind("click", function (e) {

			var anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top
			}, 1000);
			e.preventDefault();
		});

		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('.scroll-up').fadeIn();
			} else {
				$('.scroll-up').fadeOut();
			}
		});

		/* ---------------------------------------------- /*
		 * Navbar
		/* ---------------------------------------------- */

		$('.header').sticky({
			topSpacing: 0
		});

		$('body').scrollspy({
			target: '.navbar-custom',
			offset: 70
		})


		/* ---------------------------------------------- /*
		 * Skills
		/* ---------------------------------------------- */
		//var color = $('#home').css('backgroundColor');

		$('.skills').waypoint(function () {
			$('.chart').each(function () {
				$(this).easyPieChart({
					size: 140,
					animate: 3500,
					lineCap: 'butt',
					scaleColor: false,
					barColor: '#ffd100',
					trackColor: 'transparent',
					lineWidth: 10
				});
			});
		}, { offset: '80%' });


		/* ---------------------------------------------- /*
		 * Quote Rotator
		/* ---------------------------------------------- */

		$(function () {
			/*
			- how to call the plugin:
			$( selector ).cbpQTRotator( [options] );
			- options:
			{
				// default transition speed (ms)
				speed : 700,
				// default transition easing
				easing : 'ease',
				// rotator interval (ms)
				interval : 8000
			}
			- destroy:
			$( selector ).cbpQTRotator( 'destroy' );
			*/

			$('#cbp-qtrotator').cbpQTRotator();

		});


		/* ---------------------------------------------- /*
		 * Home BG
		/* ---------------------------------------------- */

		$(".screen-height").height($(window).height());

		$(window).resize(function () {
			$(".screen-height").height($(window).height());
		});

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
			$('#home').css({ 'background-attachment': 'scroll' });
			$('.calltoaction').css({ 'background-attachment': 'scroll' });
			$('#services').css({ 'background-attachment': 'scroll' });
			$('#footer').css({ 'background-attachment': 'scroll' });

		} else {
			$('#home').parallax('50%', 0.1);
			$('.calltoaction').parallax('50%', 0.1);
			$('#services').parallax('50%', 0.1);
			$('#footer').parallax('50%', 0.1);



		}
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
			$('.calltoaction__button').removeClass('button');
		}
		// $('.calltoaction').parallax('100%', 0.5);


		// // var $height = $(window).height(); // Высота экрана 
		// var $width = $(window).width(); // Ширина экрана
		// $('html').css({'max-width': $width});


		/* ---------------------------------------------- /*
		 * WOW Animation When You Scroll
		/* ---------------------------------------------- */

		wow = new WOW({});
		wow.init();


		/* ---------------------------------------------- /*
		 * E-mail validation
		/* ---------------------------------------------- */

		function isValidEmailAddress(emailAddress) {
			var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
			return pattern.test(emailAddress);
		};

		/* ---------------------------------------------- /*
		 * Contact form ajax
		/* ---------------------------------------------- */

		$('#contact-form').submit(function (e) {

			e.preventDefault();

			var c_name = $('#c_name').val();
			var c_email = $('#c_email').val();
			var c_message = $('#c_message ').val();
			var response = $('#contact-form .ajax-response');

			var formData = {
				'name': c_name,
				'email': c_email,
				'message': c_message
			};

			if ((c_name == '' || c_email == '' || c_message == '') || (!isValidEmailAddress(c_email))) {
				response.fadeIn(500);
				response.html('<i class="fa fa-warning"></i> Please fix the errors and try again.');
			}

			else {
				$.ajax({
					type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
					url: 'assets/php/contact.php', // the url where we want to POST
					data: formData, // our data object
					dataType: 'json', // what type of data do we expect back from the server
					encode: true,
					success: function (res) {
						var ret = $.parseJSON(JSON.stringify(res));
						response.html(ret.message).fadeIn(500);
					}
				});
			}
			return false;
		});

	});
	// let items = document.querySelector('.is-sticky')
	// let headerWidht = document.querySelector('.header')
	// if (items === True){
	// 	headerWidht.add('active')
	// }
	// else{
	// 	headerWidht.remove('active')
	// }
	$('.navbar-toggle').on('click', function (e) {
		e.preventDefault();
		$('.navbar-toggle').toggleClass('menu__btn-active');
	})



	class Particle {
		//Конструктор принимает положение частицы по трём осям и цвет
		constructor(x, y, z, color, index, opacity) {
			this.x = x;
			this.y = y;
			this.z = z;

			//Размытие и скорость зависят от положения частицы по оси Z
			//Чем выше частица, тем более размытой она будет и тем быстрее она будет двигаться
			let blurs = [0, 2, 1, 0];

			this.blur = blurs[z];
			this.speed = z;
			this.color = color;
			this.index = index
			this.opacity = opacity
		}

		//Метод движения частицы
		Move(d) {
			this.y += this.speed * d;
		}
	}

	//Позиция полосы прокрутки
	let scrollPosition = 0;

	//Получаем контейнер для частиц
	const particlesContainer = document.getElementById("particles");

	//Создаём массив с частицами
	const particles =
		[
			new Particle(1650, 450, 3, "#fee5a5", 1, 1),
			new Particle(1700, 450, 1, "#ffd100", 1, 1),
			new Particle(220, 500, 3, "#fee5a5", 1, 1),
			new Particle(550, 700, 1, "#ffd100", 1, 1),
			new Particle(1000, 600, 2, "#ffee32", 1, 1),
			new Particle(1200, 900, 2, "#ffd100", 1, 1),
			new Particle(1080, 900, 1, "#ffee32", 1, 1),
			new Particle(1350, 750, 5, "#fee5a5", 1, 1),
			new Particle(1470, 150, 2, "#ffd100", 1, 1),
			new Particle(350, 300, 4, "#ffee32", 1, 1),
			new Particle(500, 200, 3, "#ffee32", 1, 1),
			new Particle(750, 1000, 1, "#ffd100", 1, 1),
			new Particle(1120, 620, 4, "#ffee32", 1, 1),
			new Particle(1990, 150, 3, "#ffd100", 1, 1),
			new Particle(1850, 550, 5, "#fee5a5", 1, 1),
			new Particle(2070, 150, 2, "#ffd100", 1, 1),
			new Particle(2350, 700, 4, "#ffee32", 1, 1),
			new Particle(100, 300, 3, "#ffee32", 1, 1),
			new Particle(50, 900, 1, "#ffd100", 1, 1),
			new Particle(20, 1020, 4, "#ffd100", 1, 1),
			new Particle(120, 450, 3, "#fee5a5", 1, 1),
		];

	//Это функция вывода частицы на страницу
	Fill();

	//При каждой прокрутке вызываем функцию Scroll(), которая двигает частицы
	window.addEventListener("scroll", function (e) { Scroll(e); });

	function Scroll(e) {
		//Определяем, в каком направлении была прокрутка
		let d = 0;

		if (window.pageYOffset > scrollPosition) {
			d = 1;
		}
		else {
			d = -1;
		}

		scrollPosition = window.pageYOffset;

		//Двигаем все частицы в заданном направлении
		for (let i = 0; i < particles.length; i++) {
			particles[i].Move(d);
		}

		//Выводим всё на страницу
		Fill();
	}

	function Fill() {
		// let ground = document.querySelector()
		// if()
		//Очищаем контейнер
		particlesContainer.innerHTML = "";

		//Создаём новые элементы с обновлёнными свойствами и помещаем их в контейнер
		for (let i = 0; i < particles.length; i++) {
			let div = document.createElement("div");
			div.className = "particle";

			div.setAttribute("style", "top: " + particles[i].y + "px; left: " + particles[i].x + "px; z-index: " + particles[i].z + "px; filter: blur(" + particles[i].blur + "px); background: " + particles[i].color + "; z-index: " + particles[i].index + "; opacity: " + particles[i].opacity + "; ");
			particlesContainer.appendChild(div);
		}
	}


})(jQuery);