class players{
    constructor() {
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        this.cubeMesh = new THREE.Mesh(this.geometry, this.material);
        this.cubeMesh.position.set(0, 5, 0); 
        this.cubeMesh.position.add(0);
        scene.add(this.cubeMesh);
    }
    setAdd(x) {
        this.cubeMesh.position.add(x);
      }
      getPosition(){
        return console.log(this.cubeMesh.position); 
      }
      
}