# İNTİHAB — Electron Paketi

## Kurulum

1. [Node.js](https://nodejs.org) kurun (v18+)
2. Bu klasörde terminal açın
3. Bağımlılıkları yükleyin:
   ```
   npm install
   ```

## Geliştirme Modunda Çalıştırma

```
npm start
```

## Dağıtım Paketi Oluşturma

**Windows (.exe kurulum dosyası):**
```
npm run build:win
```

**Mac (.dmg):**
```
npm run build:mac
```

**Linux (.AppImage):**
```
npm run build:linux
```

Çıktılar `dist/` klasörüne oluşur.

## İkon Değiştirme

`assets/` klasöründeki dosyaları kendi ikonunuzla değiştirin:
- `icon.png` — 256×256 veya 512×512 PNG (Linux)
- `icon.ico` — Windows için (png2ico veya online araçla dönüştürün)
- `icon.icns` — Mac için (iconutil ile oluşturun)

## Kayıt Dosyaları

Oyun kayıtları kullanıcının sistem klasörüne kaydedilir:
- Windows: `%APPDATA%\intihab\intihab-saves\`
- Mac: `~/Library/Application Support/intihab/intihab-saves/`
- Linux: `~/.config/intihab/intihab-saves/`

## Steam Entegrasyonu (İleride)

`steamworks.js` paketi kurularak Steam başarım ve bulut kayıt sistemi eklenebilir:
```
npm install steamworks.js
```
