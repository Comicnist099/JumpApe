import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

export class groupColision {
    constructor() {}

    colision(players, arrayPlatform) {
        let touchFloor = [false, false];
        for (const element of arrayPlatform) {
            const plataforma = element;

            const box = new THREE.Box3();
            plataforma.mesh.geometry.computeBoundingBox();
            box.setFromObject(plataforma.mesh);
            const width = box.max.z - box.min.z;
            const height = box.max.y - box.min.y;

            const Py1 = plataforma.mesh.position.y + height / 2;
            const Py2 = plataforma.mesh.position.y - height / 2;
            const Pz1 = plataforma.mesh.position.z - width / 2;
            const Pz2 = plataforma.mesh.position.z + width / 2;

            for (let i = 0; i < players.length; i++) {
                const player = players[i];
                const Jy1 = player.mesh.position.y;
                const Jy2 = player.mesh.scale.y + player.mesh.position.y;
                const Jz1 = player.mesh.position.z;
                const Jz2 = player.mesh.scale.z + player.mesh.position.z;


                if (Jy2 < Py1 + .5 && Jy1 > Py2 - .8 && Jz2 > Pz1 - .79 && Jz1 < Pz2 + .8) {
                    if (player.mesh.position.y > Py1) {
                        touchFloor[i] = true;
                        player.touchFloor = true;
                        player.ySpeed = 0;
                        player.velocity.y = 0;
                        player.mesh.position.setY(Py1 + .5); // Ajustar la posición del objeto
                    }
                } else {
                    player.touchWall = false;
                }
            }
        }

        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            if (!touchFloor[i]) {
                player.touchFloor = false;
            }
        }
    }
    colisionWall(players, arrayWall, up, down, side) {

        for (const element of arrayWall) {

            const wall = element;

            const box = new THREE.Box3();
            wall.mesh.geometry.computeBoundingBox();
            box.setFromObject(wall.mesh);

            const width = box.max.z - box.min.z;
            const height = box.max.y - box.min.y;
            const Py1 = wall.mesh.position.y + height / 2;
            const Py2 = wall.mesh.position.y - height / 2;
            const Pz1 = wall.mesh.position.z - width / 2;
            const Pz2 = wall.mesh.position.z + width / 2;

            for (const element of players) {
                const player = element;
                const Jy1 = player.mesh.position.y
                const Jy2 = player.mesh.scale.y + player.mesh.position.y;
                const Jz1 = player.mesh.position.z
                const Jz2 = player.mesh.scale.z + player.mesh.position.z;

                if (Jy2 < Py1 + 1 && Jy1 > Py2 - .8 && Jz2 > Pz1 - .79 && Jz1 < Pz2 + .8) {
                    if (player.mesh.position.y > Py1) {
                        if (up) {
                            console.log("Plataforma");
                            player.touchFloor = true;
                            player.touchFloorWall = true;
                            player.ySpeed = 0;
                            player.velocity.y = 0;
                            player.mesh.position.setY(Py1 + 1); // Ajustar la posición del objeto
                        }
                    } else if (player.mesh.position.y < Py2) {
                        if (down)
                            player.mesh.position.setY(Py2 - .8);
                    } else if (player.mesh.position.z > Pz1) {
                        if (side) {
                            console.log("tocado Wall");
                            player.touchWall = true;
                            player.ySpeed = 0;
                            player.velocity.y = 0;
                            player.mesh.position.setZ(Pz2 + .8); // Ajustar la posición del objeto
                        }

                    } else if (player.mesh.position.z < Pz2) {
                        if (side) {
                            console.log("tocado Wall");
                            player.touchWall = true;
                            player.ySpeed = 0;
                            player.velocity.y = 0;
                            player.mesh.position.setZ(Pz1 - .8); // Ajustar la posición del objeto
                        }
                    }
                }
            }
        }
    }


}