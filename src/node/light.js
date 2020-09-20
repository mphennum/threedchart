import * as THREE from 'three';
import Node from './node';

const DEFAULTLIGHTDEPTH = 10;

class Light extends Node {

	constructor() {
		super({
			mesh: new THREE.DirectionalLight(0xFFFFFF, 1),
			castShadow: true,
		});

		this.translateTo({ z: DEFAULTLIGHTDEPTH * 2 });

		this.mesh.shadow.camera.near = 0;
		this.mesh.shadow.camera.far = DEFAULTLIGHTDEPTH * 2.5;
		this.mesh.shadow.camera.left = -5.1;
		this.mesh.shadow.camera.right = 5.1;
		this.mesh.shadow.camera.top = 5.1;
		this.mesh.shadow.camera.bottom = -5.1;
	}

}

export default Light;
