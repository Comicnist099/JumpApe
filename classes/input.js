class Input {
    constructor() {
        this.pressedKeys = {};
        this.init();
    }

    init() {
        document.addEventListener("keydown", (e) => {
            this.pressedKeys[e.keyCode] = true;
        });

        document.addEventListener("keyup", (e) => {
            this.pressedKeys[e.keyCode] = false;
        });
    }

    isDown(keyCode) {
        return this.pressedKeys[keyCode] === true;
    }
}

const input = new Input();
