/* The code is registering a custom component called "player-movement" in A-Frame, a web framework for
building virtual reality experiences. */
AFRAME.registerComponent("player-movement", {
    init: function () {
        this.walk();
    },
    walk: function () {
        /* The code is adding an event listener to the window object for the "keydown" event. When a
        key is pressed, the event listener checks if the key pressed is one of the arrow keys
        (ArrowUp, ArrowRight, ArrowLeft, or ArrowDown). If it is, it selects an element with the ID
        "sound2" using the `document.querySelector()` method and assigns it to the `entity`
        variable. Then, it calls the `playSound()` method on the `sound` component of the `entity`
        element. This code is likely triggering a sound effect when one of the arrow keys is
        pressed. */
        window.addEventListener("keydown", (e) => {
            if (
                e.key === "ArrowUp" ||
                e.key === "ArrowRight" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowDown"
            ) {
                var entity = document.querySelector("#sound2");
                entity.components.sound.playSound();
            }
        });
    },
});
