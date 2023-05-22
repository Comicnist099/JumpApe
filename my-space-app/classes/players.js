import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {
    audioManager
} from './audioManager.js';
const jumpSound = './assets/music/jump.wav';
const wallSound = './assets/music/walljump.wav';
const upSound = './assets/music/escalera.mp3';



var notbucle = true;
export class players {


    constructor(x, y, z, scene, fbxModel, animations) {
        this.yAcceleration = 10;
        this.ySpeed = 0;
        this.xSpeed = 0;
        this.xAcceleration = 25;
        this.maxSpeed = 25;
        this.touchFloorWall = false;
        this.touchFloor = false;
        this.touchWall = false;
        this.PressJump = false;
        this.veces = 0;
        this.clock = new THREE.Clock();
        this.deltatime = 0;
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.maxVelocity = 50;
        this.rotation = -0.5;
        this.right = false;
        this.left = false;
        this.player1Audio = new audioManager();
        this.life = 1;

        this.puntos = 0;
        this.mesh = fbxModel;
        this.mesh.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 0), Math.PI);
        this.mesh.position.set(x, y, z);
        this.mesh.scale.set(0.001, 0.001, 0.001);

        this.scene = scene;


        this.animations = animations;
    }


    getAnimations() {
        return this.animations;
    }

    damagelife() {
        this.life = this.life - 1;
    }

    setMesh(mesh) {
        this.mesh = mesh;
    }
    getPosition() {
        return this.mesh.position;
    }
    getPositionX() {
        return this.mesh.position.x.toFixed(3);
    }
    getPositionY() {
        return this.mesh.position.y.toFixed(3);
    }
    getPositionZ() {
        return this.mesh.position.z.toFixed(3);
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

        return {
            tween,
            tweenBack
        };
    }
    input(JUMP, LEFT, RIGHT) {
        this.deltatime = this.clock.getDelta();

        this.animations[0].timeScale = this.deltatime * 70;
        this.animations[1].timeScale = this.deltatime * 50;
        this.animations[3].timeScale = this.deltatime * 130;


        if (this.touchFloor) {
            if (this.veces == 0 && this.PressJump == false) {
                this.applyImpactDistortion(this.mesh, 75, .001, .0008, .0012);
                this.veces = 1;
            }
        }
        if (Key.isDown(JUMP)) {

            this.PressJump = true;
            this.ySpeed = Math.min(this.ySpeed + this.yAcceleration * this.deltatime, .4);
            this.veces = 0;
            this.yAcceleration = 10;
            if (this.touchFloor)
                this.player1Audio.playSound(jumpSound);

            if (this.touchWall) {
                notbucle = false;
            }

            if (!this.touchWall && notbucle == false) {
                this.player1Audio.playSound(wallSound);
                notbucle = true;
            }




        } else {
            this.PressJump = false;

        }


        // Actualización de la velocidad en x
        if (Key.isDown(LEFT)) {
            this.left = true;
            if (this.touchWall) {
                this.animations[0].stop();
                this.animations[1].stop();
                this.animations[2].stop();
                this.animations[3].play();
                if (!this.PressJump) {
                    this.yAcceleration = 10;

                    this.animations[3].paused = true;
                } else {
                    this.yAcceleration = 15;
                    this.animations[3].paused = false;
                }


            } else if (!this.PressJump && this.touchFloor) {

                this.animations[1].stop();
                this.animations[2].stop();

                this.animations[0].play();
            } else {

                this.animations[1].stop();
                this.animations[3].stop();
                this.animations[0].stop();
                this.animations[2].play();
            }
            this.xSpeed = Math.max(this.xSpeed - this.xAcceleration, this.maxSpeed) * this.deltatime;

            this.mesh.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 0), Math.PI);

        } else if (Key.isDown(RIGHT)) {
            this.right = true;

            if (this.touchWall) {


                this.animations[0].stop();
                this.animations[1].stop();
                this.animations[2].stop();
                this.animations[3].play();
                if (!this.PressJump) {
                    this.yAcceleration = 10;

                    this.animations[3].paused = true;
                } else {
                    this.yAcceleration = 15;
                    this.animations[3].paused = false;
                }


            } else if (!this.PressJump && this.touchFloor) {
                this.animations[1].stop();
                this.animations[2].stop();

                this.animations[0].play();
            } else {
                this.animations[1].stop();
                this.animations[3].stop();
                this.animations[0].stop();
                this.animations[2].play();
            }
            this.xSpeed = Math.min(this.xSpeed + this.xAcceleration, -this.maxSpeed) * this.deltatime;
            this.mesh.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI);

        } else { // NO EN NINGUN INPUT
            this.yAcceleration = 10;
            this.right = false;
            this.left = false
            if (this.touchWall && (this.right || this.left)) {
                this.animations[0].stop();
                this.animations[1].stop();
                this.animations[2].stop();
                this.animations[3].play();


            } else {

                if (this.PressJump) {
                    if (!this.touchFloor) {

                        this.animations[0].stop();
                        this.animations[1].stop();
                        this.animations[3].stop();
                        this.animations[2].play();
                    }
                } else {
                    this.yAcceleration = 10;

                    if (this.touchFloor) {
                        this.animations[2].stop();
                        this.animations[0].stop();
                        this.animations[3].stop();
                        this.animations[1].play();
                    } else {
                        this.animations[0].stop();
                        this.animations[1].stop();
                        this.animations[3].stop();
                        this.animations[2].play();
                    }
                }


            }


            this.xSpeed = Math.abs(this.xSpeed) < this.xAcceleration ? 0 : this.xSpeed - Math.sign(this.xSpeed) * this.xAcceleration;
            this.mesh.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

        }
        this.mesh.position.z += this.xSpeed * .5;
        this.mesh.position.y += this.ySpeed;

    }


    gravity(gravity) {
        this.velocity.add(gravity);

        // Limitar la velocidad máxima del objeto
        if (this.velocity.length() > this.maxVelocity * this.deltatime) {
            this.velocity.normalize().multiplyScalar(this.maxVelocity * this.deltatime);
        }

        this.mesh.position.add(this.velocity);



    }
}