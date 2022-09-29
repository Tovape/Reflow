// Language + Cookies

var arrLang = {
	
	// English
	'en': {
	
	// Editor
	'editor-name': 'Name',
	'editor-description': 'Description',
	'editor-height': 'Flat Height',
	'editor-house': 'House',
	'editor-floor': 'Floor',
	'editor-settings': 'Settings',
	'editor-products': 'Products',
	'editor-material': 'Materials',
	'editor-inventory': 'Inventory',
	'editor-open': 'Open',
	'editor-close': 'Close',
	'editor-delete': 'Delete',
	'editor-autosave': 'AutoSave'
	
	},

	// Spanish
	'es': {

	// Editor
	'editor-name': 'Titulo',
	'editor-description': 'Descripción',
	'editor-height': 'Altura',
	'editor-house': 'Casa',
	'editor-floor': 'Piso',
	'editor-settings': 'Ajustes',
	'editor-products': 'Productos',
	'editor-material': 'Materiales',
	'editor-inventory': 'Inventario',
	'editor-open': 'Abrir',
	'editor-close': 'Cerrar',
	'editor-delete': 'Eliminar',
	'editor-autosave': 'AutoGuardado'

	},
	
	// Catalan
	'ca': {

	// Editor
	'editor-name': 'Titol',
	'editor-description': 'Descripció',
	'editor-height': 'Altura',
	'editor-house': 'Casa',
	'editor-floor': 'Pis',
	'editor-settings': 'Eines',
	'editor-products': 'Productes',
	'editor-material': 'Materials',
	'editor-inventory': 'Inventari',
	'editor-open': 'Obrir',
	'editor-close': 'Tancar',
	'editor-delete': 'Eliminar',
	'editor-autosave': 'AutoGuardat'

	}
};

$(function() {

	if(!localStorage.getItem("language")){
		localStorage.setItem("language", "es");
	}

	var lang = localStorage.getItem("language");
		$('p,a,span').each(function(index, element) {
			$(this).html(arrLang[lang][$(this).attr('key')]);
			$(this).html(arrGlobal[lang][$(this).attr('key')]);
	});

	$('.language').click(function() {
		localStorage.setItem("language", $(this).attr('id'));
		var lang = $(this).attr('id');
		$(this).parent().addClass('language-active').siblings().removeClass('language-active');

		$('p,a,span').each(function(index, element) {
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