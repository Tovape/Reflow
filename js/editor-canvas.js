// Global Variables

var globalMeasurement = null;
var globalSize = [null, null, null];

// Global Objects for Shop | Line 165 & 411

var currentObjects = new Array;

// Get values from SQL

setTimeout(function(){
	var objectsave = document.getElementById("objectsave").getAttribute('value');
	let temp = JSON.parse(objectsave);
	temp = JSON.parse(temp[Object.keys(temp)[0]].objectsjson)
	for (let i = 0; i < temp.length; i++) {
		currentObjects.push(temp[i]);
	}
}, 4000);

// Measurement Localstorage

$(document).ready(function() {

	var tempMeasurement = null;

	function getMeasurement() {
		if (localStorage.getItem("measurement") !== null) {
			return localStorage.getItem("measurement");
		} else {
			return "meters";
		}
	}

	function getUpdated() {
		if (tempMeasurement === 'meters') {
			$('#meters').parent().addClass('measurement-active').siblings().removeClass('measurement-active');
			$('#editor-measurement-type').text('Measurements in metric.');
		} else if (tempMeasurement === 'inches') {
			$('#inches').parent().addClass('measurement-active').siblings().removeClass('measurement-active');
			$('#editor-measurement-type').text('Measurements in inches.');
		}
	}

	tempMeasurement = getMeasurement();
	getUpdated();

	$('.measurement').click(function() {
		localStorage.setItem("measurement", $(this).attr('id'));
		tempMeasurement = getMeasurement();
		getUpdated();
	});

	globalMeasurement = getMeasurement();
});


$(document).ready(function() {

	const languagebutton = document.getElementsByClassName("language-dropdown-each");
	var language = localStorage.getItem("language");

	if (language == 'es') {
		languagebutton[0].classList.add('language-active');
	} else if (language == 'ca') {
		languagebutton[1].classList.add('language-active');
	} else if (language == 'en') {
		languagebutton[2].classList.add('language-active');
	}

});

/*
 * Camera Buttons
 */

var CameraButtons = function(blueprint3d) {

	var orbitControls = blueprint3d.three.controls;
	var three = blueprint3d.three;

	var panSpeed = 30;
	var directions = {
		UP: 1,
		DOWN: 2,
		LEFT: 3,
		RIGHT: 4
	}

	function init() {
		// Camera controls
		$("#zoomin").click(zoomIn);
		$("#zoomout").click(zoomOut);
		$("#zoomin").dblclick(preventDefault);
		$("#zoomout").dblclick(preventDefault);
		$("#zoomdef").click(three.centerCamera)

		document.onkeydown = function(e) {
			e = e || window.event;

			if (e.keyCode == '38') {
				pan(directions.UP)
			} else if (e.keyCode == '40') {
				pan(directions.DOWN)
			} else if (e.keyCode == '37') {
				pan(directions.LEFT)
			} else if (e.keyCode == '39') {
				pan(directions.RIGHT)
			}
		};

		/*
		$("#move-left").click(function(){
		  pan(directions.LEFT)
		})
		$("#move-right").click(function(){
		  pan(directions.RIGHT)
		})
		$("#move-up").click(function(){
		  pan(directions.UP)
		})
		$("#move-down").click(function(){
		  pan(directions.DOWN)
		})

		$("#move-left").dblclick(preventDefault);
		$("#move-right").dblclick(preventDefault);
		$("#move-up").dblclick(preventDefault);
		$("#move-down").dblclick(preventDefault);
		*/
	}

	function preventDefault(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	function pan(direction) {
		switch (direction) {
			case directions.UP:
				orbitControls.panXY(0, panSpeed);
				break;
			case directions.DOWN:
				orbitControls.panXY(0, -panSpeed);
				break;
			case directions.LEFT:
				orbitControls.panXY(panSpeed, 0);
				break;
			case directions.RIGHT:
				orbitControls.panXY(-panSpeed, 0);
				break;
		}
	}

	function zoomIn(e) {
		e.preventDefault();
		orbitControls.dollyIn(1.1);
		orbitControls.update();
	}

	function zoomOut(e) {
		e.preventDefault;
		orbitControls.dollyOut(1.1);
		orbitControls.update();
	}

	init();
}

/*
 * Context menu for selected item
 */

var ContextMenu = function(blueprint3d) {

	var scope = this;
	var selectedItem;
	var three = blueprint3d.three;

	function init() {
		
		// Delete Button
		$("#context-menu-delete").click(function(event) {
			for (let i = 0; i < currentObjects.length; i++) {
				if (currentObjects[i] !== null || currentObjects[i] !== undefined || currentObjects[i] !== "") {
					if (currentObjects[i][0] === selectedItem['metadata']['modelUrl']) {
						currentObjects[i] = null;
					}
				}
			}
			
			currentObjects = currentObjects.filter(element => {
				return element !== null;
			});
			
			selectedItem.remove();
		});
		
		// Delete Active Objects
		document.addEventListener("keydown", (e) => {
			if (e.key === "Delete" || e.key === 'Backspace') {
				for (let i = 0; i < currentObjects.length; i++) {
					if (currentObjects[i][0] === selectedItem['metadata']['modelUrl']) {
						currentObjects[i] = null;
					}
				}
				
				currentObjects = currentObjects.filter(element => {
					return element !== null;
				});
				
				selectedItem.remove();
			}
		});
		
		three.itemSelectedCallbacks.add(itemSelected);
		three.itemUnselectedCallbacks.add(itemUnselected);
		
		initResize();
		
		// Set Default Size
		$(".add-item").click(function(){
			globalSize[0] = $(this).attr("height");
			globalSize[1] = $(this).attr("width");
			globalSize[2] = $(this).attr("depth");
			if (globalSize[0] !== 0 || globalSize[1] !== 0 || globalSize[2] !== 0) {
				setTimeout(function() {
					if (selectedItem !== null || selectedItem !== undefined) {
						selectedItem.resize(globalSize[0], globalSize[1], globalSize[2]);
					} else {
						return;
					}
				}, 1000);
			}
		})

		$("#fixed").click(function() {
			var checked = $(this).prop('checked');
			selectedItem.setFixed(checked);
		});
	}

	function cmToIn(cm) {
		return cm / 2.54;
	}

	function cmToFt(cm) {
		var realFeet = ((cm*0.393700) / 12);
		var feet = Math.floor(realFeet);
		var inches = Math.round((realFeet - feet) * 12);
		return feet + "'" + inches + '"';
	}

	function itemSelected(item) {
		selectedItem = item;

		$("#context-menu-name").text(item.metadata.itemBrand + " - " + item.metadata.itemName);

		if (globalMeasurement === 'meters') {
			$("#item-width").val(selectedItem.getWidth().toFixed(0));
			$("#item-height").val(selectedItem.getHeight().toFixed(0));
			$("#item-depth").val(selectedItem.getDepth().toFixed(0));
		} else if (globalMeasurement === 'inches') {
			$("#item-width").val(cmToFt(selectedItem.getWidth().toFixed(0)));
			$("#item-height").val(cmToFt(selectedItem.getHeight().toFixed(0)));
			$("#item-depth").val(cmToFt(selectedItem.getDepth().toFixed(0)));
		}

		$("#context-menu").show();

		$("#fixed").prop('checked', item.fixed);
	}

	function resize() {
		selectedItem.resize(
			$("#item-height").val(),
			$("#item-width").val(),
			$("#item-depth").val()
		);
	}

	function initResize() {
		$("#item-height").change(resize);
		$("#item-width").change(resize);
		$("#item-depth").change(resize);
	}

	function itemUnselected() {
		selectedItem = null;
		$("#context-menu").hide();
	}

	init();
}

/*
 * Loading modal for items
 */

var ModalEffects = function(blueprint3d) {

	var scope = this;
	var blueprint3d = blueprint3d;
	var itemsLoading = 0;

	this.setActiveItem = function(active) {
		itemSelected = active;
		update();
	}

	function update() {
		if (itemsLoading > 0) {
			$("#loading-modal").show();
		} else {
			$("#loading-modal").hide();
		}
	}

	function init() {
		blueprint3d.model.scene.itemLoadingCallbacks.add(function() {
			itemsLoading += 1;
			update();
		});

		blueprint3d.model.scene.itemLoadedCallbacks.add(function() {
			itemsLoading -= 1;
			update();
		});

		update();
	}

	init();
}

/*
 * Side menu
 */

var SideMenu = function(blueprint3d, floorplanControls, modalEffects) {
	var blueprint3d = blueprint3d;
	var floorplanControls = floorplanControls;
	var modalEffects = modalEffects;

	var ACTIVE_CLASS = "active";

	var tabs = {
		"FLOORPLAN": $("#editor-menu-view-2d"),
		"DESIGN": $("#editor-menu-view-3d")
	}

	var scope = this;
	this.stateChangeCallbacks = $.Callbacks();

	this.states = {
		"DEFAULT": {
			"div": $("#viewer"),
			"tab": tabs.DESIGN
		},
		"FLOORPLAN": {
			"div": $("#floorplanner"),
			"tab": tabs.FLOORPLAN
		}
	}

	// sidebar state
	var currentState = scope.states.FLOORPLAN;

	function init() {
		for (var tab in tabs) {
			var elem = tabs[tab];
			elem.click(tabClicked(elem));
		}

		$("#update-floorplan").click(floorplanUpdate);

		initLeftMenu();

		blueprint3d.three.updateWindowSize();
		handleWindowResize();

		initItems();

		setCurrentState(scope.states.DEFAULT);
	}

	function floorplanUpdate() {
		setCurrentState(scope.states.DEFAULT);
	}

	function tabClicked(tab) {
		return function() {
			// Stop three from spinning
			blueprint3d.three.stopSpin();

			// Selected a new tab
			for (var key in scope.states) {
				var state = scope.states[key];
				if (state.tab == tab) {
					setCurrentState(state);
					break;
				}
			}
		}
	}

	function setCurrentState(newState) {

		if (currentState == newState) {
			return;
		}

		// show the right tab as active
		if (currentState.tab !== newState.tab) {
			if (currentState.tab != null) {
				currentState.tab.removeClass(ACTIVE_CLASS);
			}
			if (newState.tab != null) {
				newState.tab.addClass(ACTIVE_CLASS);
			}
		}

		// set item unselected
		blueprint3d.three.getController().setSelectedObject(null);

		// show and hide the right divs
		currentState.div.hide()
		newState.div.show()

		// custom actions
		if (newState == scope.states.FLOORPLAN) {
			floorplanControls.updateFloorplanView();
			floorplanControls.handleWindowResize();
		}

		if (currentState == scope.states.FLOORPLAN) {
			blueprint3d.model.floorplan.update();
		}

		if (newState == scope.states.DEFAULT) {
			blueprint3d.three.updateWindowSize();
		}

		// set new state
		handleWindowResize();
		currentState = newState;

		scope.stateChangeCallbacks.fire(newState);
	}

	function initLeftMenu() {
		$(window).resize(handleWindowResize);
		handleWindowResize();
	}

	function handleWindowResize() {
		$(".sidebar").height(window.innerHeight);
		$("#add-items").height(window.innerHeight);

	};

	// TODO: this doesn't really belong here
	function initItems() {
		$("#add-items").find(".add-item").mousedown(function(e) {
			var price = $(this).attr("price");
			var imageUrl = $(this).find("img").attr("data-lazy");
			var modelUrl = $(this).attr("model-url");
			var itemType = parseInt($(this).attr("model-type"));
			var metadata = {
				itemName: $(this).attr("model-name"),
				resizable: true,
				modelUrl: modelUrl,
				itemType: itemType,
				itemBrand: $(this).attr("brand")
			}
			
			var pusharray = [metadata['modelUrl'], $(this).attr("model-name"), price, imageUrl];
			currentObjects.push(pusharray);
			blueprint3d.model.scene.addItem(itemType, modelUrl, metadata);
			setCurrentState(scope.states.DEFAULT);
		});
	}

	init();

}

/*
 * Change floor and wall textures
 */

var TextureSelector = function(blueprint3d, sideMenu) {

	var scope = this;
	var three = blueprint3d.three;
	var isAdmin = isAdmin;

	var currentTarget = null;

	function initTextureSelectors() {
		$(".texture-select-thumbnail").click(function(e) {
			var textureUrl = $(this).attr("texture-url");
			var textureStretch = ($(this).attr("texture-stretch") == "true");
			var textureScale = parseInt($(this).attr("texture-scale"));
			currentTarget.setTexture(textureUrl, textureStretch, textureScale);

			e.preventDefault();
		});
	}

	function init() {
		three.wallClicked.add(wallClicked);
		three.floorClicked.add(floorClicked);
		three.itemSelectedCallbacks.add(reset);
		three.nothingClicked.add(reset);
		sideMenu.stateChangeCallbacks.add(reset);
		initTextureSelectors();
	}

	function wallClicked(halfEdge) {
		currentTarget = halfEdge;
		$("#floorTexturesDiv").hide();
		$("#wallTextures").show();
	}

	function floorClicked(room) {
		currentTarget = room;
		$("#wallTextures").hide();
		$("#floorTexturesDiv").show();
	}

	function reset() {
		$("#wallTextures").hide();
		$("#floorTexturesDiv").hide();
	}

	init();
}

/*
 * Floorplanner controls
 */

var ViewerFloorplanner = function(blueprint3d) {

	var canvasWrapper = '#floorplanner';

	// buttons
	var move = '#move';
	var remove = '#delete';
	var draw = '#draw';

	var activeStlye = 'btn-primary disabled';

	this.floorplanner = blueprint3d.floorplanner;

	var scope = this;

	function init() {

		$(window).resize(scope.handleWindowResize);
		scope.handleWindowResize();

		// mode buttons
		scope.floorplanner.modeResetCallbacks.add(function(mode) {
			$(draw).removeClass(activeStlye);
			$(remove).removeClass(activeStlye);
			$(move).removeClass(activeStlye);
			if (mode == scope.floorplanner.modes.MOVE) {
				$(move).addClass(activeStlye);
			} else if (mode == scope.floorplanner.modes.DRAW) {
				$(draw).addClass(activeStlye);
			} else if (mode == scope.floorplanner.modes.DELETE) {
				$(remove).addClass(activeStlye);
			}

			if (mode == scope.floorplanner.modes.DRAW) {
				$("#draw-walls-hint").show();
				scope.handleWindowResize();
			} else {
				$("#draw-walls-hint").hide();
			}
		});

		$(move).click(function() {
			scope.floorplanner.setMode(scope.floorplanner.modes.MOVE);
		});

		$(draw).click(function() {
			scope.floorplanner.setMode(scope.floorplanner.modes.DRAW);
		});

		$(remove).click(function() {
			scope.floorplanner.setMode(scope.floorplanner.modes.DELETE);
		});
	}

	this.updateFloorplanView = function() {
		scope.floorplanner.reset();
	}

	this.handleWindowResize = function() {
		$(canvasWrapper).height(window.innerHeight - $(canvasWrapper).offset().top);
		scope.floorplanner.resizeView();
	};

	init();
};

var mainControls = function(blueprint3d) {
	var blueprint3d = blueprint3d;

	function newDesign() {
		blueprint3d.model.loadSerialized('{"floorplan":{"corners":{"f90da5e3-9e0e-eba7-173d-eb0b071e838e":{"x":204.85099999999989,"y":289.052},"da026c08-d76a-a944-8e7b-096b752da9ed":{"x":672.2109999999999,"y":289.052},"4e3d65cb-54c0-0681-28bf-bddcc7bdb571":{"x":672.2109999999999,"y":-178.308},"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2":{"x":204.85099999999989,"y":-178.308}},"walls":[{"corner1":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","corner2":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","corner2":"da026c08-d76a-a944-8e7b-096b752da9ed","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"da026c08-d76a-a944-8e7b-096b752da9ed","corner2":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","corner2":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}}],"wallTextures":[],"floorTextures":{},"newFloorTextures":{}},"items":[]}');
	}

	function loadDesign() {
		files = $("#loadFile").get(0).files;
		var reader = new FileReader();
		reader.onload = function(event) {
			var data = event.target.result;
			blueprint3d.model.loadSerialized(data);
		}
		reader.readAsText(files[0]);
	}

	function saveDesign() {
		var data = blueprint3d.model.exportSerialized();
		var a = window.document.createElement('a');
		var blob = new Blob([data], {
			type: 'text'
		});
		a.href = window.URL.createObjectURL(blob);
		a.download = 'design.blueprint3d';
		document.body.appendChild(a)
		a.click();
		document.body.removeChild(a)
	}

	function init() {
		$("#new").click(newDesign);
		$("#loadFile").change(loadDesign);
		$("#saveFile").click(saveDesign);
	}

	init();
}

/*
 * Initialize!
 */
var globalblueprint;

$(document).ready(function() {

	// main setup
	var opts = {
		floorplannerElement: 'floorplanner-canvas',
		threeElement: '#viewer',
		threeCanvasElement: 'three-canvas',
		textureDir: "models/textures/",
		widget: false
	}
	var blueprint3d = new Blueprint3d(opts);
	globalblueprint = blueprint3d;

	var modalEffects = new ModalEffects(blueprint3d);
	var viewerFloorplanner = new ViewerFloorplanner(blueprint3d);
	var contextMenu = new ContextMenu(blueprint3d);
	var sideMenu = new SideMenu(blueprint3d, viewerFloorplanner, modalEffects);
	var textureSelector = new TextureSelector(blueprint3d, sideMenu);
	var cameraButtons = new CameraButtons(blueprint3d);
	mainControls(blueprint3d);

	// Getting JSON
	var defaultdata = '{"floorplan":{"corners":{"56d9ebd1-91b2-875c-799d-54b3785fca1f":{"x":630.555,"y":-227.58400000000006},"8f4a050d-e102-3c3f-5af9-3d9133555d76":{"x":294.64,"y":-227.58400000000006},"4e312eca-6c4f-30d1-3d9a-a19a9d1ee359":{"x":294.64,"y":232.664},"254656bf-8a53-3987-c810-66b349f49b19":{"x":745.7439999999998,"y":232.664},"11d25193-4411-fbbf-78cb-ae7c0283164b":{"x":1044.7019999999998,"y":232.664},"edf0de13-df9f-cd6a-7d11-9bd13c36ce12":{"x":1044.7019999999998,"y":-105.66399999999999},"e7db8654-efe1-bda2-099a-70585874d8c0":{"x":745.7439999999998,"y":-105.66399999999999}},"walls":[{"corner1":"4e312eca-6c4f-30d1-3d9a-a19a9d1ee359","corner2":"254656bf-8a53-3987-c810-66b349f49b19","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/wallmap_yellow.png","stretch":true,"scale":null}},{"corner1":"254656bf-8a53-3987-c810-66b349f49b19","corner2":"e7db8654-efe1-bda2-099a-70585874d8c0","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/wallmap_yellow.png","stretch":true,"scale":null}},{"corner1":"56d9ebd1-91b2-875c-799d-54b3785fca1f","corner2":"8f4a050d-e102-3c3f-5af9-3d9133555d76","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/wallmap_yellow.png","stretch":true,"scale":null}},{"corner1":"8f4a050d-e102-3c3f-5af9-3d9133555d76","corner2":"4e312eca-6c4f-30d1-3d9a-a19a9d1ee359","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/wallmap_yellow.png","stretch":true,"scale":null}},{"corner1":"254656bf-8a53-3987-c810-66b349f49b19","corner2":"11d25193-4411-fbbf-78cb-ae7c0283164b","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"11d25193-4411-fbbf-78cb-ae7c0283164b","corner2":"edf0de13-df9f-cd6a-7d11-9bd13c36ce12","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/light_brick.jpg","stretch":false,"scale":100}},{"corner1":"edf0de13-df9f-cd6a-7d11-9bd13c36ce12","corner2":"e7db8654-efe1-bda2-099a-70585874d8c0","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"e7db8654-efe1-bda2-099a-70585874d8c0","corner2":"56d9ebd1-91b2-875c-799d-54b3785fca1f","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/wallmap_yellow.png","stretch":true,"scale":null}}],"wallTextures":[],"floorTextures":{},"newFloorTextures":{"11d25193-4411-fbbf-78cb-ae7c0283164b,254656bf-8a53-3987-c810-66b349f49b19,e7db8654-efe1-bda2-099a-70585874d8c0,edf0de13-df9f-cd6a-7d11-9bd13c36ce12":{"url":"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/light_fine_wood.jpg","scale":300}}},"items":[{"item_name":"Full Bed","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/39/ik_nordli_full.js","xpos":939.5525544513545,"ypos":50,"zpos":-15.988409993966997,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Bedside table - White","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/353/cb-archnight-white_baked.js","xpos":1001.0862865204286,"ypos":31.15939942141,"zpos":86.4297300551338,"rotation":-0.7872847644705953,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Open Door","item_type":7,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/174/open_door.js","xpos":745.2440185546875,"ypos":110.5,"zpos":64.8291839065202,"rotation":-1.5707963267948966,"scale_x":1.7003089598352215,"scale_y":0.997292171703541,"scale_z":0.999415040540576,"fixed":false},{"item_name":"Window","item_type":3,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/165/whitewindow.js","xpos":886.8841174461031,"ypos":139.1510114697785,"zpos":-105.16400146484375,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Dresser - White","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/478/we-narrow6white_baked.js","xpos":898.0548281668393,"ypos":35.611997646165,"zpos":201.10860458067486,"rotation":-3.141592653589793,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Window","item_type":3,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/165/whitewindow.js","xpos":534.9620937975317,"ypos":137.60931398864443,"zpos":-227.08399963378906,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Window","item_type":3,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/165/whitewindow.js","xpos":295.1400146484375,"ypos":141.43383044055196,"zpos":123.2280598724867,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Media Console - White","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/400/cb-clapboard_baked.js","xpos":658.6568227980731,"ypos":67.88999754395999,"zpos":-141.50237235990153,"rotation":-0.8154064090423808,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Blue Rug","item_type":8,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/440/cb-blue-block-60x96.js","xpos":905.8690190229256,"ypos":0.250005,"zpos":44.59927303228528,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"NYC Poster","item_type":2,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/77/nyc-poster2.js","xpos":1038.448276049687,"ypos":146.22618581237782,"zpos":148.65033715350484,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Sofa - Grey","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/596/cb-rochelle-gray_baked.js","xpos":356.92671999154373,"ypos":42.54509923821,"zpos":-21.686174295784554,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Coffee Table - Wood","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/68/ik-stockholmcoffee-brown.js","xpos":468.479104587435,"ypos":24.01483158034958,"zpos":-23.468458996048412,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Floor Lamp","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/614/ore-3legged-white_baked.js","xpos":346.697102333121,"ypos":72.163997943445,"zpos":-175.19915302127583,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Red Chair","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/723/ik-ekero-orange_baked.js","xpos":397.676038151142,"ypos":37.50235073007,"zpos":156.31701312594373,"rotation":2.4062972386507093,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Window","item_type":3,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/165/whitewindow.js","xpos":374.7738207971076,"ypos":138.62749831597068,"zpos":-227.08399963378906,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Closed Door","item_type":7,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/617/closed-door28x80_baked.js","xpos":637.2176377788675,"ypos":110.80000022010701,"zpos":232.16400146484375,"rotation":3.141592653589793,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},{"item_name":"Bookshelf","item_type":1,"model_url":"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/388/cb-kendallbookcasewalnut_baked.js","xpos":533.1460416453955,"ypos":92.17650034119151,"zpos":207.7644213268835,"rotation":3.141592653589793,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false}]}'
	var canvas_jsonsave = document.getElementById("jsonsave").getAttribute('value');
	var data = canvas_jsonsave.replace(/\\/g, "");
	data = data.slice(10, data.length - 3);

	var canvas_jsonsave_format;
	var canvas_jsonsave_parsed;
	var check;

	if (canvas_jsonsave !== null && canvas_jsonsave !== '' && canvas_jsonsave !== undefined && canvas_jsonsave !== '[]') {
		canvas_jsonsave_format = canvas_jsonsave.substring(1, canvas_jsonsave.length - 1);
		canvas_jsonsave_parsed = JSON.parse(canvas_jsonsave_format);
		check = canvas_jsonsave_parsed[Object.keys(canvas_jsonsave_parsed)[0]];
	}

	if (check !== null && check !== undefined && check !== '') {
		console.log("Loading Json")
		blueprint3d.model.loadSerialized(data);
	} else {
		console.log("Loading Default Json")
		blueprint3d.model.loadSerialized(defaultdata);
	}
});

function saveData() {
	var data = globalblueprint.model.exportSerialized();
	return data;
}

function saveObjects() {
	var objects = JSON.stringify(currentObjects);
	return objects;
}

function loadMaterials() {
	
	var formattedObjects = [];
	var arrayObjects = [];
	var count = 0;
	var total = 0;
	var obj = {};
	
	$("#editor-material-table .appended").remove();
	
	// Clean Nulls
	const results = currentObjects.filter(element => {
		return element !== null;
	});
	
	results.forEach(function(item) {
		if (typeof obj[item] == 'number') {
			obj[item]++;
		} else {
			obj[item] = 1;
		}
	});
	
	Object.keys(obj).map(function(item) {
		formattedObjects[item] = obj[item];
		count++;
	}).join('\n');
			
	for (let i = 0; i < count; i++) {
		arrayObjects[i] = Object.keys(formattedObjects)[i].split(',');
		arrayObjects[i].push(Object.values(formattedObjects)[i]);
	}
		
	for (let i = 0; i < count; i++) {
		$("#editor-material-table").append(`
		<tr class='appended'>
			<td class="editor-material-table-available">
				<svg height="24" width="24"><circle cx="12" cy="12" r="6" stroke="black" stroke-width="2" fill="red" /></svg>
			</td>
			<td class="editor-material-table-image">
				<img src="` + arrayObjects[i][3] + `">
			</td>
			<td class="editor-material-table-item">` + arrayObjects[i][1] + `</td>
			<td class="editor-material-table-quantity">` + arrayObjects[i][4] + `</td>
			<td class="editor-material-table-price">` + arrayObjects[i][2] + `</td>
			<td class="editor-material-table-site"><span>View</span></td>
		</tr>
		`);
		total = total + parseInt(arrayObjects[i][2])*arrayObjects[i][4];
	}
	
	$('#editor-material-total-price').text(total + '$');
	
}