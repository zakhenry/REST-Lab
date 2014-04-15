
var tcpServer;

/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/trunk/apps/experimental.app.html
 * @see http://developer.chrome.com/trunk/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function(intentData) {
    chrome.app.window.create('index.html', {
        width: 800,
        height: 600
    });

    startServer('127.0.0.1', 8888);

});


// event logger
//var log = (function(){
//    var logLines = [];
//    var logListener = null;
//
//    var output=function(str) {
//        if (str.length>0 && str.charAt(str.length-1)!='\n') {
//            str+='\n'
//        }
//        logLines.push(str);
//        if (logListener) {
//            logListener(str);
//        }
//    };
//
//    var addListener=function(listener) {
//        logListener=listener;
//        // let's call the new listener with all the old log lines
//        for (var i=0; i<logLines.length; i++) {
//            logListener(logLines[i]);
//        }
//    };
//
//    return {output: output, addListener: addListener};
//})();



function onAcceptCallback(tcpConnection, socketInfo) {
    var info="["+socketInfo.peerAddress+":"+socketInfo.peerPort+"] Connection accepted!";
//    log.output(info);
    console.log(socketInfo);
    tcpConnection.addDataReceivedListener(function(data) {

        console.log('data recieved', data);

        /*
        var lines = data.split(/[\n\r]+/);
        for (var i=0; i<lines.length; i++) {
            var line=lines[i];
            if (line.length>0) {
                var info="["+socketInfo.peerAddress+":"+socketInfo.peerPort+"] "+line;
                log.output(info);

                var cmd=line.split(/\s+/);
                try {
                    tcpConnection.sendMessage(Commands.run(cmd[0], cmd.slice(1)));
                } catch (ex) {
                    tcpConnection.sendMessage(ex);
                }
            }
        }
        */
    });
};

function startServer(addr, port) {
    if (tcpServer) {
        tcpServer.disconnect();
    }
    tcpServer = new TcpServer(addr, port);
    tcpServer.listen(onAcceptCallback);
}


function stopServer() {
    if (tcpServer) {
        tcpServer.disconnect();
        tcpServer=null;
    }
}

function getServerState() {
    if (tcpServer) {
        return {isConnected: tcpServer.isConnected(),
            addr: tcpServer.addr,
            port: tcpServer.port};
    } else {
        return {isConnected: false};
    }
}