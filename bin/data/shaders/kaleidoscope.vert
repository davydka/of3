#version 120

#ifdef GL_ES
precision mediump float;
#endif

/*
// this is coming from our C++ code
uniform vec2 mouse;
varying vec2 texCoordVarying;

void main()
{
	gl_TexCoord[0] = gl_MultiTexCoord0;
	vec2 texcoord = gl_MultiTexCoord0.xy;

	// here we move the texture coordinates
	texCoordVarying = vec2(texcoord.x, texcoord.y);

	// send the vertices to the fragment shader
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;;
}
*/

uniform vec2 mouse;
uniform vec2 uvOffset;
varying vec2 vUv;
void main(){
	gl_TexCoord[0] = gl_MultiTexCoord0;
	vec2 texcoord = gl_MultiTexCoord0.xy;

	// here we move the texture coordinates
	vUv = vec2(texcoord.x, texcoord.y);
	//vUv = uv;
	//vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
	//gl_Position = projectionMatrix * modelViewPosition;
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}