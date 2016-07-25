/* ---------- READY ---------- */
$(document).ready(function(){
    // selectAspect();		//sets initial aspect ratio from "active" button
    photosphere3d();
    $('body').css('backgroundColor', 'black');
});

function photosphere3d() {
    var gui, sphere, controls;
    var rooms = [];
    var roomLiving = new THREE.TextureLoader().load('_images/sphere/CompositeLivingRoom.jpg'); //http://threejs.org/docs/index.html#Reference/Loaders/ImageLoader
    var roomKitchen = new THREE.TextureLoader().load('_images/sphere/CompositeKitchenImproved.jpg');

    function init(){
        scene = new THREE.Scene();

        initCamera();
        initRenderer();
        initSphere();
        initCube();
        initControls();
        // displayGUI();

        $("#canvas3").append(renderer.domElement);
    }
        //helper function to rotate in degrees, not radians
        function rotateObject(object,degreeX=0, degreeY=0, degreeZ=0){
           degreeX = (degreeX * Math.PI)/180;
           degreeY = (degreeY * Math.PI)/180;
           degreeZ = (degreeZ * Math.PI)/180;
           object.rotateX(degreeX);
           object.rotateY(degreeY);
           object.rotateZ(degreeZ);
        }

    function initCamera() {
        camera = new THREE.PerspectiveCamera(50, WIDTH/HEIGHT, .1, 100);// https://github.com/mrdoob/three.js/issues/352
        camera.position.set (0, 0, .1);
    }

    function initRenderer() {
        renderer = new THREE.WebGLRenderer({canvas:canvas3, antialias: true, alpha: false });
        renderer.setSize(WIDTH, HEIGHT); //true in 3rd parameter
        // console.log(renderer.getContextAttributes());
        // console.dir(renderer.getContext().canvas);
    }

    function initSphere() {
        var globe = new THREE.Mesh (
            new THREE.SphereGeometry( 10, 64, 32 ).translate(0, 0, 0),
            new THREE.MeshBasicMaterial({color: 0xffffff, map: roomKitchen})
        );

        globe.scale.x = -1;
        rotateObject(globe, 10, -90, 0);
        scene.add(globe);
    }

    function initControls() {//CAMERA CONTROLS
        controls = new THREE.OrbitControls(camera);
        // controls.noPan = false; //dont know
        // controls.noZoom = true; //keep - restricts zoom
    }

    //CUBE
    function initCube() {

        var cube = new THREE.Mesh (
            new THREE.CubeGeometry(2,2,2).rotateY(00).translate(0, 0, 0),
            new THREE.MeshBasicMaterial({color: 0x00ff00})
        );
        // cube.position.set( 0, 0, -5 );
        // cube.rotation.y = 45;

        // var cube2 = new THREE.Mesh (
        //     new THREE.CubeGeometry(2,2,2).rotateY(90).translate(-5, 0, -5),
        //     new THREE.MeshBasicMaterial({color: 0x00ffff})
        // );
        //
        // var cube3 = new THREE.Mesh (
        //     new THREE.SphereGeometry(4, 64, 32).translate(5, 0, -5),
        //     new THREE.MeshBasicMaterial({map: roomKitchen})
        // );

        scene.add(cube);
    }

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
