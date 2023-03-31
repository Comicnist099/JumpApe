init();

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {platform} from './classes/platform.js';
import {players} from './classes/players.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';


var container,
    camera,
    scene,
    renderer;

if (!Detector.webgl) 
    Detector.addGetWebGLMessage();



// GRAVEDAD
var gravity = new THREE.Vector3(0, -0.01, 0);

// /// JUGADORES
const player1 = new players(0, 5, 0, 1, "red");
scene.add(player1.getMesh());

const player2 = new players(0, 7, 0, 1, "blue");
scene.add(player2.getMesh());

// //// PLATAFORMAS
const Plataform = new platform(scene);
const Plataform2 = new platform(scene);
Plataform.setPosition(0, 5, 10);
Plataform.setGeometry(1, 4, 1);
Plataform2.setPosition(0, -1, 0);

var platforms = [Plataform2, Plataform];

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
    scene.fog = new THREE.Fog(0x000000, 500, 10000);

    // camera
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.5, 10);
    camera.position.set(10, 2, 0);
    camera.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

    scene.add(camera);

    // lights
    var light,
        materials;
    scene.add(new THREE.AmbientLight(0x666666));

    light = new THREE.DirectionalLight(0xffffff, 1.75);
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
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(scene.fog.color);
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);


}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    // controls.handleResize();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function updatePhysics(platforms) {


    player1.gravity(platforms, gravity);
    player2.gravity(platforms, gravity);


    // Mover el objeto según su velocidad


}


function animate() {
    TWEEN.update(); // Log de la posición actual del objeto
    updatePhysics(platforms);
    player1.input(camera, Key.SPACE, Key.A, Key.D);
    player2.input(camera, Key.UP, Key.LEFT, Key.RIGHT);
    // console.log(player1.getPosition());

    // Renderizado de la escena
    renderer.render(scene, camera);

    // Llamada a la función para el siguiente frame de animación
    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.render(scene, camera);
}
