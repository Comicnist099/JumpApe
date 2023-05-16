export const Examples = {
	starfield: {
		positionStyle: Type.CUBE,
		positionBase: new THREE.Vector3(0, 200, 0),
		positionSpread: new THREE.Vector3(600, 400, 600),

		velocityStyle: Type.CUBE,
		velocityBase: new THREE.Vector3(0, 0, 0),
		velocitySpread: new THREE.Vector3(0.5, 0.5, 0.5),

		angleBase: 0,
		angleSpread: 720,
		angleVelocityBase: 0,
		angleVelocitySpread: 4,

		particleTexture: THREE.ImageUtils.loadTexture('./assets/img/spikey.png'),

		sizeBase: 10.0,
		sizeSpread: 2.0,
		colorBase: new THREE.Vector3(0.15, 1.0, 0.9), // H,S,L
		colorSpread: new THREE.Vector3(0.00, 0.0, 0.2),
		opacityBase: 1,

		particlesPerSecond: 20000,
		particleDeathAge: 60.0,
		emitterDeathAge: 0.1
	},

}