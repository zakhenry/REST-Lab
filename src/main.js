
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
    });

    console.log('launched');


});

var activeSockets = [];

function addActiveSocket(socketId){
    activeSockets.push(socketId);
}

function clearActiveSockets(){
    activeSockets = [];
}

function cleanupSockets(){
    for (var socketIndex in activeSockets){
        var id = activeSockets[socketIndex];

        chrome.socket.disconnect(id);
        chrome.socket.destroy(id);
    }
    clearActiveSockets();
    return true;
}