const { contextBridge, ipcRenderer } = require('electron');

console.log('[PRELOAD] Iniciado');

const api = {
  ping: () => {
    console.log('[PRELOAD] ping()');
    return ipcRenderer.invoke('ping');
  },
  getLeads: () => {
    console.log('[PRELOAD] getLeads()');
    return ipcRenderer.invoke('db:getLeads');
  }
};

contextBridge.exposeInMainWorld('electronAPI', api);
console.log('[PRELOAD] API expuesta');