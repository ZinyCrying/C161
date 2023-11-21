/* The code is registering a new component called "bullets" in A-Frame. This component has three
functions: "init", "shootBullet", and "removeBullet". */
AFRAME.registerComponent("bullets", {
  /* The `init` function is a method of the `bullets` component. It is called when the component is
  initialized. */
  init: function () {
    /* The line `this.shootBullet();` is calling the `shootBullet` function defined in the `bullets`
    component. This function is responsible for creating and shooting a bullet in the scene when the
    "z" key is pressed. */
    this.shootBullet();
    console.log("init")
  },
  /* The `shootBullet` function is responsible for creating and shooting a bullet in the scene when the
  "z" key is pressed. */
  shootBullet: function () {
    console.log("Hello")
    window.addEventListener("keydown", e => {
      /* This code block is responsible for creating and shooting a bullet in the scene when the "z"
      key is pressed. */
      if (e.key == "z") {

        /* The code is creating a new HTML element using the `document.createElement` method. The
        element being created is an `<a-entity>` element, which is a component-based entity in the
        A-Frame framework. */
        var bullet = document.createElement("a-entity");
        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });
        bullet.setAttribute("material", {
          color: "#000"
        });

        var cam = document.querySelector("#camera-rig");
        /* This code block is retrieving the position of the camera rig element in the scene and
        assigning it to the variable `pos`. It then logs the x, y, and z coordinates of the camera
        rig's position to the console. */
        var pos = cam.getAttribute("position");
        console.log("POSITION X OF CAM RIG: ", pos.x);
        console.log("POSITION Y OF CAM RIG: ", pos.y);
        console.log("POSITION Z OF CAM RIG: ", pos.z);
        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y + 1,
          x: pos.z - 0.5,
        });

        /* The code is retrieving the camera element from the HTML document using the
        `document.querySelector` method and assigning it to the variable `camera`. */
        var camera = document.querySelector("#camera").object3D;
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        /* The code `bullet.setAttribute("velocity", direction.multiplyScalar(-10));` is setting the
        attribute "velocity" of the bullet entity to a vector representing the direction in which
        the bullet should move. The direction is multiplied by -10 to make the bullet move faster. */
        bullet.setAttribute("velocity", direction.multiplyScalar(-50));
        var scene = document.querySelector("#scene");

        bullet.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "50"
        });

        bullet.addEventListener("collide", this.removeBullet);

        scene.appendChild(bullet);

        this.shootSound();
      }
    })
  },
  /* The `removeBullet` function is a method of the `bullets` component. It is called when a bullet
  collides with another object in the scene. */
  removeBullet: function (e) {

    /* The line `var scene = document.querySelector("#scene");` is retrieving the HTML element with
    the id "scene" and assigning it to the variable `scene`. This element is most likely the
    container or parent element for the A-Frame scene where the bullets will be added and removed. */
    var scene = document.querySelector("#scene");
    //Bullet element 
    var element = e.detail.target.el;

    //Element which is hit by the bullet 
    var elementHit = e.detail.body.el;

    /* This code block is checking if the element that was hit by the bullet has an id that includes
    the string "enemy". If it does, it performs the following actions: */
    if (elementHit.id.includes("enemy")) {
      /* The code is retrieving an HTML element with the id "countTank" using the
      `document.querySelector` method and assigning it to the variable `countTankEl`. */
      var countTankEl = document.querySelector("#countTank");
      var tanksFired = parseInt(countTankEl.getAttribute("text").value);
      tanksFired -= 1;

      countTankEl.setAttribute("text", {
        value: tanksFired
      });

      if (tanksFired === 0) {
        var txt = document.querySelector("#completed");
        txt.setAttribute("visible", true);

      }
      scene.removeChild(elementHit);
    }
    //remove event listener
    element.removeEventListener("collide", this.removeBullet);

    //remove the bullets from the scene   
    scene.removeChild(element);
  },
  /* The `shootSound` function is responsible for playing a sound effect when a bullet is shot. */
  shootSound: function () {
    var entity = document.querySelector("#sound1");
    entity.components.sound.playSound();
  },
});
