document.getElementById('button1').addEventListener("click", function () {
	document.querySelector('.opciones').style.display = "block";
});

document.querySelector('.close').addEventListener("click", function () {
	document.querySelector('.opciones').style.display = "none";
});

document.getElementById('button2').addEventListener("click", function () {
	document.querySelector('.dificultad').style.display = "block";
});

document.querySelector('.close2').addEventListener("click", function () {
	document.querySelector('.dificultad').style.display = "none";
});


document.getElementById('button3').addEventListener("click", function () {
	document.querySelector('.escenarios').style.display = "block";
});

document.querySelector('.close3').addEventListener("click", function () {
	document.querySelector('.escenarios').style.display = "none";
});




var players = 0;
var escenario = 0;


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

document.getElementById("button1Player").onclick = function () {
	manejarPlayer(this);
	document.querySelector('.escenarios').style.display = "block";

};

document.getElementById("button2Player").onclick = function () {
	manejarPlayer(this);
	document.querySelector('.escenarios').style.display = "block";

	// Construye la URL con los valores como parámetros
	/*var url = "game.html?players=" + players;

	 window.location.href = url; */
};

document.getElementById("button1Esc").onclick = function () {
	manejarEsc(this);


	var url = "game.html?players=" + players + "&escenario=" + escenario;

	window.location.href = url;
};
document.getElementById("button2Esc").onclick = function () {
	manejarEsc(this);

	var url = "game.html?players=" + players + "&escenario=" + escenario;

	window.location.href = url;
};
document.getElementById("button3Esc").onclick = function () {
	manejarEsc(this);


	var url = "game.html?players=" + players + "&escenario=" + escenario;

	window.location.href = url;
};