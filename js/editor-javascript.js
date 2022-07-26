document.addEventListener("DOMContentLoaded", function(event) { 

	// Get Windows Size
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;

	// Get Request
	var request_id = document.getElementById("request_id").getAttribute("value");

	// Get User
	var username = document.getElementById("user").textContent;

	// Get Floor Count
	var floorcount = document.getElementById("jsonlength").value;
	console.log("Got " + floorcount + " floors, formatting --")
	floorcount--;

	// Get/Create Canvas
	var canvas_selector = document.getElementsByClassName("editor-canvas-each");
	var canvas_editor = Array.apply(null, Array(floorcount)).map(function () {})
	var canvas_json = Array.apply(null, Array(floorcount)).map(function () {})

	for (let i = 0; i < canvas_selector.length; i++) {
		canvas_editor[i] = new fabric.Canvas('canvas' + i, { 
			selection: false,
			controlsAboveOverlay: true,
			centeredScaling: true,
			allowTouchScrolling: true,
			preserveObjectStacking: true
		});
	}
	
	for (let i = 0; i < canvas_json.length; i++) {
		canvas_json[i] = null;
	}

	// Show Hide Canvas Container
	var canvas_container = document.getElementsByClassName("canvas-container");
		
	// Flat Selected
	var flatselected = null;
	
	// Save Canvas Function
	function saveCanvas(flatselected) {
		if (flatselected != null) {
			console.log("Saving Canvas in flat " + flatselected)
			canvas_json[flatselected] = canvas_editor[flatselected].toJSON();
		}
	}
	
	// Load Canvas Function
	function loadCanvas(selection, user) {
		//var jsonsave_selector = document.getElementsByClassName("jsonsave");
		//var jsonsave_data = Array.apply(null, Array(jsonsave_selector.length)).map(function () {})
		//var temp = document.querySelectorAll(".jsonsave")

		/*
		for (let i = 0; i < jsonsave_selector.length; i++) {
			jsonsave_data[i] = temp[i].value;
		}
		*/
	}
	
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
			flatselected = i;
			console.log("Floor Selected: " + flatselected);
		});
	}

	// Redraw Canvas
	var grid = 50;
	var inset = 20;
	
	for (let j = 0; j < floors.length; j++) {
		for (var i = 0; i < (2000 / grid); i++) {
			canvas_editor[j].add(new fabric.Line([
				inset + i * grid, inset, inset + i * grid, 2000], { stroke: '#ccc', selectable: false, excludeFromExport: true
			}));

			canvas_editor[j].add(new fabric.Line([ 
				inset, inset + i * grid, 2000,inset + i * grid], { stroke: '#ccc', selectable: false, excludeFromExport: true
			}))
		}

		for (var i = 0; i < (2000 / grid); i++) {

			canvas_editor[j].add(new fabric.Text(String(i * 5), {
				left: inset + i * grid, top: 0, 
				fontSize: 14,
				fontFamily: 'Verdana',
				selectable: false,
				excludeFromExport: true
			}));

			canvas_editor[j].add(new fabric.Text(String(i * 5), {
				left:0, top: inset + i * grid, 
				fontSize: 14,
				fontFamily: 'Verdana',
				textAlign: 'Center',
				selectable: false,
				excludeFromExport: true
			}));
		}

		canvas_editor[j].renderAll();
	}
	
	// Add Background Image to Canvas
	for (let i = 0; i < floors.length; i++) {
		fabric.Image.fromURL('../files/blueprint/' + username + '/floor-' + i + '.png', function(oImg) {
			oImg.set({
				left: 0,
				top: 0,
				originX: 'left',
				originY: 'top',
				selectable: false,
				lockMovementX: true,
				lockMovementY: true,
				transparentCorners: false,
				excludeFromExport: true
			});
			oImg.hoverCursor = 'default';
			oImg.scaleToWidth(windowWidth - 300);
			oImg.scaleToHeight(windowHeight);
			canvas_editor[i].setActiveObject(oImg);
			canvas_editor[i].sendToBack(oImg);
			icon = canvas_editor[i].getActiveObject();
			icon.hasBorders = false;
			icon.hasControls = false;	
		});
	}
	
	// Canvas Configuation - Lock Rotation
	for (let i = 0; i < floors.length; i++) {
		canvas_editor[i].on('object:rotating', function(options) {
			var step = 90;
			options.target.angle = Math.round(options.target.angle / step) * step;
		});
	}
	
	// Canvas Configuation - AutoSave
	for (let i = 0; i < floors.length; i++) {
		canvas_editor[i].on('object:moving', function(options) {
			saveCanvas(flatselected);
		});
	}
	
	// Canvas Configuation - Rezise
	window.addEventListener('resize', resizeCanvas, false);
	
	function resizeCanvas() {
		for (let i = 0; i < floors.length; i++) {
			canvas_editor[i].setHeight(window.innerHeight - 20 + 1000);
			canvas_editor[i].setWidth(window.innerWidth - 330 + 1000);
			canvas_editor[i].renderAll();
		}
	}
	
	resizeCanvas();
	
	// Delete Active Objects
	document.addEventListener("keydown", (e) => {      
		if (e.key === "Delete" || e.key === 'Backspace') {
			if(canvas_editor[flatselected].getActiveObject() != blueprint) {
				canvas_editor[flatselected].remove(canvas_editor[flatselected].getActiveObject());
			}
		}
	});
	
	// Zoom Functions
	var curZoom = 1;
	var minZoom = 0.6;
	var maxZoom = 3;
	
	document.getElementById("zoomin").addEventListener("click", function() {
		if(curZoom < maxZoom) {
			curZoom += 0.2;
			canvas_editor[flatselected].setZoom(curZoom);
			console.log("IN " + curZoom)
		}
	});
	document.getElementById("zoomdef").addEventListener("click", function() {
		canvas_editor[flatselected].setZoom(1);
		curZoom = 1;
		console.log("DEF " + curZoom)
	});
	document.getElementById("zoomout").addEventListener("click", function() {
		if(curZoom > minZoom) {
			curZoom -= 0.2;
			canvas_editor[flatselected].setZoom(curZoom);
			console.log("OUT " + curZoom)
		}
	});
	
	// Get Objects
	var furniture = document.getElementsByClassName("editor-menu-each-value");

	for (let i = 0; i < furniture.length; i++) {
		furniture[i].addEventListener("click", function() {
			if (flatselected != null) {
				var height = furniture[i].getAttribute("height");
				var width = furniture[i].getAttribute("width");
				var depth = furniture[i].getAttribute("depth");
				var name = furniture[i].getAttribute("name");
				
				var rect = new fabric.Rect({
					fill: '#ffdc73',
					width: parseInt(width), 
					height: parseInt(height), 
					originX: 'center',
					originY: 'center'
				});

				var text = new fabric.Text(name, {
					fontSize: 10,
					originX: 'center',
					originY: 'center'
				});

				var group = new fabric.Group([ rect, text ], {
					left: 10,
					top: 10
				});
				
				group.setControlsVisibility({mt: false, mb: false,  ml: false, mr: false, bl: false,br: false, tl: false, tr: false,mtr: false, });
				canvas_editor[flatselected].add(group);
				saveCanvas(flatselected);
			}
		});
	}
	
	// Save to DDBB AJAX - TODO
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
	
	// Extras
	
	// Zoom Function
	/*
	canvas.on('mouse:wheel', function(opt) {
		var delta = opt.e.deltaY;
		var zoom = canvas.getZoom();
		zoom *= 0.999 ** delta;
		if (zoom > 20) zoom = 20;
		if (zoom < 0.01) zoom = 0.01;
		canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
		opt.e.preventDefault();
		opt.e.stopPropagation();
	});
	*/
	
	// Snap to Grid
	/*
	canvas.on('object:moving', function(options) { 
	  options.target.set({
		left: Math.round(options.target.left / grid) * grid + inset,
		top: Math.round(options.target.top / grid) * grid + inset
	  });
	});
	*/
	
});

// Menu Options
$(document).ready(function() {
	$('.editor-menu-each-button').click(function(){
		$(this).toggleClass('editor-menu-each-active');
		$(this).next('.editor-menu-each-content').slideToggle(400);
	});
	$('#editor-menu-content-flats')	.slideToggle(400);
});

