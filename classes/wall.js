import {
    platform
} from './platform.js';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

export class wall extends platform {
    constructor(scene, fbxMesh, geometry, x, y, z) {
        super(scene, fbxMesh, geometry, x, y, z);

    }

}