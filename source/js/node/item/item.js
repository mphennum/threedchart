/*
Item: abstract item for a chart
*/

THREEDCHARTS.Item = function(params){
	THREEDCHARTS.NodeGroup.call(this, params);

	var _this = this;

	function construct(){
		_this.name = params.name || '';
		_this.values = params.values || [];
		_this.width = params.width;
		_this.height = params.height;
		_this.color = params.color;
	}

	construct();
};
