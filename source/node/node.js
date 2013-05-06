/*
Node: generic node to be placed in the chart
*/

THREEDCHARTS.Node = function(params){
	var _this = this;

	function construct(){
		_this.controller = params.controller;
		
		_this.mesh = new THREE.Mesh(
			new THREE.CubeGeometry(10, 10, 10),
			new THREE.MeshLambertMaterial({color: 0x777777})
		);

		_this.controller.update();
	}

	// display

	_this.hide = function(){
		_this.mesh.visible = false;
		_this.controller.update();
	};

	_this.show = function(){
		_this.mesh.visible = true;
		_this.controller.update();
	};

	// shadow

	_this.castShadow = function(){
		_this.mesh.castShadow = true;
	};

	_this.receiveShadow = function(){
		_this.mesh.receiveShadow = true;
	};

	// geometry

	_this.getGeometry = function(){
		return _this.mesh.geometry;
	};

	_this.setGeometry = function(geometry){
		_this.mesh.geometry = geometry;
	};

	// color

	_this.setColor = function(color){
		_this.mesh.material.color = color;
	};

	// rotation

	_this.adjustRotation = function(x, y, z){
		_this.mesh.rotation.x += x;
		_this.mesh.rotation.y += y;
		_this.mesh.rotation.z += z;
		_this.controller.update();
	};

	_this.setRotation = function(x, y, z){
		_this.mesh.rotation.x = x;
		_this.mesh.rotation.y = y;
		_this.mesh.rotation.z = z;
		_this.controller.update();
	};

	// position

	_this.adjustPosition = function(x, y, z){
		_this.mesh.position.x += x;
		_this.mesh.position.y += y;
		_this.mesh.position.z += z;
		_this.controller.update();
	};

	_this.setPosition = function(x, y, z){
		_this.mesh.position.x = x;
		_this.mesh.position.y = y;
		_this.mesh.position.z = z;
		_this.controller.update();
	};

	// x

	_this.adjustX = function(x){
		_this.mesh.position.x += x;
		_this.controller.update();
	};

	_this.setX = function(x){
		_this.mesh.position.x = x;
		_this.controller.update();
	};

	// y

	_this.adjustY = function(y){
		_this.mesh.position.y += y;
		_this.controller.update();
	};

	_this.setY = function(y){
		_this.mesh.position.y = y;
		_this.controller.update();
	};

	// z

	_this.adjustZ = function(z){
		_this.mesh.position.z += z;
		_this.controller.update();
	};

	_this.setZ = function(z){
		_this.mesh.position.z = z;
		_this.controller.update();
	};

	construct();
};
