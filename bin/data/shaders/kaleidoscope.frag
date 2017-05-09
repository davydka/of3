#version 120

#ifdef GL_ES
precision mediump float;
#endif

/*
const float PI = 3.141592658;
const float TAU = 2.0 * PI;
const float sections = 10.0;

const float TAUsect = TAU/sections;
const float PIsect = PI/sections;

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

uniform sampler2D tex0;
varying vec2 texCoordVarying;

void main(void){
   vec2 pos = texCoordVarying*resolution-resolution*0.5; //screen space

   float rad = length(pos);
   float angle = atan(pos.y, pos.x);

   float ma = mod(angle, TAUsect);
   ma = abs(ma - PIsect);

   float x = cos(ma) * rad + mouse.x;
   float y = sin(ma) * rad + mouse.y;

   float t = time*5.;

   gl_FragColor = texture2D(tex0, vec2(x-t,y-t)/resolution.y); //back to texture space
   
}
*/

	uniform vec2 mouse;
	uniform vec2 uvOffset;
	varying vec2 vUv;
	uniform sampler2D texture1;

	uniform vec2 resolution;
	uniform float time;

	float wave(float x, float amount) {
		return (sin(x * amount) + 1.) * .5;
		//return sin(x);
	}
	void main()	{
		vec4 color = texture2D(texture1, vUv);
		gl_FragColor.r = wave(color.r, uvOffset.x);
		gl_FragColor.g = wave(color.g, uvOffset.x);
		gl_FragColor.b = wave(color.b, uvOffset.x);
		gl_FragColor.a = 1.;
	}