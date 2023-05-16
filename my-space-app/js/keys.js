const Key = {
    pressedKeys: {},
    pressedOnce: {},
    // PLAYER 1
    SPACE: 32,
    A: 65,
    D: 68,

    P: 80,

    // PLAYER 2
    UP: 38,
    LEFT: 37,
    RIGHT: 39,

    init: function () {
        document.addEventListener("keydown", function (e) {
            Key.pressedKeys[e.keyCode] = true;
            Key.pressedOnce[e.keyCode] = true;
        });

        document.addEventListener("keyup", function (e) {
            Key.pressedKeys[e.keyCode] = false;
        });
    },

    isDown: function (keyCode) {
        return Key.pressedKeys[keyCode] === true;
    },

    isPressed: function (keyCode) {
        const pressedOnce = Key.pressedOnce[keyCode];
        Key.pressedOnce[keyCode] = false;
        return pressedOnce;
    }
};

Key.init();