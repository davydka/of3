var container, stats;

var camera, scene, renderer, light, mesh;

var uniforms;

var orbit;

init();
animate();

function init() {
	container = document.getElementById( 'container' );

	//camera = new THREE.Camera();
	camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
	camera.position.z = 1;

	scene = new THREE.Scene();

	light = new THREE.AmbientLight( 0xffffff ); // soft white light
	scene.add( light );

	//var geometry = new THREE.PlaneBufferGeometry( 2, 2 );
	var geometry = new THREE.PlaneGeometry( window.innerWidth/2, window.innerHeight/2, 32 );

	uniforms = {
		texture1: { type: "t", value: THREE.TextureLoader( "/img.jpg" ) },
		time:       { value: 1.0 },
		resolution: { value: new THREE.Vector2() }
	};

	//var material = new THREE.MeshPhongMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
	var material = new THREE.ShaderMaterial( {

		uniforms: uniforms,
		vertexShader: document.getElementById( 'vertex-shader' ).textContent,
		fragmentShader: document.getElementById( 'fragment-shader' ).textContent

	} );

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setPixelRatio( window.devicePixelRatio );
	container.appendChild( renderer.domElement );

	orbit = new THREE.OrbitControls( camera, renderer.domElement );
	orbit.addEventListener( 'change', render );

	stats = new Stats();
	container.appendChild( stats.domElement );

	onWindowResize();

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize( event ) {
	var width = window.innerWidth - 1;
	var height = window.innerHeight - 1;

	renderer.setSize( width, height );

	renderer.domElement.width = width;
	renderer.domElement.height = height;

	uniforms.resolution.value.x = renderer.domElement.width;
	uniforms.resolution.value.y = renderer.domElement.height;

}

//

function animate() {

	requestAnimationFrame( animate );

	orbit.update();
	mesh.rotation.x += 0.005;
	mesh.rotation.y += 0.005;


	render();
	stats.update();

}

function render() {

	uniforms.time.value += 0.05;

	renderer.render( scene, camera );

}