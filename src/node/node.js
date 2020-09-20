import * as THREE from 'three';

class Node {

	mesh;

	constructor(opts = { }) {
		this.mesh = opts.mesh || new THREE.Mesh(
			opts.geometry || new THREE.CubeGeometry(10, 10, 10),
			opts.material || new THREE.MeshLambertMaterial({ color: 0x777777 })
		);

		this.mesh.castShadow = !!opts.castShadow;
		this.mesh.receiveShadow = !!opts.receiveShadow;
	}

	show() {
		this.mesh.visible = true;
	}

	hide() {
		this.mesh.visible = false;
	}

	rotate({ x, y, z }) {
		this.mesh.rotation.x += x || 0;
		this.mesh.rotation.y += y || 0;
		this.mesh.rotation.z += z || 0;
	}

	rotateTo({ x, y, z }) {
		this.mesh.rotation.x = x || this.mesh.rotation.x;
		this.mesh.rotation.y = y || this.mesh.rotation.y;
		this.mesh.rotation.z = z || this.mesh.rotation.z;
	}

	translate({ x, y, z }) {
		this.mesh.position.x += x || 0;
		this.mesh.position.y += y || 0;
		this.mesh.position.z += z || 0;
	}

	translateTo({ x, y, z }) {
		this.mesh.position.x = x || this.mesh.position.x;
		this.mesh.position.y = y || this.mesh.position.y;
		this.mesh.position.z = z || this.mesh.position.z;
	}

}

export default Node;
