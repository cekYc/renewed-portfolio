<div align="center">
  <img src="https://img.shields.io/badge/Versiyon-Beta_v0.2.3-blue.svg?style=for-the-badge" alt="Versiyon" />
  <img src="https://img.shields.io/badge/Dil-Rust-orange.svg?style=for-the-badge" alt="Rust" />
  <img src="https://img.shields.io/badge/API-Vulkan-red.svg?style=for-the-badge" alt="Vulkan" />
  
  <h1>🌌 Project M - Voxel Engine</h1>
  <p><strong>Yüksek Performanslı, Vulkan Tabanlı Özel Voxel Oyun Motoru</strong></p>
</div>

---

## 📖 Proje Hakkında

**Project M**, Rust ve Vulkan API kullanılarak sıfırdan geliştirilmiş, yüksek performanslı ve modern bir Voxel oyun motorudur. Klasik blok inşa dinamiklerini; zeki üretim sistemleri, gelişmiş fizik, tarım, hayvancılık, co-op ağ desteği ve detaylı bir termodinamik motoru ile harmanlayarak eşsiz bir hayatta kalma ve inşa deneyimi sunmayı hedefler.

## ✨ Temel Özellikler

- 🚀 **Özel Vulkan Render Motoru & Voxel Dünyası:** Özel bellek yöneticileri ve asenkron Chunk örme sistemi (Rayon tabanlı) ile devasa, prosedürel olarak üretilen dünyalarda pürüzsüz açık dünya deneyimi.
- 🌐 **Co-op (LAN) Çok Oyunculu Mod:** Herhangi bir sunucu kurulumu gerektirmeden, dünyayı kuran oyuncunun doğrudan paylaştığı ağ üzerinden arkadaşlarınızla kesintisiz, tam senkronize (animasyon, üretim, eşya) bir deneyim yaşayın.
- ⚔️ **Varlıklar (Entities) ve Savaş:** 3D kutu-modelli düşman varlıklar (The Echo, Abyssal Snare, The Cursed Taint), detaylı hitboxlar ve savaş mekanikleri. Zırh sistemi, dayanıklılık, hasar emilimi ve örs ile tamir mekanikleri.
- 🌾 **Tarım, Hayvancılık ve Mevsimler:** Dinamik mevsim döngüsüne entegre tarım (çapa, su tahliyesi, ıslaklık, buğday, patates, domates). Dört ayaklı, üreyebilen pasif hayvanlar (İnek, Koyun, Domuz, Tavuk) ve kapsamlı bir açlık/beslenme sistemi.
- 🔥 **Termodinamik (Isı) ve İleri Metalürji:** Dinamik ısı yayılımı, yakıt türüne ve ateş sıcaklığına göre kaliteli/kalitesiz fırınlama işlemleri. İşlenen materyallerden üretilen eşyaların başlangıç dayanıklılığının, fırın ustalığına bağlı olması.
- 🎒 **Gelişmiş Etkileşimli Envanter & Üretim:** SDF UI teknolojisi ile Shader üzerinden pürüzsüz çizilen 30 slotluk envanter. "Üretim matı" tabanlı çalışan Exact Match algoritmalı zeki üretim (crafting) sistemi.
- 🧭 **Zengin Keşif:** Volkan, Kızıl Orman, Dev Mantar Ormanı gibi yeni biyomlar; terk edilmiş evler, tapınaklar ve yeraltı mağara şehirleri gibi prosedürel yapılar. Dürbün ve harita ile derinlemesine bir keşif hissi.

## 🚀 Son Güncellemeler (v0.2.3 - Tarım, Hayvancılık & Keşif Çağı)

- **Mevsimler ve Tarım:** Mevsim döngüsü ile ekinlerin büyüme hızları entegre edildi. Kürek, çapa ve kova dinamikleri eklendi.
- **Hayvancılık Sistemi:** Domuz, inek, koyun, tavuk modelleri; yapay zeka ile otlama, kaçış ve üreme mekanikleri getirildi.
- **Keşif ve Yapılar:** Volkan ve Dev Mantar Ormanları eklendi. Prosedürel yeryüzü/yeraltı yapıları ve ganimet sandıkları oyuna entegre edildi.
- **Genişletilmiş Açlık:** Çeşitli yiyecek türleri, fırın kalitesine göre besleyicilik ve geniş kapsamlı tokluk mekaniği sağlandı.

*(Daha eski sürümler için: Co-op Modu (v0.2.1), Isı Tabanlı Fırın (v0.2.2), Entity Sistemi (v0.2.0) güncellemelerine dair detaylar `CHANGELOG.md` dosyasında bulunabilir.)*

## 💻 Sistem Gereksinimleri

| Bileşen | Minimum / Önerilen Gereksinim |
| :--- | :--- |
| **İşletim Sistemi** | Windows 10 / 11 |
| **Derleyici** | Rust (2024 Edition) & Cargo |
| **Grafik Kartı** | Vulkan destekli modern GPU (NVIDIA, AMD, Intel Arc) |
| **Geliştirici Araçları** | Vulkan SDK (Shader derlemesi ve geliştirme süreçleri için `glslc` gereklidir) |

## 🛠️ Kurulum ve Çalıştırma

Projeyi derlemek ve yüksek performansta deneyimlemek için terminalinizde aşağıdaki komutu çalıştırın:

```bash
cargo run --release
```

> **Not:** Vulkan shader dosyalarının derlenebilmesi için sisteminizde [Vulkan SDK](https://vulkan.lunarg.com/sdk/home) kurulu olması ve `glslc` aracının ortam değişkenlerinize (PATH) eklenmiş olması gerekmektedir.

## 🎮 Kontroller

| Tuş | Eylem |
| :--- | :--- |
| <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> | Karakter Hareketi |
| <kbd>Space</kbd> | Zıplama / Suda Yükselme |
| <kbd>Left Shift</kbd> | Eğilme (Sneak) / Suda Alçalma |
| **Sol Tık** | Blok/Varlık Vurma, Eşya Birleştirme |
| **Sağ Tık** | Blok/Eşya Koyma, Dürbün Kullanımı, Etkileşim |
| **Fare Tekerleği**| Hotbar (Hızlı Erişim) slotları arasında geçiş |
| <kbd>E</kbd> | Envanteri Aç / Kapat |
| <kbd>T</kbd> | Co-op Sohbetini Aç |
| <kbd>ESC</kbd> | Menüyü Aç / Oyunu Duraklat / Co-op Paylaş |
| <kbd>V</kbd> | Noclip (Duvarlardan geçme) Modunu Aç / Kapat |
| <kbd>F3</kbd> | Geliştirici (Debug) Menüsünü Aç / Kapat |

---
<div align="center">
  <sub>Rust ile 🦀 sevgiyle geliştirildi.</sub>
</div>
