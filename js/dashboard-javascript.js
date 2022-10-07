// Sorting Work

function sortYear(arg, sel, elem, order) {
	var $selector = $(sel),
	$element = $selector.children(elem);

	$element.sort(function(a, b) {
		var an = parseInt(a.getAttribute(arg)),
		bn = parseInt(b.getAttribute(arg));

		if (order == 'asc') {
			if (an > bn)
			return 1;
			if (an < bn)
			return -1;
		} else if (order == 'desc') {
			if (an < bn)
			return 1;
			if (an > bn)
			return -1;
		}
		return 0;
	});

	$element.detach().appendTo($selector);
}

function sortType(arg, sel, elem, order) {
	var $selector = $(sel),
	$element = $selector.children(elem);

	for (let i = 0; i < $element.length; i++) {
		if ($element[i].getAttribute(arg) != order) {
			$($element[i]).removeClass("dashboard-filter-fadeout");
			$($element[i]).addClass("dashboard-filter-fadein");
		} else {
			$($element[i]).removeClass("dashboard-filter-fadein");
			$($element[i]).addClass("dashboard-filter-fadeout");
		}
		
		if ('all' == order) {
			$($element[i]).removeClass("dashboard-filter-fadein");
			$($element[i]).addClass("dashboard-filter-fadeout");
		}
	}

	$element.detach().appendTo($selector);
}

// Select Country

$(document).ready(function() {
	var countrydiv = document.getElementById("dashboard-country-div-p");

	for (let i = 0; i < regions.length; i++) {
		$(countrydiv).append("<p class='dashboard-country-each' value='" + regions[i] + "'>" + regions[i] + "</p>");
	}
	
	var generated = document.getElementsByClassName("dashboard-country-each");
	
	for (let i = 0; i < generated.length; i++) {
		generated[i].addEventListener("click", function () {
			localStorage.setItem("region", generated[i].getAttribute("value"));
			popup("var(--green)","Saved");
		});
	}	
})

function selectCountry() {
	var countrydiv = document.getElementById("dashboard-country-div");
	var requestdiv = document.getElementById("dashboard-requests");
	
	countrydiv.classList.toggle("dashboard-filter-fadein");
	requestdiv.classList.toggle("dashboard-filter-fadein");
}

// Sort Year Buttons

$(document).on('click', '.dashboard-sort-asc', function() {
  sortYear('data-year', '.dashboard-gallery', '.dashboard-form', 'asc');
});

$(document).on('click', '.dashboard-sort-desc', function() {
  sortYear('data-year', '.dashboard-gallery', '.dashboard-form', 'desc');
});

// Sort Type Buttons

$(document).on('click', '.dashboard-filter-all', function() {
  sortType('data-type', '.dashboard-gallery', '.dashboard-form', 'all');
});

$(document).on('click', '.dashboard-filter-photos', function() {
  sortType('data-type', '.dashboard-gallery', '.dashboard-form', 'photos');
});

$(document).on('click', '.dashboard-filter-videos', function() {
  sortType('data-type', '.dashboard-gallery', '.dashboard-form', 'videos');
});

$(document).on('click', '.dashboard-filter-progress', function() {
  sortType('data-type', '.dashboard-gallery', '.dashboard-form', 'progress');
});

// Set Filter Selection

$(document).ready(function() {
	const sortbutton = document.getElementsByClassName("dashboard-filter-each");

	$(sortbutton).click(function() {
		$(this).addClass('dashboard-filter-active').siblings().removeClass('dashboard-filter-active');
	});
});

// Avatar Auto Submit

document.addEventListener("DOMContentLoaded", function(event) { 
	document.getElementById("avatar").onchange = function() {
		document.getElementById("saveavatar").submit();
		//let id_users = document.getElementById("id_user").value;
		//document.getElementById("dashboard-profile-avatar").style.backgroundImage = "url('/user/" + id_users + ".jpg')";
	};
});

// Auto Redirect Gallery

document.addEventListener("DOMContentLoaded", function(event) { 
	var request_id = document.getElementsByClassName("dashboard-form");

	for (let i = 0; i < request_id.length; i++) {
		request_id[i].addEventListener("click", function () {
		  request_id[i].submit();
		});
	}
});

// Popup Function	

function popup(color, message) {

	let popupflex = document.getElementById("dashboard-canvas-popup");
	let popuptext = document.getElementById("dashboard-canvas-popup-text");
	
	popuptext.style.borderColor = color;
	popuptext.textContent = message;
	
	popupflex.classList.toggle('flex');
	setTimeout(function() {
		popupflex.classList.toggle('fadeon');
	}, 150);
	
	setTimeout(function() {
		popupflex.classList.toggle('fadeon');
		setTimeout(function() {
			popupflex.classList.toggle('flex');
		}, 150);
	}, 2000);
}


