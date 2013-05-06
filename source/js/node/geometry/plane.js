/*
Plane: plane with position, width, height, and color
*/

THREEDCHARTS.Plane = function(params){
	THREEDCHARTS.Node.call(this, params);

	var _this = this;

	function construct(){
		var
			pos = {
				x: params.x || 0,
				y: params.y || 0,
				z: params.z || 0
			},
			direction = params.direction || 'z',
			width = params.width || 10,
			height = params.height || 10,
			color = params.color
		;

		_this.mesh = new THREE.Mesh(
			new THREE.CubeGeometry(width, height, THREEDCHARTS.PLANETHICKNESS),
			new THREE.MeshLambertMaterial({color: color})
		);

		_this.mesh.position.x = pos.x;
		_this.mesh.position.y = pos.y;
		_this.mesh.position.z = pos.z;

		switch(direction){
			case 'x':
				_this.mesh.rotation.x = 0.5 * Math.PI;
				break;
			case 'y':
				_this.mesh.rotation.y = 0.5 * Math.PI;
				break;
			default:
			case 'z':
				//_this.mesh.rotation.z = 0.5 * Math.PI;
				break;
		}

		_this.castShadow();
		_this.receiveShadow();
	}

	construct();
};
