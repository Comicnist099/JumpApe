import {
    platform
} from './platform.js';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {
    audioManager
} from './audioManager.js';
export class fruit extends platform {
    constructor(scene, fbxMesh, geometry, x, y, z, typefruitSound, typefruit) {
        super(scene, fbxMesh, geometry, x, y, z);
        this.puntos = 100;
        this.typefruitSound = typefruitSound;
        this.typeFruit = typefruit;
        this.fruitAudio = new audioManager();
        this.boxCollider = new THREE.Box3();
        this.mesh.geometry.computeBoundingBox();
        this.boxCollider.setFromObject(this.mesh);

    }
    effectSpeed(player1) {
        const maxSpeedOriginal = 30; // Guardar el valor original de maxSpeed
        player1.maxSpeed = 65; // Establecer un nuevo valor para maxSpeed durante 3 segundos
        setTimeout(() => {
            player1.maxSpeed = maxSpeedOriginal; // Restaurar el valor original de maxSpeed
        }, 6500); // Esperar 8 segundos antes de restaurar el valor original
    }
    effectLife(player1) {
        player1.life = player1.life + 1;
    }
    effectStar(player1) {
        const maxSpeedOriginal = player1.life; // Guardar el valor original de maxSpeed
        player1.life = 1000; // Establecer un nuevo valor para maxSpeed durante 3 segundos
        setTimeout(() => {
            player1.life = maxSpeedOriginal; // Restaurar el valor original de maxSpeed
        }, 5000); // Esperar 3 segundos antes de restaurar el valor original
    }

    colision(player1, arrayElement) {

        var Jy1 = player1.mesh.position.y
        var Jy2 = player1.mesh.scale.y + player1.mesh.position.y;
        var Jz1 = player1.mesh.position.z
        var Jz2 = player1.mesh.scale.z + player1.mesh.position.z;



        const width = this.boxCollider.max.z - this.boxCollider.min.z;
        const height = this.boxCollider.max.y - this.boxCollider.min.y;
        var Py1 = this.mesh.position.y + height / 2;
        var Py2 = this.mesh.position.y - height / 2;
        var Pz1 = this.mesh.position.z - width / 2;
        var Pz2 = this.mesh.position.z + width / 2;

        if (Jy2 < Py1 && Jy1 > Py2 && Jz2 > Pz1 - .79 && Jz1 < Pz2 + .8) {
            if (this.mesh.position.y < Py2 || this.mesh.position.y > Py1 || this.mesh.position.z > Pz1 || this.mesh.position.z < Pz2) {

                const indexToRemove = arrayElement.indexOf(this);
                if (indexToRemove !== -1) {
                    arrayElement.splice(indexToRemove, 1);
                }
                switch (this.typeFruit) {
                    case 'banana':
                        this.effectSpeed(player1);
                        break;
                    case 'coco':
                        this.effectLife(player1);
                        break;
                    case 'mango':
                        this.effectStar(player1);
                        break;
                }
                this.scene.remove(this.mesh);
                this.fruitAudio.playSound(this.typefruitSound);
                player1.puntos = player1.puntos + this.puntos;
                // Salir del bucle si hay una colisión                }
            }
        }

    }


    update() {
        const angle = 0.1; // El ángulo de rotación por frame
        this.mesh.rotation.y += angle; // Rotar la fruta en el eje Y
    }
}