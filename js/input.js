var veces=0;


function animate() {
    TWEEN.update();    // Log de la posición actual del objeto
    updatePhysics(platforms);

    if(touchFloor){
        if(veces==0&&PressJump==false){
            applyImpactDistortion(cubeMesh, 75, 1, 0.80, 1.2);
            veces=1;
        }
    }

    console.log(meshes[0].position);

    // Actualización de la velocidad en y
    camera.position.copy(meshes[0].position);
    camera.position.add(new THREE.Vector3(10, 0, 0));
    camera.lookAt(meshes[0].position);
    // Actualización de la posición en y
    if (Key.isDown(Key.SPACE)) {
        ySpeed = Math.min(ySpeed + yAcceleration, .5);
        veces=0;

    }
    else{
        PressJump=false;
    }
    // Actualización de la velocidad en x
    if (Key.isDown(Key.A)) {
        xSpeed = Math.max(xSpeed - xAcceleration, maxSpeed);
    } else if (Key.isDown(Key.D)) {
        xSpeed = Math.min(xSpeed + xAcceleration, -maxSpeed);
    } else {
        xSpeed = Math.abs(xSpeed) < xAcceleration ? 0 : xSpeed - Math.sign(xSpeed) * xAcceleration;
    }
    meshes[0].position.z+=xSpeed*.5;
    meshes[0].position.y+=ySpeed;


    // Renderizado de la escena
    renderer.render(scene, camera);

    // Llamada a la función para el siguiente frame de animación
    requestAnimationFrame(animate);
    render();
}