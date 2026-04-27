# RaapTech Website - Team Handoff

**Date:** April 20, 2026  
**Repo:** https://github.com/RaapTechllc/RaapTech  
**Branch:** `main`  
**Status:** Code complete. Launch readiness depends on environment setup and credentials.

---

## Verified In Code (Do Not Refactor Before Launch)

These items were re-verified in April 2026:

- **HTML (`index.html`)** - SEO meta, JSON-LD, CSP meta tag, manifest, preload/dns-prefetch, skip link, aria-live success state, aria-expanded mobile toggle, autocomplete, lazy loading, noscript fallback.
- **CSS (`styles.css`)** - Responsive breakpoints (1024/768/480), form error states, focus-visible styles, reduced motion support, active nav state, mobile menu transitions, tabular number stats, back-to-top button styling.
- **JS (`script.js`)** - requestAnimationFrame-throttled scroll logic, stat counters, smart header, back-to-top control, robust form validation, submit lock, 15s timeout with AbortController, menu close on outside click and Escape, aria sync, phone formatting, parallax hero.
- **404 page (`404.html`)** - Fully self-contained branded error page.

---

## Current Integration Stack

Two supported workflow paths are available in this repo:

- **Legacy guide:** `N8N_SETUP_GUIDE.md` (Anthropic + Slack + SMTP style setup).
- **Current preferred guide:** `SETUP_GUIDE_GOOGLE_OPENROUTER.md` (OpenRouter + Google ecosystem).

For new deployments, use **OpenRouter + Google** unless you explicitly need the legacy path.

---

## Human-In-The-Loop Items (Launch Blockers First)

### 1) CRITICAL - Set Production n8n Webhook URL

**File:** `script.js`  
**Find:** `var N8N_WEBHOOK_URL = 'YOUR_N8N_WEBHOOK_URL_HERE';`  

**Action:**
1. Import one workflow into n8n:
   - `raaptech-lead-workflow.json` (recommended baseline), or
   - `n8n-workflow-updated.json` (extended variant).
2. Open the Webhook trigger node.
3. Copy the **Production URL**.
4. Paste into `script.js` for `N8N_WEBHOOK_URL`.

**Acceptance:** form submit hits n8n execution history and writes to Google Sheets.

---

### 2) REQUIRED - Deploy Nginx Config

**Reference:** `DEPLOYMENT_CHECKLIST.md` section 2.

Must include:

```nginx
error_page 404 /404.html;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
```

**Acceptance:** custom 404 renders and headers appear in response headers.

---

### 3) REQUIRED - Install SSL

Run on VPS:

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d raaptech.com -d www.raaptech.com
sudo certbot renew --dry-run
```

**Acceptance:** HTTPS valid for root and www, no mixed-content warnings.

---

### 4) OPTIONAL - Analytics (Implemented Option: Plausible)

Recommended for this static site:

- Add Plausible script in `index.html`.
- Keep CSP aligned for `plausible.io`.
- Define a custom event for successful form submission if desired.

**Acceptance:** pageviews visible in Plausible dashboard.

---

### 5) OPTIONAL - WebP Migration

Current assets are JPEG and already optimized. WebP can still reduce bandwidth.

```bash
cd images/
for f in *.jpeg; do cwebp -q 80 "$f" -o "${f%.jpeg}.webp"; done
```

Then migrate each image usage in `index.html` to `<picture>` patterns.

---

## File Map (April 2026)

| File | Purpose | Launch Touch? |
|------|---------|---------------|
| `index.html` | Site markup, SEO, CSP, analytics include | Yes (analytics/CSP only) |
| `styles.css` | All site styling and responsive behavior | No |
| `script.js` | Interactions, form handling, webhook submit | Yes (webhook URL only) |
| `404.html` | Standalone branded 404 page | No |
| `DEPLOYMENT_CHECKLIST.md` | VPS + Nginx + SSL deployment runbook | Reference |
| `N8N_SETUP_GUIDE.md` | Legacy n8n setup path | Reference |
| `SETUP_GUIDE_GOOGLE_OPENROUTER.md` | Preferred OpenRouter + Google setup | Reference |
| `AI_AUDIT_WORKFLOW_GUIDE.md` | AI audit workflow details | Reference |
| `raaptech-lead-workflow.json` | Recommended workflow import | Import, do not edit |
| `n8n-workflow-updated.json` | Alternative expanded workflow | Import, do not edit |
| `n8n-workflow.json` | Older starter workflow | Legacy reference |
| `n8n-workflow-complete.json` | Older complete workflow variant | Legacy reference |

---

## Go-Live Checklist

- [ ] Production webhook URL set in `script.js`
- [ ] Workflow imported and activated in n8n
- [ ] OpenRouter/API credentials configured in n8n (if using OpenRouter path)
- [ ] Google Sheets + Gmail/Google Chat credentials configured (if using Google path)
- [ ] Site files uploaded to `/var/www/raaptech.com/`
- [ ] Nginx config applied and reloaded
- [ ] SSL certificate installed and renewal dry-run passes
- [ ] End-to-end form test passes (website -> n8n -> Sheets -> notification/email)
- [ ] `https://raaptech.com/nonexistent-page` returns branded 404
- [ ] Mobile smoke test complete (iPhone + Android)
- [ ] Analytics validated (optional)

---

## Escalation

- **Deployment issues:** `DEPLOYMENT_CHECKLIST.md`
- **n8n workflow issues:** `SETUP_GUIDE_GOOGLE_OPENROUTER.md` then `N8N_SETUP_GUIDE.md`
- **Code questions:** `README.md` + this handoff
- **Owner:** Timothy K. Raap - TRaap@RaapTech.com / 224-202-6962
