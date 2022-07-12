document.addEventListener("DOMContentLoaded", function(event) { 

	var canvas = new fabric.Canvas('canvas', { selection: false });
	var grid = 50;

	// create grid
	var inset = 20;

	for (var i = 0; i < (2000 / grid); i++) {
	  canvas.add(new fabric.Line([ inset + i * grid, inset, inset + i * grid, 2000], 
	  { stroke: '#ccc', selectable: false }));
	  
	  canvas.add(new fabric.Line([ inset, inset + i * grid, 2000,inset + i * grid], 
	  { stroke: '#ccc', selectable: false }))
	}

	for (var i = 0; i < (2000 / grid); i++) {

	  canvas.add(new fabric.Text(String(i * 5),
	  {left: inset + i * grid, top: 0, 
	  fontSize: 14,
	  selectable: false}));
	  
		canvas.add(new fabric.Text(String(i * 5),
	  {left:0, top: inset + i * grid, 
	  fontSize: 14,
	  textAlign:'right',
	  selectable: false}));

	}

	canvas.renderAll();
	
	// Add Blueprint - TODO DISABLE SCALING
var image = fabric.Image.fromURL('../files/blueprint/test.png', function(oImg) {
					oImg.set({
						      left: 100,
						      top: 100,
						      originX: 'center',
						      originY: 'center',
						      selectable: false,
							  lockMovementX: true,
						      transparentCorners: false});
					
          //magic strats here to make active Image and you can control image object here
					canvas.setActiveObject(oImg);
					icon = canvas.getActiveObject();
					icon.hasBorders = false;
					icon.hasControls = false;					
					canvas.add(oImg);
				});




	// Disable Movement
	/*
		var blueprint = new fabric.Image.fromURL('../files/blueprint/test.png', function (img) {
		canvas.add(img);
	})
	
	blueprint.hasBorders = false;
	blueprint.hasControls = false;
	blueprint.lockMovementX = true;
	blueprint.lockMovementY = true;
	
	canvas.add(new fabric.Rect({ 
	  left: 100 + inset, 
	  top: 100 + inset, 
	  width: 50, 
	  height: 50, 
	  fill: '#faa', 
	  originX: 'left', 
	  originY: 'top',
	  centeredRotation: true
	}));

	canvas.add(new fabric.Circle({ 
	  left: 300 + inset, 
	  top: 300 + inset, 
	  radius: 50, 
	  fill: '#9f9', 
	  originX: 'left', 
	  originY: 'top',
	  centeredRotation: true
	}));
	*/
	
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
	
	/* Rezise */
	
	window.addEventListener('resize', resizeCanvas, false);

	function resizeCanvas() {
		canvas.setHeight(window.innerHeight - 20);
		canvas.setWidth(window.innerWidth - 330);
		canvas.renderAll();
	}

	resizeCanvas();

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