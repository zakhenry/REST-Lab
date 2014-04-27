
/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/trunk/apps/experimental.app.html
 * @see http://developer.chrome.com/trunk/apps/app.window.html
 */

chrome.app.runtime.onLaunched.addListener(function(intentData) {

    var windowOptions = {
        id:'index',
        bounds: {
            'width': Math.round(window.screen.availWidth*0.8),
            'height': Math.round(window.screen.availHeight*0.8)
        }
    };

    chrome.app.window.create('index.html', windowOptions, function(mainWindow) {
        window.mainWindow = mainWindow;

        mainWindow.onClosed.addListener(function(){
            destroyActiveSocket();
        });
    });

    console.log('launched');


});

var activeSocket = null;

function setActiveSocket(socketId){
    activeSocket = socketId;
}

function unsetActiveSocket(){
    activeSocket = null;
}

function destroyActiveSocket(){
    chrome.socket.disconnect(activeSocket);
    chrome.socket.destroy(activeSocket);

    console.log('unloaded socket', activeSocket);
    unsetActiveSocket();
}