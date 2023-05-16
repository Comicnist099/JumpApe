

var scene;
var camera;
var renderer;

var controls;
var objects = [];
var clock;
var deltaTime;
var keys = {};
var players = [];

// para modelos con animacion
var mixers = [];
var mixers2 = [];

var personaje;


$(document).ready(function () {
	setupScene();

	loadOBJWithMTL('assets/', 'box.obj', 'box.mtl', (miObjFinal) => {
		miObjFinal.position.set(-10.0, 0.0, -10.0);
		miObjFinal.scale.set(0.5, 0.5, 0.5);
		miObjFinal.rotation.y = THREE.Math.degToRad(90);
		//scene.add(miObjFinal);
	});

	loadOBJWithMTL('assets/', 'jetski.obj', 'jetski.mtl', (miObjFinal) => {
		miObjFinal.position.set(10.0, 0.0, -10.0);
		miObjFinal.rotation.x = THREE.Math.degToRad(-90);

		//scene.add(miObjFinal);
	});

	loadOBJWithMTL('assets/', 'maze.obj', 'maze.mtl', (miObjFinal) => {
		miObjFinal.position.set(0.0, 0.0, 0.0);
		//miObjFinal.rotation.x = THREE.Math.degToRad(-90);
		scene.add(miObjFinal);
	});

	loadOBJWithMTL('assets/', 'egg.obj', '', (miObjFinal) => {
		miObjFinal.position.set(1.0, 0.0, -3);
		//miObjFinal.rotation.x = THREE.Math.degToRad(-90);

		scene.add(miObjFinal);
	});

	document.addEventListener('keydown', onKeyDown);
	document.addEventListener('keyup', onKeyUp);

	var loader = new THREE.FBXLoader();
	loader.load('assets/gallina2.fbx', function (personaje) {

		//scene.add(personaje);

		personaje.mixer = new THREE.AnimationMixer(personaje);

		mixers.push(personaje.mixer);

		var action = personaje.mixer.clipAction(personaje.animations[0]);
		action.play();
		action.setLoop(THREE.LoopOnce);

		personaje.position.z = 10;
		personaje.position.x = 4;
		personaje.position.y = -1;

		personaje.scale.set(0.005, 0.005, 0.005);

		scene.add(personaje);
		/*persona.add(personaje);
		persona.add(camera);
		scene.add(persona);*/
		


	})

	var loader2 = new THREE.FBXLoader();
	loader2.load('assets/lobo.fbx', function (personaje) {

		//scene.add(personaje);

		personaje.mixer = new THREE.AnimationMixer(personaje);

		mixers2.push(personaje.mixer);

		var action = personaje.mixer.clipAction(personaje.animations[0]);
		action.play();
		action.setLoop(THREE.LoopOnce);

		personaje.position.z = 10;
		personaje.position.x = 1;
		personaje.position.y = -1;

		personaje.scale.set(2.5, 2.5, 2.5);

		scene.add(personaje);
		/*persona.add(personaje);
		persona.add(camera);
		scene.add(persona);*/
		


	})





	render();
});

function loadOBJWithMTL(path, objFile, mtlFile, onLoadCallback) {
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setPath(path);
	mtlLoader.load(mtlFile, (misMateriales) => {
		//Aquí nos va a avisar cuando se termine la carga de materiales
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(misMateriales);
		objLoader.setPath(path);
		objLoader.load(objFile, (miObj) => {
			//Aquí nos avisa cuando el OBJ este cargando
			//miObj.position.x = 10;
			onLoadCallback(miObj);
		});
	});
}

function onKeyDown(event) {
	keys[String.fromCharCode(event.keyCode)] = true;
}
function onKeyUp(event) {
	keys[String.fromCharCode(event.keyCode)] = false;
}

function render() {
	requestAnimationFrame(render);
	deltaTime = clock.getDelta();

	for (var i = 0; i < players.length; i++) {
		players[i].yaw = 0;
		players[i].forward = 0;
	}

	if (keys["A"]) {
		players[0].yaw = -5;
	} else if (keys["D"]) {
		players[0].yaw = 5;
	}
	if (keys["W"]) {
		players[0].forward = -5;
	} else if (keys["S"]) {
		players[0].forward = 5;
	}

	//Player 2
	if (keys["J"]) {
		players[1].yaw = -5;
	} else if (keys["L"]) {
		players[1].yaw = 5;
	}
	if (keys["I"]) {
		players[1].forward = -5;
	} else if (keys["K"]) {
		players[1].forward = 5;
	}

	//animacion pollo
	if(mixers.lengh > 0){
		for (var i = 0; i <mixers.length; i++){
			mixers[i].update(deltaTime);
		}
	}

	// 1 Vemos la rotacion de la camara y movimiento
	//cameras[0].rotation.y += yaw * deltaTime;
	//cameras[0].translateZ(forward * deltaTime);

	camera.position.set(0.0, 25.0, 5.0);
	camera.rotation.x = THREE.Math.degToRad(-75);

	for (var i = 0; i < players.length; i++) {
		//players[i].rotation.y += players[i].yaw * deltaTime;
		players[i].translateZ(players[i].forward * deltaTime);
		players[i].translateX(players[i].yaw * deltaTime);
	}
	renderer.render(scene, camera);
}

var visibleSize = { width: window.innerWidth, height: window.innerHeight };

function setupScene() {
	clock = new THREE.Clock();
	scene = new THREE.Scene();

	const divWidth = document.getElementById("scene-section").offsetWidth;
	const divHeight = document.getElementById("scene-section").offsetHeight;

	var visibleSize = { width: divWidth, height: divHeight };
	camera = new THREE.PerspectiveCamera(75, visibleSize.width / visibleSize.height, 0.1, 100);
	camera.position.z = 2;
	camera.position.y = 2;

	renderer = new THREE.WebGLRenderer({ precision: "mediump" });
	renderer.setClearColor(new THREE.Color(0.5, 0.5, 0.2));
	renderer.setPixelRatio(visibleSize.width / visibleSize.height);
	renderer.setSize(visibleSize.width, visibleSize.height);

	var ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 1.0);
	scene.add(ambientLight);

	var directionalLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 0), 0.4);
	directionalLight.position.set(0, 0, 1);
	scene.add(directionalLight);

	var grid = new THREE.GridHelper(50, 10, 0xffffff, 0xffffff);
	grid.position.y = -1;
	scene.add(grid);

	var material = new THREE.MeshLambertMaterial({ color: new THREE.Color(1.0, 0.0, 0.0) });
	var geometry = new THREE.BoxGeometry(1, 1, 1);


	var player1 = new THREE.Mesh(geometry, material)
	player1.position.x = -1;

	var player2 = player1.clone();
	player2.material = new THREE.MeshLambertMaterial({ color: new THREE.Color(0.0, 1.0, 0.0) });
	player2.position.x = 1;

	scene.add(player1);
	scene.add(player2);

	players.push(player1);
	players.push(player2);

	player1.yaw = 0;
	player1.forward = 0;

	player2.yaw = 0;
	player2.forward = 0;

	// 2 Vemos como hacer una camara en 3era persona
	//camera.position.y = 1;
	//cube.add(camera);

	$("#scene-section").append(renderer.domElement);
}