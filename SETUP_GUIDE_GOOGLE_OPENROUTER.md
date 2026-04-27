# n8n Workflow Setup Guide - OpenRouter + Google Edition
## RaapTech Lead Assessment with Full Google Ecosystem

---

## 🎯 What Changed

### ✅ New Stack
- **OpenRouter** instead of Anthropic (model flexibility + better pricing)
- **Gmail** instead of SMTP (native OAuth, better deliverability)
- **Google Chat** instead of Slack (if you use Google Workspace)
- **Google Tasks** for hot leads (automatic follow-up reminders)
- **Google Sheets** (same as before)

### 💰 Cost Comparison

| Service | Old | New | Savings |
|---------|-----|-----|---------|
| AI Analysis | Anthropic Direct $0.008 | OpenRouter $0.006 | 25% |
| Email | SMTP Free | Gmail OAuth Free | Same |
| Notifications | Slack Free/Paid | Google Chat Free | Free |
| Tasks | Manual | Google Tasks Free | Time saved |

**OpenRouter benefits:**
- Access to multiple models (Claude, GPT-4, Gemini, etc.)
- Automatic failover if one model is down
- Usage tracking dashboard
- Better rate limits
- Cheaper than direct APIs

---

## 📊 Google Ecosystem Integration

### What's Included

**Tier 1: Core (Required)**
- **Gmail** - Send personalized emails
- **Google Sheets** - CRM tracking

**Tier 2: Notifications (Pick One)**
- **Google Chat** - Team notifications (like Slack)
- **Google Tasks** - Personal task reminders

**Tier 3: Optional Enhancements**
- **Google Calendar** - Auto-schedule follow-ups
- **Google Drive** - Save audit reports as PDFs
- **Google Contacts** - Auto-add leads to contacts

### Current Workflow Uses

✅ **Gmail** - Both standard and audit emails
✅ **Google Sheets** - Lead tracking and CRM
✅ **Google Tasks** - Hot lead follow-up tasks (24hr reminder)
✅ **Google Chat** - Hot lead team notifications

---

## 🚀 Setup Steps

### 1. OpenRouter Setup

**Create Account:**
1. Go to https://openrouter.ai
2. Sign up (free)
3. Click "Keys" → "Create Key"
4. Copy API key (starts with `sk-or-v1-...`)
5. Add credits: $5 minimum (lasts months)

**In n8n:**
1. **Credentials** → **Add Credential** → **Header Auth**
2. Name: "OpenRouter API"
3. **Header Name:** `Authorization`
4. **Value:** `Bearer YOUR_API_KEY_HERE`
5. Save

**Apply to nodes:**
- "Quick AI Analysis (OpenRouter)"
- "Deep AI Audit (OpenRouter)"

**Cost tracking:**
- Dashboard: https://openrouter.ai/activity
- Shows per-request costs
- Monthly totals
- Model breakdown

### 2. Gmail Setup

**Enable Gmail API:**
1. Go to https://console.cloud.google.com
2. Create new project: "RaapTech Automation"
3. **APIs & Services** → **Enable APIs**
4. Search "Gmail API" → Enable
5. **OAuth consent screen:**
   - User Type: External
   - App name: "RaapTech Lead System"
   - User support email: your-email@gmail.com
   - Scopes: Add `gmail.send`
6. **Credentials** → **Create OAuth Client ID**
   - Application type: Web application
   - Name: "n8n Gmail"
   - Authorized redirect URIs: `https://your-n8n.com/rest/oauth2-credential/callback`
7. Copy Client ID and Client Secret

**In n8n:**
1. **Credentials** → **Add Credential** → **Gmail OAuth2 API**
2. Paste Client ID and Client Secret
3. Click **Connect my account**
4. Authorize Gmail access
5. Save

**Apply to nodes:**
- "Gmail: Standard Response"
- "Gmail: AI Audit Response"

**Important:** Gmail has daily sending limits:
- New account: ~100 emails/day
- Established account: ~500 emails/day
- If you need more: Use Google Workspace account (2000/day)

### 3. Google Sheets Setup

Same as before:

1. Create sheet: "RaapTech Leads"
2. Add headers (Row 1):
   ```
   Timestamp | Lead_ID | Company | Contact | Email | Phone | Size | 
   Software | Pain_Point | Wants_AI_Audit | Lead_Score | Score_Reason | 
   Estimated_Value | ROI_Annual_Value | Urgency | Source | Has_Detailed_Audit
   ```
3. **Credentials** → **Google Sheets OAuth2 API**
4. Follow OAuth flow
5. Select sheet in node

### 4. Google Chat Setup (Optional)

**If you use Google Workspace:**

1. Go to https://chat.google.com
2. Create space: "RaapTech Leads"
3. Click space name → **Apps & integrations**
4. **Manage webhooks** → **Add webhook**
5. Name: "n8n Lead Alerts"
6. Copy webhook URL

**In n8n:**
1. **Credentials** → **Add Credential** → **Google Chat OAuth2 API**
2. Follow OAuth flow
3. In "Google Chat: Hot Lead" node:
   - Select your space
   - Test message

**Alternative:** Skip Google Chat, use only Gmail + Tasks

### 5. Google Tasks Setup (Recommended)

**Why tasks?**
- Personal reminder for hot leads
- Shows up in Gmail sidebar
- Mobile notifications
- Due date reminders

**Setup:**
1. **Credentials** → **Add Credential** → **Google Tasks OAuth2 API**
2. Follow OAuth flow
3. In "Google Tasks: Hot Lead" node:
   - List: "My Tasks" (default)
   - Due date: 1 day from now (already configured)

**Result:** Hot leads create task with:
- Title: "🔥 Hot Lead: [Company Name]"
- Description: Contact info, pain points, next steps
- Due: Tomorrow
- Shows in Gmail and Google Tasks app

### 6. Webhook Configuration

1. Open workflow in n8n
2. Click "Webhook" node
3. Click **Listen for Test Event**
4. Copy webhook URL: `https://your-n8n.com/webhook/raaptech-assessment`
5. Update your website `script.js` line 128

---

## 🧪 Testing

### Test 1: Standard Lead (No Audit)

```bash
curl -X POST https://your-n8n.com/webhook/raaptech-assessment \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Test HVAC Co",
    "name": "John Doe",
    "email": "your-test@gmail.com",
    "phone": "224-555-0100",
    "software": "QuickBooks",
    "size": "11-25",
    "pain": "Slow lead response times",
    "ai_audit": false,
    "source": "website"
  }'
```

**Expected:**
- ✅ Gmail received (standard email)
- ✅ Row added to Google Sheets
- ✅ `Has_Detailed_Audit` = No
- ⏱️ Total time: ~5 seconds

### Test 2: Hot Lead with AI Audit

```bash
curl -X POST https://your-n8n.com/webhook/raaptech-assessment \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Premium Fabrication LLC",
    "name": "Sarah Johnson",
    "email": "your-test@gmail.com",
    "phone": "224-555-0200",
    "software": "CADmep, CAMduct, ESTmep",
    "size": "26-50",
    "pain": "Manual pricing updates take 10+ hours weekly, expertise walking out with retirements",
    "ai_audit": true,
    "source": "website"
  }'
```

**Expected:**
- ✅ Gmail received (comprehensive audit email)
- ✅ Google Task created (due tomorrow)
- ✅ Google Chat notification (if enabled)
- ✅ Row in Sheets with `Has_Detailed_Audit` = Yes
- ⏱️ Total time: ~30 seconds

---

## 🔧 Customization Options

### Change AI Model

OpenRouter supports many models. Edit the HTTP Request nodes:

**Current:** `anthropic/claude-3.5-sonnet`

**Alternatives:**
- `anthropic/claude-3-opus` - Smarter, slower, more expensive
- `openai/gpt-4-turbo` - Fast, good reasoning
- `google/gemini-pro-1.5` - Very cheap, good quality
- `meta-llama/llama-3.1-70b-instruct` - Fast and cheap

**To change:**
1. Open "Quick AI Analysis (OpenRouter)" node
2. Find `"model"` parameter
3. Change value to model name from above
4. Check pricing: https://openrouter.ai/models

**Cost comparison (per 1M tokens output):**
- Claude 3.5 Sonnet: $15
- GPT-4 Turbo: $30
- Gemini Pro 1.5: $3.75
- Llama 3.1 70B: $0.80

### Add Google Calendar Follow-ups

**For hot leads, auto-schedule call:**

1. Add "Google Calendar" node after "Google Tasks"
2. Configure:
   ```
   Operation: Create Event
   Calendar: Primary
   Start: Tomorrow 9am
   End: Tomorrow 9:30am
   Summary: Call {{ $json.company }} - Hot Lead
   Description: 
   Contact: {{ $json.contact_name }}
   Phone: {{ $json.phone }}
   Email: {{ $json.email }}
   
   Pain Points:
   {{ $json.key_pain_points.join('\n') }}
   ```

**Result:** Calendar event created automatically

### Save Audit as PDF to Google Drive

**For comprehensive audits, save to Drive:**

1. Add "Code" node after "Process Deep Audit"
2. Generate HTML report
3. Add "HTTP Request" node to convert HTML → PDF (use API like PDFShift)
4. Add "Google Drive" node
5. Upload PDF to "Leads/[Company Name]/" folder

**Result:** Searchable audit archive

### Add to Google Contacts

**Auto-add hot leads to contacts:**

1. Add "Google Contacts" node after hot lead flow
2. Configure:
   ```
   Operation: Create Contact
   Given Name: {{ $json.contact_name }}
   Organization: {{ $json.company }}
   Email: {{ $json.email }}
   Phone: {{ $json.phone }}
   Notes: Hot lead - {{ $json.score_reason }}
   ```

---

## 💡 Google Workspace Tips

### If You Have Google Workspace

**Advantages:**
- **Gmail:** 2000 emails/day limit (vs 500)
- **Google Chat:** Team spaces with @mentions
- **Shared Drive:** Team access to audit PDFs
- **Calendar:** Shared team calendar for leads
- **Google Tasks:** Assign tasks to team members

**Setup for team:**
1. Create shared space in Google Chat: "Sales Leads"
2. Create shared calendar: "Lead Follow-ups"
3. Use service account for automation (no personal OAuth)

### Service Account (Advanced)

**Instead of OAuth (more reliable for automation):**

1. Google Cloud Console → **Service Accounts**
2. Create service account: "n8n-automation@..."
3. Grant roles:
   - Gmail API: User
   - Google Sheets API: Editor
   - Google Tasks API: User
   - Google Chat API: User
4. Download JSON key
5. In n8n: Use service account credentials
6. **Domain-wide delegation** for Gmail (if Workspace)

**Benefits:**
- No token expiration issues
- Works even if personal account unavailable
- Better for production

---

## 📊 Analytics & Monitoring

### OpenRouter Dashboard

Track AI usage:
- **Activity page:** https://openrouter.ai/activity
- See every request
- Cost per request
- Model performance
- Total spend

### Google Sheets as Dashboard

Add these columns for tracking:

**Lead Lifecycle:**
- `First_Contact_Date`
- `Meeting_Scheduled`
- `Proposal_Sent`
- `Deal_Closed`
- `Deal_Value`

**Performance Metrics:**
- `Days_to_Close`
- `Conversion_Rate`
- `Audit_to_Close_Rate`

**Use formulas:**
```
=IF(AND(Has_Detailed_Audit="Yes", Deal_Closed="Yes"), "Audit Win", "")
```

### Automated Reports

**Weekly summary email:**
1. Add "Schedule Trigger" node (runs Mondays 9am)
2. Query Google Sheets for last 7 days
3. Calculate:
   - Total leads
   - Hot/Warm/Cold breakdown
   - Audit requests %
   - Conversion rate
4. Send summary email to yourself

---

## 🔒 Security Best Practices

### API Keys

**OpenRouter:**
- Store in n8n credentials only
- Don't commit to git
- Rotate every 90 days
- Set spend limits in OpenRouter dashboard

**Google OAuth:**
- Use OAuth2 (more secure than API keys)
- Review permissions granted
- Revoke access if not used for 90 days

### Email Security

**Gmail best practices:**
- Enable 2FA on Google account
- Use Google Workspace for business
- Monitor OAuth tokens: https://myaccount.google.com/permissions
- Review "Less secure app access" (should be off)

### Webhook Security

**Protect your webhook:**

Add validation in "Format Lead Data" node:
```javascript
// Validate required fields
if (!formData.company || !formData.email) {
  throw new Error('Invalid submission - missing required fields');
}

// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(formData.email)) {
  throw new Error('Invalid email format');
}

// Rate limiting (optional)
// Check if same email submitted < 5 minutes ago
// Block if yes
```

---

## 💰 Cost Breakdown (100 Leads/Month)

### OpenRouter
- 100 quick analyses (1.5K tokens): $0.90
- 20 deep audits (4K tokens): $1.20
- **Total:** $2.10/month

### Google Services
- Gmail: **Free** (under 500/day)
- Google Sheets: **Free** (under 10M cells)
- Google Tasks: **Free** (unlimited)
- Google Chat: **Free** (or included with Workspace)
- **Total:** $0/month

### **Grand Total:** ~$2/month

**Compare to:**
- Anthropic direct: $1.60/month (but less flexible)
- Slack paid plan: $8+/user/month
- Dedicated CRM: $15-50/month
- VA doing manual work: $500+/month

**Your setup: $2/month for everything**

---

## 🚨 Troubleshooting

### OpenRouter Issues

**"Insufficient credits" error:**
- Add credits: https://openrouter.ai/credits
- Check current balance in dashboard
- $5 = ~2000 leads processed

**"Model not available" error:**
- Model might be down
- OpenRouter auto-switches to backup
- Or manually change model in node

**Slow responses:**
- Normal for deep audits (15-30 seconds)
- Check OpenRouter status page
- Consider faster model like Gemini

### Gmail Issues

**"Quota exceeded" error:**
- Hit daily send limit
- Wait 24 hours
- Or upgrade to Google Workspace (2000/day)

**Emails in spam:**
- Warm up sending (start slow, increase over days)
- Ensure SPF/DKIM records configured
- Ask recipients to whitelist your email
- Use Google Workspace domain email

**OAuth token expired:**
- Click refresh in n8n credentials
- Re-authenticate if needed
- Tokens auto-refresh usually

### Google Chat/Tasks Not Working

**Chat message fails:**
- Check space still exists
- Verify bot is member of space
- Webhook URL changed?
- Try recreating webhook

**Tasks not appearing:**
- Check Tasks app: https://tasks.google.com
- Verify OAuth scope includes tasks.create
- Look in "My Tasks" list
- Due dates may not show immediately

---

## 🎯 Launch Checklist

### Pre-Launch
- [ ] OpenRouter account created, credits added
- [ ] API key added to n8n credentials
- [ ] Both AI nodes configured with OpenRouter
- [ ] Gmail OAuth2 connected and tested
- [ ] Google Sheets connected with headers
- [ ] Google Tasks connected (optional but recommended)
- [ ] Google Chat connected (if using Workspace)
- [ ] Webhook URL updated in website
- [ ] Test email received successfully
- [ ] Test task created successfully

### Launch Day
- [ ] Activate workflow in n8n
- [ ] Submit test lead from website
- [ ] Verify full flow works
- [ ] Monitor first 5 real leads
- [ ] Check OpenRouter dashboard for costs
- [ ] Ensure no errors in n8n execution log

### Week 1
- [ ] Review lead quality in Google Sheets
- [ ] Check audit → conversion rate
- [ ] Adjust AI prompts if needed
- [ ] Fine-tune lead scoring logic
- [ ] Add any missing Google integrations

---

## 📚 Additional Resources

**OpenRouter:**
- Docs: https://openrouter.ai/docs
- Models: https://openrouter.ai/models
- Discord: https://discord.gg/openrouter

**Google APIs:**
- Gmail: https://developers.google.com/gmail/api
- Sheets: https://developers.google.com/sheets/api
- Tasks: https://developers.google.com/tasks
- Chat: https://developers.google.com/chat

**n8n:**
- Community: https://community.n8n.io
- Docs: https://docs.n8n.io

---

## 🎁 Bonus: Google Ecosystem Power-Ups

### 1. Voice Notes for Hot Leads

Use Google Cloud Text-to-Speech:
1. Add node after hot lead detection
2. Generate personalized voice message
3. Save as MP3 to Google Drive
4. Include link in email

### 2. Automated Reporting

Weekly report to your Google Sheet:
1. Schedule trigger (Mondays)
2. Query last 7 days of leads
3. Create summary stats
4. Append to "Weekly Reports" sheet

### 3. Smart Categorization

Use Gmail labels:
1. Add Gmail "Add Label" node
2. Auto-label by lead score
3. Filter inbox: "Hot Leads" label
4. Quick visual organization

---

**You're all set! This is the full Google + OpenRouter stack. Questions? Email TRaap@RaapTech.com**

*Workflow Version: 3.0 (OpenRouter + Google Edition)*
*Last Updated: April 20, 2026*
