const exec = () => {
    const fs = require('fs');
    const path = require('path');

    console.log('Fox React Dev Util');

    const currentPath = process.cwd();
    const reactDevUtilsPath = path.join(currentPath, 'node_modules', 'react-dev-utils', 'webpackHotDevClient.js');

    if (!fs.existsSync(reactDevUtilsPath)) {
        console.log('React Dev Utils not installed in current project.');
        process.exit(1);
    }


    let content = fs.readFileSync(reactDevUtilsPath, {encoding: 'utf-8'});
    const currentWS = `var connection = new WebSocket(`;

    const posWebSocket = content.indexOf(currentWS);


    if (posWebSocket === -1) {
        console.log('Websocket not found');
        process.exit(1);
    }

    const prefix = content.substr(0, posWebSocket);
    content = content.substr(posWebSocket);
    content = content.replace("protocol: 'ws',", "protocol: window.location.protocol === 'https:' ? 'wss' : 'ws',");
    content = prefix + content;

    fs.writeFileSync(reactDevUtilsPath, content);

    console.log('Done!');
    process.exit(1);
}

exec();