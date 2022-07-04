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
			$($element[i]).removeClass("project-filter-fadeout");
			$($element[i]).addClass("project-filter-fadein");
		} else {
			$($element[i]).removeClass("project-filter-fadein");
			$($element[i]).addClass("project-filter-fadeout");
		}
		
		if ('all' == order) {
			$($element[i]).removeClass("project-filter-fadein");
			$($element[i]).addClass("project-filter-fadeout");
		}
	}

	$element.detach().appendTo($selector);
}

// Sort Year Buttons

$(document).on('click', '.sort-year-asc', function() {
  sortYear('data-year', '.projects', '.projects-each', 'asc');
});

$(document).on('click', '.sort-year-desc', function() {
  sortYear('data-year', '.projects', '.projects-each', 'desc');
});

// Sort Type Buttons

$(document).on('click', '.sort-type-all', function() {
  sortType('data-type', '.projects', '.projects-each', 'all');
});

$(document).on('click', '.sort-type-flat', function() {
  sortType('data-type', '.projects', '.projects-each', 'flat');
});

$(document).on('click', '.sort-type-house', function() {
  sortType('data-type', '.projects', '.projects-each', 'house');
});

$(document).on('click', '.sort-type-establishment', function() {
  sortType('data-type', '.projects', '.projects-each', 'establishment');
});

$(document).on('click', '.sort-type-installations', function() {
  sortType('data-type', '.projects', '.projects-each', 'installations');
});

$(document).on('click', '.sort-type-warehouses', function() {
  sortType('data-type', '.projects', '.projects-each', 'warehouses');
});

$(document).on('click', '.sort-type-building', function() {
  sortType('data-type', '.projects', '.projects-each', 'building');
});

// Set Filter Selection

$(document).ready(function() {
	
	const sortbutton = document.getElementsByClassName("sort-each");

	$(sortbutton).click(function() {
		$(this).addClass('project-filter-active').siblings().removeClass('project-filter-active');
	});
	
});