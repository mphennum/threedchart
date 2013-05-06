/*
Mouse: mouse controls / actions
*/

THREEDCHARTS.Mouse = function(params){
	var	_this = this;

	function construct(){
		_this.controller = params.controller;

		_this.container = _this.controller.container;
		_this.canvas = _this.controller.canvas;
		
		_this.radius = params.radius;
		_this.setRadius(_this.radius);

		_this.width = _this.canvas.clientWidth;
		_this.height = _this.canvas.clientHeight;

		_this.chart = _this.controller.chart;
		_this.camera = _this.controller.camera;

		_this.mouse = {
			theta: 0,
			phi: 0,
			x: 0,
			y: 0,
			down: false
		};

		_this.theta = 0;
		_this.phi = 0;

		// mouse
		if(_this.controller.webgl){
			_this.canvas.addEventListener('mousemove', mousemove, false);
			_this.canvas.addEventListener('mousedown', mousedown, false);
			_this.canvas.addEventListener('mouseup', mouseup, false);
			_this.canvas.addEventListener('mousewheel', mousewheel, false);
			_this.canvas.addEventListener('DOMMouseScroll', mousewheel, false);
		}
	}

	// mouse

	function mousemove(event){
		if(_this.mouse.down){
			_this.theta = - ((event.clientX - _this.mouse.x) * 0.5) + _this.mouse.theta;
			_this.phi = ((event.clientY - _this.mouse.y) * 0.5) + _this.mouse.phi;

			_this.theta = Math.min(135, Math.max(-135, _this.theta));
			_this.phi = Math.min(135, Math.max(-135, _this.phi));

			_this.camera.position.x = _this.radius * Math.sin(_this.theta * Math.PI / 360) * Math.cos(_this.phi * Math.PI / 360);
			_this.camera.position.y = _this.radius * Math.sin(_this.phi * Math.PI / 360);
			_this.camera.position.z = _this.radius * Math.cos(_this.theta * Math.PI / 360) * Math.cos(_this.phi * Math.PI / 360);


			_this.controller.update();
		}
	}

	function mousedown(event){
		event.preventDefault();

		_this.mouse = {
			theta: _this.theta,
			phi: _this.phi,
			x: event.clientX,
			y: event.clientY,
			down: true
		};
	}

	function mouseup(event){
		_this.mouse.down = false;

		_this.mouse.x = event.clientX - _this.mouse.x;
		_this.mousey = event.clientY - _this.mouse.y;
	}

	function mousewheel(event){
		_this.radius += (event.detail < 0 || event.wheelDelta > 0) ? -_this.zoom : _this.zoom;
		//_this.radius += event.wheelDeltaY > 0 ? -_this.zoom : _this.zoom;
		_this.radius = Math.max(_this.minzoom, Math.min(_this.maxzoom, _this.radius));

		_this.camera.position.x = _this.radius * Math.sin(_this.theta * Math.PI / 360) * Math.cos(_this.phi * Math.PI / 360);
		_this.camera.position.y = _this.radius * Math.sin(_this.phi * Math.PI / 360);
		_this.camera.position.z = _this.radius * Math.cos(_this.theta * Math.PI / 360) * Math.cos(_this.phi * Math.PI / 360);

		_this.controller.update();
	}

	// radius

	_this.setRadius = function(radius){
		_this.theta = 0;
		_this.phi = 0;

		_this.radius = radius;
		
		_this.zoom = 1;
		_this.minzoom = radius * 0.4;
		_this.maxzoom = radius * 2.5;
		
		_this.controller.update();
	};

	construct();
};
