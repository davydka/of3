#include "ofApp.h"

ofShader shader_keliedo;


//--------------------------------------------------------------
void ofApp::setup(){
   
	std::cout<<glGetString(GL_VERSION)<<std::endl;

	ofDisableArbTex();
	ofSetVerticalSync(true);
	ofSetWindowShape(1920, 1080);

	img.loadImage("images/jacket1.png");
	img2.loadImage("images/img.jpg");
   
	float planeScale = 1.;
	int planeWidth = ofGetWidth() * planeScale;
	int planeHeight = ofGetHeight() * planeScale;
	int planeGridSize = 20;
	int planeColumns = planeWidth / planeGridSize;
	int planeRows = planeHeight / planeGridSize;

   
	shader_keliedo.load("shaders/kaleidoscope");

	movieMovie.setPixelFormat(OF_PIXELS_NATIVE);
	movieMovie.load("trailer_320.mp4");
	movieMovie.setLoopState(OF_LOOP_NORMAL);
	ofPixels & pixels = movieMovie.getPixels();
	int vidWidth = pixels.getWidth();
	int vidHeight = pixels.getHeight();

	movieMovie.play();

	plane.set(planeWidth, planeHeight, planeColumns, planeRows, OF_PRIMITIVE_TRIANGLES);
	plane.mapTexCoordsFromTexture(img2.getTextureReference());
}

//--------------------------------------------------------------
void ofApp::update(){
	movieMovie.update();
}

//--------------------------------------------------------------
void ofApp::draw(){
	ofClear(255.0f, 255.f, 255.f);
	ofSetColor(255);

	GLint repeat = GL_MIRRORED_REPEAT;
	ofSetTextureWrap(repeat,repeat);



	float mousePositionX = ofMap(mouseX, 0, ofGetWidth(), plane.getWidth(), -plane.getWidth(), true);
	float mousePositionY = ofMap(mouseY, 0, ofGetHeight(), plane.getHeight(), -plane.getHeight(), true);

	float mouseNormX =((float)mouseX)/((float)ofGetWidth());
	float mouseNormY =((float)mouseY)/((float)ofGetHeight());
   
	shader_keliedo.begin();
	shader_keliedo.setUniform2f("mouse", mousePositionX, mousePositionY);
	shader_keliedo.setUniform1f("time", ofGetElapsedTimef());
	shader_keliedo.setUniform2f("resolution", ofGetWidth(),ofGetHeight());
	shader_keliedo.setUniform2f("uvOffset", mouseNormX, mouseNormY);
	ofPushMatrix();
	img2.draw(0,0, ofGetWidth(), ofGetHeight());
	ofPopMatrix();
	shader_keliedo.end();

	ofTranslate(ofGetWidth()/2, ofGetHeight()/2);
	img.draw(-img.getWidth()/2, -img.getHeight()/2);
	//img.draw(ofGetWidth()/2, ofGetHeight()/2);
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){
}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}

