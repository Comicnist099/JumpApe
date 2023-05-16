document.addEventListener('keydown', function(event) {
	if (event.key === "Escape") {
		document.querySelector('.opciones').style.display = "block";
	}
});

document.getElementById('BtnSeguir').addEventListener("click", function() {
	document.querySelector('.opciones').style.display = "none";
});