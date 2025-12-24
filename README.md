# Çukurova Manav - Kullanım Kılavuzu

## Resim Ekleme

### Resimleri Yerel Klasöre Ekleme

1. Resimlerinizi `images` klasörüne kopyalayın
2. Admin panelinden ürün eklerken, fotoğraf alanına şu şekilde girin:
   - Yerel resim için: `images/dosya-adi.jpg`
   - Online resim için: Tam URL (örn: `https://...`)

### Önemli Notlar

- Dosya adlarında boşluk ve özel karakterler otomatik olarak encode edilir
- Resimler görünmüyorsa, HTML dosyasını bir web sunucusu üzerinden açmayı deneyin

### Web Sunucusu ile Çalıştırma (Önerilir)

1. Python yüklüyse: Terminal'de `python -m http.server 8000` komutunu çalıştırın
2. Tarayıcıda `http://localhost:8000` adresini açın

### Alternatif: Node.js ile

Eğer Node.js yüklüyse:
```bash
npx http-server -p 8000
```

Tarayıcıda `http://localhost:8000` adresini açın.
