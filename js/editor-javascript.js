document.addEventListener("DOMContentLoaded", function(event) { 

	// Get Windows Size
	
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;

	// Create Grid
	
	var canvas = new fabric.Canvas('canvas', { 
		selection: false,
		controlsAboveOverlay: true,
        centeredScaling: true,
        allowTouchScrolling: true,
		preserveObjectStacking: true
	});
	
	var grid = 50;
	var inset = 20;

	for (var i = 0; i < (2000 / grid); i++) {
		canvas.add(new fabric.Line([
			inset + i * grid, inset, inset + i * grid, 2000], { stroke: '#ccc', selectable: false 
		}));

		canvas.add(new fabric.Line([ 
			inset, inset + i * grid, 2000,inset + i * grid], { stroke: '#ccc', selectable: false 
		}))
	}

	for (var i = 0; i < (2000 / grid); i++) {

		canvas.add(new fabric.Text(String(i * 5), {
			left: inset + i * grid, top: 0, 
			fontSize: 14,
			fontFamily: 'Verdana',
			selectable: false
		}));

		canvas.add(new fabric.Text(String(i * 5), {
			left:0, top: inset + i * grid, 
			fontSize: 14,
			fontFamily: 'Verdana',
			textAlign: 'Center',
			selectable: false
		}));
	}

	canvas.renderAll();
	
	// Lock Rotation
	
	canvas.on('object:rotating', function(options) {
		var step = 90;
		options.target.angle = Math.round(options.target.angle / step) * step;
	});
	
	// Add Blueprint - TODO MAKE IMPOSSIBLE TO SELECT
	
	fabric.Image.fromURL('../files/blueprint/test.png', function(oImg) {
		oImg.set({
			left: 0,
			top: 0,
			originX: 'left',
			originY: 'top',
			selectable: false,
			lockMovementX: true,
			lockMovementY: true,
			transparentCorners: false
		});
		oImg.hoverCursor = 'default';
		oImg.scaleToWidth(windowWidth - 300);
		oImg.scaleToHeight(windowHeight);
		canvas.setActiveObject(oImg);
		icon = canvas.getActiveObject();
		icon.hasBorders = false;
		icon.hasControls = false;	
		canvas.add(oImg);
	});

	// Delete Active Objects

	document.addEventListener("keydown", (e) => {      
		if (e.key === "Delete" || e.key === 'Backspace') {
			canvas.remove(canvas.getActiveObject());
		}
	});

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
	
	// Rezise
	
	window.addEventListener('resize', resizeCanvas, false);

	function resizeCanvas() {
		canvas.setHeight(window.innerHeight - 20 + 1000);
		canvas.setWidth(window.innerWidth - 330 + 1000);
		canvas.renderAll();
	}

	resizeCanvas();
		
	// Zoom Functions
	
	var curZoom = 1;
	var minZoom = 0.6;
	var maxZoom = 3;
	
	document.getElementById("zoomin").addEventListener("click", function() {
		if(curZoom < maxZoom) {
			curZoom += 0.2;
			canvas.setZoom(curZoom);
			console.log("IN" + curZoom)
		}
	});
	document.getElementById("zoomdef").addEventListener("click", function() {
		canvas.setZoom(1);
		curZoom = 1;
		console.log("DEF")
	});
	document.getElementById("zoomout").addEventListener("click", function() {
		if(curZoom > minZoom) {
			curZoom -= 0.2;
			canvas.setZoom(curZoom);
			console.log("OUT" + curZoom)
		}
	});
	
	// Get Objects
	
	var furniture = document.getElementsByClassName("editor-menu-each-value");

	for (let i = 0; i < furniture.length; i++) {
		furniture[i].addEventListener("click", function() {
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
			canvas.add(group);
		});
	}

});

// Menu Options

$(document).ready(function() {
  $('.editor-menu-each-button').click(function(){
    $(this).toggleClass('editor-menu-each-active');
    $(this).next('.editor-menu-each-content').slideToggle(400);
   });
});
