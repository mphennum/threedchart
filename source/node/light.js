/*
Light: single light
*/

THREEDCHARTS.Light = function(params){
	THREEDCHARTS.Node.call(this, params);

	var _this = this;

	function construct(){
		// node object
		_this.mesh = new THREE.DirectionalLight(0xFFFFFF);

		_this.castShadow();
		//_this.mesh.shadowCameraVisible = true; // only for debugging
		_this.setDepth(params.depth || THREEDCHARTS.LIGHTDEPTH);
	}

	// depth

	_this.setDepth = function(depth){
		_this.mesh.position.set(0, 0, depth * 2);

		_this.mesh.shadowCameraNear = 0;
		_this.mesh.shadowCameraFar = depth * 2.5;

		_this.mesh.shadowCameraLeft = -5.1;
		_this.mesh.shadowCameraRight = 5.1;
		_this.mesh.shadowCameraTop = 5.1;
		_this.mesh.shadowCameraBottom = -5.1;
	};

	// look

	_this.lookAt = function(x, y, z){
		_this.mesh.target.position.set(x, y, z);
	};

	construct();
};
