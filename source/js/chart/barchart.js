/*
BarChart: charts using bars
*/

THREEDCHARTS.BarChart = function(params){
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
		var i, ilen, y;

		_this.min = {x: 0, y: 0};
		_this.max = {x: 0, y: 0};
		_this.range = {x: 0, y: 0};
		_this.mod = {x: 0, y: 0};

		ilen = _this.itemvars.length;
		_this.max.x = ilen;

		// initial min & max
		if(ilen && _this.itemvars[0].value){
			_this.min.y = _this.max.y = _this.itemvars[0].value;
		}

		// min & max
		_this.maxvlen = 1;
		for(i = 0; i < ilen; i++){
			// pos
			y = _this.itemvars[i].value;

			// max & min
			_this.min.y = Math.min(y, _this.min.y);
			_this.max.y = Math.max(y, _this.max.y);
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
				z: 0.5 * (_this.increment.z * 7 - THREEDCHARTS.PLANETHICKNESS),
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
				z: 0.5 * (_this.increment.z * 6 - THREEDCHARTS.PLANETHICKNESS),
				color: _this.border.color
			}));
		}
	};

	// marks

	_this.addMarks = function(){
		var
			mult, num,
			x, y, z,
			ilen = _this.itemvars.length
		;

		z = _this.increment.z * 3.5;

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
			group, colors,
			size, startx
		;

		ilen = _this.itemvars.length;
		size = 20 / (3 * ilen + 1);
		startx = size - THREEDCHARTS.CHARTSIZE * 0.5;
		colors = [];
		k = 0;

		for(i = 0; i < ilen; i++){
			params = {
				controller: _this.controller,
				name: _this.itemvars[i].name,
				values: [{
					x: i * size * 1.5 + startx,
					y: 0.5 * (-THREEDCHARTS.CHARTSIZE + _this.itemvars[i].value * _this.scale.y),
					z: _this.increment.z * 4
				}],
				width: size, height: _this.itemvars[i].value * _this.scale.y
			};

			group = _this.itemvars[i].group || params.name;

			if(colors[group] === undefined){
				colors[group] = _this.colorscheme.colors[k % _this.colorscheme.colors.length]
				k++;
			}
			
			params.values.color = colors[group];

			_this.addItem(
				new THREEDCHARTS.BarItem(params),
				group
			);
		}
	};

	construct();
};
