/*
Line: line with a start and end point (long rectangle)
*/

THREEDCHARTS.Line = function(params){
	THREEDCHARTS.Node.call(this, params);

	var	_this = this;

	function construct(){
		var
			from = {
				x: params.x || 0,
				y: params.y || 0,
				z: params.z || 0
			},
			to = {
				x: params.endx || 0,
				y: params.endy || 0,
				z: params.endz || 0
			},
			length = Math.sqrt(
				Math.pow(to.x - from.x, 2) +
				Math.pow(to.y - from.y, 2)
			),
			size = params.size || 0.05,
			color = params.color
		;

		_this.mesh = new THREE.Mesh(
			new THREE.CubeGeometry(size, length, size),
			new THREE.MeshLambertMaterial({color: color})
		);

		_this.mesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5 * length, 0));

		_this.mesh.position.x = from.x;
		_this.mesh.position.y = from.y;
		_this.mesh.position.z = from.z;

		if(from.x < to.x){
			_this.mesh.rotation.z = -0.5 * Math.PI + Math.asin((to.y - from.y) / length);
		}else{
			_this.mesh.rotation.z = 0.5 * Math.PI + Math.asin((from.y - to.y) / length);
		}

		_this.castShadow();
		_this.receiveShadow();
	}

	construct();
};
