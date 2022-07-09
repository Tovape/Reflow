// Language + Cookies

var arrLang = {
	
	// English
	'en': {
	
	// Contact
	'booking-title': 'Booking',
	'booking-subtitle': 'Ready to take action? Fill up the form with your information and we will get in contact with you in no time!',
	'booking-request': 'Request Type'
	
	},

	// Spanish
	'es': {

	// Contact
	'booking-title': 'Reserva',
	'booking-subtitle': '¡Preparado para tomar acción? Rellena este formulario con tu información y nos pondremos en contacto con ustéd lo más antes possible!',
	'booking-request': 'Tipo de Reserva'

	},
	
	// Catalan
	'ca': {

	// Contact
	'booking-title': 'Reserva',
	'booking-subtitle': 'Preparat per a prendre acció? Emplena aquest formulari amb la teva informació i ens posarem en contacte amb vosté el més abans possible!',
	'booking-request': 'Tipus de Reserva'

	}
};

$(function() {

	if(!localStorage.getItem("language")){
		localStorage.setItem("language", "es");
	}

	var lang = localStorage.getItem("language");
		$('p,a,label').each(function(index, element) {
			$(this).text(arrLang[lang][$(this).attr('key')]);
			$(this).text(arrGlobal[lang][$(this).attr('key')]);
	});

	$('.language').click(function() {
		localStorage.setItem("language", $(this).attr('id'));
		var lang = $(this).attr('id');
		$(this).parent().addClass('language-active').siblings().removeClass('language-active');

		$('p,a,label').each(function(index, element) {
			$(this).text(arrLang[lang][$(this).attr('key')]);
			$(this).text(arrGlobal[lang][$(this).attr('key')]);

		});

	});

});

$(document).ready(function() {
	
	const languagebutton = document.getElementsByClassName("language-dropdown-each");
	var language = localStorage.getItem("language");
	
	if (language == 'es') {
		languagebutton[0].classList.add('language-active');
		languagebutton[3].classList.add('language-active');
	} else if (language == 'ca') {
		languagebutton[1].classList.add('language-active');
		languagebutton[4].classList.add('language-active');
	} else if (language == 'en') {
		languagebutton[2].classList.add('language-active');
		languagebutton[5].classList.add('language-active');
	}

});