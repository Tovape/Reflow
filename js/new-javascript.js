document.addEventListener("DOMContentLoaded", function(event) { 

	var canvas = document.querySelector('#canvas');
	var canvas_current_tool = 0;
	var canvas_tools = document.getElementsByClassName("editor-menu-tools-each");
	var canvas_width = canvas.offsetWidth;
	var canvas_height = canvas.offsetHeight;
	
	// Select Tool
	/*
	0 = Select
	1 = Erase
	2 = Draw
	3 = Text
	4 = Doors
	5 = Windows
	*/
	for (let i = 0; i < 6; i++) {
		canvas_tools[i].addEventListener("click", function() {
			canvas_current_tool = i;
			console.log("Tool Selected: " + canvas_current_tool);
		});
	}
	
	// Tools
	
	// Select
	
	// Erase
	
	// Draw
	
	var startX = 0;
	var startY = 0;
	var mouseX = 0;
	var mouseY = 0;
	var bounds = null;
	var ctx = null;
	var hasLoaded = true;
	var isDrawing = false;
	var existingLines = [];

	function draw() {
		ctx.fillStyle = "#F0F0F0";
		ctx.fillRect(0,0,canvas_width,canvas_height);

		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		ctx.beginPath();

		for (var i = 0; i < existingLines.length; ++i) {
			var line = existingLines[i];
			ctx.moveTo(line.startX,line.startY);
			ctx.lineTo(line.endX,line.endY);
		}

		ctx.stroke();

		if (isDrawing) {
			ctx.strokeStyle = "darkred";
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.moveTo(startX,startY);
			ctx.lineTo(mouseX,mouseY);
			ctx.stroke();
		}
	}

	function onmousedown(e) {
		if (hasLoaded && e.button === 0) {
			if (!isDrawing) {
				startX = e.clientX - bounds.left;
				startY = e.clientY - bounds.top;

				isDrawing = true;
			}
			draw();
		}
	}

	function onmouseup(e) {
		if (hasLoaded && e.button === 0) {
			if (isDrawing) {
				existingLines.push({
					startX: startX,
					startY: startY,
					endX: mouseX,
					endY: mouseY
				});

				isDrawing = false;
			}

			draw();
		}
	}

	function onmousemove(e) {
		if (hasLoaded) {
			mouseX = e.clientX - bounds.left;
			mouseY = e.clientY - bounds.top;

			if (isDrawing) {
				draw();
			}
		}
	}

	window.onload = function() {
		canvas = document.getElementById("canvas");
		canvas.width = canvas_width;
		canvas.height = canvas_height;
		canvas.onmousedown = onmousedown;
		canvas.onmouseup = onmouseup;
		canvas.onmousemove = onmousemove;

		bounds = canvas.getBoundingClientRect();
		ctx = canvas.getContext("2d");
		hasLoaded = true;

		draw();
	}
	
	// Text
	
	// Door
	
	// Window
	
});
