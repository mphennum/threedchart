/*
Chart: generic chart
*/

THREEDCHARTS.Chart = function(params){
	var _this = this;

	function construct(){
		// controller
		_this.controller = params.controller;
		_this.container = _this.controller.container;
		_this.files = _this.controller.files;
		_this.json = _this.controller.json;

		_this.scene = _this.controller.scene;

		_this.camera = _this.controller.camera;

		_this.colorscheme = _this.controller.colorscheme;

		_this.border = _this.controller.border;
		_this.marks = _this.controller.marks;
		_this.titles = _this.controller.titles;

		_this.width = _this.controller.width;
		_this.height = _this.controller.height;

		// nodes
		_this.nodes = [];
		_this.items = [];
		_this.groups = [];
		
		_this.light = new THREEDCHARTS.Light({controller: _this.controller});
		_this.addNode(_this.light);
	}

	// _json

	_this.setupJSON = function(){
		// title
		if(_this.json.title){
			_this.title = {
				main: _this.json.title.main || '',
				x: _this.json.title.x || '',
				y: _this.json.title.y || ''
			};
		}else{
			_this.title = {main: '', x: '', y: ''};
		}

		// scale
		_this.scale = {x: 1, y: 1};
		/*if(_width > _height){
			_scale = {x: _width / _height, y: 1};
		}else{
			_scale = {x: 1, y: _height / _width};
		}*/

		// start
		if(_this.json.start){
			_this.start = {
				x: _this.json.start.x === undefined ? false : _this.json.start.x,
				y: _this.json.start.y === undefined ? false : _this.json.start.y
			};
		}else{
			_this.start = {x: false, y: false};
		}

		// end
		if(_this.json.end){
			_this.end = {
				x: _this.json.end.x === undefined ? false : _this.json.end.x,
				y: _this.json.end.y === undefined ? false : _this.json.end.y
			};
		}else{
			_this.end = {x: false, y: false};
		}

		// increment
		if(_this.json.increment){
			_this.increment = {
				x: _this.json.increment.x || 1,
				y: _this.json.increment.y || 1,
				z: _this.json.increment.z || 0.05
			};

			if(_this.json.increment.display){
				_this.increment.display = {
					x: _this.json.increment.display.x || 'number',
					y: _this.json.increment.display.y || 'number'
				};
			}else{
				_this.increment.display = {x: 'number', y: 'number'};
			}
		}else{
			_this.increment = {
				x: 1, y: 1, z: 0.05,
				display: {x: 'number', y: 'number'}
			};
		}

		// prefix
		if(_this.json.prefix){
			_this.prefix = {
				x: _this.json.prefix.x || '',
				y: _this.json.prefix.y || ''
			};
		}else{
			_this.prefix = {x: '', y: ''};
		}

		// suffix
		if(_this.json.suffix){
			_this.suffix = {
				x: _this.json.suffix.x || '',
				y: _this.json.suffix.y || ''
			};
		}else{
			_this.suffix = {x: '', y: ''};
		}

		// items
		_this.itemvars = _this.json.items || [];
	};

	// setup

	_this.setupVars = function(){
		_this.setupMinMax();
		_this.setupRange();
		_this.setupScale();
		_this.setupMod();
		_this.setupLightDepth();
	};

	_this.setupScene = function(){
		_this.addBorders();
		_this.addMarks();
		_this.addTitles();
	};

	_this.setupControls = function(){
		_this.controller.setupControls(_this);
		_this.setupCamera();
		_this.update();
	};

	// clear

	_this.clear = function(){
		var i, len = _this.nodes.length;

		for(i = 0; i < len; i++){
			_this.removeNode(_this.nodes[i]);
			_this.nodes[i] = undefined;
		}

		_this.removeNode(_this.light);
	};

	// min & max

	_this.setupMinMax = function(){
		var i, j, ilen, vlen, x, y;

		_this.min = {x: 0, y: 0};
		_this.max = {x: 0, y: 0};
		_this.range = {x: 0, y: 0};
		_this.mod = {x: 0, y: 0};

		ilen = _this.itemvars.length;

		// initial min & max
		if(ilen && _this.itemvars[0].values && _this.itemvars[0].values.length){
			_this.min.y = _this.max.y = _this.itemvars[0].values[0];
		}

		// min & max
		_this.maxvlen = 0;
		for(i = 0; i < ilen; i++){
			vlen = _this.itemvars[i].values.length || 0;

			_this.maxvlen = Math.max(_this.maxvlen, vlen);

			for(j = 0; j < vlen; j++){
				// pos
				x = j;
				y = _this.itemvars[i].values[j];

				// max & min
				_this.min.x = Math.min(x, _this.min.x);
				_this.min.y = Math.min(y, _this.min.y);
				_this.max.x = Math.max(x, _this.max.x);
				_this.max.y = Math.max(y, _this.max.y);
			}
		}

		if(_this.start.x !== false && _this.start.x < _this.min.x){
			_this.min.x = _this.start.x;
		}

		if(_this.start.y !== false && _this.start.y < _this.min.y){
			_this.min.y = _this.start.y;
		}

		if(_this.end.y !== false && _this.end.y > _this.max.y){
			_this.max.y = _this.end.y;
		}
	};

	// range

	_this.setupRange = function(){
		_this.range.x = _this.max.x - _this.min.x;
		_this.range.y = _this.max.y - _this.min.y;
	};

	// scale

	_this.setupScale = function(){
		var temp = THREEDCHARTS.CHARTSIZE / (_this.range.y  * _this.scale.x);
		_this.scale.x = THREEDCHARTS.CHARTSIZE / (_this.range.x  * _this.scale.y);
		_this.scale.y = temp;
	};

	// mod

	_this.setupMod = function(){
		_this.mod.x = _this.range.x * 0.5 + _this.min.x;
		_this.mod.y = _this.range.y * 0.5 + _this.min.y;
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
				width: _this.increment.z * (ilen + 1),
				height: range.y + linethickX2,
				x: -0.5 * range.x - THREEDCHARTS.LINETHICKNESS,
				z: 0.5 * (_this.increment.z * (ilen - 1) - THREEDCHARTS.PLANETHICKNESS),
				color: _this.border.color
			}));
		}

		// bottom
		if(_this.border.bottom){
			_this.addNode(new THREEDCHARTS.Plane({
				controller: _this.controller,
				direction: 'x',
				width: range.x + THREEDCHARTS.PLANETHICKNESS * 2.5,
				height: _this.increment.z * (ilen + 1),
				x: -0.25 * THREEDCHARTS.PLANETHICKNESS,
				y: -0.5 * range.y - THREEDCHARTS.LINETHICKNESS,
				z: 0.5 * (_this.increment.z * (ilen - 1) - THREEDCHARTS.PLANETHICKNESS),
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

		z = _this.increment.z * (ilen + 1) * 0.5;

		// x marks
		if(_this.marks.x){
			mult = 10 / (_this.maxvlen - 1);
			
			for(i = 0; i < _this.maxvlen; i++){
				x = i * mult - 5;

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

	_this.addMark = function(params){
		_this.addNode(new THREEDCHARTS.Line({
			controller: _this.controller,
			x: params.x, y: params.y, z: params.z,
			endx: params.endx, endy: params.endy, endz: params.endz,
			color: params.color
		}));
	};

	// groups

	_this.hideGroup = function(group){
		var i, len;

		group = _this.groups[group];
		len = group.length;
		for(i = 0; i < len; i++){
			group[i].hide();
		}
	};

	_this.showGroup = function(group){
		var i, len;

		group = _this.groups[group];
		len = group.length;
		for(i = 0; i < len; i++){
			group[i].show();
		}
	};

	_this.addItem = function(item, group){
		if(_this.groups[group]){
			_this.groups[group][_this.groups[group].length] = item;
		}else{
			_this.groups[group] = [item];
		}

		_this.items[_this.items.length] = item;
		_this.addNodeGroup(item);
	};

	// titles

	_this.addTitles = function(){
		// titles
		if(_this.title.main && _this.titles.main){
			_this.addTitle(_this.title.main, 'center', {x: 0, y: 5.75}, 0.6, 0);
		}

		if(_this.title.x && _this.titles.x){
			_this.addTitle(_this.title.x, 'center', {x: 0, y: -6.25}, 0.3, 0);
		}

		if(_this.title.y && _this.titles.y){
			_this.addTitle(_this.title.y, 'center', {x: -6.25, y :0}, 0.3, Math.PI * 0.5);
		}
	};

	_this.addTitle = function(text, justify, location, size, rotation, color){
		_this.addNode(new THREEDCHARTS.Text({
			controller: _this.controller,
			text: text,
			justify: justify,
			x: location.x || 0,
			y: location.y || 0,
			z: location.z || 0,
			size: size,
			rotation: rotation,
			color: color || _this.colorscheme.titles
		}));
	};

	_this.getFormattedTitle = function(i, dir){
		var text, num, min;

		num = _this.increment[dir] * i;
		min = dir === 'x' ? _this.start.x : _this.min.y;
		
		switch(_this.increment.display[dir]){
			case 'month':
				text = THREEDCHARTS.MONTH[(min + num - 1) % 12];
				break;
			case 'mon':
				text = THREEDCHARTS.MONTH[(min + num - 1) % 12].substring(0, 3);
				break;
			case 'number':
			default:
				text = min + num;
				break;
		}

		return _this.prefix[dir] + text + _this.suffix[dir];
	};

	// camera

	_this.setupCamera = function(){
		_this.controller.setCameraDistance(THREEDCHARTS.CAMERADISTANCE);
	};

	_this.resetCamera = function(){
		_this.controller.resetCamera();
	};

	// lights

	_this.setupLightDepth = function(){
		_this.light.setDepth(_this.increment.z * _this.itemvars.length);
	};

	// nodes
	
	_this.addNode = function(node){
		_this.nodes[_this.nodes.length] = node;
		_this.scene.add(node.mesh);
	};

	_this.addNodeGroup = function(nodegroup){
		var i, len = nodegroup.getLength();
		for(i = 0; i < len; i++){
			_this.addNode(nodegroup.getNode(i));
		}
	};

	_this.removeNode = function(node){
		_this.scene.remove(node.mesh);
	};

	// update

	_this.update = function(){
		_this.controller.update();
	};

	construct();
};
