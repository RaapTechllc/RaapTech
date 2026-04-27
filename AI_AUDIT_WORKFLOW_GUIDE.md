# n8n Workflow Setup Guide (AI Audit Edition)
## RaapTech Lead Assessment with Comprehensive AI Audit

---

## 🎯 What This Workflow Does

This is a **two-tier lead processing system**:

### Tier 1: Quick Analysis (ALL LEADS)
```
Lead Submits Form → Quick AI Analysis → Lead Scoring → Route
```

**Everyone gets:**
- Instant AI analysis (< 10 seconds)
- Lead scoring (Hot/Warm/Cold)
- Personalized email with initial insights
- Logged in Google Sheets

### Tier 2: Deep AI Audit (REQUESTED ONLY)
```
AI Audit Requested + Not Cold → Deep Comprehensive Analysis → Detailed Report
```

**AI Audit includes:**
- Technology stack assessment
- Workflow analysis with automation opportunities
- Detailed ROI projections with payback period
- 3-phase implementation roadmap
- Resource requirements
- Risk assessment with mitigation strategies
- Comprehensive email report (2000+ words)

---

## 🔀 Lead Flow Logic

```
Form Submission
    ↓
Format Data
    ↓
Quick AI Analysis (Claude)
    ↓
Route Based on:
    ├── AI Audit Requested + Not Cold → Deep Audit Flow
    │   ├── Deep AI Analysis (4000 tokens)
    │   ├── Comprehensive Email (detailed report)
    │   └── Save to Sheets (with audit flag)
    │
    ├── Hot Lead + No Audit → Standard Hot Flow
    │   ├── Slack Alert (#leads-hot)
    │   ├── Standard Email
    │   └── Save to Sheets
    │
    └── Warm/Cold + No Audit → Standard Flow
        ├── Slack Notification (#leads)
        ├── Standard Email
        └── Save to Sheets
```

---

## 💰 Cost Analysis

### Quick Analysis (all leads)
- **Model:** Claude Sonnet 4
- **Tokens:** ~1500 output
- **Cost:** ~$0.008 per lead
- **Speed:** 3-5 seconds

### Deep AI Audit (requested only)
- **Model:** Claude Sonnet 4
- **Tokens:** ~4000 output
- **Cost:** ~$0.020 per audit
- **Speed:** 15-25 seconds

### Monthly Estimate (100 leads, 20% request audit)
- 100 quick analyses: $0.80
- 20 deep audits: $0.40
- **Total:** ~$1.20/month

**ROI:** If ONE lead converts from better qualification = 100x return

---

## 📋 Setup Steps

### 1. Import Workflow

1. Download `n8n-workflow-complete.json`
2. Open your n8n instance
3. Click **Workflows** → **Import from File**
4. Select the JSON file
5. Workflow opens in editor

### 2. Configure Webhook

**Webhook Node** (first node):
- Path: `raaptech-assessment` (or custom)
- HTTP Method: `POST`
- Response Mode: `Using 'Respond to Webhook' Node`

**Get your webhook URL:**
1. Click **Listen for Test Event**
2. Copy **Production Webhook URL**
3. Format: `https://your-n8n.com/webhook/raaptech-assessment`
4. Save this - you'll add to your website

### 3. Setup Anthropic API

**Two Anthropic nodes need credentials:**

1. Go to https://console.anthropic.com
2. Create API key
3. In n8n: **Credentials** → **Add Credential** → **Anthropic API**
4. Paste API key

**Apply to both nodes:**
- **Quick AI Analysis** node
- **Deep AI Audit** node

**Important:** Both use Claude Sonnet 4 (`claude-sonnet-4-20250514`)

### 4. Configure Slack (Optional)

**Two Slack nodes:**
- **Slack: Hot Lead Alert** → sends to `#leads-hot`
- **Slack: Standard Lead** → sends to `#leads`

**Setup:**
1. Create Slack app: https://api.slack.com/apps
2. Add scopes: `chat:write`, `chat:write.public`
3. Install to workspace
4. Copy Bot OAuth Token
5. Add to n8n credentials
6. Create channels: `#leads-hot` and `#leads`
7. Invite bot to both channels

**Or skip Slack:**
Delete both Slack nodes if you only want email notifications.

### 5. Setup Email

**Two Email nodes:**
- **Email: Standard Response** (quick analysis email)
- **Email: AI Audit Response** (comprehensive audit report)

**SMTP Configuration:**

**Gmail:**
```
Host: smtp.gmail.com
Port: 465
User: your.email@gmail.com
Password: [app password]
SSL/TLS: Yes
```

**Your Domain:**
Use your email provider's SMTP settings

**Update sender:**
1. Open both email nodes
2. Change `fromEmail` to your actual email
3. Select your SMTP credential

### 6. Setup Google Sheets

**Create the spreadsheet:**

1. New Google Sheet: "RaapTech Leads"
2. Add these headers in Row 1:
   ```
   Timestamp | Lead_ID | Company | Contact | Email | Phone | Size | 
   Software | Pain_Point | Wants_AI_Audit | Lead_Score | Score_Reason | 
   Estimated_Value | ROI_Annual_Value | Urgency | Source | Has_Detailed_Audit
   ```

**Connect n8n:**
1. **Credentials** → **Google Sheets OAuth2 API**
2. Follow OAuth flow
3. Open **Save to Google Sheets** node
4. Select credential
5. Select "RaapTech Leads" sheet

**The `Has_Detailed_Audit` column:**
- Shows `Yes` if they got the full AI audit
- Shows `No` for standard quick analysis only
- Use this to track audit → conversion rate

### 7. Test the Workflow

**Test with curl:**

```bash
# Standard lead (no AI audit)
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
    "ai_audit": false,
    "submitted_at": "2026-02-10T12:00:00Z",
    "source": "website"
  }'

# With AI audit requested
curl -X POST https://your-n8n.com/webhook/raaptech-assessment \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Premium Fabrication LLC",
    "name": "Sarah Johnson",
    "email": "test2@example.com",
    "phone": "224-555-0200",
    "software": "CADmep, CAMduct, ESTmep",
    "size": "26-50",
    "pain": "Manual pricing updates taking 10+ hours weekly, expertise walking out the door with retirements",
    "ai_audit": true,
    "submitted_at": "2026-02-10T12:00:00Z",
    "source": "website"
  }'
```

**Check results:**
- ✅ First test: Standard email received?
- ✅ Second test: Comprehensive audit email received?
- ✅ Slack notifications working?
- ✅ Both rows in Google Sheet?
- ✅ Second row has `Has_Detailed_Audit = Yes`?

### 8. Connect to Website

**Update your website's script.js:**

```javascript
// Line 128 in script.js
const N8N_WEBHOOK_URL = 'https://your-n8n.com/webhook/raaptech-assessment';
```

Deploy and test from actual form.

---

## 🎨 Email Templates

### Standard Email
- Quick, friendly, actionable
- Shows key pain points identified
- Recommended services
- Estimated value
- Call to action

### AI Audit Email  
- Professional, comprehensive
- Executive summary
- Detailed ROI projections (big visual box)
- 3-phase implementation roadmap
- Top automation opportunities
- Strong call to action
- Much longer (~2000 words vs ~400)

**Both emails:**
- Mobile-responsive
- Brand colors (black/blue)
- Professional HTML design
- Clear CTAs with phone number

---

## 🧠 AI Prompts Explained

### Quick Analysis Prompt

**Goal:** Fast scoring and initial recommendations

**Inputs:**
- Company name, size
- Current software
- Pain point
- AI audit interest

**Output:** JSON with:
- Lead score (hot/warm/cold)
- Score reasoning
- Key pain points identified
- Recommended services
- Estimated monthly value
- Urgency level
- Next steps

**Scoring logic:**
- **Hot:** Autodesk user + 11+ employees + clear pain + wants audit
- **Warm:** Some potential, medium company, vague pain
- **Cold:** Very small, no clear pain, just exploring

### Deep Audit Prompt

**Goal:** Comprehensive strategic analysis

**Inputs:**
- All quick analysis data
- Quick analysis results
- More detailed prompt instructions

**Output:** JSON with:
- Audit summary (2-3 paragraphs)
- Technology stack assessment
- Workflow analysis with priorities
- ROI projections (time savings, cost reduction, revenue opportunity)
- 3-phase implementation roadmap with costs
- Resource requirements
- Risk assessment with mitigations
- Prioritized next actions

**This takes 4x longer but provides 10x more value to serious leads.**

---

## 📊 Lead Routing Decision Tree

```
Lead Score + AI Audit Request = Flow

Hot + Audit Requested     → Deep Audit Flow (detailed report)
Hot + No Audit            → Hot Lead Flow (instant Slack alert)
Warm + Audit Requested    → Deep Audit Flow (detailed report)
Warm + No Audit           → Standard Flow (regular email)
Cold + Audit Requested    → Standard Flow (not worth deep analysis)
Cold + No Audit           → Standard Flow (regular email)
```

**Why skip audit for cold leads?**
- Very small companies (1-5 employees)
- No clear automation need
- Just exploring
- Low conversion probability
- Not worth the extra AI cost and your time

**This protects your time and focuses audit effort on qualified leads.**

---

## 🔧 Customization Options

### Adjust AI Audit Threshold

Want to give audits to more/fewer leads?

**Edit the Switch node** (`Route Lead Flow`):

```javascript
// Current logic: ai_audit === true AND lead_score !== "cold"
// 
// More restrictive (hot leads only):
// ai_audit === true AND lead_score === "hot"
//
// Less restrictive (even cold leads):
// ai_audit === true
```

### Modify Email Templates

Both email nodes have full HTML templates. Edit to:
- Change colors
- Add your logo
- Modify copy
- Add more sections
- Change formatting

### Add More Channels

**After Deep Audit:**
- Add SMS notification (Twilio)
- Add calendar booking (Calendly API)
- Add CRM (HubSpot, Salesforce)
- Add task creation (Asana, ClickUp)

**Example: Add SMS for hot leads with audit**
1. Add Twilio node after `Process Deep Audit`
2. Configure with: "🔥 Hot lead {{ $json.company }} just got comprehensive audit. Check email!"

---

## 💡 Pro Tips

### 1. Monitor Audit → Conversion Rate

Track in your Google Sheet:
- Filter by `Has_Detailed_Audit = Yes`
- Compare conversion rates
- If audit leads convert 3x better → promote it more
- If no difference → maybe skip the audit feature

### 2. Use Audit as Upsell

Current: Audit is optional checkbox

**Alternative:** Make it a paid product
- Free: Quick analysis
- $99: Comprehensive AI audit
- Positions you as premium
- Filters for serious leads only

### 3. Batch Process Cold Leads

Don't Slack notify on cold leads. Instead:
- Save to sheet
- Weekly digest email to yourself
- Review and decide if worth follow-up
- Keeps your focus on hot/warm

### 4. A/B Test Email Templates

The workflow logs everything. Test:
- Different subject lines
- Different CTAs
- Longer vs shorter emails
- More vs less ROI emphasis

Track open rates and reply rates in your CRM.

---

## 🐛 Troubleshooting

### AI Response Parsing Fails

**Symptom:** Leads get fallback analysis

**Fix:**
1. Check Anthropic API credits
2. Review execution log for actual AI response
3. AI might not be returning valid JSON
4. Adjust prompt to emphasize JSON format

**Quick fix in Code node:**
```javascript
// More aggressive JSON extraction
let cleanResponse = aiResponseRaw
  .replace(/```json/g, '')
  .replace(/```/g, '')
  .trim();
```

### Deep Audit Not Triggering

**Check:**
1. Is `ai_audit` field `true` or `"yes"` in form data?
2. Is lead score not "cold"?
3. Check Switch node conditions
4. Look at workflow execution log

**Test directly:**
Run workflow with manual test data where `ai_audit: true`

### Email Not Sending

**Common issues:**
1. SMTP credentials wrong
2. From email not authorized
3. HTML too large (Gmail limit: 102KB)
4. Hitting rate limits

**Test:**
Send test email from email node test button

### Webhook Timeout

**Symptom:** Form shows error but workflow runs

**Cause:** Workflow takes > 30 seconds (web server timeout)

**Fix:**
Use webhook async mode:
1. Change Webhook `responseMode` to `Immediately`
2. Return success instantly
3. Workflow continues in background
4. User sees success message
5. Email arrives separately

---

## 📈 Scaling Considerations

### Current Setup (< 100 leads/month)
- Works great as-is
- Anthropic costs ~$1-2/month
- No optimization needed

### Medium Scale (100-500 leads/month)
- Consider caching frequent analysis patterns
- Add rate limiting on webhook
- Monitor API quotas

### High Scale (500+ leads/month)
- Use n8n queue mode
- Add Redis for caching
- Batch process non-urgent leads
- Consider GPT-4 for some analyses (cheaper)

---

## 🎯 Success Metrics

**Week 1:**
- Leads processed: X
- AI audits requested: Y%
- Hot leads: Z%
- Response time < 1 hour: %

**Month 1:**
- Lead → call conversion: %
- Call → client conversion: %
- Avg deal size: $
- ROI on AI costs: X%

**Track in Google Sheet:**
Add columns:
- `Called_Date`
- `Meeting_Set`
- `Proposal_Sent`
- `Deal_Closed`
- `Deal_Value`

Calculate:
- Audit leads vs. standard leads conversion
- Hot vs warm vs cold conversion
- Time to first call
- Campaign source performance

---

## 🚀 Next Level Enhancements

### 1. Follow-up Automation
Add nodes after initial email:
- Wait 2 days
- Check if replied
- If no reply → Send follow-up
- If still no reply after 5 days → Move to nurture sequence

### 2. Calendar Integration
After audit email:
- Add Calendly link
- Or auto-suggest times based on your calendar
- When they book → Auto-create Zoom meeting

### 3. Voice Notes
For hot leads:
- Generate personalized voice message (ElevenLabs)
- Attach to email or send via text
- "Hi {{ name }}, this is Tim from RaapTech..."
- Much higher engagement than text

### 4. LinkedIn Automation
For hot leads with audit:
- Find them on LinkedIn (Phantombuster)
- Send connection request
- Follow up with note mentioning audit

### 5. CRM Two-Way Sync
Integrate with HubSpot/Salesforce:
- Create deal automatically
- Update deal stage based on actions
- Pull deal info back into n8n for re-engagement

---

## 📞 Support

**n8n Issues:**
- Docs: https://docs.n8n.io
- Community: https://community.n8n.io

**Anthropic API:**
- Docs: https://docs.anthropic.com
- Status: https://status.anthropic.com

**Workflow Questions:**
- Email: TRaap@RaapTech.com
- Phone: 224-202-6962

---

**Remember:** This workflow is your unfair advantage. Competitors are still manually reviewing leads days later. You're sending comprehensive AI audits in seconds.

*Workflow Version: 2.0 (AI Audit Edition)*
*Last Updated: April 20, 2026*
