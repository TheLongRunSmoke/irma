const electron = require('electron')
const { app, BrowserWindow, globalShortcut, shell } = require('electron')
const path = require('path')
const url = require('url')

// Global reference to window. Prevent from being garbage collected.
let mainWindow

function createMainWindow() {
    const window = new BrowserWindow({
        show: false,
        frame: false,
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true
        }
    })

    window.setMenu(null)

    window.webContents.on('new-window', function (e, url) {
        e.preventDefault()
        shell.openExternal(url)
    })

    window.loadURL(url.format({
        pathname: path.join(__dirname, 'renderer', 'index.html'),
        protocol: 'file',
        slashes: true
    }))

    window.once('ready-to-show', () => {
        window.show()
    })

    window.on('closed', () => {
        mainWindow = null
    })

    return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
    // on macOS it is common for applications to stay open until the user explicitly quits
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // on macOS it is common to re-create a window even after all windows have been closed
    if (mainWindow === null) {
        mainWindow = createMainWindow()
    }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
    mainWindow = createMainWindow()
    // Close app by pressing escap.
    globalShortcut.register('escape', () => {
        app.quit()
    })
})