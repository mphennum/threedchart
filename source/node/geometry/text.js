/*
Text: text / string displayed at a location with a color, size, and rotation
*/

THREEDCHARTS.Text = function(params){
	THREEDCHARTS.Node.call(this, params);

	var _this = this;

	function construct(){
		var
			text = params.text + '' || '-',
			justify = params.justify || 'left',
			x = params.x || 0,
			y = params.y || 0,
			z = params.z || 0,
			size = params.size || 1,
			color = params.color,
			rotation = params.rotation || 0
		;

		_this.mesh = new THREE.Mesh(
			new THREE.TextGeometry(text, {
				font: 'helvetiker',
				size: size,
				height: 0.1,
				curveSegments: 10,
				weight: 'normal',
				style: 'normal'
			}),
			new THREE.MeshLambertMaterial({color: color})
		);

		_this.mesh.geometry.computeBoundingBox();
		
		if(justify === 'right'){
			_this.mesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(
				-(_this.mesh.geometry.boundingBox.max.x - _this.mesh.geometry.boundingBox.min.x),
				-(_this.mesh.geometry.boundingBox.max.y - _this.mesh.geometry.boundingBox.min.y) * 0.5,
				0
			));
		}else if(justify === 'center'){
			_this.mesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(
				-(_this.mesh.geometry.boundingBox.max.x - _this.mesh.geometry.boundingBox.min.x) * 0.5,
				-(_this.mesh.geometry.boundingBox.max.y - _this.mesh.geometry.boundingBox.min.y) * 0.5,
				0
			));
		}else{
			_this.mesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(
				0,
				-(_this.mesh.geometry.boundingBox.max.y - _this.mesh.geometry.boundingBox.min.y) * 0.5,
				0
			));
		}

		_this.mesh.position.x = x;
		_this.mesh.position.y = y;
		_this.mesh.position.z = z;

		_this.mesh.rotation.z = rotation;

		_this.castShadow();
		_this.receiveShadow();
	}

	construct();
};
