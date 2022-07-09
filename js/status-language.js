// Language + Cookies

var arrLang = {
	
	// English
	'en': {
	
	// Email Status
	'status-success': 'Everything ok!<br>We received your message and we will get in touch with you soon',
	'status-failure': `Something went wrong..<br>Don't worry, we will take care of fixing the problem as soon as possible`,
	'status-redirecting': `We're redirecting you in 5 seconds`

	},

	// Spanish
	'es': {

	// Email Status
	'status-success': 'Todo correcto!<br>Hemos recibido tu mensaje y nos pondremos en contacto contigo lo más antes possible',
	'status-failure': 'Algo ha ido mal..<br>No te preocupes, nos encargaremos de arreglar el problema lo más pronto possible',
	'status-redirecting': 'Te rediccionamos a nuestra web en 5 segundos'

	},
	
	// Catalan
	'ca': {

	// Email Status
	'status-success': 'Tot correcte!<br>Hem rebut el teu missatje i ens posarem en contacte amb tu el més abans possible',
	'status-failure': `Alguna cosa ha anat malament..<br>No et preocupis, ens encarregarem d'arreglar el problema al més aviat possible`,
	'status-redirecting': 'Et rediccionarem a la nostra web en 5 segons'
		
	}
};

$(function() {

	if(!localStorage.getItem("language")){
		localStorage.setItem("language", "es");
	}

	var lang = localStorage.getItem("language");
		$('p,a,button').each(function(index, element) {
			$(this).html(arrLang[lang][$(this).attr('key')]);
			$(this).html(arrGlobal[lang][$(this).attr('key')]);
	});

	$('.language').click(function() {
		localStorage.setItem("language", $(this).attr('id'));
		var lang = $(this).attr('id');

		$('p,a,button').each(function(index, element) {
			$(this).html(arrLang[lang][$(this).attr('key')]);
			$(this).html(arrGlobal[lang][$(this).attr('key')]);

		});

	});

});
