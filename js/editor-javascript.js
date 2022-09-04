document.addEventListener("DOMContentLoaded", function(event) { 

	// Set 2D Floorplanner Default
	setTimeout(function(){
		document.getElementById("editor-menu-view-2d").click();
	}, 1000);

	// Getting JSON
	var canvas_jsonsave = document.getElementById("jsonsave")

	if (canvas_jsonsave.value !== null && canvas_jsonsave.value !== '' && canvas_jsonsave.value !== undefined && canvas_jsonsave.value !== '[]') {
		var canvas_jsonsave_format = canvas_jsonsave.value.substring(1, canvas_jsonsave.value.length-1);
		var canvas_jsonsave_parsed = JSON.parse(canvas_jsonsave_format);
		console.log("Got: " + canvas_jsonsave_parsed.json)
	}

	// Change 2D/3D
	/*
	var view_2d = document.getElementById("editor-menu-view-2d");
	var view_3d = document.getElementById("editor-menu-view-3d");
	var canvas_selector = document.getElementsByClassName("editor-canvas-each");

	view_2d.addEventListener("click", function() {
		view_3d.classList.remove("active");
		view_2d.classList.add("active");
		canvas_selector[0].classList.toggle("show");
		canvas_selector[1].classList.toggle("show");
	});
	
	view_3d.addEventListener("click", function() {
		view_2d.classList.remove("active");
		view_3d.classList.add("active");
		canvas_selector[0].classList.toggle("show");
		canvas_selector[1].classList.toggle("show");;
	});
	*/

	// Save to DDBB AJAX - FIX
	/*
	var jsonAutosave = window.setInterval(function() {
		if (flatselected !== null && canvas_json[flatselected] !== null) {
			$.ajax({
				url: "/savecanvas",
				type: "POST",
				data: {
					'json': canvas_json[flatselected],
					'request': request_id,
					'flat': flatselected
				}
			});
		}	
	}, 5000);
	*/

	// Menu Options
	$('.editor-menu-each-button').click(function(){
		$(this).toggleClass('editor-menu-each-active');
		$(this).next('.editor-menu-each-content').slideToggle(400);
	});
	$('#editor-menu-content-flats').slideToggle(400);

	// Inventory Menu
	$('#editor-inventory-open,#editor-inventory-cross').click(function(){
		if ($('#editor-inventory').hasClass('fadeon')) {
			$('#editor-inventory').toggleClass('fadeon');
			setTimeout(function() {
				$('#editor-inventory').toggleClass('show');
			}, 250);
		$('#editor-inventory-open').html('Open');
		} else {
			$('#editor-inventory').toggleClass('show');
			setTimeout(function() {
				$('#editor-inventory').toggleClass('fadeon');
			}, 250);
			$('#editor-inventory-open').html('Close');
		}
	});

	// Inventory Browsing
	var objects = document.getElementsByClassName("editor-inventory-row-content");
	for (let i = 0; i < objects.length; i++) {
		objects[i].addEventListener("click", function() {
			var type = objects[i].getAttribute("type");
			
			$('.editor-inventory-browser-each').not('#browser-' + type).hide('250');
			$('.editor-inventory-browser-each').filter('#browser-' + type).show('250');
			$('#editor-inventory-browser-title').html(type.charAt(0).toUpperCase() + type.slice(1));
			
			if ($('#editor-inventory-browser').hasClass('fadeon')) {
				$('#editor-inventory-browser').toggleClass('fadeon');
				setTimeout(function() {
					$('#editor-inventory-browser').toggleClass('show');
				}, 250);
			} else {
				$('#editor-inventory-browser').toggleClass('show');
				setTimeout(function() {
					$('#editor-inventory-browser').toggleClass('fadeon');
				}, 250);
			}
		});
	}
	$('#editor-inventory-browser-cross').click(function(){
		if ($('#editor-inventory-browser').hasClass('fadeon')) {
			$('#editor-inventory-browser').toggleClass('fadeon');
			setTimeout(function() {
				$('#editor-inventory-browser').toggleClass('show');
			}, 250);
		} else {
			$('#editor-inventory-browser').toggleClass('show');
			setTimeout(function() {
				$('#editor-inventory-browser').toggleClass('fadeon');
			}, 250);
		}
	});

	// Browser Price Range
	$("#filter-price-range").slider({
		step: 10,
		range: true, 
		min: 0, 
		max: 5000, 
		values: [0, 5000], 
		slide: function(event, ui) {$("#filter-price-range-input").val(ui.values[0] + " - " + ui.values[1]); }
	});
	$("#filter-price-range-input").val($("#filter-price-range").slider("values", 0) + " - " + $("#filter-price-range").slider("values", 1));

	// Browser Brand
	var brand_selector = document.querySelectorAll(".filter-manufacturer p");
	var brand_array = Array.apply(null, Array(brand_selector.length)).map(function () {})
	
	for (let i = 0; i < brand_selector.length; i++) {
		brand_array[i] = null;
	}
	
	for (let i = 0; i < brand_selector.length; i++) {
		brand_selector[i].addEventListener("click", function() {
			var brand = brand_selector[i].getAttribute("brand");
			if (brand_array[i] === null) {
				brand_array[i] = brand;
				brand_selector[i].classList.toggle("filter-manufacturer-active");
			} else if (brand_array[i] !== null) {
				brand_array[i] = null;
				brand_selector[i].classList.toggle("filter-manufacturer-active");
			} else {}
		});
	}

	// Browser Filtering
	$("#filter-button")[0].addEventListener("click", function() {
		for (let i = 0; i < furniture.length; i++) {
			if (brand_array.includes(furniture[i].getAttribute("brand").toLowerCase()) &&
			$("#filter-price-range").slider("values")[0] <= furniture[i].getAttribute("price") && 
			$("#filter-price-range").slider("values")[1] >= furniture[i].getAttribute("price")) {
				furniture[i].classList.remove("hidden");
			} else if (brand_array.includes('all')) {
				furniture[i].classList.remove("hidden");
			} else {
				if (furniture[i].classList.contains('hidden')) {
					
				} else {
					furniture[i].classList.add("hidden");
				}
			}
		}
	});
	
	// Material Menu
	$('#editor-material-open,#editor-material-cross').click(function(){
		if ($('#editor-material').hasClass('fadeon')) {
			$('#editor-material').toggleClass('fadeon');
			setTimeout(function() {
				$('#editor-material').toggleClass('show');
			}, 250);
		$('#editor-material-open').html('Open');
		} else {
			$('#editor-material').toggleClass('show');
			setTimeout(function() {
				$('#editor-material').toggleClass('fadeon');
			}, 250);
			$('#editor-material-open').html('Close');
		}
	});
	
	// Delete Project
	$("#editor-delete")[0].addEventListener("click", function() {
		popup("red","Deleting Project...");
		setTimeout(function() {
			$.ajax({
				url: "/deleterequest",
				type: "POST",
				data: {
					'request_id': document.getElementById("request_id").getAttribute("value")
				}
			});
			window.location.replace("./dashboard");
		}, 2300);
	});
	
	// Popup Function
	let popupflex = document.getElementById("editor-canvas-popup");
	let popuptext = document.getElementById("editor-canvas-popup-text");
		
	function popup(color, message) {
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
	
});

// Save Title and Description DDBB AJAX
function saveRequest() {
	$.ajax({
		url: "/saverequest",
		type: "POST",
		data: {
			'request_id': document.getElementById("request_id").getAttribute("value"),
			'request_title': document.getElementById("request_title").value,
			'request_description': document.getElementById("request_description").value
		}
	});
}