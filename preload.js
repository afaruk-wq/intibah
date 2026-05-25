const { contextBridge, ipcRenderer } = require('electron')

// Oyun koduna güvenli şekilde kayıt/yükleme API'si sun
contextBridge.exposeInMainWorld('electronAPI', {
  saveGame:   (slot, state) => ipcRenderer.invoke('save-game', slot, state),
  loadGame:   (slot)        => ipcRenderer.invoke('load-game', slot),
  listSaves:  ()            => ipcRenderer.invoke('list-saves'),
  deleteSave: (slot)        => ipcRenderer.invoke('delete-save', slot),
  isElectron: true
})
