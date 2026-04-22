# RaapTech Website - Deployment Checklist

## Pre-Launch Checklist

### ✅ Files Ready
- [ ] All HTML/CSS/JS files
- [ ] All images compressed (483KB total)
- [ ] Sitemap.xml created
- [ ] Robots.txt created
- [ ] n8n workflow ready

---

## Deployment Steps

### 1. Upload to Hostinger VPS

**Connect via SSH:**
```bash
ssh your-user@your-vps-ip
```

**Create web directory:**
```bash
sudo mkdir -p /var/www/raaptech.com
cd /var/www/raaptech.com
```

**Upload files (from your local machine):**
```bash
# Option A: Using SCP
scp raaptech-website.zip your-user@your-vps-ip:/var/www/raaptech.com/
ssh your-user@your-vps-ip
cd /var/www/raaptech.com
unzip raaptech-website.zip

# Option B: Using SFTP
sftp your-user@your-vps-ip
put raaptech-website.zip
```

**Set permissions:**
```bash
sudo chown -R www-data:www-data /var/www/raaptech.com
sudo chmod -R 755 /var/www/raaptech.com
```

### 2. Configure Nginx

**Create Nginx config:**
```bash
sudo nano /etc/nginx/sites-available/raaptech.com
```

**Paste this config:**
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name raaptech.com www.raaptech.com;
    
    root /var/www/raaptech.com;
    index index.html;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
    
    # Custom 404 page
    error_page 404 /404.html;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Main location
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|webp)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
    }
    
    # Cache manifest
    location = /manifest.json {
        add_header Cache-Control "public, max-age=86400";
    }
    
    # Security - hide sensitive files
    location ~ /\. {
        deny all;
    }
}
```

**Enable site:**
```bash
sudo ln -s /etc/nginx/sites-available/raaptech.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 3. Setup SSL Certificate

**Install Certbot:**
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

**Get certificate:**
```bash
sudo certbot --nginx -d raaptech.com -d www.raaptech.com
```

**Auto-renewal (should be automatic, but verify):**
```bash
sudo certbot renew --dry-run
```

### 4. Setup n8n Workflow

**Preferred guide (current):** `SETUP_GUIDE_GOOGLE_OPENROUTER.md`  
**Legacy guide (optional):** `N8N_SETUP_GUIDE.md`

**Quick steps (recommended path):**
1. Import `raaptech-lead-workflow.json` (or `n8n-workflow-updated.json`) into n8n.
2. Configure credentials:
   - OpenRouter API key
   - Google Sheets OAuth
   - Gmail / Google Chat / Google Tasks as needed
3. Activate workflow and test with curl.
4. Copy the Production webhook URL.
5. Update `script.js` `N8N_WEBHOOK_URL` value.

### 5. Point Domain to VPS

**In your domain registrar (where raaptech.com is registered):**

Add these DNS records:
```
Type    Name    Value               TTL
A       @       YOUR_VPS_IP         3600
A       www     YOUR_VPS_IP         3600
```

Wait 5-60 minutes for DNS propagation.

### 6. Final Testing

**Test each feature:**
- [ ] Site loads at https://raaptech.com
- [ ] SSL certificate valid (green padlock)
- [ ] Mobile responsive (test on phone)
- [ ] All images loading
- [ ] Navigation smooth scrolling works
- [ ] Mobile menu toggles properly
- [ ] Form submission works
- [ ] Email received after form submit
- [ ] Slack notification (if configured)
- [ ] Google Sheet updated
- [ ] All links work (phone, email)

**Performance testing:**
- [ ] Google PageSpeed: https://pagespeed.web.dev
- [ ] Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- [ ] GTmetrix: https://gtmetrix.com

**SEO testing:**
- [ ] Google Search Console setup
- [ ] Submit sitemap.xml
- [ ] Check robots.txt accessible
- [ ] Structured data valid: https://search.google.com/test/rich-results

---

## Post-Launch Tasks

### Day 1
- [ ] Monitor form submissions
- [ ] Test lead notification flow
- [ ] Check analytics (if added)
- [ ] Share link on LinkedIn
- [ ] Update Google Business Profile

### Week 1
- [ ] Review lead quality
- [ ] Adjust n8n AI scoring if needed
- [ ] Fine-tune email template
- [ ] Monitor page load speeds
- [ ] Check for any console errors

### Month 1
- [ ] Google Search Console analysis
- [ ] Review conversion rates
- [ ] A/B test headline changes
- [ ] Add testimonials if collected
- [ ] Consider adding blog/resources

---

## Optional Enhancements

### Analytics (Choose One)

**Option A: Google Analytics 4 (Free)**
1. Create GA4 property: https://analytics.google.com
2. Add tracking code to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Option B: Plausible (Privacy-focused, recommended default)**
1. Sign up: https://plausible.io
2. Add one line before `</head>`:
```html
<script defer data-domain="raaptech.com" src="https://plausible.io/js/script.js"></script>
```
3. Ensure CSP allows `https://plausible.io` in `script-src` and `connect-src`.

### Facebook Pixel (for retargeting)
```html
<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

### Google Ads Conversion Tracking
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-XXXXXXXXX');
</script>
```

---

## Troubleshooting

### Site Not Loading
- Check DNS propagation: https://dnschecker.org
- Verify Nginx is running: `sudo systemctl status nginx`
- Check Nginx error log: `sudo tail -f /var/log/nginx/error.log`

### SSL Issues
- Verify certificate: `sudo certbot certificates`
- Renew manually: `sudo certbot renew`
- Check ports: `sudo netstat -tlnp | grep :443`

### Form Not Working
- Check browser console for errors
- Verify n8n webhook URL is correct
- Test webhook with curl (see n8n guide)
- Check n8n execution log

### Images Not Loading
- Verify file permissions: `ls -la /var/www/raaptech.com/images/`
- Check Nginx error log
- Clear browser cache

---

## Backup Strategy

**Weekly automated backup:**
```bash
# Create backup script
sudo nano /usr/local/bin/backup-raaptech.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf /backups/raaptech-$DATE.tar.gz /var/www/raaptech.com
# Keep only last 30 days
find /backups -name "raaptech-*.tar.gz" -mtime +30 -delete
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/backup-raaptech.sh

# Add to cron (weekly, Sunday 2am)
sudo crontab -e
0 2 * * 0 /usr/local/bin/backup-raaptech.sh
```

---

## Security Checklist

- [ ] SSL certificate installed and auto-renewing
- [ ] Nginx security headers configured
- [ ] File permissions set correctly (755 directories, 644 files)
- [ ] Hidden files (.git, .env) blocked in Nginx
- [ ] Firewall configured (ufw allow 80,443)
- [ ] SSH key-only authentication
- [ ] Regular updates: `sudo apt update && sudo apt upgrade`
- [ ] Fail2ban installed (protects against brute force)

---

## Support Resources

**Hostinger VPS:**
- Help Center: https://www.hostinger.com/tutorials/vps
- Support: Live chat in Hostinger panel

**Nginx:**
- Official Docs: https://nginx.org/en/docs/
- Config Generator: https://nginxconfig.io

**n8n:**
- Documentation: https://docs.n8n.io
- Community: https://community.n8n.io

**RaapTech:**
- Email: TRaap@RaapTech.com
- Phone: 224-202-6962

---

## Launch Day Timeline

**Hour 0: DNS Update**
- Update DNS records
- Start: 60-minute propagation wait

**Hour 1: Server Setup**
- Upload files to VPS
- Configure Nginx
- Get SSL certificate

**Hour 2: n8n Integration**
- Setup n8n workflow
- Test with form submission
- Verify email/Slack notifications

**Hour 3: Testing**
- Full site testing
- Mobile device testing
- Form submission testing
- Fix any issues

**Hour 4: Go Live**
- Final checks
- Announce on LinkedIn
- Send email to contacts
- Monitor for first 24 hours

---

*Good luck with the launch!*

**Remember:** You've built something solid. The AI automation will give you an unfair advantage over competitors still checking voicemail manually.

*Last Updated: April 20, 2026*
