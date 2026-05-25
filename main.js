const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

// Kayıt dosyaları için klasör
const savesDir = path.join(app.getPath('userData'), 'intihab-saves')

function ensureSavesDir() {
  if (!fs.existsSync(savesDir)) {
    fs.mkdirSync(savesDir, { recursive: true })
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 800,
    minHeight: 600,
    title: 'İNTİHAB — Osmanlı Seçim Simülasyonu',
    backgroundColor: '#110a04',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
  win.setMenuBarVisibility(false)

  // Geliştirme modunda DevTools aç
  // win.webContents.openDevTools()
}

// ── Kayıt / Yükleme IPC ──────────────────────────────

ipcMain.handle('save-game', (event, slot, gameState) => {
  try {
    ensureSavesDir()
    const filePath = path.join(savesDir, `save_${slot}.json`)
    fs.writeFileSync(filePath, JSON.stringify(gameState, null, 2), 'utf8')
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e.message }
  }
})

ipcMain.handle('load-game', (event, slot) => {
  try {
    const filePath = path.join(savesDir, `save_${slot}.json`)
    if (!fs.existsSync(filePath)) return { ok: false, error: 'Kayıt bulunamadı' }
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    return { ok: true, data }
  } catch (e) {
    return { ok: false, error: e.message }
  }
})

ipcMain.handle('list-saves', () => {
  try {
    ensureSavesDir()
    const saves = {}
    for (let i = 1; i <= 3; i++) {
      const filePath = path.join(savesDir, `save_${i}.json`)
      if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        saves[i] = {
          partyName: data.partyName || '—',
          turn: data.turn || 0,
          savedAt: fs.statSync(filePath).mtime.toLocaleDateString('tr-TR')
        }
      } else {
        saves[i] = null
      }
    }
    return { ok: true, saves }
  } catch (e) {
    return { ok: false, error: e.message }
  }
})

ipcMain.handle('delete-save', (event, slot) => {
  try {
    const filePath = path.join(savesDir, `save_${slot}.json`)
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e.message }
  }
})

// ── Uygulama yaşam döngüsü ───────────────────────────

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
