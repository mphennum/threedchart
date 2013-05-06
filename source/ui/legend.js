/*
Legend: key colors matched with item names
*/

THREEDCHARTS.Legend = function(params){
	var _this = this;

	function construct(){
		var i, group, item, color, name, lock;

		_this.controller = params.controller;

		_this.container = _this.controller.container;

		_this.canvas = _this.controller.canvas;
		_this.width = _this.canvas.clientWidth;
		_this.height = _this.canvas.clientHeight;

		_this.size = params.size || 1;
		
		_this.chart = _this.controller.chart;
		_this.groups = _this.chart.groups;
		_this.camera = _this.controller.camera;

		// legend
		_this.html = document.createElement('div');
		_this.html.setAttribute('class', 'gui legend');
		_this.html.style.fontSize = _this.size + 'em';

		// lock
		_this.locked = false;
		_this.lock = document.createElement('a');
		_this.lock.setAttribute('class', 'lock');
		_this.lock.setAttribute('href', 'javascript:void(0)');

		_this.lock.addEventListener('click', toggleLock, false);

		_this.html.appendChild(_this.lock);

		// items
		i = 0;
		for(group in _this.groups){
			item = document.createElement('div');
			item.setAttribute('class', 'key on');
			item.setAttribute('data-group', group);
			
			item.addEventListener('click', toggleItem, false);

			// color
			color = document.createElement('a');
			color.setAttribute('class', 'color');
			color.style.backgroundColor = '#' + _this.controller.colorscheme.colors[i % _this.controller.colorscheme.colors.length].toString(16);
			color.setAttribute('href', 'javascript:void(0)');

			item.appendChild(color);

			// name
			name = document.createElement('a');
			name.setAttribute('class', 'name');
			//name.style.color = '#' + _this.controller.colorscheme.colors[i % _this.controller.colorscheme.colors.length].toString(16);
			name.setAttribute('href', 'javascript:void(0)');
			name.innerHTML = group;

			item.appendChild(name);

			// append
			_this.html.appendChild(item);

			i++;
		}

		_this.container.appendChild(_this.html);
	}

	// clear

	_this.clear = function(){
		_this.container.removeChild(_this.html);
	};

	// toggle

	function toggleItem(){
		if(this.getAttribute('class') === 'key on'){
			this.setAttribute('class', 'key off');
			_this.chart.hideGroup(this.getAttribute('data-group'));
		}else{
			this.setAttribute('class', 'key on');
			_this.chart.showGroup(this.getAttribute('data-group'));
		}
	};

	// lock

	function toggleLock(){
		if(_this.locked){
			_this.html.setAttribute('class', 'gui legend');
		}else{
			_this.html.setAttribute('class', 'gui legend locked');
		}

		_this.locked = !_this.locked;
	};

	construct();
};
