// Introduction Cards

document.addEventListener("DOMContentLoaded", function(event) { 

	var speed = 4000; 
	var count = 0;

	function cardSlider() {
		
		// Variables
		
		var title = document.getElementById('introduction-title');
		var subtitle = document.getElementById('introduction-subtitle');
		var description = document.getElementById('introduction-description');
		var link = document.getElementById('introduction-link');

		// Text
		
		var titlearray = ['Pentahouse','Condo Extended','Sabadell Centre Duplex','Puerta del Sol Condo','Avinguda San Esteve'];
		var subtitlearray = ['Barcelona','Terrassa','Sabadell','Madrid','Castellar del Valles'];
		var descriptionarray = [
			'Archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500 cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedand',
			'b',
			'c',
			'd',
			'e'
		];
		var linkarray = ['https://google.com','b','c','d','e']

		title.innerHTML = titlearray[count];
		subtitle.innerHTML = subtitlearray[count];
		description.innerHTML = descriptionarray[count];
		link.setAttribute("href", linkarray[count]);

		if (count != 4) {
			count++;
		} else {
			count = 0;
		}
		
	}

	cardSlider();
	setInterval(cardSlider, speed);

});


// Hover Dropdown

$(document).ready(function() {
	
	var dropdowntriggermenu = $(".dropdown-trigger-menu");
	var dropdowntriggercontent = $(".dropdown-trigger-content");
	
	var dropdowncontent = $(".dropdown-content");
	var dropdownactual = $(".dropdown-content-default");
	
	// Triggers
	
	$(dropdowntriggermenu).on("mouseenter", function () {

		// Changes Height Transition
		$(dropdowncontent).removeClass("dropdown-content-inactive");
		$(dropdowncontent).addClass("dropdown-content-active");
		
		// Removes Display Hidden
		$(dropdownactual).removeClass("dropdown-content-default");

		setTimeout(() => {
			// Adds Display Block
			$(dropdownactual).addClass("dropdown-show");
			// Changes Opacity Transition
			$(dropdownactual).addClass("dropdown-opacity-true");
			$(dropdownactual).removeClass("dropdown-opacity-false");
		}, 150);

	});
	
	$(dropdowntriggercontent).on("mouseleave", function () {
		
		// Changes Opacity Transition
		$(dropdownactual).removeClass("dropdown-opacity-true");
		$(dropdownactual).addClass("dropdown-opacity-false");
		
		setTimeout(() => { 
			// Hides All Content 
			$(dropdownactual).removeClass("dropdown-show");
			$(dropdowncontent).removeClass("dropdown-content-active");
			$(dropdowncontent).addClass("dropdown-content-inactive");
			$(dropdownactual).addClass("dropdown-content-default");
		}, 150);	
		
	});
	
});

// Faq

$(document).ready(function() {
  $('.faq .faq-button').click(function(){
    $(this).toggleClass('faq-active');
    $(this).next('.faq-each-content').slideToggle(400);
   });
});

// Top Button

function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

$(window).scroll(function() {
    if ($(this).scrollTop()) {
        $('#toTop:hidden').stop(true, true).fadeIn();
    } else {
        $('#toTop').stop(true, true).fadeOut();
    }
});

// Menu Show after Scroll

window.addEventListener("scroll", function() {
	var elementTarget = document.getElementById("menu-trigger");
	var menu = document.getElementById('menu-background');

	if (window.scrollY > (elementTarget.offsetTop + elementTarget.offsetHeight)) {
		menu.classList.add("menu-fixed");
	} else {
		menu.classList.remove("menu-fixed");
	}
});

function menudropper() {
	var cross = document.getElementById("menu-cross");
	var bars = document.getElementById("menu-bars");
	var dropmenu = document.getElementById("menu-dropmenu");
	
	if(dropmenu.className === "menu-dropmenu") {
		dropmenu.classList.add("dropdown-show");
		bars.classList.add("dropdown-hide");
		cross.classList.add("dropdown-show");
	} else {
		dropmenu.classList.remove("dropdown-show");
		bars.classList.remove("dropdown-hide");
		cross.classList.remove("dropdown-show");
	}
}