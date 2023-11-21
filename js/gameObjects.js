/* The code is defining two A-Frame components: "wire-fence" and "boxes". */

AFRAME.registerComponent("wire-fence", {
    /* The `init` function is a method of the "wire-fence" component in A-Frame. It is called when the
    component is initialized. */
    init: function () {
        //starting x position
        posX = -20;
        //starting z-position
        posZ = 85;

        for (var i = 0; i < 10; i++) {
            //create wire-fence entity
            var wireFence1 = document.createElement("a-entity");
            var wireFence2 = document.createElement("a-entity");
            var wireFence3 = document.createElement("a-entity");
            var wireFence4 = document.createElement("a-entity");


            //set x, y and z position
            posX = posX + 5;
            posY = 2.5;
            posZ = posZ - 10;

            //scale 
            var scale = { x: 2, y: 2, z: 2 };

            //set the id
            wireFence1.setAttribute("id", "wireFence1" + i);
            wireFence2.setAttribute("id", "wireFence2" + i);
            wireFence3.setAttribute("id", "wireFence3" + i);
            wireFence4.setAttribute("id", "wireFence4" + i);

            //set the position
            wireFence1.setAttribute("position", { x: posX, y: 2.5, z: -35 });
            wireFence2.setAttribute("position", { x: posX, y: 2.5, z: 85 });
            wireFence3.setAttribute("position", { x: -30, y: 2.5, z: posZ });
            wireFence4.setAttribute("position", { x: 50, y: 2.5, z: posZ });

            //set the scale
            wireFence1.setAttribute("scale", scale);
            wireFence2.setAttribute("scale", scale);
            wireFence3.setAttribute("scale", scale);
            wireFence4.setAttribute("scale", scale);

            //set the model
            wireFence1.setAttribute(
                "gltf-model",
                "./models/barbed_wire_fence/scene.gltf"
            );

            wireFence2.setAttribute(
                "gltf-model",
                "./models/barbed_wire_fence/scene.gltf"
            );

            wireFence3.setAttribute(
                "gltf-model",
                "./models/barbed_wire_fence/scene.gltf"
            );

            wireFence4.setAttribute(
                "gltf-model",
                "./models/barbed_wire_fence/scene.gltf"
            );

            //set the rotation
            wireFence3.setAttribute("rotation", { x: 0, y: 90, z: 0 });
            wireFence4.setAttribute("rotation", { x: 0, y: 90, z: 0 });

            //set the physics body
            wireFence1.setAttribute("static-body", {});
            wireFence2.setAttribute("static-body", {});
            wireFence3.setAttribute("static-body", {});
            wireFence4.setAttribute("static-body", {});

            var sceneEl = document.querySelector("#scene");
            //attach the entity to the scene
            sceneEl.appendChild(wireFence1);
            sceneEl.appendChild(wireFence2);
            sceneEl.appendChild(wireFence3);
            sceneEl.appendChild(wireFence4);

        }
    },
});


//boxes
/* The code is defining an A-Frame component called "boxes". This component is responsible for creating
multiple box entities in a scene. */
AFRAME.registerComponent("boxes", {
    schema: {
        height: { type: "number", default: 2 },
        width: { type: "number", default: 2 },
        depth: { type: "number", default: 2 },
    },
    init: function () {

        //x position array
        px = [22.86, -17.35, -12.81, 0.44, -30.18,
            -25.89, 15.61, 29.68, 11.95, -15.40,
            -14.09, 34.76, 2.29, 21.77, 1.57,
            34.72, 12.04, -10.90, 6.48, 15.66];

        //z position array
        pz = [54.56, -4.71, 14.91, 56.74, 41.13,
            50.76, 57.84, 7.02, -5.24, -26.82,
            27.59, -35.78, 34.52, 31.32, -9.22,
            26.72, 48.90, 27.24, 9.94, 54.29];

        for (var i = 0; i < 20; i++) {
            var box = document.createElement("a-entity");

            /* The line `posX = px[i];` is assigning the value at index `i` of the `px` array to the variable
            `posX`. This is used to set the x-position of each box entity that is being created in the
            loop. The `px` array contains a list of x-coordinates for the boxes. */
            posX = px[i];

            /* The line `posY = 1;` is setting the y-position of each box entity to 1. This means that
            all the boxes will be positioned at a height of 1 unit above the ground or any other
            reference point in the scene. */
            posY = 1;

            /* The line `posZ = pz[i];` is assigning the value at index `i` of the `pz` array to the
            variable `posZ`. This is used to set the z-position of each box entity that is being
            created in the loop. The `pz` array contains a list of z-coordinates for the boxes. */
            posZ = pz[i];

            position = { x: posX, y: posY, z: posZ };

            box.setAttribute("id", "box" + i);
            box.setAttribute("position", position);

            box.setAttribute("geometry", {
                primitive: "box",
                height: this.data.height,
                width: this.data.width,
                depth: this.data.depth,
            });

            /* The code `box.setAttribute("material", { src: "./images/boxtexture1.jpg", repeat: "1 1
            1" });` is setting the material of the box entity. */
            box.setAttribute("material", {
                src: "./images/boxtexture1.jpg",
                /* The `repeat: "1 1 1"` property in the `box.setAttribute("material", ...)` line is
               setting the repeat pattern for the texture applied to the box entity. */
                repeat: "1 1 1",
            });

            /* The line `box.setAttribute("static-body", {});` is setting the physics body of the box
            entity to be static. This means that the box will not move or be affected by physics
            forces such as gravity or collisions with other dynamic objects in the scene. The empty
            object `{}` passed as the attribute value is used to enable the static body behavior. */
            box.setAttribute("static-body", {});

            /* The code `var sceneEl = document.querySelector("#scene");` is selecting the HTML element
            with the id "scene" using the `querySelector` method. This element is typically a
            container for the A-Frame scene. */
            var sceneEl = document.querySelector("#scene");
            sceneEl.appendChild(box);
        }
    },
});