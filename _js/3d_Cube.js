/* ---------- READY ---------- */
$(document).ready(function(){
    selectAspect();		//sets initial aspect ratio from "active" button
    cube3d();
});

function cube3d(){
    var SPEED = 0.01;
    var cube;

    function init() {
        scene = new THREE.Scene();

        initCamera();
        initRenderer();
        initCube();

        $("#canvas3").append(renderer.domElement);
    }

    function initCamera() {
        camera = new THREE.PerspectiveCamera(70, WIDTH/HEIGHT, 1, 10);// https://github.com/mrdoob/three.js/issues/352
        camera.position.set(0, 3.5, 2);
        camera.lookAt(scene.position);
    }

    function initRenderer() {
        renderer = new THREE.WebGLRenderer({canvas:canvas3, antialias: true });
        renderer.setSize(WIDTH, HEIGHT, true);
        renderer.setClearColor( 0x000000 ); //set background color to black
        // console.log(renderer.getContextAttributes());
        // console.dir(renderer.getContext().canvas);
    }

    function initCube() {
        cube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), new THREE.MeshNormalMaterial());
        scene.add(cube);
    }

    function rotateCube() {
        cube.rotation.x -= SPEED;
        cube.rotation.y -= SPEED;
        // cube.rotation.z -= SPEED * 3;
    }

    function render() {
        requestAnimationFrame(render);
        rotateCube();
        renderer.render(scene, camera);
    }

    init();
    render();

}
