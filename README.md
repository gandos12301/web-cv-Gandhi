# Achmad Gandhi — Portfolio & CV

Website CV/portfolio statis (HTML + CSS + JavaScript murni, tanpa framework dan tanpa langkah build).
Semua path memakai path relatif, jadi aman dibuka di `https://username.github.io/nama-repo/`.

## Struktur

```
index.html            halaman utama (ikon SVG sudah tertanam)
style.css             seluruh gaya, termasuk gaya cetak/PDF
script.js             demo Python, navigasi, formulir, dan SITE_CONFIG (isi kontak di sini)
404.html              halaman "tidak ditemukan"
.nojekyll             mencegah GitHub Pages memproses file lewat Jekyll
assets/
  img/                foto profil (jpg + webp, 480w dan 800w)
  fonts/              Bricolage Grotesque & JetBrains Mono (self-hosted, subset latin)
  favicon.svg
.github/workflows/deploy.yml   deploy otomatis ke GitHub Pages
```

## Mengisi kontak

Buka `script.js`, isi objek `SITE_CONFIG` di bagian atas. Kolom yang kosong tidak ditampilkan.

```js
const SITE_CONFIG = {
  email: "nama@email.com",
  whatsapp: "6281234567890",   // format internasional tanpa +
  github: "https://github.com/username",
  linkedin: "https://www.linkedin.com/in/username",
  instagram: "https://www.instagram.com/username"
};
```

Formulir kontak membuka aplikasi email (jika `email` diisi) atau WhatsApp (jika hanya `whatsapp` diisi)
dengan pesan yang sudah terisi. Jika keduanya kosong, formulir menampilkan pesan bahwa pesan belum terkirim.

## Pratinjau lokal

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

## Deploy ke GitHub Pages

1. Buat repository di GitHub (nama bebas, mis. `web-cv`; atau `USERNAME.github.io` agar URL tanpa nama repo).
2. Isi `SITE_CONFIG` di `script.js`, lalu push seluruh isi folder ini ke branch `main`
   (pastikan folder tersembunyi `.github` ikut ter-upload):
   ```bash
   git init
   git add .
   git commit -m "Redesign website CV"
   git branch -M main
   git remote add origin https://github.com/USERNAME/NAMA-REPO.git
   git push -u origin main
   ```
3. Di GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Buka tab **Actions**, tunggu workflow "Deploy ke GitHub Pages" selesai (centang hijau).
5. Website tayang di `https://USERNAME.github.io/NAMA-REPO/` (alamat juga tertera di langkah *deploy*).

Setiap `git push` ke `main` berikutnya akan memperbarui website secara otomatis.

Alternatif tanpa Actions: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.

## Mengganti foto

Ganti file di `assets/img/` (`gandhi-800.jpg`, `gandhi-800.webp`, `gandhi-480.jpg`, `gandhi-480.webp`)
dengan nama yang sama. Rasio ideal 2:3 (potret).
