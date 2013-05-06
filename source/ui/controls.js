/*
Controls: keyboard, mouse, and user interface controls / actions
*/

THREEDCHARTS.Controls = function(params){
	var _this = this;

	function construct(){
		_this.gui = new THREEDCHARTS.GUI({controller: params.controller, gui: params.gui});

		_this.mouse = new THREEDCHARTS.Mouse({
			controller: params.controller,
			radius: params.radius,
			zoom: params.zoom,
			minzoom: params.minzoom,
			maxzoom: params.maxzoom
		});

		_this.keyboard = new THREEDCHARTS.Keyboard({controller: params.controller});
	}

	// radius

	_this.setRadius = function(radius){
		_this.mouse.setRadius(radius);
	};

	construct();
};
