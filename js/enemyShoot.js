/* This code is registering a component called "enemy-bullets" in A-Frame, a web framework for building
virtual reality experiences. */
AFRAME.registerComponent("enemy-bullets", {
    /* The `init` function is a method that is called when the component is initialized. In this case,
    it is used to set up a recurring timer using the `setInterval` function. The `setInterval`
    function takes two arguments - the function to be executed (`this.shootEnemyBullet`) and the
    time interval in milliseconds (2000 milliseconds or 2 seconds in this case). */
    init: function () {
        setInterval(this.shootEnemyBullet, 9000)
    },
    shootEnemyBullet: function () {

        //get all enemies using className
        var els = document.querySelectorAll(".enemy");

        for (var i = 0; i < els.length; i++) {           

            //enemyBullet entity
            var enemyBullet = document.createElement("a-entity");

            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });

            enemyBullet.setAttribute("material", "color", "#282B29");

            var position = els[i].getAttribute("position")

            enemyBullet.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyBullet);

            
            /* The code `var position1 = new THREE.Vector3(); var position2 = new THREE.Vector3();` is
            creating two instances of the `THREE.Vector3` class. These instances are used to store
            the positions of the player and the enemy in 3D space. These positions are later used to
            calculate the shooting direction of the enemy bullet. */
            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();

            //shooting direction
            /* The code `var enemy = els[i].object3D; var player =
            document.querySelector("#weapon").object3D;` is used to get the 3D object of the enemy
            and player entities in the scene. */
            var enemy = els[i].object3D;
            /* The code `var player = document.querySelector("#weapon").object3D;` is used to get the
            3D object of the player entity in the scene. It selects the element with the id "weapon"
            using `document.querySelector("#weapon")` and then accesses its `object3D` property to
            get the 3D object representation of the player. */
            var player = document.querySelector("#weapon").object3D;

            
            /* The code `player.getWorldPosition(position1); enemy.getWorldPosition(position2);` is
            used to get the world positions of the player and the enemy in 3D space. */
            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);

            //set the velocity and it's direction
            /* `var direction = new THREE.Vector3();` is creating a new instance of the `THREE.Vector3`
            class called `direction`. This instance is used to store the direction in which the
            enemy bullet will be shot. */
            var direction = new THREE.Vector3();

            /* The code `direction.subVectors(position1, position2).normalize();` is calculating the
            direction in which the enemy bullet will be shot. */
            direction.subVectors(position1, position2).normalize();

            /* The code `enemyBullet.setAttribute("velocity", direction.multiplyScalar(10));` is
            setting the velocity attribute of the enemyBullet entity. */
            enemyBullet.setAttribute("velocity", direction.multiplyScalar(10));

            /* The code `enemyBullet.setAttribute("dynamic-body", { shape: "sphere", mass: "0" });` is
            setting the attribute "dynamic-body" of the enemyBullet entity. */
            enemyBullet.setAttribute("dynamic-body", {
                shape: "sphere",
                mass: "0",
            });

            var element = document.querySelector("#countLife");
            var playerLife = parseInt(element.getAttribute("text").value);

            //collide event on enemy bullets
            enemyBullet.addEventListener("collide", function (e) {
                /* This code block is handling the collision event between the enemy bullet and the
                player. */
                if (e.detail.body.el.id === "weapon") {

                    /* This code block is reducing the player's life by 1 and updating the text value
                    of the player's life on the screen. */
                    if (playerLife > 0) {
                        playerLife -= 1;
                        element.setAttribute("text", {
                            value: playerLife
                        });
                    }
                    /* This code block is checking if the player's life (`playerLife`) is less than or
                    equal to 0. If it is, it performs the following actions: */
                    if (playerLife <= 0) {
                        //show text
                        var txt = document.querySelector("#over");
                        txt.setAttribute("visible", true);

                        //remove tanks                        
                        var tankEl = document.querySelectorAll(".enemy")

                        for (var i = 0; i < tankEl.length; i++) {
                            scene.removeChild(tankEl[i])

                        }
                    }

                }
            });
            
        }
    },

});

