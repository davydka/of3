
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({antialias: true});
//var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 50 );
var camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
camera.position.z = 30;

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 1 );
document.body.appendChild( renderer.domElement );

var orbit = new THREE.OrbitControls( camera, renderer.domElement );
//orbit.enableZoom = false;

var light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light );

var geometry = new THREE.PlaneGeometry( window.innerWidth, window.innerHeight, 32 );
//var material = new THREE.MeshPhongMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

var uniforms =  {
	texture1: { type: "t", value: THREE.TextureLoader( "/img.jpg" ) },
	time: { value: 1.0 },
	resolution: { value: new THREE.Vector2() }

}

var material = new THREE.ShaderMaterial({
	uniforms: uniforms,
	vertexShader: document.getElementById( 'vertex-shader' ).textContent,
	fragmentShader: document.getElementById( 'fragment-shader' ).textContent
});
var plane = new THREE.Mesh( geometry, material );
scene.add( plane );

var render = function () {
	requestAnimationFrame( render );

	if ( 1 ) {
		// plane.rotation.x += 0.005;
		// plane.rotation.y += 0.005;
	}
	uniforms.time.value += 0.05;
	renderer.render( scene, camera );
};

render();

/*
var geometry = new THREE.PlaneGeometry( 5, 20, 32 );
*/

