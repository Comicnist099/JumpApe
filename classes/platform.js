import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';


export class platform {
    constructor(scene) {
        this.scene = scene;
        this.geometry = new THREE.BoxGeometry(1, 17, 1);
        this.material = new THREE.MeshLambertMaterial({color: 0x777777});
        this.markerMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.castShadow = true;
        this.mesh.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
        this.mesh.receiveShadow = true;
        this.scene.add(this.mesh);
    }

    createPlatform(width, height, depth, color) {
        this.geometry = new THREE.BoxGeometry(width, height, depth);
        this.material = new THREE.MeshLambertMaterial({color: color});
        this.mesh.geometry = this.geometry;
        this.mesh.material = this.material;
    }

    setScale(x, y, z) {
        this.mesh.scale.set(x, y, z);
    }

    setGeometry(width, height, depth) {
        this.geometry = new THREE.BoxGeometry(width, height, depth);
        this.mesh.geometry = this.geometry;
    }

    setPosition(x, y, z) {
        this.mesh.position.set(x, y, z);
    }
}
