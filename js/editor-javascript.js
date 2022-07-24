document.addEventListener("DOMContentLoaded", function(event) { 

	// Get Windows Size
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;

	// Get User
	var username = document.getElementById("user").textContent;

	// Get Floor Count
	var floorcount = document.getElementById("jsonlength").value;
	console.log("Got " + floorcount + " floors")

	// Get Canvas
	var canvas_selector = document.getElementsByClassName("editor-canvas-each");
	var canvas_editor = Array.apply(null, Array(floorcount)).map(function () {})

	for (let i = 0; i < canvas_selector.length; i++) {
		// Create Canvas
		canvas_editor[i] = new fabric.Canvas('canvas' + i, { 
			selection: false,
			controlsAboveOverlay: true,
			centeredScaling: true,
			allowTouchScrolling: true,
			preserveObjectStacking: true
		});
	}
	
	var grid = 50;
	var inset = 20;
	
	// Show Hide Canvas Container
	var canvas_container = document.getElementsByClassName("canvas-container");
	
	// Get Floors
	var floors = document.getElementsByClassName("editor-menu-each-floor");

	for (let i = 0; i < floors.length; i++) {
		floors[i].addEventListener("click", function() {
			for (let i = 0; i < floors.length; i++) {
				canvas_selector[i].classList.remove("show");
				canvas_container[i].classList.remove("show");
			}
			canvas_selector[i].classList.toggle("show");
			canvas_container[i].classList.toggle("show");
			//addBlueprint(value, username);
		});
	}
	
	// Flat Selected
	var flatselected = 1;
	
});

// Menu Options
$(document).ready(function() {
  $('.editor-menu-each-button').click(function(){
    $(this).toggleClass('editor-menu-each-active');
    $(this).next('.editor-menu-each-content').slideToggle(400);
   });
});

