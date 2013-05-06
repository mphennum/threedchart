/*
NodeGroup: generic group of nodes to be placed in the chart
*/

THREEDCHARTS.NodeGroup = function(params){
	var _this = this;

	function construct(){
		_this.controller = params.controller;
		_this.nodes = [];
	}

	// hide & show

	_this.hide = function(){
		var i, len = _this.nodes.length;
		for(i = 0; i < len; i++){
			_this.nodes[i].hide();
		}
	};

	_this.show = function(){
		var i, len = _this.nodes.length;
		for(i = 0; i < len; i++){
			_this.nodes[i].show();
		}
	};

	// nodes

	_this.addNode = function(node){
		_this.nodes[_this.nodes.length] = node;
	};

	_this.getNode = function(index){
		return _this.nodes[index];
	};

	_this.getLength = function(){
		return _this.nodes.length;
	};

	// shadow

	_this.castShadow = function(){
		var i, len = _this.nodes.length;
		for(i = 0; i < len; i++){
			_this.nodes[i].castShadow = true;
		}
	};

	_this.receiveShadow = function(){
		var i, len = _this.nodes.length;
		for(i = 0; i < len; i++){
			_this.nodes[i].receiveShadow = true;
		}
	};

	// position

	_this.adjustPosition = function(x, y, z){
		var i, len = _this.nodes.length;
		for(i = 0; i < len; i++){
			_this.nodes[i].mesh.position.x += x;
			_this.nodes[i].mesh.position.y += y;
			_this.nodes[i].mesh.position.z += z;
		}

		_this.controller.update();
	};

	construct();
};
