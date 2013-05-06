/*
Point: sphere at a location with a size and smoothness
*/

THREEDCHARTS.Point = function(params){
	THREEDCHARTS.Node.call(this, params);

	var	_this = this;

	function construct(){
		var
			x = params.x || 0,
			y = params.y || 0,
			z = params.z || 0,
			size = params.size || THREEDCHARTS.POINTSIZE,
			smoothness = params.smoothness || 50,
			color = params.color
		;

		_this.mesh = new THREE.Mesh(
			new THREE.SphereGeometry(size, smoothness, smoothness),
			new THREE.MeshLambertMaterial({color: color})
		);

		_this.mesh.position.x = x;
		_this.mesh.position.y = y;
		_this.mesh.position.z = z;

		_this.castShadow();
		_this.receiveShadow();
	}

	construct();
};
