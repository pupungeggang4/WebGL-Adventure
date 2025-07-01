const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 7200
  })

  win.loadFile('game/index.html')
}

app.whenReady().then(() => {
  createWindow()
})
