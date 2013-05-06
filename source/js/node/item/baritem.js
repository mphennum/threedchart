/*
BarItem: item for the bar chart
*/

THREEDCHARTS.BarItem = function(params){
	THREEDCHARTS.Item.call(this, params);

	var _this = this;

	function construct(){
		if(_this.values.length > 0){
			_this.addNode(new THREEDCHARTS.Plane({
				controller: _this.controller,
				x: _this.values[0].x, y: _this.values[0].y, z: _this.values[0].z,
				width: _this.width, height: _this.height,
				direction: 'z',
				color: _this.values.color
			}));
		}
	}

	construct();
};
