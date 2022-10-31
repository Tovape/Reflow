document.addEventListener("DOMContentLoaded", function(event) { 

	// Reminder	
	popup("var(--blue)","Low Performance? Turn on Hardware Acceleration");

    // Set autosave state
    if (localStorage.getItem("autosave") == 1) {
        document.getElementById("editorautosave").checked = true;
    } else {
        document.getElementById("editorautosave").checked = false;
    }

	// Set 2D Floorplanner Default
	setTimeout(function(){
		document.getElementById("editor-menu-view-2d").click();
	}, 1000);

	// Add Items Popup
	var items = document.getElementsByClassName("editor-inventory-browser-results-each");
	for (let i = 0; i < items.length; i++) {
		items[i].addEventListener("click", function() {
			$('#editor-material').removeClass("fadeon");
			$('#editor-material').removeClass("show");
			$('#editor-inventory-browser').removeClass("fadeon");
			$('#editor-inventory-browser').removeClass("show");
			$('#editor-inventory').removeClass("fadeon");
			$('#editor-inventory').removeClass("show");
			$('#editor-inventory-open').html('Open');
			$('#editor-material-open').html('Open');
			popup("var(--green)","Adding Item...");
		});
	}

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
	
	// Browser Brand
	var inventory_page = ['furniture','decoration','lights','windows','doors'];
	
	// Brand Searchbar
	var searchbar_array = document.querySelectorAll(".searchbar");
	
	// Browser Price Selector
	var price_selector = Array.apply(null, Array(inventory_page.length)).map(function () {})

	// Browser Price Array
	var price_range = Array.apply(null, Array(2)).map(function () {})
	
	// Browser Price Input
	var price_input = Array.apply(null, Array(2)).map(function () {})
	
	for(let j = 0; j < inventory_page.length; j++) {
		price_selector[j] = new Array(document.querySelectorAll("#browser-" + inventory_page[j] + " .filter-price-range"));
		price_range[j] = new Array();
		price_input[j] = new Array(document.querySelectorAll("#browser-" + inventory_page[j] + " .filter-price-range-input"));
	}
	
	// Default Values for Slider
	for(let j = 0; j < inventory_page.length; j++) {
		price_range[j][0] = 0;
		price_range[j][1] = 5000;
	}
	
	// Setting Up JQuery UI
	for(let j = 0; j < inventory_page.length; j++) {
		$(price_selector[j][0]).slider({
			step: 10,
			range: true, 
			min: 0, 
			max: 5000, 
			values: [0, 5000], 
			slide: function(event, ui) {
				$(price_input[j][0]).val(ui.values[0] + " - " + ui.values[1]);
				price_range[j][0] = ui.values[0];
				price_range[j][1] = ui.values[1];
			}
		});
		$(price_input[j][0]).val($(price_selector[j][0]).slider("values", 0) + " - " + $(price_selector[j][0]).slider("values", 1));
	}

	// Page Brand Selectors
	var brand_selector = Array.apply(null, Array(inventory_page.length)).map(function () {})

	// Page Brand Array
	var brand_array = new Array(inventory_page.length).fill(new Array(3).fill(null))

	// Page Color Selectors
	var class_selector = Array.apply(null, Array(inventory_page.length)).map(function () {})

	// Page Color Array
	var class_array = new Array(inventory_page.length).fill(new Array(3).fill(null))

	// Page Color Selectors
	var color_selector = Array.apply(null, Array(inventory_page.length)).map(function () {})

	// Page Color Array
	var color_array = new Array(inventory_page.length).fill(new Array(3).fill(null))

	// Each Furniture
	var furniture = [];
	
	// Each Furniture Length
	var furniture_length = [];

	// Browser Filtering
	for(let j = 0; j < inventory_page.length; j++) {

		// Brand Dom Selector Setters
		brand_selector[j] = new Array(document.querySelectorAll("#filter-manufacturer-" + inventory_page[j] + " p"));

		// Active Brands
		brand_array[j] = new Array();
		
		// Class Dom Selector Setters
		class_selector[j] = new Array(document.querySelectorAll("#filter-type-" + inventory_page[j] + " p"));

		// Active Class
		class_array[j] = new Array();
		
		// Color Dom Selector Setters
		color_selector[j] = new Array(document.querySelectorAll("#filter-color-" + inventory_page[j] + " p"));

		// Active Colors
		color_array[j] = new Array();

		// Get Furniture
		furniture[j] = new Array(document.querySelectorAll("#browser-" + inventory_page[j] + " .add-item"));

		// Get to length of furniture elements
		Array.from(furniture[j]).forEach(node => {
			let myArray = Array.from(node)
			furniture_length[j] = myArray.length;
		})

		// Actual Logic (Global)
		Array.from(brand_selector[j]).forEach(node => {
			let myArray = Array.from(node)

			for (let i = 0; i < node.length; i++) {
				brand_array[j][i] = myArray[i].getAttribute("brand");
				myArray[i].addEventListener("click", function() {
					var brand = myArray[i].getAttribute("brand");
					if (brand_array[j][i] === null) {
						brand_array[j][i] = brand;
						myArray[i].classList.toggle("filter-manufacturer-active");
					} else if (brand_array[i] !== null) {
						brand_array[j][i] = null;
						myArray[i].classList.toggle("filter-manufacturer-active");
					} else {}
				});			
			}
			
			$(searchbar_array[j]).on('input', function() {
				for (let i = 0; i < furniture[j].length; i++) {
					Array.from(furniture[j]).forEach(subnode => {
						let myArray = Array.from(subnode)
						for (let a = 0; a < furniture_length[j]; a++) {
							if ((myArray[a].getAttribute("model-name").toLowerCase()).includes((searchbar_array[j].value).toLowerCase())) {
								myArray[a].classList.remove("hidden");
							} else {
								myArray[a].classList.add("hidden");
							}
						}
					})
				}
			});

			$("#filter-button-" + inventory_page[j])[0].addEventListener("click", function() {
				for (let i = 0; i < furniture[j].length; i++) {
					Array.from(furniture[j]).forEach(subnode => {
						let myArray = Array.from(subnode)
						for (let a = 0; a < furniture_length[j]; a++) {
							if (brand_array[j].includes('all') && 
								price_range[j][0] <= myArray[a].getAttribute("price") && 
								price_range[j][1] >= myArray[a].getAttribute("price") && 
								color_array[j].includes('all') &&
								class_array[j].includes('all')) {
									myArray[a].classList.remove("hidden");
							} else if (
								(brand_array[j].includes('all') || brand_array[j].includes(myArray[a].getAttribute("brand"))) && 
								(price_range[j][0] <= myArray[a].getAttribute("price") && price_range[j][1] >= myArray[a].getAttribute("price")) && 
								(color_array[j].includes('all') || color_array[j].includes(myArray[a].getAttribute("color"))) &&
								(class_array[j].includes('all') || class_array[j].includes(myArray[a].getAttribute("model-class")))) {
									myArray[a].classList.remove("hidden");
							} else {
								if (myArray[a].classList.contains('hidden')) {
								} else {
									myArray[a].classList.add("hidden");
								}
							}
						}
					})
				}
			});
		})		
			
		// Actual Logic (Color)
		Array.from(color_selector[j]).forEach(node => {
			let myArray = Array.from(node)

			for (let i = 0; i < node.length; i++) {
				color_array[j][i] = myArray[i].getAttribute("color");
				myArray[i].addEventListener("click", function() {
					var color = myArray[i].getAttribute("color");
					if (color_array[j][i] === null) {
						color_array[j][i] = color;
						myArray[i].classList.toggle("filter-color-active");
					} else if (brand_array[i] !== null) {
						color_array[j][i] = null;
						myArray[i].classList.toggle("filter-color-active");
					} else {}
				});			
			}
		})
	
		// Actual Logic (Class)
		Array.from(class_selector[j]).forEach(node => {
			let myArray = Array.from(node)

			for (let i = 0; i < node.length; i++) {
				class_array[j][i] = myArray[i].getAttribute("type");
				myArray[i].addEventListener("click", function() {
					var modelclass = myArray[i].getAttribute("type");
					if (class_array[j][i] === null) {
						class_array[j][i] = modelclass;
						myArray[i].classList.toggle("filter-class-active");
					} else if (brand_array[i] !== null) {
						class_array[j][i] = null;
						myArray[i].classList.toggle("filter-class-active");
					} else {}
				});			
			}
		})
	
	}

	// Material Menu
	$('#editor-material-open,#editor-material-cross').click(function() {
		loadMaterials();
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
		popup("var(--red)","Deleting Project...");
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
		
	// Others
	$('.measurement').click(function() {
		popup("var(--blue)","Refresh the page");
	});

});

// Popup Function	
function popup(color, message) {
	
	let popupflex = document.getElementById("editor-canvas-popup");
	let popuptext = document.getElementById("editor-canvas-popup-text");
	
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

// Save Title and Description DDBB AJAX
function saveRequest() {
	popup("var(--green)","Saved");
	var data = saveData();
	var objects = saveObjects();
	$.ajax({
		url: "/saverequest",
		type: "POST",
		data: {
			'request_id': document.getElementById("request_id").getAttribute("value"),
			'request_title': document.getElementById("request_title").value,
			'request_description': document.getElementById("request_description").value,
			'request_json': data,
			'request_objectsave': objects
		}
	});
}

// AutoSave
setInterval(function() {
	if ($('#editorautosave').is(":checked") === true) {
		popup("var(--green)","Saved");
		var data = saveData();
		var objects = saveObjects();
		$.ajax({
			url: "/saverequest",
			type: "POST",
			data: {
				'request_id': document.getElementById("request_id").getAttribute("value"),
				'request_title': document.getElementById("request_title").value,
				'request_description': document.getElementById("request_description").value,
				'request_json': data,
				'request_objectsave': objects
			}
		});
	}
}, 40000);

$('#editorautosave').change(function() {
    if ($(this).is(':checked')) {
        localStorage.setItem("autosave", 1);
    } else {
        localStorage.setItem("autosave", 0);
    }
});

// Menu Collapser
var flag = 0;

function menucollapse() {
	var curwidth;
	$('#editor-menu').toggleClass('editor-menu-collapsed');
	$('.editor-menu-user').toggleClass('editor-menu-overflow');
	$('.editor-menu-scrollable').toggleClass('editor-menu-overflow');
	$('#editor-menu-logo-a').toggleClass('hidden');
	$('#editor-menu-logo').toggleClass('editor-menu-collapsed-logo');
	$('#editor-canvas').toggleClass('editor-canvas-collapsed');
	if (flag === 0) {
		curwidth = $("#floorplanner-canvas").attr("width");
		$('#floorplanner-canvas').attr("width",parseInt(curwidth) + parseInt(220));
		flag = 1;
	} else if (flag === 1) {
		curwidth = $("#floorplanner-canvas").attr("width");
		$('#floorplanner-canvas').attr("width",parseInt(curwidth) - parseInt(220));
		flag = 0;
	}
}