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

// Image Lazy Load

$(document).ready(function(){

	const targets = document.querySelectorAll('body img');
	
	const lazyLoad = target => {
		const io = new IntersectionObserver((entries, observer) => {

		entries.forEach(entry => {
			
			if (entry.isIntersecting) {
				const img = entry.target;
				const src = img.getAttribute('data-lazy');
				
				img.setAttribute('src', src);
				
				observer.disconnect();
				}
			});
		});
	io.observe(target);
	};
	targets.forEach(lazyLoad);
});

// Menu Dropper

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

// Console.log

console.log(`%c 
  _____       __ _               \r\n |  __ \\     \/ _| |              \r\n | |__) |___| |_| | _____      __\r\n |  _  \/\/ _ \\  _| |\/ _ \\ \\ \/\\ \/ \/\r\n | | \\ \\  __\/ | | | (_) \\ V  V \/ \r\n |_|  \\_\\___|_| |_|\\___\/ \\_\/\\_\/   
`, "color: #6497b1; font-family: Monospace;");

console.table({Español:"Quieres Trabajar con nosotros?", English:"Do you want to work with us?"});
console.log(`%c Send us an email! tovapebusiness@gmail.com`, "color: #6497b1; font-family: Monospace;");