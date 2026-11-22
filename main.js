const { app, BrowserWindow } = require("electron");

app.whenReady().then(() => {
  new BrowserWindow({ width: 900, height: 650 }).loadFile("index.html");
});