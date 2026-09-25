/**
 * Persistent counters for GitHub Pages via a free public CountAPI.
 * GitHub Pages is static — it cannot store numbers itself.
 *
 * Service: https://countapi.mileshilliard.com/ (no signup)
 * Keys are public; use unique names to avoid collisions.
 */
(function (global) {
  "use strict";

  const BASE = "https://countapi.mileshilliard.com/api/v1";
  const KEY_VISITS = "happywheels_mobile_levelxml_visits_v1";
  const KEY_DOWNLOADS = "happywheels_mobile_levelxml_downloads_v1";
  const SESSION_FLAG = "hw_mobile_levelxml_visit_counted";

  function formatCount(n) {
    const num = Number(n);
    if (!Number.isFinite(num)) return "—";
    return String(Math.max(0, Math.floor(num)));
  }

  async function api(path) {
    const res = await fetch(BASE + path, { cache: "no-store" });
    if (!res.ok) throw new Error("counter HTTP " + res.status);
    return res.json();
  }

  async function getCount(key) {
    try {
      const data = await api("/get/" + encodeURIComponent(key));
      return Number(data.value) || 0;
    } catch (_) {
      return 0;
    }
  }

  async function hit(key) {
    const data = await api("/hit/" + encodeURIComponent(key));
    return Number(data.value) || 0;
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = formatCount(value);
  }

  async function recordVisit() {
    try {
      if (!sessionStorage.getItem(SESSION_FLAG)) {
        const value = await hit(KEY_VISITS);
        sessionStorage.setItem(SESSION_FLAG, "1");
        setText("stat-visits", value);
      } else {
        setText("stat-visits", await getCount(KEY_VISITS));
      }
    } catch (_) {
      setText("stat-visits", "—");
    }

    try {
      setText("stat-downloads", await getCount(KEY_DOWNLOADS));
    } catch (_) {
      setText("stat-downloads", "—");
    }
  }

  async function recordDownload() {
    try {
      const value = await hit(KEY_DOWNLOADS);
      setText("stat-downloads", value);
      return value;
    } catch (_) {
      try {
        setText("stat-downloads", await getCount(KEY_DOWNLOADS));
      } catch (__) {
        /* ignore */
      }
      return null;
    }
  }

  function wireDownloadLinks() {
    document.addEventListener("click", (ev) => {
      const a = ev.target.closest("a[download], a[href*='downloads/'], a[href*='user_created_levels/'], a[href*='pc_converted/']");
      if (!a) return;
      // Only count actual file downloads from this site
      const href = a.getAttribute("href") || "";
      if (
        href.includes("downloads/") ||
        href.includes("user_created_levels/") ||
        href.includes("pc_converted/") ||
        a.hasAttribute("download")
      ) {
        recordDownload();
      }
    });
  }

  global.HWStats = {
    recordVisit,
    recordDownload,
  };

  function boot() {
    recordVisit();
    wireDownloadLinks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(typeof window !== "undefined" ? window : globalThis);
