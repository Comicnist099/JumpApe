import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

export class players {


    constructor(x, y, z, scene, fbxModel, animations) {
        this.yAcceleration = 0.02;
        this.ySpeed = 0;
        this.xSpeed = 0;
        this.xAcceleration = 0.02;
        this.maxSpeed = .4;
        this.touchFloor = false;
        this.touchWall = false;
        this.PressJump = false;
        this.veces = 0;
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.maxVelocity = 1;
        this.rotation = -0.5;
        this.right = false;
        this.left = false;

        this.puntos = 0;

        this.mesh = fbxModel;
        this.mesh.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 0), Math.PI);
        this.mesh.position.set(x, y, z);
        this.mesh.scale.set(0.001, 0.001, 0.001);

        this.scene = scene;

        this.animations = []
        this.animations = animations;


        // Agregar el objeto a la escena


        // Agregar el objeto a la escena
    }
    setMesh(mesh) {
        this.mesh = mesh;
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
        /*      // Actualización de la velocidad en y
        camera.position.copy(this.mesh.position);
        camera.position.add(new THREE.Vector3(10, 0, 0));
        camera.lookAt(this.mesh.position); */


        // Actualización de la posición en y
        if (Key.isDown(JUMP)) {

            this.PressJump = true;
            this.ySpeed = Math.min(this.ySpeed + this.yAcceleration, .5);
            this.veces = 0;
            this.yAcceleration = 0.02;


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
                    this.yAcceleration = 0.02;

                    this.animations[3].paused = true;
                } else {
                    this.yAcceleration = .2;
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
            this.xSpeed = Math.max(this.xSpeed - this.xAcceleration, this.maxSpeed);

            this.mesh.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 0), Math.PI);

        } else if (Key.isDown(RIGHT)) {
            this.right = true;
            if (this.touchWall) {
                this.animations[0].stop();
                this.animations[1].stop();
                this.animations[2].stop();
                this.animations[3].play();
                if (!this.PressJump) {
                    this.yAcceleration = 0.02;

                    this.animations[3].paused = true;
                } else {
                    this.yAcceleration = .2;
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
            this.xSpeed = Math.min(this.xSpeed + this.xAcceleration, -this.maxSpeed);
            this.mesh.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI);

        } else { // NO EN NINGUN INPUT
            this.yAcceleration = 0.02;
            this.right = false;
            this.left = false
            if (this.touchWall && this.right || this.left) {
                this.animations[0].stop();
                this.animations[1].stop();
                this.animations[2].stop();
                this.animations[3].play();


            } else {
                if (this.PressJump) {
                    if (!this.touchFloor) {
                        console.log("NO AUTORIZO");
                        this.animations[0].stop();
                        this.animations[1].stop();
                        this.animations[3].stop();
                        this.animations[2].play();
                    }
                } else {
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

    gravity(platforms, walls, powers, gravity) {


        if (!this.touchWall) {
            this.velocity.add(gravity);
            // Limitar la velocidad máxima del objeto
            if (this.velocity.length() > this.maxVelocity) {
                this.velocity.normalize().multiplyScalar(this.maxVelocity);
            }
            this.mesh.position.add(this.velocity);

        }

        var Jy1 = this.mesh.position.y
        var Jy2 = this.mesh.scale.y + this.mesh.position.y;
        var Jz1 = this.mesh.position.z
        var Jz2 = this.mesh.scale.z + this.mesh.position.z;
        console.log("PUNTOS JUGADOR " + this.puntos);
        for (const element of powers) {

            var platform = element;
            const box = new THREE.Box3();
            platform.mesh.geometry.computeBoundingBox();
            box.setFromObject(platform.mesh);

            const width = box.max.z - box.min.z;
            const height = box.max.y - box.min.y;
            // Hitbox de la plataforma;
            var Py1 = platform.mesh.position.y + height / 2;
            var Py2 = platform.mesh.position.y - height / 2;
            var Pz1 = platform.mesh.position.z - width / 2;
            var Pz2 = platform.mesh.position.z + width / 2;

            if (Jy2 < Py1 && Jy1 > Py2 && Jz2 > Pz1 - .79 && Jz1 < Pz2 + .8) {
                if (this.mesh.position.y<Py2||this.mesh.position.y>Py1 || this.mesh.position.z > Pz1 || this.mesh.position.z<Pz2) {
                    console.log("fruta");
                    const indexToRemove = powers.indexOf(element);
                    if (indexToRemove !== -1) {
                      powers.splice(indexToRemove, 1);
                    }

                this.scene.remove(platform.mesh);

                this.puntos = this.puntos + platform.puntos;
                break; // Salir del bucle si hay una colisión                }
            }
        }
    }


    for (const element of walls) {
        var platform = element;
        const box = new THREE.Box3();
        platform.mesh.geometry.computeBoundingBox();
        box.setFromObject(platform.mesh);

        const width = box.max.z - box.min.z;
        const height = box.max.y - box.min.y;

        // Hitbox de la plataforma;
        var Py1 = platform.mesh.position.y + height / 2;
        var Py2 = platform.mesh.position.y - height / 2;
        var Pz1 = platform.mesh.position.z - width / 2;
        var Pz2 = platform.mesh.position.z + width / 2;

        if (Jy2 < Py1 && Jy1 > Py2 && Jz2>Pz1 - .79 && Jz1 < Pz2 + .8) {
                    if (this.mesh.position.z > Pz1) {
                        console.log("tocado Wall");
                        this.touchWall = true;
                        this.ySpeed = 0;
                        this.velocity.y = 0;
                        this.mesh.position.setZ(Pz2 + .8); // Ajustar la posición del objeto
                        break; // Salir del bucle si hay una colisión                }
                    } else if (this.mesh.position.z<Pz2) {
                    console.log("tocado Wall");
                    this.touchWall = true;
                    this.ySpeed = 0;
                    this.velocity.y = 0;
                    this.mesh.position.setZ(Pz1-.8); // Ajustar la posición del objeto
                    break; // Salir del bucle si hay una colisión                }
                }
            } else {
                this.touchWall = false;


            }


        }

        // Verificar la colisión con cada objeto de la clase "plataform"
        for (const element of platforms) {
            var platform = element;
            const box = new THREE.Box3();
            platform.mesh.geometry.computeBoundingBox();
            box.setFromObject(platform.mesh);
      
            const width = box.max.z - box.min.z;

            // Hitbox de la plataforma;
            var Py1 = platform.mesh.position.y
            var Py2 = platform.mesh.scale.y + platform.mesh.position.y;
            var Pz1 = platform.mesh.position.z - width / 2;
            var Pz2 = platform.mesh.position.z + width / 2;
            /*    console.log("PLATAFORMA " + Pz1, Pz2);
            console.log("JUGADOR " + Jz1, Jz2);
 */
            if (Jy2 < Py1 + .7 && Jy1 > Py2 && Jz2>Pz1 && Jz1 < Pz2) {

                        console.log("tocado");
                        this.touchFloor = true;
                        this.ySpeed = 0;
                        this.velocity.y = 0;
                        this.mesh.position.setY(Py1 + .69); // Ajustar la posición del objeto
                        break; // Salir del bucle si hay una colisión                }
                    } else {
                        this.touchFloor = false;


                    }
                }
            }
        }
