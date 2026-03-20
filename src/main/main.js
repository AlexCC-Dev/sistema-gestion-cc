const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { getDatabase } = require('../shared/database');

let mainWindow;

const createWindow = () => {
  console.log('[MAIN] Creando ventana');
  
  const preloadPath = path.join(__dirname, 'preload.js');
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: preloadPath
    }
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../build/index.html'));
  }
};

app.whenReady().then(() => {
  console.log('[MAIN] App lista');
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Handlers IPC
ipcMain.handle('ping', () => {
  console.log('[MAIN] ping recibido');
  return 'pong';
});

ipcMain.handle('db:getLeads', () => {
  console.log('[MAIN] Solicitando leads');
  const db = getDatabase();
  return db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
});