// Language + Cookies

var arrLang = {
	
	// English
	'en': {
	
	// Dashboard
	'dashboard-logout': 'Log Out',
	'dashboard-admin': 'Administrator Panel',
	'dashboard-requests': 'Requests',
	'dashboard-progress': 'In Progress',
	'dashboard-points': 'Points',
	'dashboard-all': 'All',
	'dashboard-photos': 'Photos',
	'dashboard-videos': 'Videos',
	'dashboard-country': 'Select Country',
	'dashboard-selectcountry': 'Select Your Country'
	
	},

	// Spanish
	'es': {

	// Dashboard
	'dashboard-logout': 'Cerrar Sesión',
	'dashboard-admin': 'Panel de Administrator',
	'dashboard-requests': 'Solicitudes',
	'dashboard-progress': 'En Progreso',
	'dashboard-points': 'Puntos',
	'dashboard-all': 'Todo',
	'dashboard-photos': 'Fotos',
	'dashboard-videos': 'Videos',
	'dashboard-country': 'Selecionar País',
	'dashboard-selectcountry': 'Seleciona tu País'

	},
	
	// Catalan
	'ca': {

	// Dashboard
	'dashboard-logout': 'Tancar Sessió',
	'dashboard-admin': `Panel d'Administrador`,
	'dashboard-requests': 'Solicituts',
	'dashboard-progress': 'En Progress',
	'dashboard-points': 'Punts',
	'dashboard-all': 'Tot',
	'dashboard-photos': 'Fotos',
	'dashboard-videos': 'Videos',
	'dashboard-country': 'Seleccionar País',
	'dashboard-selectcountry': 'Seleciona el teu País'

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

