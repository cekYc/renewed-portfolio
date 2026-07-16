# Ceky Stream

Ceky Stream, hibrit bir **P2P canlı yayın** platformu projesidir. Temel amacı, yüksek eşzamanlı izleyici kitlesine sahip canlı yayınların bant genişliği maliyetini, izleyiciler (peer'lar) arasında veri paylaşımı yoluyla (P2P mesh ağı) dağıtarak minimize ederken, düşük gecikme ve yüksek güvenilirlik sunmaktır.

## Mimari ve Özellikler

Projenin mimarisi, simülasyon ve fizibilite çalışmalarına (`p2p_feasibility.py`, `FIZIBILITE.md`) dayanmaktadır ve aşağıdaki temel özellikleri barındırır:

- **Multi-parent RS(k,m) Mesh & FEC:** Saf bir P2P ağacının yol açabileceği yüksek churn (kopma) oranlarına ve ağaç kırılmalarına karşı, veriler birden çok "parent" node'dan eş zamanlı indirilir. Reed-Solomon(k,m) hata düzeltme kodlaması sayesinde kayıplar anında tolere edilir.
- **Zero-Trust Kriptografi:** İzleyiciler (peer'lar) birbirlerine veri iletirken, her veri paketi (shard) Ed25519 ile imzalanmış manifestler ve BLAKE3 hash'leri ile doğrulanır. Ağdaki kötü niyetli peer'lar sahte paket sokamaz.
- **Hibrit Edge/TURN Katmanı:** Gerçek dünyadaki NAT (Ağ Adresi Çevirisi) problemlerini aşmak ve "cold start" (yeni başlayan bir yayında ağın beslenmesi) senaryolarını desteklemek için stratejik Edge/TURN sunucuları kullanılır.
- **Sığ Ağaç (Shallow Tree) & Supernode'lar:** Gecikmeyi azaltmak adına izleyiciler sınırlı derinlikte bir ağaç yapısında konumlandırılır. Kapasitesi yüksek (fiber vb.) kullanıcılar, ağı besleyen "supernode" rolünü üstlenir.

## Proje Yapısı

- `ARCHITECTURE.md`: Sistem mimarisi, bileşen haritası (Go tabanlı kontrol düzlemi, Rust tabanlı veri düzlemi) ve protokol detaylarını içerir.
- `FIZIBILITE.md`: Saf P2P vs Hibrit P2P modellerinin simülasyon sonuçlarını, limitleri ve teknik gereksinimleri detaylandırır.
- `p2p_feasibility.py`: Farklı ağ senaryolarında eşzamanlı izleyici sayısı, gecikme, churn ve TURN kullanım oranlarını ölçümleyen P2P fizibilite simülasyon betiği.
- `mvp0/` ve `spike-webrtc/`: Minimum uygulanabilir ürün (MVP) aşamaları ve WebRTC Spike / prototip çalışmaları.

## Kurulum ve Kullanım

*(Bu bölüm projenin sonraki fazlarında detaylandırılacaktır)*

Bu proje geliştirme aşamasındadır. Ana tasarım kararları için lütfen `ARCHITECTURE.md` belgesini inceleyiniz.
