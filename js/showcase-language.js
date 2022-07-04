// Language + Cookies

var arrLang = {
	
	// English
	'en': {
	
	// Showcase
	'showcase-title': 'Showcase',
	'showcase-subtitle': 'This is our Workflow',
		// Rows
		'showcase-row-1-title': 'Wireframe',
		'showcase-row-1-description': 'asd',

		'showcase-row-2-title': 'Renderización',
		'showcase-row-2-description': 'asd',

		'showcase-row-3-title': 'Realización',
		'showcase-row-3-description': 'asd'
		
	},

	// Spanish
	'es': {

	// Showcase
	'showcase-title': 'Demostración',
	'showcase-subtitle': 'Este es nuestro flujo de trabajo',
		// Rows
		'showcase-row-1-title': 'Planos',
		'showcase-row-1-description': 'Para decorar o restaurar un hogar siempre va bien tener un plano para poder visualizar el espacio disponible, el problema es que a veces estos planos no aparecen, ya sea por la compañía constructora o porque el edificio es muy viejo, de todas formas por aquí es por donde se empieza, con nuestro equipo haremos que esto no se convierta en un problema y lo haremos en tiempo record, una vez lo tengamos rasterizado en buena cualidad te mandaremos el plano por correo con cada medida (En metros cuadrados o square feet por preferencia)',

		'showcase-row-2-title': 'Renderización',
		'showcase-row-2-description': 'Una vez tengamos todo listo, podrás ver desde tu perfil como quedaría tu hogar con diferentes materiales, muebles, decoraciones y demás. Tambíen podrás ver el espacio que queda entre cada mueble, juega como si tu casa fuera de los Sims!',

		'showcase-row-3-title': 'Realización',
		'showcase-row-3-description': 'Te gusta tu configuración actual? Desde el panel de opciones podrás ver donde comprar dichos muebles, decoraciones, pintura y mucho más! A demás tambíen puedes contratar directamente para que te lo hagán'
		
	},
	
	// Catalan
	'ca': {

	// Showcase
	'showcase-title': 'Demostració',
	'showcase-subtitle': 'Aquest és el nostre flux de treball',
		// Rows
		'showcase-row-1-title': 'Planos',
		'showcase-row-1-description': 'asds',

		'showcase-row-2-title': 'Renderización',
		'showcase-row-2-description': 'asd',

		'showcase-row-3-title': 'Realización',
		'showcase-row-3-description': 'asd'
		
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