#!/usr/bin/env node
// Menambahkan paket baru dari file HTML hasil export artifact.
// Pakai: node scripts/tambah-paket.mjs <file.html> <YYYY-MM-DD> [tingkat] [level]
// Contoh: node scripts/tambah-paket.mjs ~/Downloads/latihan.html 2026-11-01 "Sangat sulit" "Level 1–5"
import fs from "node:fs";
import path from "node:path";

const [src, tanggal, tingkat = "Sulit", level = "Level 1–5"] = process.argv.slice(2);
if (!src || !/^\d{4}-\d{2}-\d{2}$/.test(tanggal || "")) {
  console.error("Pakai: node scripts/tambah-paket.mjs <file.html> <YYYY-MM-DD> [tingkat] [level]");
  process.exit(1);
}
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
let html = fs.readFileSync(src, "utf8");

const key = (html.match(/KEY="([^"]+)"/) || [])[1];
if (!key) { console.error("Konstanta KEY tidak ditemukan di file."); process.exit(1); }
const jumlah = (html.match(/\["(INT|KS|OH|PP|PK|KOM|MP|PD|PB)","/g) || []).length;

if (!/^<!doctype/i.test(html.trim())) {
  html = '<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>\n' + html + "\n</body></html>\n";
}
html = html.replace("<html>", '<html lang="id">');
if (!html.includes("Semua paket")) {
  html = html.replace("<h1>Latihan Mansoskul DJP</h1>",
    '<a class="backlink" href="/" style="font:600 13px var(--font-body,system-ui);color:var(--accent,#0E5A6E);text-decoration:none;white-space:nowrap">&larr; Semua paket</a>\n      <h1>Latihan Mansoskul DJP</h1>');
}

const dir = path.join(root, "paket", tanggal);
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, "index.html"), html);

const BULAN = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const [y, m, d] = tanggal.split("-").map(Number);
const manifestPath = path.join(root, "paket.json");
const list = JSON.parse(fs.readFileSync(manifestPath, "utf8")).filter(p => p.id !== tanggal);
list.unshift({ id: tanggal, tanggal, judul: `Paket ${d} ${BULAN[m - 1]} ${y}`, tingkat, level, kunci: key, jumlah: jumlah || 50 });
list.sort((a, b) => (a.tanggal < b.tanggal ? 1 : a.tanggal > b.tanggal ? -1 : 0));
fs.writeFileSync(manifestPath, JSON.stringify(list, null, 2) + "\n");
console.log(`Paket ${tanggal} ditambahkan (${jumlah || 50} soal, kunci ${key}).`);
