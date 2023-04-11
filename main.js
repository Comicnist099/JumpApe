init();

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {platform} from './classes/platform.js';
import {players} from './classes/players.js';
import {wall} from './classes/wall.js';
import {fruit} from './classes/fruit.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';


var container,
    camera,
    camera2,
    scene,
    renderer,
    renderer2;

if (!Detector.webgl) 
    Detector.addGetWebGLMessage();



// GRAVEDAD
var gravity = new THREE.Vector3(0, -0.01, 0);


var player1,
    player2;


var loader = new FBXLoader();


var MonkeyFBX;

var cargadoModel = false;


var mixer;
var mixer2;

var PlataformMap,
    wallMap,
    PowerMap;

var PlatfomsScena = false;
var platforms = [],
    walls = [],
    powers = [];

// MODELS PATH
const ModelWood = './assets/models/Platforms/Wood.fbx';
const ModelMetal = './assets/models/Platforms/Metal.fbx';
const ModelCoco = './assets/models/Props/fruits/Coco/Coco.fbx';
const ModelBanana = './assets/models/Props/fruits/Banana/Banana.fbx';
const ModelMango = './assets/models/Props/fruits/Mango/Mango.fbx';

function CargadoModelo(path, type, Sx, Sy, Sz, Px, Py, Pz) {
    loader.load(path, (fbx) => {
        var wood = fbx;

        wood.traverse(child => {
            if (child.isMesh) {
                child.AmbientLighty = -10;
                child.material.transparent = false; // Hacer el material transparente
                child.material.side = THREE.DoubleSide; // Configurar la visualización de las caras del material
                child.material.metalness = 0.8; // Configurar la reflectividad del material
                child.material.roughness = 0.2; // Configurar la suavidad del material
                child.material.envMapIntensity = 1; // Configurar la intensidad del mapa de entorno del material
                child.material.needsUpdate = true; // Asegurarse de que el material se actualice correctamente

            }
        });
        const geometry = wood.children[0].geometry;

        if (type == "P") { // PLATAFORMAS
            wood.scale.set(Sx, Sy, Sz);
            PlataformMap = new platform(scene, wood, geometry, Px, Py, Pz);
            platforms.push(PlataformMap);

        } else if (type == "W") { // ///WALLS
            const wood4 = wood.clone();
            wood4.scale.set(Sx, Sy, Sz);
            wallMap = new wall(scene, wood4, geometry, Px, Px, Pz);
            walls.push(wallMap);

        } else if (type == "B") { // ///Banana
            const wood4 = wood.clone();
            wood4.scale.set(Sx, Sy, Sz);
            PowerMap = new fruit(scene, wood4, geometry, Px, Py, Pz);
            powers.push(PowerMap);

        }


        PlatfomsScena = true;
    }, undefined, (error) => {
        console.error('Error al cargar el modelo FBX:', error);
    });

}
// FRUITS
CargadoModelo(ModelMango, "B", .0010, .0010, .0010, 0, 10, -5);
CargadoModelo(ModelCoco, "B", .010, .010, .010, 0, 10, 5);
CargadoModelo(ModelBanana, "B", .010, .010, .010, 0, 10, 0);
// /PLATFORMS
CargadoModelo(ModelWood, "P", .015, .010, .08, 0, 6, 0);
CargadoModelo(ModelMetal, "P", .015, .010, .03, 0, 0, 0);
// WALLS
CargadoModelo(ModelWood, "W", .015, .21, .003, 0, 0, -15);


loader.load('./assets/models/Monkey/Idle.fbx', (fbx) => {
    var animations = [];
    MonkeyFBX = fbx;
    MonkeyFBX.scale.set(.0015, .0015, .0015);
    // Crear el objeto Mixer para reproducir las animaciones del modelo
    mixer2 = new THREE.AnimationMixer(MonkeyFBX);
    var run = mixer2.clipAction(MonkeyFBX.animations[1]);
    var idle = mixer2.clipAction(MonkeyFBX.animations[0]);
    var jump = mixer2.clipAction(MonkeyFBX.animations[2]);
    var climb = mixer2.clipAction(MonkeyFBX.animations[3]);

    animations.push(run);
    animations.push(idle);
    animations.push(jump);
    animations.push(climb);

    // Obtener la animación del modelo y crear una instancia de la animación
    MonkeyFBX.traverse(child => {
        if (child.isMesh) {
            child.AmbientLighty = -10;
            child.material.transparent = false; // Hacer el material transparente
            child.material.side = THREE.DoubleSide; // Configurar la visualización de las caras del material
            child.material.metalness = 0.8; // Configurar la reflectividad del material
            child.material.roughness = 0.2; // Configurar la suavidad del material
            child.material.envMapIntensity = 1; // Configurar la intensidad del mapa de entorno del material
            child.material.needsUpdate = true; // Asegurarse de que el material se actualice correctamente

        }
    });


    player2 = new players(0, 5, 0, MonkeyFBX, animations)
    scene.add(player2.getMesh());
    cargadoModel = true;


}, undefined, (error) => {
    console.error('Error al cargar el modelo FBX:', error);
});


loader.load('./assets/models/Monkey/Idle.fbx', (fbx) => {
    var animations = [];
    MonkeyFBX = fbx;
    MonkeyFBX.scale.set(.0015, .0015, .0015);
    // Crear el objeto Mixer para reproducir las animaciones del modelo
    mixer = new THREE.AnimationMixer(MonkeyFBX);
    var run = mixer.clipAction(MonkeyFBX.animations[1]);
    var idle = mixer.clipAction(MonkeyFBX.animations[0]);
    var jump = mixer.clipAction(MonkeyFBX.animations[2]);
    var climb = mixer.clipAction(MonkeyFBX.animations[3]);

    animations.push(run);
    animations.push(idle);
    animations.push(jump);
    animations.push(climb);

    // Obtener la animación del modelo y crear una instancia de la animación
    MonkeyFBX.traverse(child => {
        if (child.isMesh) {
            child.AmbientLighty = -10;
            child.material.transparent = false; // Hacer el material transparente
            child.material.side = THREE.DoubleSide; // Configurar la visualización de las caras del material
            child.material.metalness = 0.8; // Configurar la reflectividad del material
            child.material.roughness = 0.2; // Configurar la suavidad del material
            child.material.envMapIntensity = 1; // Configurar la intensidad del mapa de entorno del material
            child.material.needsUpdate = true; // Asegurarse de que el material se actualice correctamente

        }
    });


    player1 = new players(0, 5, 0, MonkeyFBX, animations)
    scene.add(player1.getMesh());
    cargadoModel = true;


}, undefined, (error) => {
    console.error('Error al cargar el modelo FBX:', error);
});


// /// JUGADORES


// //// PLATAFORMAS


// //Importar
var textureLoader = new THREE.TextureLoader();

// Carga la imagen del fondo
textureLoader.load('./assets/img/chango.png', function (texture) { // Configura la propiedad background de la escena con la textura cargada
    scene.background = texture;
});

animate();

// Agregar una variable de estado para rastrear si el objeto está actualmente en una animación
function applyImpactDistortion(cube, duration, distortionAmountX, distortionAmountY, distortionAmountZ) { // Guardar la escala original del cubo
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

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    // scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 500, 1000);


    // camera

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / 2 / window.innerHeight, 0.1, 1000);
    camera2 = new THREE.PerspectiveCamera(90, window.innerWidth / 2 / window.innerHeight, 0.1, 1000);

    camera.position.set(10, 0, 0);
    camera.lookAt(0, 0, 0);
    camera2.position.set(10, 0, 0);
    camera2.lookAt(0, 0, 0);
    camera.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    camera2.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

    scene.add(camera);
    scene.add(camera2);
    // lights
    var light,
        materials;
    scene.add(new THREE.AmbientLight(0x666666));

    light = new THREE.DirectionalLight(0xffffff, 1);
    var d = 20;

    light.position.set(d, d, d);

    light.castShadow = true;
    // light.shadowCameraVisible = true;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    light.shadow.camera.left = - d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = - d;

    light.shadow.camera.far = 3 * d;
    light.shadow.camera.near = d;
    light.shadow.darkness = 0.5;

    scene.add(light);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2.03, window.innerHeight);
    renderer.setViewport(0, 0, window.innerWidth / 2.03, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    renderer2 = new THREE.WebGLRenderer();
    renderer2.setSize(window.innerWidth / 2.03, window.innerHeight);
    renderer2.setViewport(0, 0, window.innerWidth / 2.03, window.innerHeight);
    document.body.appendChild(renderer2.domElement);


}
function onWindowResize() {
    var aspect = window.innerWidth / window.innerHeight;
    var halfWidth = aspect / 2;

    camera.aspect = halfWidth;
    camera.updateProjectionMatrix();

    camera2.aspect = halfWidth;
    camera2.updateProjectionMatrix();

    renderer.setSize(window.innerWidth / 2.03, window.innerHeight);
    renderer.setViewport(0, 0, window.innerWidth / 2.03, window.innerHeight);

    renderer2.setSize(window.innerWidth / 2.03, window.innerHeight);
    renderer2.setViewport(0, 0, window.innerWidth / 2.03, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

function updatePhysics(platforms, walls) {
    if (PlatfomsScena) {
        player1.gravity(platforms, walls, gravity);
        player2.gravity(platforms, walls, gravity);

    }


    // Mover el objeto según su velocidad


}


function animate() {

    TWEEN.update(); // Log de la posición actual del objeto
    if (cargadoModel) {
        updatePhysics(platforms, walls);
        mixer.update(0.016);
        mixer2.update(0.016);
        camera.position.copy(player1.getPosition());
        camera.position.add(new THREE.Vector3(10, 2, 0));
        camera.lookAt(player1.getPosition());

        camera2.position.copy(player2.getPosition());
        camera2.position.add(new THREE.Vector3(10, 2, 0));
        camera2.lookAt(player2.getPosition());


        for (let i = 0; i < powers.length; i++) {
            powers[i].update();
        }


        /* if (player1.getPositionY() >= player2.getPositionY()) {
            camera.position.copy(player1.getPosition());
            camera.position.add(new THREE.Vector3(10, 2, 0));
            camera.lookAt(player1.getPosition());
        } else {
            camera.position.copy(player2.getPosition());
            camera.position.add(new THREE.Vector3(10, 2, 0));
            camera.lookAt(player2.getPosition());
        }   */
        player1.input(Key.SPACE, Key.A, Key.D);
        player2.input(Key.UP, Key.LEFT, Key.RIGHT);
    }
    // Renderizado de la escena


    // Llamada a la función para el siguiente frame de animación
    requestAnimationFrame(animate);
    render();

}

function render() { // Actualizar la posición del objeto del HUD para que siga a la cámara

    renderer.render(scene, camera);
    renderer2.render(scene, camera2);

}
