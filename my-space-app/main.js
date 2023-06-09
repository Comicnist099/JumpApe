import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {
    platform
} from './classes/platform.js';
import {
    players
} from './classes/players.js';
import {
    wall
} from './classes/wall.js';
import {
    fruit
} from './classes/fruit.js';
import {
    meta
} from './classes/meta.js';
import {
    enemy
} from './classes/enemy.js';
import {
    groupColision
} from './classes/groupColision.js';

import {
    FBXLoader
} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';

import {
    database
} from "./bd/firebase.js";
import {
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

var WinHud = document.querySelectorAll(".WinHud");
var consolehtml = document.getElementById("console");
var PlayerLife = document.getElementById("PlayerLife");
var PlayerLife2 = document.getElementById("PlayerLife2");
var PlayerPhoto = document.getElementById("PlayerPhoto");
var PlayerPhoto2 = document.getElementById("PlayerPhoto2");
var PauseHud = document.querySelectorAll(".PauseHud");
var playerWin = document.getElementById("playerWin");
var playerPoints = document.getElementById("playerPoints");
var finish = false;



function guardarDatos(nombre, puntos) {
    const puntuacionesRef = ref(database, "puntuaciones");
    const nuevaPuntuacionRef = push(puntuacionesRef);

    // Utilizar el método set que devuelve una promesa
    set(nuevaPuntuacionRef, {
            nombre: nombre,
            puntos: puntos
        })
        .then(() => {
            // Operación de guardado completada, redirigir al usuario
            var url = "index.html";
            window.location.href = url;
        })
        .catch((error) => {
            // Manejar cualquier error que pueda ocurrir durante el guardado
            console.error("Error al guardar los datos:", error);
        });
}

const botonGuardar = document.getElementById("btn_salir");

// Agregar un event listener al botón
botonGuardar.addEventListener("click", function () {
    // Llamar a la función guardarPuntuacion con los datos adecuados
    let namePlayer = document.getElementById("namePlayer");
    let NamePlayer = namePlayer.value;
    let PointPlayer = playerPoints.textContent;
    console.log(NamePlayer + " " + PointPlayer);

    guardarDatos(NamePlayer, PointPlayer);


});



const groupColisions = new groupColision();

/*
FRUTAS: B=BANANA,C=COCO,M=MANGO
WALLS:  D=WALLDOWN S=WALLSIDE U=WALLUP
PLATFORM: P=PLATFORM
*/
// Obtener la cadena de búsqueda de la URL
const queryString = window.location.search;
// Crear un objeto URLSearchParams a partir de la cadena de búsqueda
const urlParams = new URLSearchParams(queryString);
// Obtener el valor del parámetro 'variable1'
const playersUrl = urlParams.get('players');
const escenarioUrl = urlParams.get('escenario');
const dificultadUrl = urlParams.get('dificultad');
const modoUrl = urlParams.get('modo');

var mapTile = [];
let mapElement = [];

if (dificultadUrl == 1) {
    switch (escenarioUrl) {
        case '1':
            mapTile = [
                ".UUUUUUUUUUUUUUUUUUUUUUUU",
                "S.......DDD.............S",
                "SDDDDDD.SSS............ S",
                "SSSSSSS.SSS.....PPP...P.S",
                "SUSSSSU.SSS........W....S",
                "SSSUSU..USS.PP.......PPPS",
                "SSS.U.PP.SS.............S",
                "SUS......SSS....PP......S",
                "S.UW.W...UUU............S",
                "S......W....DPP.WPP..P..S",
                "SPWPPPP..W..SP..........S",
                "S.......W...SPWWW.....P.S",
                "S.W..W......S.P.........S",
                "S..W....W.S.S....WWWWWW.S",
                "S.....W...SDS.P.........S",
                "S..W...W..SSSPPP.P..WWWd.S",
                "SP........SSS...........S",
                "S...W..WPPUSS......P....S",
                "SP.P..W....UUPPPP.......S",
                "S.......................S",
                ".DDDDDDDDDDDDDDDDDDDDDDDDDD"

            ];

            mapElement = [
                ".UUUUUUUUUUUUUUUUUUUUUUUU",
                "SE..B...DDD.......G.....S",
                "SDDDDDD.SSS.............S",
                "SSSSSSS.SSS.....PPP...P.S",
                "SUSSSSU.SSS........W....S",
                "SSSUSU..USS.PP...B...PPPS",
                "SSS.U.PPCSS....C........S",
                "SUS......SSS....PP......S",
                "S.UW.W...UUU.......B....S",
                "S...B..W....DPP.WPP..P..S",
                "SPWPPPP..W..SP....C.....S",
                "S...C...W...SPWWW.....P.S",
                "S.W..W..M...S.P.........S",
                "S..W....W.S.S....WWWWWW.S",
                "S.....W...SDS.P.........S",
                "S..W...W..SSSPPP.P..WWWd.S",
                "SP....C...SSS...C.......S",
                "S...W..WPPUSS......P....S",
                "SP.P..W....UUPPPP...B...S",
                "S..........B............S",
                ".DDDDDDDDDDDDDDDDDDDDDDDDDD"


            ];


            if (modoUrl == 2) {
                for (var i = 0; i < mapElement.length; i++) {
                    mapElement[i] = mapElement[i].replace(/[CME]/g, 'B');
                }

            }



            break;
        case '2':
            mapTile = [
                ".UUUUUUUUUUUUUUUUUUUUUUUU",
                "S.......................S",
                "SWWW...DWWW....DWWWWWWW S",
                "S....PPS....PPPS........S",
                "S..W...U.......UPPP.....S",
                "S.......PPP..PP.....D...S",
                "SWWDWW..............S..WS",
                "S..S......PPPPPP...S....S",
                "S..S...W...PPP......S..PS",
                "SW.U...W....W....UWWW...S",
                "S.......PP.......PP.... S",
                "S..PDPPP...WWWWW...W...PS",
                "S...S...............WWWWS",
                "SW..U.W..D....W..PP....S",
                "S.........S............WS",
                "S...WW....U.WDW...W.....S",
                "S............S......W...S",
                "S..WW...W....S......W...S",
                "S..........WWU.....PP.. S",
                "S......WW.......PPPP..WWS",
                "SWWWW.....PPPP..........S",
                "S.................P...W.S",
                "S.....WWW......P....... S",
                "S..........PP..W..P.....S",
                "S.PPPP...WW.........PPP..S",
                "S............W..PPP......S",
                "SWWWWWWWWWWWD.......PPP. S",
                "S...........U.P.WWWWWWWWS",
                "S...........U..P........S",
                ".DDDDDDDDDDDDDDDDDDDDDDDDDD"

            ];
            mapElement = [
                ".UUUUUUUUUUUUUUUUUUUUUUUU",
                "S....B......E...C....B..S",
                "SWWW...DWWW....DWWWWWWW S",
                "S....PPS.B..PPPS..E..C..S",
                "S..W...U.......UPPP...C.S",
                "S.......PPP..PP.M...D...S",
                "SWWDWW..B....C...C..S..WS",
                "S..S...C..PPPPPP...S..B.S",
                "S..S...W.B.PPP...C..S..PS",
                "SW.U.C.W....W..M.UWWW.B.S",
                "S.......PP.......PP.... S",
                "S..PDPPP...WWWWW...W...PS",
                "S...S....B..B.......WWWWS",
                "SW..U.W..D....W..PP....S",
                "S.........S.....M..B..WS",
                "S...WW..B.U.WDW...W.....S",
                "S.....C...C..S...B..W.B.S",
                "S..WW...W....S..B...W...S",
                "S..........WWU.....PP.B S",
                "S..C...WW.......PPPP..WWS",
                "SWWWW.....PPPP.B........S",
                "S.........BB..E...P...W.S",
                "S..C..WWW......P....... S",
                "S..........PP..W..P.....S",
                "S.PPPP.C.WW.........PPP..S",
                "S............W..PPP......S",
                "SWWWWWWWWWWWD.......PPP. S",
                "S...........U.P.WWWWWWWWS",
                "S...........U..P....G...S",
                ".DDDDDDDDDDDDDDDDDDDDDDDDDD"

            ];
            if (modoUrl == 2) {

                for (var i = 0; i < mapElement.length; i++) {
                    mapElement[i] = mapElement[i].replace(/[CME]/g, 'B');
                }

            }
            break;
        case '3':
            mapTile = [
                ".UUUUUUUUUUUUUUUUUUUUUUUU",
                "S..........W..W.........S",
                "S...PPPPP...PP...PPW....S",
                "SW...PP...P.....D....W.WS",
                "S...P..W..PPPP..S......S",
                "SW...........W..S....PP.S",
                "S....W.W..W...P.W..W....S",
                "S.......P..P...P.P......S",
                "S...D..W....W..P...WWPPP.S",
                "SW..S....PPP.....P.....WS",
                "S...S.....P....W.PP.....S",
                "S...S.W.....P.........W.S",
                "S...U.....P..W.P..W..W.DS",
                "S.......W..W...W.P.....SS",
                "SWWWWWWW....PP.....W...US",
                "S.......................S",
                ".DDDDDDDDDDDDDDDDDDDDDDD."

            ];

            mapElement = [
                ".UUUUUUUUUUUUUUUUUUUUUUUU",
                "S.C......B.W..W.B.......S",
                "S...PPPPP...PP...PPW.C..S",
                "SW...PP...P.....D....W.WS",
                "S...P..W..PPPP..S..C...S",
                "SW....E...B..W..S....PP.S",
                "S.C..W.W..WE..P.W..W.B..S",
                "S.......P..P.C.P.P......S",
                "S...D..W..C.W..PB..WWPPP.S",
                "SW..S....PPP.C...P..B..WS",
                "S...S...M.P....W.PP.....S",
                "S.C.S.W.C...P...B.....W.S",
                "S...U.....P..W.P..W..W.DS",
                "S.......W..W...W.P.B...SS",
                "SWWWWWWW....PP..C..W...US",
                "S......M....C......B...GS",
                ".DDDDDDDDDDDDDDDDDDDDDDD."

            ];


            if (modoUrl == 2) {
                for (var i = 0; i < mapElement.length; i++) {
                    mapElement[i] = mapElement[i].replace(/[CME]/g, 'B');
                }

            }



            break;
    }
} else if (dificultadUrl == 2) {
    switch (escenarioUrl) {
        case '1':
            mapTile = [
                ".UUUUUUUUUUUUUUUUUUUUUUUU",
                "S.......DDD.............S",
                "SDDDDDD.SSS............ S",
                "SSSSSSS.SSS.....PPP...P.S",
                "SUSSSSU.SSS........W....S",
                "SSSUSU..USS.PP.......PPPS",
                "SSS.U.PP.SS.............S",
                "SUS......SSS....PP......S",
                "S.UW.W...UUU............S",
                "S......W....DPP.WPP..P..S",
                "SPWPPPP..W..SP..........S",
                "S.......W...SPWWW.....P.S",
                "S.W..W......S.P.........S",
                "S..W....W.S.S....WWWWWW.S",
                "S.....W...SDS.P.........S",
                "S..W...W..SSSPPP.P..WWWd.S",
                "SP........SSS...........S",
                "S...W..WPPUSS......P....S",
                "SP.P..W....UUPPPP.......S",
                "S.......................S",
                ".DDDDDDDDDDDDDDDDDDDDDDDDDD"

            ];

            mapElement = [
                ".UUUUUUUUUUUUUUUUUUUUUUUU",
                "SE..B...DDD.......G.....S",
                "SDDDDDD.SSS.............S",
                "SSSSSSS.SSS.....PPP...P.S",
                "SUSSSSU.SSS........W....S",
                "SSSUSU..USS.PP...B...PPPS",
                "SSS.U.PPCSS....C....E...S",
                "SUS......SSS....PP...E..S",
                "S.UW.W...UUU.......B....S",
                "S...B..W....DPP.WPP..P..S",
                "SPWPPPP..W..SP....C.....S",
                "S...C...W...SPWWW...E.P.S",
                "S.W..W..M...S.P.........S",
                "S..W....W.S.S....WWWWWW.S",
                "S.....W...SDS.P....E....S",
                "S..W...W..SSSPPP.P..WWWd.S",
                "SP....C...SSS...C.......S",
                "S...W..WPPUSS....E.P....S",
                "SP.P..W....UUPPPP...B...S",
                "S....E.....B.....E......S",
                ".DDDDDDDDDDDDDDDDDDDDDDDDDD"


            ];

            if (modoUrl == 2) {
                for (var i = 0; i < mapElement.length; i++) {
                    mapElement[i] = mapElement[i].replace(/[CM]/g, 'B');
                }
            }


            break;
        case '2':
            mapTile = [
                ".UUUUUUUUUUUUUUUUUUUUUUUU",
                "S.......................S",
                "SWWW...DWWW....DWWWWWWW S",
                "S....PPS....PPPS........S",
                "S..W...U.......UPPP.....S",
                "S.......PPP..PP.....D...S",
                "SWWDWW..............S..WS",
                "S..S......PPPPPP...S....S",
                "S..S...W...PPP......S..PS",
                "SW.U...W....W....UWWW...S",
                "S.......PP.......PP.... S",
                "S..PDPPP...WWWWW...W...PS",
                "S...S...............WWWWS",
                "SW..U.W..D....W..PP....S",
                "S.........S............WS",
                "S...WW....U.WDW...W.....S",
                "S............S......W...S",
                "S..WW...W....S......W...S",
                "S..........WWU.....PP.. S",
                "S......WW.......PPPP..WWS",
                "SWWWW.....PPPP..........S",
                "S.................P...W.S",
                "S.....WWW......P....... S",
                "S..........PP..W..P.....S",
                "S.PPPP...WW.........PPP..S",
                "S............W..PPP......S",
                "SWWWWWWWWWWWD.......PPP. S",
                "S...........U.P.WWWWWWWWS",
                "S...........U..P........S",
                ".DDDDDDDDDDDDDDDDDDDDDDDDDD"

            ];
            mapElement = [
                ".UUUUUUUUUUUUUUUUUUUUUUUU",
                "S....B......E...C....B..S",
                "SWWW...DWWW....DWWWWWWW S",
                "S....PPS.B..PPPS..E..C..S",
                "S..W...U.......UPPP...C.S",
                "S....E..PPP..PP.M...D...S",
                "SWWDWW..B....C...C..S..WS",
                "S..S...C..PPPPPP...S..B.S",
                "S..S...W.B.PPP...C..S..PS",
                "SW.U.C.W....W..M.UWWW.B.S",
                "S...E...PP.......PP.... S",
                "S..PDPPP...WWWWW...W...PS",
                "S...S..E.B..B.......WWWWS",
                "SW..U.W..D....W..PP....S",
                "S.........S.....M..B..WS",
                "S...WW..B.U.WDW...W.....S",
                "S.....C.E.C..S...B..W.B.S",
                "S..WW...W....S..B...W...S",
                "S..........WWU.....PP.B S",
                "S..C...WW.......PPPP..WWS",
                "SWWWW...E.PPPP.B........S",
                "S.........BB..E...P...W.S",
                "S..C..WWW......P....... S",
                "S..........PP..W..P.....S",
                "S.PPPP.C.WW.........PPP..S",
                "S....E.......W..PPP......S",
                "SWWWWWWWWWWWD.......PPP. S",
                "S...........U.P.WWWWWWWWS",
                "S...........U..P....G...S",
                ".DDDDDDDDDDDDDDDDDDDDDDDDDD"

            ];
            if (modoUrl == 2) {

                for (var i = 0; i < mapElement.length; i++) {
                    mapElement[i] = mapElement[i].replace(/[CM]/g, 'B');
                }

            }
            break;
        case '3':
            mapTile = [
                ".UUUUUUUUUUUUUUUUUUUUUUUU",
                "S..........W..W.........S",
                "S...PPPPP...PP...PPW....S",
                "SW...PP...P.....D....W.WS",
                "S...P..W..PPPP..S......S",
                "SW...........W..S....PP.S",
                "S....W.W..W...P.W..W....S",
                "S.......P..P...P.P......S",
                "S...D..W....W..P...WWPPP.S",
                "SW..S....PPP.....P.....WS",
                "S...S.....P....W.PP.....S",
                "S...S.W.....P.........W.S",
                "S...U.....P..W.P..W..W.DS",
                "S.......W..W...W.P.....SS",
                "SWWWWWWW....PP.....W...US",
                "S.......................S",
                ".DDDDDDDDDDDDDDDDDDDDDDD."

            ];

            mapElement = [
                ".UUUUUUUUUUUUUUUUUUUUUUUU",
                "S.C......B.W..W.B..E....S",
                "S...PPPPP...PP...PPW.C..S",
                "SW...PP...P.....D.E..W.WS",
                "S...P..W..PPPP..S..C...S",
                "SW....E...B..W..S....PP.S",
                "S.C..W.W..WE..P.W..W.B..S",
                "S.......P..P.C.P.P......S",
                "S...D..W..C.W..PB..WWPPP.S",
                "SW..S....PPP.C...P..B..WS",
                "S...S...M.P.E..W.PP.....S",
                "S.C.S.W.C...P...B...E.W.S",
                "S...U.....P..W.P..W..W.DS",
                "S.......W..W...W.P.B...SS",
                "SWWWWWWW....PP..C..W...US",
                "S......M....C......B...GS",
                ".DDDDDDDDDDDDDDDDDDDDDDD."

            ];


            if (modoUrl == 2) {
                for (var i = 0; i < mapElement.length; i++) {
                    mapElement[i] = mapElement[i].replace(/[CM]/g, 'B');
                }

            }



            break;
    }
}



var groupplayers = []
// VENTANA
var container,
    camera,
    camera2,
    scene,
    renderer,
    renderer2;
if (!Detector.webgl)
    Detector.addGetWebGLMessage();

var deltatime;

// GRAVEDAD
var gravity = new THREE.Vector3(0, -0.01, 0);
// JUGADORES
var player1,
    player2;
var paused = false;
// CARGADO DE MODELOS
var loader = new FBXLoader();
// MODELOS
var MonkeyFBX;
var cargadoModel = false;
// MIX ANIMACIONES
var mixer;
var mixer2;
// MODELBUFFER
var PlataformMap,
    wallMap,
    wallSideMap,
    PowerMap;
// ARREGLOS DE OBJETOS
var posicion = new THREE.Vector3(0, -10, +20);
var posicion2 = new THREE.Vector3(0, -10, +20);
var platforms = [],
    walls = [],
    wallsSide = [],
    wallsUp = [],
    wallsDown = [],
    Enemys = [],
    powers = [],
    goal = [];


// CARGADO DE MODELOS
var PlatfomsScena = false;

// MODELS PATH
const ModelBlock = './assets/models/Platforms/Block.fbx';
const ModelWood = './assets/models/Platforms/Wood.fbx';
const ModelMetal = './assets/models/Platforms/Metal.fbx';
const ModelCloud = './assets/models/Platforms/Cloud.fbx';
const ModelSpike = './assets/models/Platforms/Spikes.fbx';
const ModelCoco = './assets/models/Props/fruits/Coco/Coco.fbx';
const ModelBanana = './assets/models/Props/fruits/Banana/Banana.fbx';
const ModelMango = './assets/models/Props/fruits/Mango/Mango.fbx';
const ModelGoal = './assets/models/Goal/goalflag.fbx';
const ModelMoai = './assets/models/Enemy/Moai.fbx';

//SOUND
const platanoSound = './assets/music/platano.wav';
const mangoSound = './assets/music/mango.wav';
const cocoSound = './assets/music/coco.wav';



init();
const listener = new THREE.AudioListener();

const sound = new THREE.Audio(listener);

const audioLoader = new THREE.AudioLoader();
audioLoader.load('./assets/music/jungle.wav', function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
});
camera.add(listener);

// Función que se ejecuta cuando cambia el valor del slider
/* function handleSliderChange(event) {
    var value = event.target.value;
    var volume = value / 100; // Convertir el valor del slider a un rango de volumen adecuado
    sound.setVolume(volume);
} */

if (playersUrl == 2) {
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

        player2 = new players(0, 10, 0, scene, MonkeyFBX, animations);
        groupplayers.push(player2);
        scene.add(player2.getMesh());


    }, undefined, (error) => {
        console.error('Error al cargar el modelo FBX:', error);
    });
}

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

    player1 = new players(0, 10, 0, scene, MonkeyFBX, animations)
    groupplayers.push(player1);
    scene.add(player1.getMesh());
    cargadoModel = true;


}, undefined, (error) => {
    console.error('Error al cargar el modelo FBX:', error);
});



for (let i = 0; i < mapElement.length; i++) {
    posicion2.y = posicion2.y + 10;
    let posZ = posicion2.z;
    for (let y = 0; y < mapElement[i].length; y++) {
        switch (mapElement[i][y]) {
            // FRUTA BANANA
            case "B":
                CargadoModelo(ModelBanana, "B", .010, .010, .010, 0, posicion2.y, posicion2.z);
                break;
                // FRUTA MANGO
            case "M":
                CargadoModelo(ModelMango, "M", .0010, .0010, .0010, 0, posicion2.y, posicion2.z);
                break;
                // FRUTA COCO
            case "C":
                CargadoModelo(ModelCoco, "C", .010, .010, .010, 0, posicion2.y, posicion2.z);
                break;
            case "G":
                CargadoModelo(ModelGoal, "G", .010, .010, .010, 0, posicion2.y, posicion2.z);
                break;
            case "E":
                CargadoModelo(ModelMoai, "E", .030, .030, .030, 0, posicion2.y, posicion2.z);
                break;

            default:
                break;
        }
        posicion2.z = posicion2.z - 10;
    }
    posicion2.z = posZ;
}

for (let i = 0; i < mapTile.length; i++) {
    posicion.y = posicion.y + 10;
    let posZ = posicion.z;
    for (let y = 0; y < mapTile[i].length; y++) {
        switch (mapTile[i][y]) {
            case "x":

                break;
                // PLATFORM
            case "P":
                CargadoModelo(ModelCloud, "P", .015, .01, .04, 0, posicion.y - 1.3, posicion.z);

                break;
                // SIDE
            case "W":
                CargadoModelo(ModelWood, "W", .015, .14, .04, 0, posicion.y + 2, posicion.z);
                break;
            case "U":
                CargadoModelo(ModelWood, "U", .015, .14, .04, 0, posicion.y + 2, posicion.z);
                break;
            case "D":
                CargadoModelo(ModelWood, "D", .015, .14, .04, 0, posicion.y + 2, posicion.z);
                break;
                // /WALLSIDE
            case "S":
                CargadoModelo(ModelWood, "S", .015, .14, .04, 0, posicion.y + 2, posicion.z);
                break;


            default:
                break;
        }
        posicion.z = posicion.z - 10;
    }
    posicion.z = posZ;
}
// B=FRUITS, P=PLATFORMS W=WALL
var textureLoader = new THREE.TextureLoader();
const junglaFondo = './assets/img/chango.png';
const spaceFondo = './assets/img/space.png'
const builtFondo = './assets/img/construccion.png'
// Carga la imagen del fondo

function fondo(path) {
    textureLoader.load(path, function (texture) { // Configura la propiedad background de la escena con la textura cargada
        scene.background = texture;
    });
}

switch (escenarioUrl) {
    case '1':
        fondo(junglaFondo);
        break;
    case '2':
        fondo(spaceFondo);
        break;
    case '3':
        fondo(builtFondo);
        break;
}

animate();

function CargadoModelo(path, type, Sx, Sy, Sz, Px, Py, Pz) {
    loader.load(path, (fbx) => {
        var model = fbx;

        model.traverse(child => {
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
        const geometry = model.children[0].geometry;
        model.scale.set(Sx, Sy, Sz);
        if (type == "P") { // PLATAFORMAS
            PlataformMap = new platform(scene, model, geometry, Px, Py, Pz);
            platforms.push(PlataformMap);

        } else if (type == "W") { // ///WALLS
            wallMap = new wall(scene, model, geometry, Px, Py, Pz);
            walls.push(wallMap);

        } else if (type == "B") { // ///Banana
            PowerMap = new fruit(scene, model, geometry, Px, Py, Pz, platanoSound, 'banana');
            powers.push(PowerMap);

        } else if (type == "C") { // ///Coco
            PowerMap = new fruit(scene, model, geometry, Px, Py, Pz, cocoSound, 'coco');
            powers.push(PowerMap);

        } else if (type == "G") { // ///Coco
            PowerMap = new meta(scene, model, geometry, Px, Py, Pz);
            goal.push(PowerMap);

        } else if (type == "M") { // ///Mango
            PowerMap = new fruit(scene, model, geometry, Px, Py, Pz, mangoSound, 'mango');
            powers.push(PowerMap);

        } else if (type == "S") { // ///WALL SIDE
            wallSideMap = new wall(scene, model, geometry, Px, Py, Pz);
            wallsSide.push(wallSideMap);

        } else if (type == "U") { // //WALL UP
            wallSideMap = new wall(scene, model, geometry, Px, Py, Pz);
            wallsUp.push(wallSideMap);

        } else if (type == "D") { // //WALL DOWN
            wallSideMap = new wall(scene, model, geometry, Px, Py, Pz);
            wallsDown.push(wallSideMap);

        } else if (type == "E") { //ENEMY
            wallSideMap = new enemy(scene, model, geometry, Px, Py, Pz);
            Enemys.push(wallSideMap);
        }


        PlatfomsScena = true;
    }, undefined, (error) => {
        console.error('Error al cargar el modelo FBX:', error);
    });

}
var slider = document.getElementById("slider_musica");
slider.addEventListener("input", handleSliderChangeMusic);
var slider2 = document.getElementById("slider_SFX");
slider2.addEventListener("input", handleSliderChangeSFX);


function handleSliderChangeMusic(event) {
    let value = event.target.value;
    var volume = value / 100; // Convertir el valor del slider a un rango de volumen adecuado
    sound.setVolume(volume);
}

function handleSliderChangeSFX(event) {
    let value = event.target.value;
    var volume = value / 100;



    for (let y = 0; y < Enemys.length; y++) {
        Enemys[y].enemyAudio.volumen(value);
    }
    for (let y = 0; y < groupplayers.length; y++) {
        groupplayers[y].player1Audio.volumen(value);
    }
    for (let y = 0; y < powers.length; y++) {
        powers[y].fruitAudio.volumen(value);
    }
}

function init() {





    container = document.createElement('div');
    document.body.appendChild(container);

    // scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 500, 1000);


    // camera
    if (playersUrl == 2) {
        camera = new THREE.PerspectiveCamera(120, window.innerWidth / 2 / window.innerHeight, 0.1, 1000);
        camera2 = new THREE.PerspectiveCamera(120, window.innerWidth / 2 / window.innerHeight, 0.1, 1000);
    } else {
        camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera2 = new THREE.PerspectiveCamera(120, window.innerWidth / 2 / window.innerHeight, 0.1, 1000);

    }
    camera.position.set(10, 0, 0);
    camera.lookAt(0, 0, 0);
    camera2.position.set(10, 0, 0);
    camera2.lookAt(0, 0, 0);
    camera.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    camera2.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

    scene.add(camera);
    if (playersUrl == 2)
        scene.add(camera2);
    // lights
    var light;
    scene.add(new THREE.AmbientLight(0x666666));

    light = new THREE.DirectionalLight(0xffffff, 1);
    var d = 20;

    light.position.set(d, d, d);

    light.castShadow = true;
    // light.shadowCameraVisible = true;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    light.shadow.camera.left = -d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = -d;

    light.shadow.camera.far = 3 * d;
    light.shadow.camera.near = d;
    light.shadow.darkness = 0.5;
    if (playersUrl == 2) {
        scene.add(light);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth / 2.03, window.innerHeight);
        renderer.setViewport(0, 0, window.innerWidth / 2.03, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        renderer2 = new THREE.WebGLRenderer();
        renderer2.setSize(window.innerWidth / 2.03, window.innerHeight);
        renderer2.setViewport(0, 0, window.innerWidth / 2.03, window.innerHeight);
        document.body.appendChild(renderer2.domElement);
    } else {
        scene.add(light);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
    }
    /*   let el = document.createElement('div');
      el.innerHTML = "<h1>HOLA</h1>";
      let obj = new CSS3DObject(el);
      obj.position.set(0, 0, 0);
      scene.add(obj); */
}

function onWindowResize() {
    var aspect = window.innerWidth / window.innerHeight;

    if (playersUrl == 2) {
        var halfWidth = aspect / 2;
        camera.aspect = halfWidth;
        camera.updateProjectionMatrix();

        camera2.aspect = halfWidth;
        camera2.updateProjectionMatrix();

        renderer.setSize(window.innerWidth / 2.03, window.innerHeight);
        renderer.setViewport(0, 0, window.innerWidth / 2.03, window.innerHeight);

        renderer2.setSize(window.innerWidth / 2.03, window.innerHeight);
        renderer2.setViewport(0, 0, window.innerWidth / 2.03, window.innerHeight);
    } else {
        var halfWidth = aspect;
        var halfWidth = aspect;
        camera.aspect = halfWidth;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);

    }
}

window.addEventListener('resize', onWindowResize, false);


var BoolOne = false;

function animate() {







    if (Key.isPressed(Key.P)) {
        paused = !paused;
    }

    if (!paused) {
        TWEEN.update(); // Log de la posición actual del objeto

        for (var i = 0; i < PauseHud.length; i++) {
            PauseHud[i].style.display = "none";
        }
        if (cargadoModel) {

            if (!BoolOne) {
                if (dificultadUrl == 2) {
                    player1.life = 1;
                    if (playersUrl == 2)
                        player2.life = 1;
                } else {
                    player1.life = 3;
                    if (playersUrl == 2)
                        player2.life = 3;
                }
                BoolOne = true;
            }


            for (let y = 0; y < powers.length; y++) {
                powers[y].update();
                powers[y].colision(player1, powers);

            }

            for (let y = 0; y < goal.length; y++) {
                goal[y].update();
                goal[y].colision(player1, player2, playersUrl, goal);

            }


            if (playersUrl == 1) {
                if (player1.life <= 0) {
                    playerWin.innerHTML = "PLAYER 1"
                    playerPoints.innerHTML = player1.puntos;
                    finish = true;
                    for (var i = 0; i < WinHud.length; i++) {
                        WinHud[i].style.display = "flex";
                    }
                    paused = true;
                }
                for (let y = 0; y < Enemys.length; y++) {
                    Enemys[y].update();
                    Enemys[y].actualizarCubo(player1, player1);
                }


            } else if (playersUrl == 2) {

                if (player1.life <= 0) {
                    playerWin.innerHTML = "PLAYER 2"
                    playerPoints.innerHTML = player2.puntos;
                    finish = true;
                    for (var i = 0; i < WinHud.length; i++) {
                        WinHud[i].style.display = "flex";
                    }
                    paused = true;
                } else if (player2.life <= 0) {
                    playerWin.innerHTML = "PLAYER 1"
                    playerPoints.innerHTML = player1.puntos;
                    finish = true;
                    for (var i = 0; i < WinHud.length; i++) {
                        WinHud[i].style.display = "flex";
                    }
                    paused = true;
                }
                for (let y = 0; y < powers.length; y++) {
                    powers[y].colision(player2, powers);
                }

                for (let y = 0; y < goal.length; y++) {
                    goal[y].update();
                    goal[y].colision(player2, player1, playersUrl, goal);

                }
                for (let y = 0; y < Enemys.length; y++) {
                    Enemys[y].update();

                    Enemys[y].actualizarCubo(player1, player2);
                }

            }





            groupColisions.colision(groupplayers, platforms);
            groupColisions.colisionWall(groupplayers, walls, true, true, true);
            groupColisions.colisionWall(groupplayers, wallsUp, true, false, true);
            groupColisions.colisionWall(groupplayers, wallsSide, false, false, true);
            groupColisions.colisionWall(groupplayers, wallsDown, false, true, true);







            if (PlatfomsScena) {
                player1.gravity(gravity);
                if (playersUrl == 2)
                    player2.gravity(gravity);

            }
            mixer.update(0.016);
            if (playersUrl == 2)
                mixer2.update(0.016);


            camera.position.copy(player1.getPosition());
            camera.position.add(new THREE.Vector3(10, 2, 0));
            camera.lookAt(player1.getPosition());
            player1.input(Key.SPACE, Key.A, Key.D);



            if (playersUrl == 2) {
                camera2.position.copy(player2.getPosition());
                camera2.position.add(new THREE.Vector3(10, 2, 0));
                camera2.lookAt(player2.getPosition());
                player2.input(Key.UP, Key.LEFT, Key.RIGHT);

            }

            if (playersUrl == 1) {
                consolehtml.innerHTML = "Posición del personaje:" + "<br>X:" + player1.getPositionX() + "  Y:" + player1.getPositionY() + "  Z:" + player1.getPositionZ() + "<br>Piso:" + player1.touchFloor + "<br>Wall:" + player1.touchWall + "<br>sidewall:" + player1.touchFloorWall + "<br>Life: " + player1.life + "<br>Deltatime: " + player1.deltatime;
                PlayerLife.innerHTML = "PLAYER 1" + "<br>Vidas: " + player1.life + "<br>Score: " + player1.puntos;
                PlayerPhoto.src = "./resources/chango_feliz.png"
                PlayerPhoto2.style.display = "none";
            } else if (playersUrl == 2) {
                //consolehtml.innerHTML = "Posición del personaje:" + "<br>X:" + player1.getPositionX() + "  Y:" + player1.getPositionY() + "  Z:" + player1.getPositionZ() + "<br>Piso:" + player1.touchFloor + "<br>Wall:" + player1.touchWall + "<br>sidewall:" + player1.touchFloorWall + "<br>Life: " + player1.life + "<br>Deltatime: " + player1.deltatime;
                PlayerLife.innerHTML = "PLAYER 1" + "<br>Vidas: " + player1.life + "<br>Score: " + player1.puntos;
                PlayerPhoto.src = "./resources/chango_feliz.png"
                PlayerLife2.innerHTML = "PLAYER 2" + "<br>Vidas: " + player2.life + "<br>Score: " + player2.puntos;
                PlayerPhoto2.src = "./resources/chango_feliz.png"
            }

        }
    } else {
        for (var i = 0; i < PauseHud.length; i++) {
            PauseHud[i].style.display = "flex";
        }
    }

    // Llamada a la función para el siguiente frame de animación
    requestAnimationFrame(animate);
    render();

}

function render() { // Actualizar la posición del objeto del HUD para que siga a la cámara

    renderer.render(scene, camera);
    if (playersUrl == 2)
        renderer2.render(scene, camera2);

}