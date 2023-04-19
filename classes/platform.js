import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {
    FBXLoader
} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';

export class platform {
    constructor(scene, fbxMesh, geometry, x, y, z) {
        this.scene = scene;
        this.mesh = fbxMesh;
        this.mesh.position.set(x, y, z);
        this.mesh.geometry = geometry;
        this.scene.add(this.mesh);
    }
    colision(player1) {

        var Jy1 = player1.mesh.position.y
        var Jy2 = player1.mesh.scale.y + player1.mesh.position.y;
        var Jz1 = player1.mesh.position.z
        var Jz2 = player1.mesh.scale.z + player1.mesh.position.z;

        const box = new THREE.Box3();
        this.mesh.geometry.computeBoundingBox();
        box.setFromObject(this.mesh);

        const width = box.max.z - box.min.z;
        const height = box.max.y - box.min.y;
        var Py1 = this.mesh.position.y + height / 2;
        var Py2 = this.mesh.position.y - height / 2;
        var Pz1 = this.mesh.position.z - width / 2;
        var Pz2 = this.mesh.position.z + width / 2;

        if (Jy2 < Py1 + 1 && Jy1 > Py2 - .8 && Jz2 > Pz1 - .79 && Jz1 < Pz2 + .8) {
            if (player1.mesh.position.y > Py1) {
                console.log("tocado");
                player1.touchFloor = true;
                player1.ySpeed = 0;
                player1.velocity.y = 0;
                player1.mesh.position.setY(Py1 + 1); // Ajustar la posición del objeto
            }
        } else {
            if (!player1.touchFloorWall)
                player1.touchFloor = false;
        }


    }
}