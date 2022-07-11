// Language + Cookies

var arrLang = {
	
	// English
	'en': {
	
	// Register
	'register-title': 'Say Hi to a better place!',
	'register-subtitle': 'Use your account to access our platform and content',
	'register-password': 'Input here your email to reset your password, then check your emails and proceed there',
	'register-restartpassword': 'Restart Password',
	'register-switch-1': 'Already have an account?',
	'register-switch-2': `Don't have an account?`,
	'register-login': 'Login',
	'register-register': 'Register',
	'register-createaccount': 'Create Account',
	'register-error-email': 'Email Not Valid',
	'register-error-password': 'Password must be at least 6 characters with number'
		
	},

	// Spanish
	'es': {

	// Register
	'register-title': 'Di hola a un lugar mucho mejor!',
	'register-subtitle': 'Utiliza tu cuenta para aceder a nuestra plataforma y contenido',
	'register-password': 'Escribe aqui tu correo para restablecer tu contraseña, después comprueba en tu bandeja de entrada que te haga llegado',
	'register-restartpassword': 'Restablecer Contraseña',
	'register-switch-1': '¿Ya tienes una cuenta?',
	'register-switch-2': `¿No tienes una cuenta?`,
	'register-login': 'Iniciar Sesión',
	'register-register': 'Registrar',
	'register-createaccount': 'Crear Cuenta',
	'register-error-email': 'Correo No Válido',
	'register-error-password': 'La Contraseña debe de tener al menos 6 caracteres y un número'

	},
	
	// Catalan
	'ca': {

	// Register
	'register-title': 'Digues hola a un lloc molt millor!',
	'register-subtitle': 'Utilitza la compte per accedir a la nostra plataforma i continguts',
	'register-password': `Escriu aqui el teu correu per reiniciar la teva contrasenya, després comprova que t'ha arribat per la safata d'entrada`,
	'register-restartpassword': 'Restablir Contrasenya',
	'register-switch-1': 'Ja tens una compte?',
	'register-switch-2': `No tens una compte?`,
	'register-login': 'Iniciar Sessió',
	'register-register': 'Registrar',
	'register-createaccount': 'Crear Compte',
	'register-error-email': 'Correu Invàlid',
	'register-error-password': 'La Contrasenya ha de tindre almenys 6 caràcters i un número'
		
	}
};

$(function() {

	if(!localStorage.getItem("language")){
		localStorage.setItem("language", "es");
	}

	var lang = localStorage.getItem("language");
		$('p,a,button').each(function(index, element) {
			$(this).text(arrLang[lang][$(this).attr('key')]);
			$(this).text(arrGlobal[lang][$(this).attr('key')]);
	});

	$('.language').click(function() {
		localStorage.setItem("language", $(this).attr('id'));
		var lang = $(this).attr('id');

		$('p,a,button').each(function(index, element) {
			$(this).text(arrLang[lang][$(this).attr('key')]);
			$(this).text(arrGlobal[lang][$(this).attr('key')]);

		});

	});

});
