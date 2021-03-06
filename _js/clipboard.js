/* ---------- READY ---------- */
$(document).ready(function(){
    selectAspect();		//sets initial aspect ratio from "active" button
    photosphere3d();
});

function photosphere3d() {
    var gui, sphere, controls;
    var rooms = [];

    function init(){
        scene = new THREE.Scene();

        initCamera();
        initRenderer();
        initSphere();
        initControls();
        // displayGUI();

        $("#canvas3").append(renderer.domElement);
    }

    function initCamera() {
        camera = new THREE.PerspectiveCamera(55, WIDTH/HEIGHT, .1, 10);// https://github.com/mrdoob/three.js/issues/352
        camera.position.set (0, 0, 1);
    }

    function initRenderer() {
        renderer = new THREE.WebGLRenderer({canvas:canvas3, antialias: true });
        renderer.setSize(WIDTH, HEIGHT); //true in 3rd parameter
        // console.log(renderer.getContextAttributes());
        // console.dir(renderer.getContext().canvas);
    }

    function initSphere() {
        sphere = new THREE.SphereGeometry( 4, 64, 32 );
        sphere.rotateY(160);
        globe = new THREE.Mesh( sphere, matOne);
        globe.scale.x = -1;
        scene.add(globe);
    }

    function initControls() {//CAMERA CONTROLS
        controls = new THREE.OrbitControls(camera);
        // controls.noPan = false; //dont know
        // controls.noZoom = true; //keep - restricts zoom
    }
    var matOne = new THREE.MeshBasicMaterial();
    matOne.map = THREE.ImageUtils.loadTexture('_images/sphere/CompositeLivingRoom.jpg');
    //matOne.map = THREE.ImageUtils.loadTexture('Floor-LivingRoom.png');
    matOne.shading = THREE.SmoothShading;
    matOne.transparent = true;

    var matTwo = new THREE.MeshBasicMaterial();
    matTwo.map = THREE.ImageUtils.loadTexture('_images/sphere/CompositeKitchenImproved.jpg');
    matTwo.shading = THREE.SmoothShading;
    matTwo.transparent = true;

    //http://stackoverflow.com/questions/24394386/how-can-i-change-the-texture-in-a-blender-model-loaded-into-three-js-after-its/24769214#24769214
    //GUI CONTROL PANEL
    var room = new function(){
        this.changeRoom = function (e)
        {
        switch (e)
            {
        case "Living Room":
        globe.material = matOne;
        break;

        case "Kitchen":
        globe.material = matTwo;
        break;

        // case "Empty":
        // globe.material = matThree;
        // break;
            }
        }
    }

    //GUI CONTROLS
    var gui = new dat.GUI();
    gui.add(room, "changeRoom", ['Living Room', 'Kitchen']).onChange(room.changeRoom);

    //CUBE
    // var geometry = new THREE.CubeGeometry(1,1,1);
    // var material01 = new THREE.MeshBasicMaterial({color: 0x00ff00});
    // var cube = new THREE.Mesh(geometry, material01);
    // cube.position.set( 0, 0, -5 );
    // scene.add(cube);

    function animate(){
        controls.update(); //weird starting behavior without this
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        renderer.clear();
        renderer.render(scene, camera);
    }

    function onMouseWheel(event) {
        event.preventDefault();

        if (event.wheelDeltaY) { // WebKit
            camera.fov -= event.wheelDeltaY * 0.05;
        } else if (event.wheelDelta) { 	// Opera / IE9
            camera.fov -= event.wheelDelta * 0.05;
        } else if (event.detail) { // Firefox
            camera.fov += event.detail * 1.0;
        }

        camera.fov = Math.max(25, Math.min(55, camera.fov)); //updates camera FOV from original
        camera.updateProjectionMatrix(); //required to change FOV
    }

    init();
    animate(); //render();

    // EVENTS
    THREEx.WindowResize(renderer, camera); //https://github.com/jeromeetienne/threex.windowresize/blob/master/threex.windowresize.js
    document.addEventListener('mousewheel', onMouseWheel, true); //allows zoom; true or false?
    document.addEventListener('DOMMouseScroll', onMouseWheel, true); //allows zoom; true or false?
}
