# n8n Workflow Setup Guide
## RaapTech Lead Assessment Automation

> Note (April 2026): This is the legacy Anthropic/Slack-oriented setup.  
> For the current preferred deployment path, use `SETUP_GUIDE_GOOGLE_OPENROUTER.md`.

---

## What This Workflow Does

```
Lead Submits Form → AI Analysis → Lead Scoring → Multi-Channel Notification
                                                    ├── Slack Alert (Hot leads)
                                                    ├── Email Response (Personalized)
                                                    └── Google Sheet (CRM tracking)
```

**Automation Features:**
- AI analyzes every lead in seconds
- Scores leads: Hot/Warm/Cold
- Sends personalized email responses
- Notifies you via Slack for hot leads
- Tracks everything in Google Sheets

---

## Prerequisites

You need accounts for:

1. **n8n** (your VPS or n8n.cloud)
2. **Anthropic API** (Claude for AI analysis) - https://console.anthropic.com
3. **Slack** (for notifications) - https://slack.com
4. **Google Workspace** (for sheets) - You already have this
5. **SMTP Email** (Gmail or your domain email)

---

## Setup Instructions

### Step 1: Import Workflow to n8n

1. Open your n8n instance
2. Click **Workflows** → **Add Workflow** → **Import from File**
3. Upload `n8n-workflow.json` (legacy) or use `raaptech-lead-workflow.json` for current baseline
4. Workflow will open in editor

### Step 2: Configure Webhook

1. Open the **Webhook** node (first node)
2. Set these values:
   - **HTTP Method:** POST
   - **Path:** `raaptech-assessment` (or custom path)
3. Click **Listen for Test Event**
4. Copy the **Production Webhook URL** (looks like: `https://your-n8n.com/webhook/raaptech-assessment`)
5. Save this URL - you'll add it to your website

### Step 3: Setup Anthropic AI

1. Go to https://console.anthropic.com
2. Create API key
3. In n8n, go to **Credentials** → **Add Credential**
4. Select **Anthropic API**
5. Paste your API key
6. Open **AI Lead Analysis** node
7. Select your Anthropic credential

**Cost:** ~$0.01 per lead analysis (very cheap)

### Step 4: Setup Slack Notifications

**Option A: Create Slack App (Recommended)**

1. Go to https://api.slack.com/apps
2. Click **Create New App** → **From scratch**
3. Name: "RaapTech Leads"
4. Select your workspace
5. Go to **OAuth & Permissions**
6. Add these scopes:
   - `chat:write`
   - `chat:write.public`
7. Click **Install to Workspace**
8. Copy **Bot User OAuth Token**
9. In n8n **Credentials** → **Add Credential** → **Slack API**
10. Paste token
11. Create channels: `#leads-hot` and `#leads`
12. Invite the bot to both channels (`/invite @RaapTech Leads`)

**Option B: Skip Slack (for now)**
- Delete both Slack nodes
- You'll only get email notifications

### Step 5: Setup Email

**Option A: Use Gmail**

1. Enable 2FA on Gmail
2. Create App Password: https://myaccount.google.com/apppasswords
3. In n8n **Credentials** → **SMTP**
4. Settings:
   - **Host:** smtp.gmail.com
   - **Port:** 465
   - **User:** your.email@gmail.com
   - **Password:** [app password]
   - **SSL/TLS:** Yes

**Option B: Use Your Domain Email**
- Get SMTP settings from your email provider
- Add to n8n SMTP credentials

**Update Email Node:**
1. Open **Email: Lead Response** node
2. Change `fromEmail` to your actual email
3. Select your SMTP credential

### Step 6: Setup Google Sheets

1. Create new Google Sheet
2. Name it: "RaapTech Leads"
3. Add these column headers in Row 1:
   ```
   Timestamp | Lead_ID | Company | Contact | Email | Phone | Size | 
   Software | Pain_Point | AI_Audit | Lead_Score | Score_Reason | 
   Estimated_Value | Urgency | Source
   ```
4. In n8n **Credentials** → **Add Credential** → **Google Sheets OAuth2 API**
5. Follow OAuth flow to connect your Google account
6. Open **Save to Google Sheet** node
7. Select your credential
8. Select your spreadsheet
9. Select "Leads" sheet

### Step 7: Test the Workflow

1. **Activate workflow** (toggle in top right)
2. Copy your webhook URL
3. Test with curl:

```bash
curl -X POST https://your-n8n.com/webhook/raaptech-assessment \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Test HVAC Co",
    "name": "John Doe",
    "email": "test@example.com",
    "phone": "224-555-0100",
    "software": "CADmep, QuickBooks",
    "size": "11-25",
    "pain": "Slow lead response times",
    "ai_audit": true,
    "submitted_at": "2026-02-10T12:00:00Z",
    "source": "website"
  }'
```

4. Check:
   - ✅ Slack notification received?
   - ✅ Email sent to test@example.com?
   - ✅ Row added to Google Sheet?

### Step 8: Connect to Website

1. Open `script.js` in your website files
2. Find line 128:
   ```javascript
   const N8N_WEBHOOK_URL = 'YOUR_N8N_WEBHOOK_URL_HERE';
   ```
3. Replace with your actual webhook URL:
   ```javascript
   const N8N_WEBHOOK_URL = 'https://your-n8n.com/webhook/raaptech-assessment';
   ```
4. Save and deploy

---

## Workflow Logic Explained

### AI Analysis Prompt

The AI evaluates each lead based on:
- Company size (bigger = more potential)
- Current software (Autodesk users = hot leads)
- Pain point severity
- AI audit interest (shows serious intent)

### Lead Scoring

**Hot Lead:**
- Uses Autodesk software
- Clear pain point
- Wants AI audit
- Medium-large company (11+ employees)

**Warm Lead:**
- Some automation potential
- Vague pain point
- Small company or unclear need

**Cold Lead:**
- Very small company (1-5 employees)
- No clear pain point
- Just exploring

### Notifications

**Hot Leads:**
- Instant Slack alert to #leads-hot
- You get notified immediately on your phone
- Call them within 1 hour

**All Leads:**
- Personalized email sent automatically
- Includes AI analysis and recommendations
- Logged to Google Sheet for follow-up

---

## Customization Options

### Change AI Analysis

Edit the **AI Lead Analysis** node prompt to:
- Add/remove evaluation criteria
- Change scoring logic
- Request different output format

### Add More Integrations

**Popular additions:**
- **CRM:** Add HubSpot/Salesforce node
- **SMS:** Add Twilio for text alerts
- **Calendar:** Auto-schedule calls with Calendly
- **Phone:** Trigger call with Make.com

### Multi-Stage Follow-up

Add these nodes after initial response:
- Wait 2 days → Check if lead opened email
- If no reply → Send follow-up email
- Wait 1 week → Move to nurture sequence

---

## Costs & Limits

**Monthly Estimates (100 leads):**
- n8n Cloud: $20/mo (or free on your VPS)
- Anthropic API: ~$1/mo
- Slack: Free
- Google Sheets: Free
- Email: Free (Gmail/workspace)

**Total: ~$21/mo or ~$1/mo if self-hosted**

---

## Troubleshooting

### Webhook Not Triggering
- Check workflow is activated
- Verify webhook URL is correct in website
- Test with curl command above

### AI Not Responding
- Check Anthropic API key is valid
- Check you have API credits
- Try reducing prompt length

### Email Not Sending
- Verify SMTP credentials
- Check spam folder
- Test SMTP settings with n8n's test button

### Google Sheet Not Updating
- Re-authenticate Google OAuth
- Check sheet name matches exactly
- Verify column headers match workflow

---

## Security Notes

1. **Webhook Protection:**
   - Your webhook is public by default
   - Add authentication if needed (n8n supports this)
   - Monitor for spam submissions

2. **API Keys:**
   - Never commit n8n workflow with credentials
   - Use environment variables for production

3. **Data Privacy:**
   - Lead data stored in Google Sheets
   - Consider GDPR if serving EU customers
   - Add privacy policy link to website

---

## Next Steps After Setup

1. **Monitor for 1 week:**
   - Check lead quality
   - Adjust AI scoring if needed
   - Tune email template

2. **Add follow-up automation:**
   - Day 2: Check if they replied
   - Day 7: Send case study
   - Day 14: Final outreach

3. **Track conversion:**
   - Add "Status" column to sheet
   - Mark when leads become clients
   - Calculate ROI

---

## Support

**n8n Docs:** https://docs.n8n.io
**Community:** https://community.n8n.io
**RaapTech:** TRaap@RaapTech.com

---

*Workflow Version: 1.0*
*Last Updated: April 20, 2026*
