// Language + Cookies

var arrLang = {
	
	// English
	'en': {
	
	// Editor
	'editor-house': 'House',
	'editor-floor': 'Floor',
	'editor-settings': 'Settings',
	'editor-products': 'Products',
	'editor-open': 'Open',
	'editor-close': 'Close'
	
	},

	// Spanish
	'es': {

	// Editor
	'editor-house': 'Casa',
	'editor-floor': 'Piso',
	'editor-settings': 'Ajustes',
	'editor-products': 'Productos',
	'editor-open': 'Abrir',
	'editor-close': 'Cerrar'

	},
	
	// Catalan
	'ca': {

	// Editor
	'editor-house': 'Casa',
	'editor-floor': 'Pis',
	'editor-settings': 'Eines',
	'editor-products': 'Productes',
	'editor-open': 'Obrir',
	'editor-close': 'Tancar'

	}
};

$(function() {

	if(!localStorage.getItem("language")){
		localStorage.setItem("language", "es");
	}

	var lang = localStorage.getItem("language");
		$('p,a').each(function(index, element) {
			$(this).html(arrLang[lang][$(this).attr('key')]);
			$(this).html(arrGlobal[lang][$(this).attr('key')]);
	});

	$('.language').click(function() {
		localStorage.setItem("language", $(this).attr('id'));
		var lang = $(this).attr('id');
		$(this).parent().addClass('language-active').siblings().removeClass('language-active');

		$('p,a').each(function(index, element) {
			$(this).html(arrLang[lang][$(this).attr('key')]);
			$(this).html(arrGlobal[lang][$(this).attr('key')]);

		});

	});

});


$(document).ready(function() {
	
	const languagebutton = document.getElementsByClassName("language-dropdown-each");
	var language = localStorage.getItem("language");
	
	if (language == 'es') {
		languagebutton[0].classList.add('language-active');
	} else if (language == 'ca') {
		languagebutton[1].classList.add('language-active');
	} else if (language == 'en') {
		languagebutton[2].classList.add('language-active');
	}

});