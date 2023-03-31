const Key = {
    pressedKeys: {},
    // PLAYER 1
    SPACE: 32,
    A: 65,
    D: 68,

    // PLAYER 2
    UP: 38,
    LEFT: 37,
    RIGHT: 39,

    init: function () {
        document.addEventListener("keydown", function (e) {
            Key.pressedKeys[e.keyCode] = true;
        });

        document.addEventListener("keyup", function (e) {
            Key.pressedKeys[e.keyCode] = false;
        });
    },

    isDown: function (keyCode) {
        return Key.pressedKeys[keyCode] === true;
    }
};
Key.init();
