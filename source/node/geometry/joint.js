/*
Joint: joint for line charts
*/

THREEDCHARTS.Joint = function(params){
	THREEDCHARTS.Node.call(this, params);

	var	_this = this;

	function construct(){
		var
			size = params.size || THREEDCHARTS.JOINTTHICKNESS,
			smoothness = params.smoothness || 10
		;

		_this.mesh = new THREE.Mesh(
			new THREE.CylinderGeometry(size, size, size * 2, smoothness, smoothness, false),
			new THREE.MeshLambertMaterial({color: params.color})
		);

		_this.mesh.position.x = params.x || 0;
		_this.mesh.position.y = params.y || 0;
		_this.mesh.position.z = params.z || 0;

		_this.mesh.rotation.x = 0.5 * Math.PI;

		_this.castShadow();
		_this.receiveShadow();
	}

	construct();
};
