#version 120

// this is how we receive the texture
uniform sampler2DRect tex0;
uniform sampler2DRect tex1;
uniform sampler2DRect tex3;
uniform sampler2DRect tex4;

varying vec2 texCoordVarying;

void main()
{
    gl_FragColor = texture2DRect(tex0, texCoordVarying);
}