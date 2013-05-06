/*
LineItem: item for the line chart
*/

THREEDCHARTS.LineItem = function(params){
	THREEDCHARTS.Item.call(this, params);

	var _this = this;

	function construct(){
		var i, len = _this.values.length, last;

		if(len > 0){
			last = {x: _this.values[0].x, y: _this.values[0].y, z: _this.values[0].z};

			for(i = 1; i < len; i++){
				_this.addLine({
					x: last.x, y: last.y, z: last.z,
					endx: _this.values[i].x, endy: _this.values[i].y, endz: _this.values[i].z,
					size: _this.width,
					color: _this.values.color
				});

				last = {x: _this.values[i].x, y: _this.values[i].y, z: _this.values[i].z};
			}
		}
	}

	// line

	_this.addLine = function(params){
		_this.addNode(new THREEDCHARTS.Line({
			controller: _this.controller,
			x: params.x, y: params.y, z: params.z,
			endx: params.endx, endy: params.endy, endz: params.endz,
			size: params.size,
			color: params.color
		}));

		_this.addNode(new THREEDCHARTS.Joint({
			controller: _this.controller,
			x: params.endx, y: params.endy, z: params.endz,
			size: params.size / 2,
			color: params.color
		}));
	};

	construct();
};
