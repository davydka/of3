var container, stats;

var camera, scene, renderer, light, mesh, geometry;

var uniforms;

var orbit;
var width = window.innerWidth;
var height = window.innerHeight;


init();
animate();

function init() {
	container = document.getElementById( 'container' );

	// camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 5000 );
	// camera.position.z = 800;

	camera = new THREE.OrthographicCamera( width / - 4, width / 4, height / 4, height / - 4, 0, 5000 );
	camera.position.z = 1000;
	camera.zoom = .5;

	camera.updateProjectionMatrix();

	scene = new THREE.Scene();

	light = new THREE.AmbientLight( 0xffffff ); // soft white light
	scene.add( light );

	var axisHelper = new THREE.AxisHelper( 3000 );
	scene.add( axisHelper );

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setPixelRatio( window.devicePixelRatio );
	container.appendChild( renderer.domElement );

	orbit = new THREE.OrbitControls( camera, renderer.domElement );

	stats = new Stats();
	container.appendChild( stats.domElement );

	var loader = new THREE.TextureLoader();
	loader.load('/img.jpg', function(texture){
		uniforms = {
			texture1: { type: "t", value: texture },
			time:       { value: 1.0 },
			resolution: { value: new THREE.Vector2() }
		};

		// var material = new THREE.MeshPhongMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
		var material = new THREE.ShaderMaterial( {
			// wireframe: true,
			uniforms: uniforms,
			vertexShader: document.getElementById( 'vertex-shader' ).textContent,
			fragmentShader: document.getElementById( 'fragment-shader' ).textContent
		} );

		//geometry = new THREE.PlaneBufferGeometry( 200, 200 );
		geometry = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight, 32 );

		mesh = new THREE.Mesh( geometry, material );
		scene.add( mesh );

		onWindowResize();
		window.addEventListener( 'resize', onWindowResize, false );

	})



	/*
	var geometry2 = new THREE.PlaneGeometry( 1000, 500, 32 );
	var material2 = new THREE.MeshBasicMaterial( {color: 0xff0000, side: THREE.DoubleSide} );
	var plane = new THREE.Mesh( geometry2, material2 );
	plane.position.z = -1;
	scene.add( plane );
	*/



}

function onWindowResize( event ) {
	//var width = window.innerWidth - 1;
	//var height = window.innerHeight - 1;

	renderer.setSize( width, height );

	// renderer.domElement.width = width;
	// renderer.domElement.height = height;

	uniforms.resolution.value.x = renderer.domElement.width;
	uniforms.resolution.value.y = renderer.domElement.height;

}

//

function animate() {

	requestAnimationFrame( animate );

	// mesh.rotation.x += 0.005;
	// mesh.rotation.y += 0.005;


	render();
	stats.update();

}

function render() {

	if(uniforms)
		uniforms.time.value += 0.05;

	renderer.render( scene, camera );

}