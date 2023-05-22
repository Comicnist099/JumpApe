// Obtén una referencia a la tabla de puntuaciones en el HTML
import {
    database
} from "../bd/firebase.js";
import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const tablaPuntuaciones = document.getElementById("tablaPuntuaciones");

// Función para cargar las puntuaciones desde la base de datos
function cargarPuntuaciones() {
    const puntuacionesRef = ref(database, "puntuaciones");
    onValue(puntuacionesRef, (snapshot) => {
        // Vaciar la tabla antes de agregar los nuevos datos
        tablaPuntuaciones.innerHTML = "";

        // Obtener los datos de puntuaciones del snapshot
        const puntuaciones = snapshot.val();

        // Ordenar las puntuaciones de manera ascendente por puntaje
        const puntuacionesOrdenadas = Object.entries(puntuaciones).sort(
            ([, a], [, b]) => b.puntos - a.puntos
        );

        // Generar las filas de la tabla con los nombres y puntajes
        puntuacionesOrdenadas.forEach(([key, puntuacion]) => {
            const fila = document.createElement("tr");
            const nombre = document.createElement("td");
            const puntaje = document.createElement("td");
            nombre.textContent = puntuacion.nombre;
            puntaje.textContent = puntuacion.puntos;
            fila.appendChild(nombre);
            fila.appendChild(puntaje);
            tablaPuntuaciones.appendChild(fila);
        });
    });
}

// Llamar a la función para cargar las puntuaciones al cargar la página
cargarPuntuaciones();