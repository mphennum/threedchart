/*
GUI: graphical user interface controls / actions using html5 and css3
*/

THREEDCHARTS.GUI = function(params){
	var _this = this;

	function construct(){
		_this.gui = params.gui;

		_this.setLegend({
			controller: params.controller,
			size: _this.gui.size
		});

		if(params.gui.tools){
			_this.tools = new THREEDCHARTS.Tools({
				controller: params.controller,
				size: _this.gui.size
			});
		}
	}

	// legend

	_this.setLegend = function(params){
		if(_this.gui.legend){
			_this.legend = new THREEDCHARTS.Legend(params);
		}
	};

	construct();
};
