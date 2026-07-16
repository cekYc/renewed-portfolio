# Esnaf Durum - Online Siparis Sistemi

Modern, gercek zamanli durumcu siparis ve yonetim sistemi.

## Icindekiler

- [Ozellikler](#ozellikler)
- [Kurulum](#kurulum)
- [Kullanim](#kullanim)
- [API Dokumantasyonu](#api-dokumantasyonu)
- [Guvenlik](#guvenlik)
- [Proje Yapisi](#proje-yapisi)
- [Teknolojiler](#teknolojiler)

## Ozellikler

### Musteri Paneli
- SMS dogrulama ile kayit/giris sistemi (sifresiz)
- Ayri kayit ol ve giris yap akislari
- Profil duzenleme (ad, soyad, adres)
- Oturum hatirla ve cikis yapabilme
- Kategorilere gore menu goruntuleme (kaydirilabilir kategori cizgisi)
- Sepete urun ekleme/cikarma
- 3 farkli odeme secenegi:
  - Kapida Nakit
  - Kapida Kart
  - Online Odeme
- Siparis gecmisi ve takibi
- Siparis iptali (yola cikmadan once)
- Mobil uyumlu tasarim

### Admin/Tezgah Paneli
- JWT tabanli guvenli giris sistemi
- Varsayilan kullanici: admin / admin123
- Sifre degistirme ozelligi
- Anlik siparis bildirimi (ses + masaustu)
- Siparis durumu guncelleme
- Siparis ID kopyalama (kurye icin)
- Menu Yonetimi:
  - Urun ekleme/duzenleme/silme
  - Gorsel yukleme (PNG, JPG, GIF, WebP - max 5MB)
  - Emoji destegi
  - Urun fiyati ve aciklamasi
  - Satista/Satista degil durumu
- Kategori Yonetimi:
  - Kategori ekleme/silme
  - Emoji ile kategori simgesi
  - Urunlu kategori silme korumasi

### Kurye Paneli
- JWT tabanli guvenli giris sistemi
- Siparis ID ile arama
- Siparis detaylarini goruntuleme
- Telefon numarasina dokunarak arama
- Haritada adres gosterme
- Teslimat onaylama

### Gercek Zamanli Ozellikler
- WebSocket ile anlik guncellemeler
- Yeni siparis bildirimi
- Durum degisikligi senkronizasyonu

### Guvenlik Ozellikleri
- JWT (JSON Web Token) tabanli kimlik dogrulama
  - Admin token suresi: 24 saat
  - Musteri token suresi: 7 gun
- Bcrypt ile sifre hashleme
- Tum admin endpoint'leri korumali
- Musteri siparisleri JWT ile korumali (kimlik taklidi engellendi)
- Guvenli dosya yukleme (mimetype tabanli uzanti dogrulama)
- SMS dogrulama kodlari 5 dakika sonra otomatik silinir
- Yetkisiz erisim engelleme

## Kurulum

### Gereksinimler
- Node.js 18+
- Go 1.22+
- Docker + Docker Compose
- npm veya yarn

### Adimlar

1. Repoyu klonlayin:
```bash
git clone https://github.com/cekYc/merchant_online_order.git
cd merchant_online_order
```

2. Bagimliliklari yukleyin:
```bash
npm install
cd client && npm install && cd ..
cd server-go && go mod download && cd ..
```

3. Ortam degiskenlerini hazirlayin:
```bash
copy server-go/.env.example server-go/.env
```

4. Docker servislerini baslatin (Postgres + MinIO):
```bash
docker compose up -d
```

5. Uygulamayi baslatin:
```bash
npm run dev
```

Bu komut Docker servislerini de kaldirir, sonra Go API'yi (port 3001) ve client'i (port 5173) ayni anda baslatir.

Not: Yerel Docker portlari bu proje icin 5433 (Postgres) ve 9002/9003 (MinIO) olarak ayrildi.

## Kullanim

### Erisim Linkleri

| Panel | URL | Aciklama |
|-------|-----|----------|
| Musteri | http://localhost:5173 | Siparis verme |
| Admin | http://localhost:5173/admin | Siparis ve menu yonetimi |
| Kurye | http://localhost:5173/courier | Teslimat takibi |

### Varsayilan Admin Girisi
- Kullanici Adi: admin
- Sifre: admin123
- Onemli: Ilk giriste sifreyi degistirin!

### Varsayilan Kurye Girisi
- Kullanici Adi: courier
- Sifre: courier123

### Siparis Durumlari

| Durum | Aciklama |
|-------|----------|
| Yeni Siparis | Siparis alindi, onay bekliyor |
| Hazirlaniyor | Siparis hazirlaniyor |
| Hazir | Siparis hazir, kurye bekliyor |
| Yolda | Kurye yola cikti |
| Teslim Edildi | Siparis teslim edildi |
| Iptal | Siparis iptal edildi |

### SMS Dogrulama (Gelistirme Modu)
Gelistirme modunda SMS kodlari konsola yazdirilir ve API response'unda devCode olarak doner.
Production'da gercek SMS servisi entegre edilmelidir.

## API Dokumantasyonu

### Genel Endpointler (Public)

```
GET  /healthz               # Saglik kontrolu
GET  /api/menu              # Menuyu getir (sadece aktif urunler)
GET  /api/categories        # Kategorileri getir
GET  /ws                    # WebSocket (upgrade gerekli)
```

### Kimlik Dogrulama Endpointleri

```
POST /api/admin/login       # Admin girisi, JWT token doner
GET  /api/admin/verify      # Token dogrulama (Auth gerekli)
POST /api/admin/change-password # Sifre degistir (Auth gerekli)
POST /api/courier/login     # Kurye girisi, JWT token doner
GET  /api/courier/verify    # Kurye token dogrulama (Auth gerekli)
```

### SMS Dogrulama Endpointleri

```
POST /api/auth/send-code    # SMS kodu gonder
POST /api/auth/verify-code  # SMS kodunu dogrula
POST /api/auth/register     # Musteri kayit/guncelleme
```

### Siparis Endpointleri

```
GET  /api/orders            # Tum siparisler (Admin Auth gerekli)
POST /api/orders            # Yeni siparis olustur (Musteri Auth gerekli)
GET  /api/orders/:id        # Siparis detayi (Public - kurye icin)
PATCH /api/orders/:id/status # Durum guncelle (Admin Auth gerekli)
PATCH /api/orders/:id/cancel # Siparis iptal (musteri)
```

### Musteri Endpointleri

```
GET  /api/customers/:customerId/orders  # Musteri siparisleri
```

### Admin Endpointleri (Tumu Auth Gerekli)

```
POST   /api/upload               # Gorsel yukle
GET    /api/admin/menu           # Tum menu ogeleri
POST   /api/admin/menu           # Urun ekle
PUT    /api/admin/menu/:id       # Urun guncelle
DELETE /api/admin/menu/:id       # Urun sil

POST   /api/admin/categories     # Kategori ekle
PUT    /api/admin/categories/:id # Kategori guncelle
DELETE /api/admin/categories/:id # Kategori sil
```

## Guvenlik

### JWT Kimlik Dogrulama
Tum admin ve kritik islemler JWT token ile korunmaktadir.

Token alma:
```bash
curl -X POST http://localhost:3001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

Token kullanma:
```bash
curl http://localhost:3001/api/admin/menu \
  -H "Authorization: Bearer <token>"
```

### Korumali Endpointler
- POST /api/upload
- GET/POST/PUT/DELETE /api/admin/menu/*
- GET/POST/PUT/DELETE /api/admin/categories/*
- GET /api/orders (tum siparisler)
- PATCH /api/orders/:id/status

### Guvenlik Onerileri
1. Production'da JWT_SECRET environment variable olarak ayarlanmali
2. Varsayilan admin sifresi hemen degistirilmeli
3. HTTPS kullanilmali
4. Rate limiting eklenebilir

## Proje Yapisi

```
merchant_online_order/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Bilesenleri
│   │   │   ├── Menu.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── Checkout.tsx
│   │   │   ├── MyOrders.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── AdminLogin.tsx
│   │   │   └── OrderSuccess.tsx
│   │   ├── contexts/       # React Context
│   │   │   ├── AdminContext.tsx
│   │   │   └── CourierContext.tsx
│   │   ├── pages/          # Sayfa Bilesenleri
│   │   │   ├── CustomerApp.tsx
│   │   │   ├── AdminPanel.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   └── CourierPanel.tsx
│   │   ├── App.tsx         # Ana uygulama + CartContext
│   │   ├── main.tsx        # Giris noktasi
│   │   └── index.css       # Tailwind stiller
│   ├── package.json
│   └── vite.config.js
│
├── server-go/              # Go Backend
│   ├── cmd/api/main.go     # Ana giris
│   ├── internal/           # Handler, router, auth, ws
│   ├── db/migrations/      # Postgres semasi
│   ├── db/queries/         # sqlc query dosyalari
│   └── sqlc.yaml
│
│
├── package.json            # Root package (concurrently)
├── docker-compose.yml       # Postgres + MinIO
└── README.md
```

## Veritabani Semasi
Semayi tek kaynaktan takip etmek icin [server-go/db/migrations/001_init.sql](server-go/db/migrations/001_init.sql) dosyasini baz alin.

Temel tablolar: customers, admins, couriers, categories, menu_items, orders, sms_codes.

## Teknolojiler

### Frontend
- React 18 - UI Framework
- Vite 6 - Build Tool
- Tailwind CSS - Styling
- React Router DOM 7 - Routing
- WebSocket - Gercek zamanli iletisim
- Lucide React - Ikonlar

### Backend
- Go 1.22 - Runtime
- Chi - HTTP Router
- pgx + sqlc - Postgres katmani
- gorilla/websocket - WebSocket
- AWS SDK v2 (S3) - Medya depolama
- JWT + bcrypt - Kimlik dogrulama

### Veritabani
- PostgreSQL 16
- MinIO (S3 uyumlu) - Gelistirme ortami depolama

## Lisans

MIT License

## Gelistirici

Eray Cicek

---

GitHub: https://github.com/cekYc/merchant_online_order
