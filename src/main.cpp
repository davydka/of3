#include "ofMain.h"
#include "ofApp.h"
//#include "ofAppGLFWWindow.h"

//========================================================================
int main( ){
	//ofAppGLFWWindow window;

	//ofSetupOpenGL(&window, 640,480,OF_WINDOW);
	//ofSetupOpenGL(640,480,OF_WINDOW);
	
	ofGLFWWindowSettings settings;
	settings.setGLVersion(2, 0);
	ofCreateWindow(settings);

	ofRunApp(new ofApp());

}
