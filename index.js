const electron = require('electron');

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
const hbs = require("hbs");

var app_server = express();


const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const SERVER_URL = 'http://0.0.0.0:3000/login';




//server
var index = require('./routes/index');
var login = require('./routes/login');
/*
var users = require('./routes/users');
var clients = require('./routes/clients');
var qr = require("./routes/qr");
var login = require("./routes/login");
var cadastro = require('./routes/cadastro');
var consulta = require('./routes/consulta');
*/

//registrar caminos para parciales
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("qr_mostrar", imagenes => {
  var imagenes = imagenes.data.root.imagenes
  var result = "";
  for (let i = 0; i < imagenes.length; i++) {
    result += `<div class="qr">
                  <img src="${imagenes[i]}"/>
                </div>`

  }
  return new hbs.SafeString(result);
});
hbs.registerHelper("consulta_mostrar", data => {
  var data = data.data.root.data

  var result = "";

  result += `<tr>
                <th scope="row">${data.num_serial}</th>
                <td>${data.id}</td>
                <td>${data.creacion}</td>
                <td>${data.cantidad}</td>
              </tr>`
  return new hbs.SafeString(result);
});
// view engine setup

app_server.set('views', path.join(__dirname, 'views/'));
app_server.set('view engine', 'hbs');


app_server.use(express.static(__dirname + "/public"));

app_server.use(bodyParser.json());
app_server.use(bodyParser.urlencoded({
  extended: false
}));
//app_server.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


app_server.use('/', index);
app_server.use('/login', login);
/*
app.use('/users', users);
app.use('/clients', clients);
app.use('/qr', qr);
app.use('/login', login)
app.use('/cadastro', cadastro);
app.use('/consulta', consulta);


app_server.get('/', function (req, res) {
  res.send('Hello World!');
});
*/

app_server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

























// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
  
  win = new BrowserWindow({
    width: electron.screen.getPrimaryDisplay().size.width, height: electron.screen.getPrimaryDisplay().size.height
  })
      
  // Create the browser window.
  
  win.setMenu(null);

    // and load the index.html of the app.
  win.loadURL(SERVER_URL);

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

//"start": "electron .",