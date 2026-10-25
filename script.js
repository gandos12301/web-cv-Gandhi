/* ==========================================================================
   Achmad Gandhi — Portfolio & CV
   ========================================================================== */

/* --------------------------------------------------------------------------
   PENGATURAN KONTAK — isi sendiri.
   Kolom yang dikosongkan tidak akan ditampilkan di website.
   -------------------------------------------------------------------------- */
const SITE_CONFIG = {
  email: "",      // contoh: "achmad@email.com"
  whatsapp: "",   // format internasional tanpa tanda +, contoh: "6281234567890"
  github: "",     // contoh: "https://github.com/username"
  linkedin: "",   // contoh: "https://www.linkedin.com/in/username"
  instagram: ""   // contoh: "https://www.instagram.com/username"
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --------------------------------------------------------------------------
   Demo kode Python (isi kode & output asli dari versi sebelumnya)
   -------------------------------------------------------------------------- */
const pythonDemos = {
  calc: {
    file: "kalkulator.py",
    code: `# Program Kalkulator Sederhana (Python)
def tambah(a, b):
    return a + b

def kurang(a, b):
    return a - b

x = 10
y = 5

print("--- Hasil Perhitungan ---")
print(f"{x} + {y} = {tambah(x, y)}")
print(f"{x} - {y} = {kurang(x, y)}")`,
    output: `--- Hasil Perhitungan ---
10 + 5 = 15
10 - 5 = 5
[Process finished with exit code 0]`
  },
  evenodd: {
    file: "cek_ganjil.py",
    code: `# Program Cek Bilangan Ganjil / Genap
angka = 7

print(f"Mengecek angka: {angka}")

if angka % 2 == 0:
    print(f"{angka} adalah Bilangan GENAP")
else:
    print(f"{angka} adalah Bilangan GANJIL")`,
    output: `Mengecek angka: 7
7 adalah Bilangan GANJIL
[Process finished with exit code 0]`
  },
  todolist: {
    file: "tugas_list.py",
    code: `# Program List Tugas Sederhana
tugas = ["Belajar Python", "Praktik Network", "Update CV"]

print("Daftar Tugas Hari Ini:")
for index, item in enumerate(tugas, start=1):
    print(f"{index}. {item}")`,
    output: `Daftar Tugas Hari Ini:
1. Belajar Python
2. Praktik Network
3. Update CV
[Process finished with exit code 0]`
  }
};

const IDLE_HINT = 'Klik tombol "Jalankan kode" untuk melihat hasil eksekusi program.';

let currentDemo = "calc";
let runTimers = [];

/* Penyorot sintaks sederhana (cukup untuk contoh di atas) */
const TOKEN = /(#.*$)|(f?"(?:[^"\\]|\\.)*")|\b(def|return|if|else|for|in)\b|\b(print|enumerate)\b|\b(\d+)\b|\b([A-Za-z_]\w*)(?=\()/g;

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightLine(line) {
  let html = "";
  let last = 0;
  let m;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(line)) !== null) {
    html += escapeHtml(line.slice(last, m.index));
    const [, comment, string, keyword, builtin, number, fn] = m;
    if (comment) {
      html += `<span class="t-c">${escapeHtml(comment)}</span>`;
    } else if (string) {
      const inner = escapeHtml(string).replace(/\{[^}]*\}/g, (x) => `<span class="t-i">${x}</span>`);
      html += `<span class="t-s">${inner}</span>`;
    } else if (keyword) {
      html += `<span class="t-k">${keyword}</span>`;
    } else if (builtin || fn) {
      html += `<span class="t-f">${builtin || fn}</span>`;
    } else if (number) {
      html += `<span class="t-n">${number}</span>`;
    }
    last = TOKEN.lastIndex;
  }
  html += escapeHtml(line.slice(last));
  return html || " ";
}

function clearRunTimers() {
  runTimers.forEach(clearTimeout);
  runTimers = [];
}

function setTerminalIdle() {
  const term = document.getElementById("terminalOutput");
  term.innerHTML = "";
  const hint = document.createElement("div");
  hint.className = "term-dim";
  hint.textContent = IDLE_HINT;
  term.appendChild(hint);
}

function loadCode(key) {
  const demo = pythonDemos[key];
  if (!demo) return;
  currentDemo = key;
  clearRunTimers();

  const code = document.getElementById("pythonCode");
  code.innerHTML = demo.code
    .split("\n")
    .map((line) => `<span class="line">${highlightLine(line)}</span>`)
    .join("");

  setTerminalIdle();
}

function appendTermLine(term, text, className) {
  const row = document.createElement("div");
  if (className) row.className = className;
  row.textContent = text;
  term.appendChild(row);
}

function runCode() {
  const demo = pythonDemos[currentDemo];
  const term = document.getElementById("terminalOutput");
  clearRunTimers();
  term.innerHTML = "";

  const prompt = document.createElement("div");
  const mark = document.createElement("span");
  mark.className = "term-prompt";
  mark.textContent = "$ ";
  prompt.appendChild(mark);
  prompt.appendChild(document.createTextNode(`python ${demo.file}`));
  term.appendChild(prompt);

  const lines = demo.output.split("\n");
  lines.forEach((line, i) => {
    const show = () => appendTermLine(term, line, line.startsWith("[Process") ? "term-dim" : "");
    if (prefersReducedMotion) {
      show();
    } else {
      runTimers.push(setTimeout(show, 350 + i * 170));
    }
  });
}

function initDemo() {
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const panel = document.getElementById("demoPanel");

  function select(tab, focus) {
    tabs.forEach((t) => {
      const active = t === tab;
      t.setAttribute("aria-selected", String(active));
      t.tabIndex = active ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", tab.id);
    loadCode(tab.dataset.demo);
    if (focus) tab.focus();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab, false));
    tab.addEventListener("keydown", (e) => {
      let next = null;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === "Home") next = tabs[0];
      if (e.key === "End") next = tabs[tabs.length - 1];
      if (next) {
        e.preventDefault();
        select(next, true);
      }
    });
  });

  document.getElementById("runBtn").addEventListener("click", runCode);
  loadCode("calc");
}

/* --------------------------------------------------------------------------
   Navigasi
   -------------------------------------------------------------------------- */
function initNav() {
  const header = document.getElementById("siteHeader");
  const nav = document.getElementById("siteNav");
  const toggle = document.getElementById("navToggle");
  const links = Array.from(nav.querySelectorAll(".nav-link"));

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Tutup menu navigasi" : "Buka menu navigasi");
  }

  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  links.forEach((link) => link.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia("(min-width: 861px)").addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });

  // Penanda bagian aktif
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) => {
            const on = link.getAttribute("href") === `#${entry.target.id}`;
            if (on) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => spy.observe(section));

    const hero = document.getElementById("hero");
    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) links.forEach((link) => link.removeAttribute("aria-current"));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    ).observe(hero);
  }
}

/* --------------------------------------------------------------------------
   Meter keahlian terisi saat terlihat
   -------------------------------------------------------------------------- */
function initMeters() {
  const meters = document.querySelectorAll(".meter");
  if (!("IntersectionObserver" in window) || prefersReducedMotion) {
    meters.forEach((m) => m.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  meters.forEach((m) => io.observe(m));
}

/* --------------------------------------------------------------------------
   Kontak: tautan sosial, email, WhatsApp, dan formulir
   -------------------------------------------------------------------------- */
function initContact() {
  const cfg = SITE_CONFIG;

  const socials = [
    ["socialGithub", cfg.github],
    ["socialLinkedin", cfg.linkedin],
    ["socialInstagram", cfg.instagram]
  ];
  socials.forEach(([id, url]) => {
    const a = document.getElementById(id);
    if (a && url) {
      a.href = url;
      a.hidden = false;
    }
  });

  if (cfg.email) {
    const row = document.getElementById("detailEmail");
    const link = document.getElementById("detailEmailLink");
    link.href = `mailto:${cfg.email}`;
    link.textContent = cfg.email;
    row.hidden = false;
  }

  if (cfg.whatsapp) {
    const row = document.getElementById("detailWa");
    const link = document.getElementById("detailWaLink");
    link.href = `https://wa.me/${cfg.whatsapp}`;
    link.textContent = `+${cfg.whatsapp}`;
    row.hidden = false;
  }

  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  function say(text, state) {
    status.textContent = text;
    status.dataset.state = state;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const contact = document.getElementById("contactInfo").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !contact || !message) {
      say("Lengkapi nama, kontak, dan pesan terlebih dahulu.", "warn");
      return;
    }

    const body = `Halo Achmad, saya ${name} (${contact}).\n\n${message}`;

    if (cfg.email) {
      const subject = `Pesan dari ${name} via website CV`;
      window.location.href = `mailto:${cfg.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      say("Membuka aplikasi email Anda. Tekan kirim di sana untuk menyelesaikan.", "ok");
      form.reset();
    } else if (cfg.whatsapp) {
      window.open(`https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
      say("Membuka WhatsApp. Tekan kirim di sana untuk menyelesaikan.", "ok");
      form.reset();
    } else {
      say("Pesan belum terkirim: formulir ini belum terhubung ke email atau WhatsApp.", "warn");
    }
  });
}

/* --------------------------------------------------------------------------
   Inisialisasi
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("printBtn").addEventListener("click", () => window.print());

  initNav();
  initDemo();
  initMeters();
  initContact();
});
