// Language + Cookies

var arrLang = {
	
	// English
	'en': {
	
	// Register
	'showcase-title': 'Showcase'
		
	},

	// Spanish
	'es': {

	// Register
	'showcase-title': 'Demostración'
	
	},
	
	// Catalan
	'ca': {

	// Register
	'showcase-title': 'Demostració'
		
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
		languagebutton[3].classList.add('language-active');
	} else if (language == 'ca') {
		languagebutton[1].classList.add('language-active');
		languagebutton[4].classList.add('language-active');
	} else if (language == 'en') {
		languagebutton[2].classList.add('language-active');
		languagebutton[5].classList.add('language-active');
	}

});