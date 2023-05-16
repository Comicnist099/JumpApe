import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

export class audioManager {
    constructor() {
        this.listener = new THREE.AudioListener();
        this.audioLoader = new THREE.AudioLoader();
        this.sound = new THREE.Audio(this.listener);
        this.sound.setVolume(.5);
        this.sounds = []; // arreglo para almacenar los sonidos cargados
        this.currentSound = null;
    }
    isPlaying() {
        for (let i = 0; i < this.sounds.length; i++) {
            if (this.sounds[i].isPlaying) {
                return true;
            }
        }
        return false;
    }

    playSound(router) {
        this.audioLoader.load(router, (buffer) => {
            this.sound.setBuffer(buffer);

            this.sound.isPlaying = false;
            this.sound.onEnded = () => {
                this.sound.isPlaying = false;
            };
            if (!this.sound.isPlaying) {
                if (this.currentSound) {
                    this.currentSound.stop(); // detener el sonido actual
                }
                this.sound.play();
                this.sound.isPlaying = true;
                this.currentSound = this.sound; // almacenar el nuevo sonido actual
            }
        });
    }
    volumen(cantidad) {

        var value = cantidad;
        var volume = value / 100; // Convertir el valor del slider a un rango de volumen adecuado
        this.sound.setVolume(volume);
    }

    stopCurrentSound() {
        if (this.currentSound) {
            this.currentSound.stop();
            this.currentSound = null; // restablecer la variable del sonido actual
        }
    }
}