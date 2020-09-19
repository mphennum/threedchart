import * as THREE from 'three';
import configOpts from './config-opts';
import { OPTIONSCFG } from './const';

class threedchart {

	// options
	el;
	type;
	colors;
	showLegend;
	title;
	xLabel;
	yLabel;
	xPrefix;
	yPrefix;
	xSuffix;
	ySuffix;
	data;

	// threejs
	camera;
	scene;
	renderer;

	// other
	chart;

	constructor(opts = { }) {
		opts = configOpts(OPTIONSCFG, opts);
		for (let k in opts) {
			this[k] = opts[k];
		}

		// el option

		if (!this.el) {
			throw new Error('Invalid "el" option.');
		}

		// renderer

		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	    this.camera.position.z = 17;

	    this.scene = new THREE.Scene();

	    this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.el.appendChild(this.renderer.domElement);

		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		this.renderer.setClearColor(this.colors.background, 1);
		this.renderer.clear();

		this.onResize();
		window.addEventListener('resize', this.onResize.bind(this));
	}

	destroy() {
		window.removeEventListener('resize', this.onResize.bind(this));
	}

	setData(data) {
		//#TODO
	}

	onResize() {
		let { width, height } = this.el.getBoundingClientRect();
		height = height || 200;
		this.renderer.setSize(width, height);
		this.camera.aspect = (width > height) ? width / height : height / width;
		// this.camera.lookAt({ x: 0, y: 0, z: 0 });
		this.renderer.render(this.scene, this.camera);
	}

}

export default threedchart;
