/*
Tools: drop down gui controls
*/

THREEDCHARTS.Tools = function(params){
	var _this = this;

	function construct(){
		var
			i, len, pos,
			open, close,
			files, options, text
		;

		_this.controller = params.controller;

		_this.container = _this.controller.container;

		_this.canvas = _this.controller.canvas;
		_this.width = _this.canvas.clientWidth;
		_this.height = _this.canvas.clientHeight;

		_this.size = params.size || 1;
		
		_this.chart = _this.controller.chart;
		_this.items = _this.chart.items;
		_this.camera = _this.controller.camera;

		// tools
		_this.html = document.createElement('div');
		_this.html.setAttribute('class', 'gui tools');
		_this.html.style.fontSize = _this.size + 'em';

		_this.container.appendChild(_this.html);

		_this.options = {};

		// open & close
		_this.open = false;
		open = document.createElement('a');
		open.setAttribute('class', 'icon tools');
		open.setAttribute('href', 'javascript:void(0)');

		open.addEventListener('click', toggleOptions, false);

		_this.html.appendChild(open);

		// main options
		options = [
			{
				type: 'files',
				icon: 'forward',
				text: 'Open File',
				click: function(){
					openOptions('files');
				}
			},{
				type: 'reset',
				icon: 'reset',
				text: 'Reset View',
				click: function(){
					_this.chart.resetCamera();
					toggleOptions();
				}
			},{
				type: 'about',
				icon: 'about',
				text: 'About',
				click: function(){
					toggleAbout();
					toggleOptions();
				}
			}
		];

		appendOptions({
			name: 'main',
			current: true,
			back: false,
			options: options
		});

		// file options
		files = _this.controller.files;
		options = [];
		len = files.length;
		for(i = 0; i < len; i++){
			pos = files[i].lastIndexOf('/');
			text = files[i].substring(pos + 1);

			pos = text.lastIndexOf('.');
			if(pos === -1){
				text = text.substring(0);
			}else{
				text = text.substring(0, pos);
			}

			text = text.replace('_', ' ');

			options[options.length] = {
				type: 'open',
				icon: 'open',
				text: text,
				click: loadFile,
				params: {
					index: i
				}
			};
		}

		appendOptions({
			name: 'files',
			current: false,
			back: 'main',
			options: options
		});

		// about
		_this.aboutopen = true;
		_this.about = document.createElement('div');
		_this.about.setAttribute('class', 'gui about show');
		_this.about.style.fontSize = _this.size + 'em';
		_this.about.innerHTML =
			'<a class="logo" href="' + THREEDCHARTS.WEBSITE + '"></a>' +
			'<h2>About <a href="' + THREEDCHARTS.WEBSITE + '">ThreeDCharts.JS</a></h2>' +
			'<p>Version: ' + THREEDCHARTS.VERSION + ' [' + THREEDCHARTS.DATE + ']</p>' +
			'<p>3D Charts using <a href="http://threejs.org/">Three.JS</a> / <a href="http://get.webgl.org/">WebGL</a>.</p>' +
			'<p>Developed by <a href="http://mphennum.com/">MPHennum</a>.</p>' +
			'<p><a href="' + THREEDCHARTS.WEBSITE + '">' + THREEDCHARTS.WEBSITE + '</a></p>'
		;

		_this.container.appendChild(_this.about);

		_this.about.style.top = (_this.container.offsetHeight - _this.about.offsetHeight) * 0.5 + 'px';
		_this.about.style.left = (_this.container.offsetWidth - _this.about.offsetWidth) * 0.5 + 'px';

		toggleAbout();

		// close
		close = document.createElement('a');
		close.setAttribute('class', 'icon close');
		close.setAttribute('href', 'javascript:void(0)');
		close.addEventListener('click', toggleAbout, false);

		_this.about.appendChild(close);
	}

	// about

	function toggleAbout(){
		if(_this.aboutopen){
			_this.about.setAttribute('class', 'gui about hide');
		}else{
			_this.about.setAttribute('class', 'gui about show');
		}

		_this.aboutopen = !_this.aboutopen;
	}

	// open & close options

	function openOptions(name){
		_this.options.current.setAttribute(
			'class',
			_this.options.current.getAttribute('class').replace(' show', ' hide')
		);

		_this.options.current = _this.options[name];

		_this.options.current.setAttribute(
			'class',
			_this.options.current.getAttribute('class').replace(' hide', ' show')
		);

		_this.open = true;
	}

	// toggle options

	function toggleOptions(){
		if(_this.open){
			_this.options.current.setAttribute(
				'class',
				_this.options.current.getAttribute('class').replace(' show', ' hide')
			);
		}else{
			_this.options.current = _this.options.main;
			_this.options.main.setAttribute('class', 'options main show');
		}

		_this.open = !_this.open;
	}

	// load file

	function loadFile(params){
		toggleOptions();
		_this.controller.loadFile(params.index);
	}

	// append

	function appendOptions(params){
		var
			name = params.name,
			back = params.back || false,
			current = params.current || false,
			options = params.options || [],
			i, len = options.length
		;

		_this.options[name] = document.createElement('div');
		_this.options[name].setAttribute('class', 'options ' + name + ' hide');

		if(current){
			_this.options.current = _this.options[name];
		}

		if(back){
			appendOption(
				_this.options[name],
				'back',
				'back',
				'back',
				function(){
					openOptions(back);
				}
			);
		}

		_this.html.appendChild(_this.options[name]);

		for(i = 0; i < len; i++){
			appendOption(
				_this.options[name],
				options[i].type,
				options[i].icon,
				options[i].text,
				options[i].click,
				options[i].params
			);
		}
	}

	function appendOption(parent, type, icon, text, click, params){
		var option, full;

		option = document.createElement('a');
		option.setAttribute('class', 'option ' + type);
		option.setAttribute('href', 'javascript:void(0)');

		if(click){
			if(params){
				option.addEventListener(
					'click',
					function(){
						click(params);
					},
					false
				);
			}else{
				option.addEventListener('click', click, false);
			}
		}

		parent.appendChild(option);

		appendIcon(option, icon);
		appendText(option, text);
	}

	function appendIcon(parent, type){
		var icon;

		icon = document.createElement('span');
		icon.setAttribute('class', 'icon ' + type);

		parent.appendChild(icon);
	}

	function appendText(parent, text){
		var child;

		child = document.createElement('span');
		child.setAttribute('class', 'text');
		child.innerHTML = text;

		parent.appendChild(child);
	}

	construct();
};
