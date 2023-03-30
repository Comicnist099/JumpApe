class plataform {
    constructor() {
      this.geometry = new THREE.BoxGeometry(1, 17, 7);
      //this.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
      this.material = new THREE.MeshLambertMaterial({ color: 0x777777 });
      this.markerMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
      //THREE.ColorUtils.adjustHSV( material.color, 0, 0, 0.9 );
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.mesh.position.set(0, 0, 0);
      this.mesh.castShadow = true;
      this.mesh.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
      this.mesh.receiveShadow = true;
      scene.add(this.mesh);
    }
  
    setScale(x, y, z) {
      this.mesh.scale.set(x, y, z);
    }
    
  setGeometry(width, height, depth) {
    this.geometry = new THREE.BoxGeometry(width, height, depth);
    this.mesh.geometry = this.geometry;
  }
    
    setPosition(x, y, z) {
      this.mesh.position.set(x, y, z);
    }
  }
  