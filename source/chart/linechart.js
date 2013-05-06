/*
LineChart: charts using lines
*/

THREEDCHARTS.LineChart = function(params){
	THREEDCHARTS.Chart.call(this, params);

	var _this = this;

	function construct(){
		_this.setupJSON();
		_this.setupVars();
		_this.setupScene();

		_this.addItems();

		_this.setupControls();
	}

	// items

	_this.addItems = function(){
		var
			i, ilen, j, k,
			params, vlen, z,
			group, colors
		;

		ilen = _this.itemvars.length;
		colors = [];
		k = 0;

		for(i = 0; i < ilen; i++){
			params = {
				controller: _this.controller,
				values: [],
				width: 0.05
			};

			vlen = _this.itemvars[i].values.length;

			z = _this.increment.z * i;
			
			for(j = 0; j < vlen; j++){
				params.values[j] = {
					x: (j - _this.mod.x) * _this.scale.x,
					y: (_this.itemvars[i].values[j] - _this.mod.y) * _this.scale.y,
					z: z
				}
			}

			group = _this.itemvars[i].group || _this.itemvars[i].name;

			if(colors[group] === undefined){
				colors[group] = _this.colorscheme.colors[k % _this.colorscheme.colors.length]
				k++;
			}

			params.name = _this.itemvars[i].name;
			params.values.color = colors[group];

			_this.addItem(
				new THREEDCHARTS.LineItem(params),
				group
			);
		}
	};

	construct();
};
