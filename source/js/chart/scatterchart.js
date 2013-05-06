/*
ScatterChart: charts using scatter points
*/

THREEDCHARTS.ScatterChart = function(params){
	THREEDCHARTS.Chart.call(this, params);

	var _this = this;

	function construct(){
		_this.setupJSON();
		_this.setupVars();
		_this.setupScene();

		_this.addItems();

		_this.setupControls();
	}

	// min & max

	_this.setupMinMax = function(){
		var i, j, ilen, vlen, x, y;

		_this.min = {x: 0, y: 0};
		_this.max = {x: 0, y: 0};
		_this.range = {x: 0, y: 0};
		_this.mod = {x: 0, y: 0};

		ilen = _this.itemvars.length;

		// initial min & max
		if(ilen && _this.itemvars[0].values){
			_this.min.x = _this.max.x = _this.itemvars[0].values.x;
			_this.min.y = _this.max.y = _this.itemvars[0].values.y;
		}

		// min & max
		_this.maxvlen = 2;
		for(i = 0; i < ilen; i++){
			// pos
			x = _this.itemvars[i].values.x;
			y = _this.itemvars[i].values.y;

			// max & min
			_this.min.x = Math.min(x, _this.min.x);
			_this.min.y = Math.min(y, _this.min.y);
			_this.max.x = Math.max(x, _this.max.x);
			_this.max.y = Math.max(y, _this.max.y);
		}

		if(_this.start.x !== false && _this.start.x < _this.min.x){
			_this.min.x = _this.start.x;
		}

		if(_this.end.x !== false && _this.end.x > _this.max.x){
			_this.max.x = _this.end.x;
		}

		if(_this.start.y !== false && _this.start.y < _this.min.y){
			_this.min.y = _this.start.y;
		}

		if(_this.end.y !== false && _this.end.y > _this.max.y){
			_this.max.y = _this.end.y;
		}
	};

	// border

	_this.addBorders = function(){
		var
			linethickX2 = THREEDCHARTS.LINETHICKNESS * 2,
			range = {
				x: _this.range.x * _this.scale.x,
				y: _this.range.y * _this.scale.y
			},
			ilen = _this.itemvars.length
		;
		
		// back
		if(_this.border.back){
			_this.addNode(new THREEDCHARTS.Plane({
				controller: _this.controller,
				width: range.x + linethickX2,
				height: range.y + linethickX2,
				z: -_this.increment.z,
				color: _this.border.color
			}));
		}
		
		// side
		if(_this.border.side){
			_this.addNode(new THREEDCHARTS.Plane({
				controller: _this.controller,
				direction: 'y',
				width: _this.increment.z * 7,
				height: range.y + linethickX2,
				x: -0.5 * range.x - THREEDCHARTS.LINETHICKNESS,
				z: 0.5 * (_this.increment.z * 5 - THREEDCHARTS.PLANETHICKNESS),
				color: _this.border.color
			}));
		}

		// bottom
		if(_this.border.bottom){
			_this.addNode(new THREEDCHARTS.Plane({
				controller: _this.controller,
				direction: 'x',
				width: range.x + THREEDCHARTS.PLANETHICKNESS * 2.5,
				height: _this.increment.z * 7,
				x: -0.25 * THREEDCHARTS.PLANETHICKNESS,
				y: -0.5 * range.y - THREEDCHARTS.LINETHICKNESS,
				z: 0.5 * (_this.increment.z * 5 - THREEDCHARTS.PLANETHICKNESS),
				color: _this.border.color
			}));
		}
	};

	// marks

	_this.addMarks = function(){
		var
			mult, num,
			x, y, z,
			len
		;

		z = _this.increment.z * 3.5;

		// x marks
		if(_this.marks.x){
			len = _this.range.x / _this.increment.x + 1;

			mult = 10 / (len - 1);
			
			for(i = 0; i < len; i++){
				x = i * mult - 5;
				if(x <= 0.5 * THREEDCHARTS.CHARTSIZE){
					_this.addMark({
						x: x, y: -5.175, z: z,
						endx: x, endy: -5.075, endz: z,
						color: _this.colorscheme.marks
					});

					_this.addTitle(
						_this.getFormattedTitle(i, 'x'),
						'center',
						{
							x: x,
							y: -5.4,
							z: z
						},
						0.15,
						0,
						_this.colorscheme.titles
					);
				}
			}
		}

		// ymarks
		if(_this.marks.y){
			num = _this.range.y / _this.increment.y;
			mult = 10 / num;
			
			for(i = 0; i <= num; i++){
				y = i * mult -5;

				_this.addMark({
					x: -5.175, y: y, z: z,
					endx: -5.075, endy: y, endz: z,
					color: _this.colorscheme.marks
				});

				_this.addTitle(
					_this.getFormattedTitle(i, 'y'),
					'right',
					{
						x: -5.3,
						y: y,
						z: z
					},
					0.15,
					0,
					_this.colorscheme.titles
				);
			}
		}
	};

	// items

	_this.addItems = function(){
		var
			i, ilen, k,
			params,
			group, colors
		;

		ilen = _this.itemvars.length;
		colors = [];
		k = 0;

		for(i = 0; i < ilen; i++){
			params = {
				controller: _this.controller,
				values: [],
				width: 0.075
			};
			
			params.values[0] = {
				x: (_this.itemvars[i].values.x - _this.mod.x) * _this.scale.x,
				y: (_this.itemvars[i].values.y - _this.mod.y) * _this.scale.y,
				z: _this.increment.z * 4
			}

			group = _this.itemvars[i].group || _this.itemvars[i].name;

			if(colors[group] === undefined){
				colors[group] = _this.colorscheme.colors[k % _this.colorscheme.colors.length]
				k++;
			}

			params.name = _this.itemvars[i].name;
			params.values.color = colors[group];

			_this.addItem(
				new THREEDCHARTS.ScatterItem(params),
				group
			);
		}
	};

	construct();
};
