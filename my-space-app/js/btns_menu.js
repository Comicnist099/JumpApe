document.querySelector('.puntuaciones').style.display = "none";


document.getElementById('button1').addEventListener("click", function () {
	document.querySelector('.escenarios').style.display = "block";
}); //boton jugar

document.getElementById('button1Esc').addEventListener("click", function () {
	document.querySelector('.opciones').style.display = "flex";
	document.querySelector('.escenarios').style.display = "none";
}); //boton jungla

document.getElementById('button2Esc').addEventListener("click", function () {
	document.querySelector('.opciones').style.display = "flex";
	document.querySelector('.escenarios').style.display = "none";
}); //boton espacio

document.getElementById('button3Esc').addEventListener("click", function () {
	document.querySelector('.opciones').style.display = "flex";
	document.querySelector('.escenarios').style.display = "none";
}); //boton construccion

document.getElementById('btn_regresar').addEventListener("click", function () {
	document.querySelector('.opciones').style.display = "none";
	document.querySelector('.escenarios').style.display = "block";
}); //boton regresar

document.getElementById('btn_regresar_puntuacion').addEventListener("click", function () {
	document.querySelector('.puntuaciones').style.display = "none";
	document.querySelector('.escenarios').style.display = "none";
}); //boton regresar puntuaciones

document.querySelector('.close').addEventListener("click", function () {
	document.querySelector('.opciones').style.display = "none";
});

document.getElementById('button2').addEventListener("click", function () {
	document.querySelector('.puntuaciones').style.display = "flex";
});

document.getElementById('close2').addEventListener("click", function () {
	document.querySelector('.opciones').style.display = "none";
});


document.getElementById('button3').addEventListener("click", function () {
	document.querySelector('.Ajustes').style.display = "flex";
	document.querySelector('.opciones').style.display = "none";
	document.querySelector('.escenarios').style.display = "none";
});

document.getElementById('prueba').addEventListener("click", function () {
	document.querySelector('.Ajustes').style.display = "none";
	document.querySelector('.opciones').style.display = "none";
	document.querySelector('.escenarios').style.display = "none";
}); //boton regresar

document.getElementById('close3').addEventListener("click", function () {
	document.querySelector('.escenarios').style.display = "none";
});

document.getElementById('button5').addEventListener("click", function () {
	document.querySelector('.Ajustes').style.display = "none";
	document.querySelector('.opciones').style.display = "none";
	document.querySelector('.escenarios').style.display = "none";
	document.querySelector('.creditos').style.display = "flex";
}); //boton creditos

document.getElementById('button6').addEventListener("click", function () {
	document.querySelector('.Ajustes').style.display = "none";
	document.querySelector('.opciones').style.display = "none";
	document.querySelector('.escenarios').style.display = "none";
	document.querySelector('.creditos').style.display = "none";
}); //boton creditos


var players = 0;
var escenario = 0;
var dificultad = 1;
var modo = 1;
//slider_musica

function manejarPlayer(btn) {
	if (btn.id === "button1Player") {
		players = 1;
	} else if (btn.id === "button2Player") {
		players = 2;
	}
}

function manejarEsc(btn) {
	if (btn.id === "button1Esc") {
		escenario = 1;
	} else if (btn.id === "button2Esc") {
		escenario = 2;
	} else if (btn.id === "button3Esc") {
		escenario = 3;
	}
}

function manejarDificultad(btn) {
	if (btn.id === "Dificultad1") {
		dificultad = 1;
	} else if (btn.id === "Dificultad2") {
		dificultad = 2;
	}
}

function manejarModo(btn) {
	if (btn.id === "Modo1") {
		modo = 1;
	} else if (btn.id === "Modo2") {
		modo = 2;
	}
}



document.getElementById("Modo1").onclick = function () {
	manejarModo(this);
};

document.getElementById("Modo2").onclick = function () {
	manejarModo(this);
};

document.getElementById("Dificultad1").onclick = function () {
	manejarDificultad(this);
};

document.getElementById("Dificultad2").onclick = function () {
	manejarDificultad(this);
};

document.getElementById("button1Player").onclick = function () {
	manejarPlayer(this);

	var url = "game.html?players=" + players + "&escenario=" + escenario + "&dificultad=" + dificultad + "&modo=" + modo;

	window.location.href = url;
}

document.getElementById("button2Player").onclick = function () {
	manejarPlayer(this);

	var url = "game.html?players=" + players + "&escenario=" + escenario + "&dificultad=" + dificultad + "&modo=" + modo;

	window.location.href = url;
}




document.getElementById("button1Esc").onclick = function () {
	manejarEsc(this);
};

document.getElementById("button2Esc").onclick = function () {
	manejarEsc(this);
};

document.getElementById("button3Esc").onclick = function () {
	manejarEsc(this);
};