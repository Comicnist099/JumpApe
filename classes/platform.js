import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';

export class platform {
    constructor(scene, fbxMesh, geometry, x, y, z) {
        this.scene = scene;
        this.mesh = fbxMesh;
        this.mesh.position.set(x, y, z);
        this.mesh.geometry = geometry;
        this.scene.add(this.mesh);
    }
}
