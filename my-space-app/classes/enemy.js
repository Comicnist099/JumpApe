import {
  platform
} from './platform.js';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
const enemySound = './assets/music/moai.wav';
import {
  audioManager
} from './audioManager.js';

export class enemy extends platform {
  constructor(scene, fbxMesh, geometry, x, y, z) {
    super(scene, fbxMesh, geometry, x, y, z);
    this.distanciaObjetivo = 2; // Distancia objetivo entre el personaje y el cubo
    this.velocidadAproximacion = 0.18; // Velocidad a la que el cubo se acerca al personaje
    this.velocidadAlejamiento = 0.05; // Velocidad a la que el cubo se aleja del personaje
    this.persiguiendo = false; // Bandera que indica si el cubo está persiguiendo al personaje
    this.enemyAudio = new audioManager();
  }

  update() {
    const angle = 0.1; // El ángulo de rotación por frame
    this.mesh.rotation.y += angle; // Rotar la fruta en el eje Y
  }
  actualizarCubo(player1, player2) {

    var distanciaActual = player1.getPosition().distanceTo(this.mesh.position);
    var distanciaActual2 = player2.getPosition().distanceTo(this.mesh.position);

    if (distanciaActual < distanciaActual2) {
      if (!this.persiguiendo) {
        if (distanciaActual > this.distanciaObjetivo) {
          var direccion = new THREE.Vector3().subVectors(player1.getPosition(), this.mesh.position).normalize();
          this.mesh.position.add(direccion.multiplyScalar(this.velocidadAproximacion));

        } else {
          this.enemyAudio.playSound(enemySound);


          player1.damagelife();
          this.persiguiendo = true;
        }
      } else {
        if (distanciaActual < this.distanciaObjetivo * 4) {
          var direccion = new THREE.Vector3().subVectors(this.mesh.position, player1.getPosition()).normalize();
          this.mesh.position.add(direccion.multiplyScalar(this.velocidadAlejamiento));
        } else {

          this.persiguiendo = false;
        }
      }
    } else {
      if (!this.persiguiendo) {
        if (distanciaActual2 > this.distanciaObjetivo) {
          var direccion = new THREE.Vector3().subVectors(player2.getPosition(), this.mesh.position).normalize();
          this.mesh.position.add(direccion.multiplyScalar(this.velocidadAproximacion));
        } else {
          this.enemyAudio.playSound(enemySound);

          player2.damagelife();
          this.persiguiendo = true;
        }
      } else {
        if (distanciaActual2 < this.distanciaObjetivo * 4) {
          var direccion = new THREE.Vector3().subVectors(this.mesh.position, player2.getPosition()).normalize();
          this.mesh.position.add(direccion.multiplyScalar(this.velocidadAlejamiento));
        } else {
          this.persiguiendo = false;
        }
      }
    }
  }






}