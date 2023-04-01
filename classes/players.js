import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

export class players {


    constructor(x, y, z, fbxModel) {

        this.yAcceleration = 0.03;
        this.ySpeed = 0;
        this.xSpeed = 0;
        this.xAcceleration = 0.01;
        this.maxSpeed = 0.2;
        this.touchFloor = false;
        this.PressJump = false;
        this.veces = 0;
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.maxVelocity = 1;
        this.rotation = -0.5;

        /* 
        this.geometry = new THREE.BoxGeometry(size, size, size);
        this.material = new THREE.MeshBasicMaterial({color: color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(x, y, z);
        this.mesh.castShadow = true;
        this.mesh.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
        this.mesh.receiveShadow = true; */

        this.mesh = fbxModel;
        this.mesh.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 0), Math.PI);
        this.mesh.position.set(x, y, z);
        this.mesh.scale.set(0.001, 0.001, 0.001);


        // Agregar el objeto a la escena


        // Agregar el objeto a la escena
    }

    getPosition() {
        return this.mesh.position;
    }
    getPositionY() {
        return this.mesh.position.y;
    }


    getSize() {
        return this.geometry.parameters.width;
    }

    getColor() {
        return this.material.color;
    }

    setColor(color) {
        this.material.color.set(color);
    }

    getMesh() {
        return this.mesh;
    }
    applyImpactDistortion(cube, duration, distortionAmountX, distortionAmountY, distortionAmountZ) { // Guardar la escala original del cubo
        var originalScale = {
            x: cube.scale.x,
            y: cube.scale.y,
            z: cube.scale.z
        };

        var targetScale = {
            x: distortionAmountX,
            y: distortionAmountY,
            z: distortionAmountZ
        };

        // Crear la animación de distorsión
        const tween = new TWEEN.Tween(targetScale).to(targetScale, duration).easing(TWEEN.Easing.Quadratic.Out).onUpdate(() => { // Actualizar la escala del cubo en cada frame de la animación
            cube.scale.set(targetScale.x, targetScale.y, targetScale.z);
        }).start();

        // Crear la animación de regreso a la escala original
        const tweenBack = new TWEEN.Tween(originalScale).to(originalScale, duration).easing((t) => Math.sin(t * Math.PI / 2)).onUpdate(() => { // Actualizar la escala del cubo en cada frame de la animación
            cube.scale.set(originalScale.x, originalScale.y, originalScale.z);
        });

        // Encadenar las animaciones de distorsión y regreso
        tween.chain(tweenBack);

        // Retornar las animaciones para poder detenerlas si es necesario

        return {tween, tweenBack};
    }
    input(JUMP, LEFT, RIGHT) {
        if (this.touchFloor) {
            if (this.veces == 0 && this.PressJump == false) {
                this.applyImpactDistortion(this.mesh, 75, .001, .0008, .0012);
                this.veces = 1;
            }
        }

        console.log(this.mesh.position);

        /*      // Actualización de la velocidad en y
        camera.position.copy(this.mesh.position);
        camera.position.add(new THREE.Vector3(10, 0, 0));
        camera.lookAt(this.mesh.position); */


        // Actualización de la posición en y
        if (Key.isDown(JUMP)) {
            this.ySpeed = Math.min(this.ySpeed + this.yAcceleration, .5);
            this.veces = 0;

        } else {
            this.PressJump = false;
        }
        // Actualización de la velocidad en x
        if (Key.isDown(LEFT)) {
            this.xSpeed = Math.max(this.xSpeed - this.xAcceleration, this.maxSpeed);

            this.mesh.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 0), Math.PI);


        } else if (Key.isDown(RIGHT)) {
            this.xSpeed = Math.min(this.xSpeed + this.xAcceleration, -this.maxSpeed);
            this.mesh.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI);

        } else {
            this.xSpeed = Math.abs(this.xSpeed) < this.xAcceleration ? 0 : this.xSpeed - Math.sign(this.xSpeed) * this.xAcceleration;
            this.mesh.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

        }
        this.mesh.position.z += this.xSpeed * .5;
        this.mesh.position.y += this.ySpeed;

    }

    gravity(platforms, gravity) {
        this.velocity.add(gravity);

        // Limitar la velocidad máxima del objeto
        if (this.velocity.length() > this.maxVelocity) {
            this.velocity.normalize().multiplyScalar(this.maxVelocity);
        }

        this.mesh.position.add(this.velocity);
        // Verificar la colisión con cada objeto de la clase "plataform"
        for (const element of platforms) {
            var platform = element;
            var raycaster = new THREE.Raycaster(this.mesh.position, new THREE.Vector3(0, -1, 0), 0, .5);
            var intersects = raycaster.intersectObject(platform.mesh);
            if (intersects.length > 0) {
                console.log("tocado");
                this.touchFloor = true;
                this.ySpeed = 0;
                this.velocity.y = 0;
                this.mesh.position.setY(intersects[0].point.y + .5); // Ajustar la posición del objeto
                break; // Salir del bucle si hay una colisión
            } else {
                this.touchFloor = false;

            }

        }
    }
}
