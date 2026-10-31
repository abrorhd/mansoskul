# Latihan Mansoskul DJP

Latihan soal Situational Judgment Test (SJT) Kompetensi Manajerial dan Sosial Kultural berdasarkan Permenpan RB 38/2017, dengan latar kantor pajak.

Setiap paket berisi 50 soal yang langsung dinilai saat dijawab (bobot 1–5). Setelah menjawab, halaman menampilkan kunci, alasannya, dan level kompetensi soal tersebut. Tab Rekap merangkum skor per kompetensi dan per level.

Situs statis tanpa build step dan tanpa dependensi.

## Isi repo

| Path | Isi |
| --- | --- |
| `index.html` | Daftar paket beserta progres pengerjaan di browser ini |
| `paket.json` | Manifest paket (urutan, tingkat, level, kunci penyimpanan) |
| `paket/<tanggal>/index.html` | Satu halaman latihan mandiri per paket |
| `scripts/tambah-paket.mjs` | Menambahkan paket baru dan memperbarui manifest |
| `vercel.json` | Konfigurasi Vercel (clean URL, cache manifest) |

## Menjalankan lokal

```bash
npx serve .
```

## Deploy ke Vercel

1. Di vercel.com, pilih **Add New → Project** lalu impor repo ini dari GitHub.
2. Framework Preset: **Other**. Build Command dan Output Directory dibiarkan kosong.
3. Klik **Deploy**. Setiap push ke `main` akan men-deploy ulang otomatis.

## Menambah paket harian

Ekspor HTML paket baru dari artifact, lalu jalankan:

```bash
node scripts/tambah-paket.mjs latihan-baru.html 2026-11-01 "Sangat sulit" "Level 1–5"
git add . && git commit -m "Paket 1 November 2026" && git push
```

Skrip menyalin halaman ke `paket/2026-11-01/`, menambahkan tautan kembali ke daftar, dan memperbarui `paket.json`.

## Catatan

Label level adalah pemetaan opsi berbobot 5 ke indikator perilaku Permenpan RB 38/2017, bukan label resmi. Jawaban disimpan di `localStorage` browser, terpisah per paket.
