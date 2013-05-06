/*
ThreeDChart: 3Dimensional Charts using the Three.JS WebGL API
	- initializer & controller
*/

THREEDCHARTS.ThreeDChart = function(params){
	var _this = this;

	function construct(){
		params = params || {};

		_this.webgl = Detector.webgl;

		// input
		_this.file = params.file || false;
		_this.files = params.files || [];
		_this.json = params.json || {};

		if(_this.files.length > 0){
			_this.file = _this.files[0];
		}else if(_this.file){
			_this.files[0] = _this.file;
		}

		// gui
		if(params.gui){
			_this.gui = {
				legend: params.gui.legend || true,
				tools: params.gui.tools || true,
				size: params.gui.size || 1
			};
		}else{
			_this.gui = {legend: true, tools: true, size: 1};
		}
			
		// id
		_this.id = params.id || false;
			
		// dimensions
		_this.fullscreen = params.fullscreen || false;
		if(_this.fullscreen){
			_this.width = innerWidth;
			_this.height = innerHeight;

			document.body.style.margin = '0';
			document.body.style.padding = '0';
			document.body.style.overflow = 'hidden';
		}else{
			_this.width = params.width || innerWidth;
			_this.height = params.height || innerHeight;
		}

		// colors
		if(params.colorscheme === 'custom'){
			_this.colorscheme = params.customcolorscheme || THREEDCHARTS.COLORSCHEMES['basic'];
		}else if(!params.colorscheme || !THREEDCHARTS.COLORSCHEMES[params.colorscheme]){
			_this.colorscheme = THREEDCHARTS.COLORSCHEMES['basic'];
		}else{
			_this.colorscheme = THREEDCHARTS.COLORSCHEMES[params.colorscheme];
		}

		// borders
		if(params.border){
			_this.border = {
				back: params.border.back === false ? false : true,
				side: params.border.side === false ? false : true,
				bottom: params.border.bottom === false ? false : true,
				color: _this.colorscheme.border
			};
		}else{
			_this.border = {
				back: true,
				side: true,
				bottom: true,
				color: _this.colorscheme.border
			};
		}

		// titles
		if(params.titles){
			_this.titles = {
				main: params.titles.main === false ? false : true,
				x: params.titles.x === false ? false : true,
				y: params.titles.y === false ? false : true
			};
		}else{
			_this.titles = {main: true, x: true, y: true};
		}

		// marks
		if(params.marks){
			_this.marks = {
				x: params.marks.x === false ? false : true,
				y: params.marks.y === false ? false : true
			};
		}else{
			_this.marks = {x: true, y: true};
		}

		// init
		_this.autoinit = params.init || false;
		_this.initialized = false;

		// initialize
		if(_this.autoinit === true){
			_this.init();
		}
	}

	// initialization

	_this.init = function(){
		if(_this.file){
			_this.setJSONFromFile(_this.file);
		}else{
			if(_this.initialized){
				_this.chart = THREEDCHARTS.chartFactory(_this.json.type, _this);
			}else{
				var containerclass;

				_this.initialized = true;

				// container
				_this.container = _this.id === false ?
					document.body :
					document.getElementById(_this.id)
				;

				containerclass = _this.container.getAttribute('class') || '';
				if(containerclass){
					containerclass += ' ';
				}

				_this.container.setAttribute('class', containerclass + 'threedchart');
				_this.container.style.width = _this.width + 'px';
				_this.container.style.height = _this.height + 'px';

				// renderer
				_this.renderer = _this.webgl ?
					new THREE.WebGLRenderer({antialias: true}) :
					new THREE.CanvasRenderer()
				;

				_this.renderer.setSize(_this.width, _this.height);
				_this.container.appendChild(_this.renderer.domElement);
				_this.renderer.setClearColorHex(_this.colorscheme.bg, 1.0);
				_this.renderer.clear();
				
				_this.renderer.shadowMapEnabled = true;
				_this.renderer.shadowMapSoft = true;

				// canvas
				_this.canvas = _this.renderer.domElement;

				// camera
				_this.camera = new THREE.PerspectiveCamera(45, _this.width / _this.height, 1, 1000);
				_this.cameradistance = params.cameradistance || 17;

				// scene
				_this.scene = new THREE.Scene();

				// chart
				_this.chart = THREEDCHARTS.chartFactory(_this.json.type, _this);

				// initialize loop
				_this.update();
			}
		}
	};

	// files

	_this.loadFile = function(index){
		_this.file = _this.files[index];

		_this.controls.gui.legend.clear();
		_this.chart.clear();

		_this.init();
	};

	// JSON

	_this.setJSONFromFile = function(file){
		var xmlHttpReq;
		
		if(window.XMLHttpRequest){
			xmlHttpReq = new XMLHttpRequest();
		}else if(window.ActiveXObject){
			xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
		}

		xmlHttpReq.open('GET', file, true);
		xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		xmlHttpReq.onreadystatechange = function(){
			if(xmlHttpReq.readyState == 4 && xmlHttpReq.status == 200){
				_this.json = JSON.parse(xmlHttpReq.responseText);
				_this.file = false;
				_this.init();
			}
		}
		
		xmlHttpReq.send();
	};

	// controls

	_this.setupControls = function(chart){
		_this.chart = chart || _this.chart;

		if(_this.controls){
			_this.controls.gui.setLegend({controller: _this, gui: _this.gui});
		}else{
			_this.controls = new THREEDCHARTS.Controls({controller: _this, gui: _this.gui});
		}
	}

	// camera

	_this.setCameraDistance = function(cameradistance){
		_this.cameradistance = cameradistance;
		_this.fixCamera();
		_this.resetCamera();
	};

	_this.fixCamera = function(){
		if(_this.width / _this.height < 1){
			_this.cameradistance *= _this.height / _this.width;
		}
	};

	_this.resetCamera = function(){
		_this.camera.position.x = 0;
		_this.camera.position.y = 0;
		_this.camera.position.z = _this.cameradistance;

		_this.controls.setRadius(_this.cameradistance);
	};

	// main loop

	_this.update = function(){
		_this.camera.lookAt({x: 0, y: 0, z: 0});
		_this.renderer.render(_this.scene, _this.camera);
	};

	construct();
};
