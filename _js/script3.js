var scene, camera, renderer;
var WIDTH, HEIGHT;// Global so threejs can access

function load3js(){


    var SPEED = 0.01;

    function init() {
        scene = new THREE.Scene();

        initCube();
        initCamera();
        initRenderer();

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
        // console.log(renderer.getContextAttributes());
        console.dir(renderer.getContext().canvas);
        // console.log(document.body);
        // renderer.setSize(?);
    }

    function initCube() {
        cube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), new THREE.MeshNormalMaterial());
        scene.add(cube);
    }

    function rotateCube() {
        cube.rotation.x -= SPEED    ;
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

    // == Link to page.js
    $(window).resize(function() {
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
        renderer.setSize( WIDTH, HEIGHT );
    });

    $("#toggleAspect button").click(function() {	//on button click, update the ACTIVE status and value
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
        renderer.setSize( WIDTH, HEIGHT );
    });
};
