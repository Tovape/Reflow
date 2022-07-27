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
		
		var language = localStorage.getItem("language");
		
		if (language == 'es') {
			var titlearray = [
			'Pentahouse',
			'Condo Extended',
			'Sabadell Centre Duplex',
			'Puerta del Sol Condo',
			'Avinguda San Esteve'
			];
			var subtitlearray = [
			'Barcelona',
			'Terrassa',
			'Sabadell',
			'Madrid',
			'Castellar del Valles'
			];
			var descriptionarray = [
				'Text here asda',
				'Text here asda',
				'Text here asda',
				'Text here asda',
				'Text here asda'
			];
		} else if (language == 'ca') {
			var titlearray = [
			'Pentahouse',
			'Condo Extended',
			'Sabadell Centre Duplex',
			'Puerta del Sol Condo',
			'Avinguda San Esteve'
			];
			var subtitlearray = [
			'Barcelona',
			'Terrassa',
			'Sabadell',
			'Madrid',
			'Castellar del Valles'
			];
			var descriptionarray = [
				'Text here asda',
				'Text here asda',
				'Text here asda',
				'Text here asda',
				'Text here asda'
			];
		} else if (language == 'en') {
			var titlearray = [
			'Pentahouse',
			'Condo Extended',
			'Sabadell Centre Duplex',
			'Puerta del Sol Condo',
			'Avinguda San Esteve'
			];
			var subtitlearray = [
			'Barcelona',
			'Terrassa',
			'Sabadell',
			'Madrid',
			'Castellar del Valles'
			];
			var descriptionarray = [
				'Text here asda',
				'Text here asda',
				'Text here asda',
				'Text here asda',
				'Text here asda'
			];
		}
		
		var linkarray = ['a','b','c','d','e']

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

// Faq

$(document).ready(function() {
  $('.faq .faq-button').click(function(){
    $(this).toggleClass('faq-active');
    $(this).next('.faq-each-content').slideToggle(400);
   });
});
