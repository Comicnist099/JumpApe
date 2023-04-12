import {platform} from './platform.js';
export class fruit extends platform {
    constructor(scene, fbxMesh, geometry, x, y, z) {
        super(scene, fbxMesh, geometry, x, y, z);
        this.puntos = 100;
    }

    update() {
        const angle = 0.1; // El ángulo de rotación por frame
        this.mesh.rotation.y += angle; // Rotar la fruta en el eje Y
    }
}
