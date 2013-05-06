/*
ScatterItem: point item for the scatter chart
*/

THREEDCHARTS.ScatterItem = function(params){
	THREEDCHARTS.Item.call(this, params);

	var _this = this;

	function construct(){
		if(_this.values.length > 0){
			_this.addNode(new THREEDCHARTS.Joint({
				controller: _this.controller,
				x: _this.values[0].x, y: _this.values[0].y, z: _this.values[0].z,
				size: _this.width,
				color: _this.values.color
			}));
		}
	}

	construct();
};
