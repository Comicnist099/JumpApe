import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

export class audioManager {
    constructor() {
        this.listener = new THREE.AudioListener();
        this.audioLoader = new THREE.AudioLoader();
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
            const sound = new THREE.Audio(this.listener);
            sound.setBuffer(buffer);
            sound.setVolume(0.5);
            sound.isPlaying = false;
            sound.onEnded = () => {
                sound.isPlaying = false;
            };
            if (!sound.isPlaying) {
                if (this.currentSound) {
                    this.currentSound.stop(); // detener el sonido actual
                }
                sound.play();
                sound.isPlaying = true;
                this.currentSound = sound; // almacenar el nuevo sonido actual
            }
        });
    }

    stopCurrentSound() {
        if (this.currentSound) {
            this.currentSound.stop();
            this.currentSound = null; // restablecer la variable del sonido actual
        }
    }
}