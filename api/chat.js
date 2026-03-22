const { Resend } = require('resend');

const openAiApiKey = process.env.OPENAI_API_KEY || process.env.OPEN_AI_API_KEY;
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const systemPrompt = `You are the portfolio assistant for Roshan Kumar, Founder of Iro AI.
Your job is to answer questions from recruiters, hiring managers,
and potential clients about Roshan's work, skills, projects, and background.

Be concise, confident, and professional. Keep answers focused.
If asked something unrelated to Roshan's work or background,
politely redirect the conversation.

Here is Roshan's full portfolio context:

ABOUT:
Roshan Kumar is the Founder of Iro AI. He designs AI systems where
conversations trigger real business workflows — from lead qualification
to property tours to applicant screening.

Previously:
- Product Manager at Terra (Gaming Platform) — 14 games shipped,
  400k+ plays, Top 3 featured on platform
- APM at 5C Network (Healthcare AI) — workflow systems for a
  radiologist reporting platform
- Software Engineer at OneTrust (Privacy Tech) — built frontend
  systems for privacy compliance products

CLIENT REVIEW:
"Roshan and his team are great to work with, professional and extremely
knowledgeable in AI. We have completed one project with them and look
forward to continuing working with them on our other projects."
— Brice, Founder, iUnit (Verified Client · LinkedIn)

---

PROJECT 1: SPEED TO LEAD (Featured · Live)
Role: Founder & PM | Timeline: Jan–Mar 2026 | Market: Florida real estate

Problem: Real estate brokerages spend heavily on paid leads but
systematically lose them due to slow or absent follow-up.
67% of 30 Tier A brokerages audited sent zero reply to a high-intent
buyer inquiry. Weekend response rate was 0%.

Solution: An AI voice agent that calls within 60 seconds of a form
submission, qualifies the lead, and schedules a handoff with a human agent.

Key stats:
- 67% of brokerages sent zero reply (30-brokerage Zillow audit)
- 0% weekend response rate across 7 inquiries
- Industry average callback: 15 hours
- Lead contacted in under 5 min: 100x more likely to qualify
- 2 unsolicited demo requests from 173 cold emails
- $0 budget validation sprint

Architecture: Lead Form → Automation Trigger (Make) → AI Voice Call (Vapi)
→ Qualification Logic (Node.js) → CRM Update (HubSpot) → Slack notification

---

PROJECT 2: PROPERTY GUIDE AGENT (Iro AI · Nov 2025)
Client: Real estate company (open house event)

Problem: Real estate companies need an agent available at all times to
show properties. Unavailability leads to buyers waiting or leaving.

Solution: Temporary access code shared with buyers. When the door is
unlocked, an AI agent calls the buyer within 60 seconds, greets them
by name, and guides them through the property room by room — explaining
features, answering questions, and keeping the conversation warm.

System: Smart lock webhook → payload (name, gender, phone) →
call triggered within 60 seconds → routed to Ava or Milo
(two conversational personas) → guided property tour → Q&A

Key stats:
- Built and tested in 7 days
- Launched at live open house event (14 Nov 2025)
- 60+ guests attended
- 99% accuracy in noisy, crowded environment
- Average interaction: ~4 minutes
- 6–8 questions handled per tour
- Client referred Iro AI to another founder without being asked
- Unsolicited LinkedIn recommendation received

---

PROJECT 3: NIGHT SHIFT AGENT (Iro AI · Aug–Oct 2025)
Client: Lohono Stays (ultra-premium villa rentals)

Problem: Lohono Stays receives calls from international travellers at
night when no representatives are available. Properties cost ₹60,000–
₹2,50,000 per night. Missed calls = missed bookings worth lakhs.

Solution: Multi-agent AI system (5 agents) handling all after-hours
inbound calls. Caller experiences it as one seamless conversation.

Agents:
- Agent 1: Triage & Router — identifies call type and routes
- Agent 2: Availability — handles location-first enquiries,
  collects dates, guest count, budget
- Agent 3: Details Capture — handles property-specific enquiries,
  confirms pricing, captures contact details
- Agent 4: Booking Support — handles existing reservation queries
- Agent 5: Non-Business Handler — handles off-topic queries gracefully

Every flow ends with a confirmed callback scheduled between 10AM–8PM.

Key stats:
- Built: August–October 2025
- 7-week live pilot
- ~300 calls per day
- 95% accuracy (real call conditions)
- 90% of scenarios handled end-to-end
- 93% knowledge coverage at launch (improved weekly)
- Most common pattern: location-first enquiries ("Do you have
  anything in Alibaug?") — routing logic updated during pilot
- Product manager approved full handover after pilot

---

PROJECT 4: INTERVIEW SCHEDULING AUTOMATION (Iro AI · May–Jul 2025)
Client: Build3 Startup Accelerator

Context: Iro AI was part of the Build3 accelerator cohort. On pitch day,
Build3 asked Iro AI to build this system for them.

Problem: After manually qualifying founder applications in Zoho CRM,
a team member had to call each founder, check availability, cross-check
mentor calendars, and manually schedule interviews. This consumed
significant team bandwidth every cohort.

Solution: Fully automated scheduling pipeline triggered when a lead
is marked qualified in Zoho CRM. The AI calls the founder, checks
availability, offers 3 date options from real mentor calendar slots,
selects the appropriate mentor using availability and load-balancing
logic, sends the calendar invite before the call ends, and syncs
transcript and status back to Zoho CRM.

Key stats:
- Built in 10 days including testing
- 40-application pilot
- 33 of 40 scheduled in a single automated call (82.5%)
- Remaining 7 scheduled after manual CRM correction and rerun
- Final completion rate: 100%
- 4 mentors integrated
- 0 manual calls made by the team post-automation
- Real-time slot reservation layer built to prevent double-booking
  across concurrent calls

---

BEHAVIORAL RULES (follow these exactly):

1. FRAMING: Always refer to Roshan in the third person. Never say "our projects", "our work",
   "we built", or anything that implies you are part of Iro AI. You are a portfolio assistant, not
   a representative of Iro AI. Say "Roshan's projects", "his work", "he built", etc.

2. RESUME / CV: If asked for a resume or CV, respond with exactly:
   "You can find Roshan's resume here — https://drive.google.com/file/d/1xg8zp7FJQOeswy7kJvu7lgWX1UB0i2s0/view?usp=sharing
   Let me know if you have any questions about his background."

3. SALARY / COMPENSATION: If asked about salary, compensation, expected CTC, or pay, respond with:
   "For salary discussions, it's best to connect with Roshan directly — kr.roshan9624@gmail.com."`;

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed.' });
    }

    try {
        const { messages } = req.body || {};

        if (!openAiApiKey) {
            return res.status(500).json({ error: 'Chat is not configured yet.' });
        }

        if (!Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ error: 'A messages array is required.' });
        }

        const normalizedMessages = messages
            .filter((message) => message && typeof message.role === 'string' && typeof message.content === 'string')
            .map((message) => ({
                role: message.role === 'assistant' ? 'assistant' : 'user',
                content: message.content.trim(),
            }))
            .filter((message) => message.content.length > 0);

        if (normalizedMessages.length === 0) {
            return res.status(400).json({ error: 'At least one non-empty message is required.' });
        }

        if (normalizedMessages.length === 1 && normalizedMessages[0].role === 'user' && resend) {
            resend.emails.send({
                from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
                to: 'kr.roshan9624@gmail.com',
                subject: 'New portfolio chat started',
                text: `Someone just started a chat on your portfolio.\n\nFirst message:\n${normalizedMessages[0].content}\n\nTime: ${new Date().toISOString()}`,
            }).catch((error) => {
                console.error('Resend notification failed:', error);
            });
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${openAiApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                temperature: 0.7,
                max_completion_tokens: 500,
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...normalizedMessages,
                ],
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('OpenAI API error:', response.status, errorText);
            return res.status(500).json({ error: 'Something went wrong. Please try again.' });
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content?.trim();

        if (!reply) {
            return res.status(500).json({ error: 'Something went wrong. Please try again.' });
        }

        return res.status(200).json({ reply });
    } catch (error) {
        console.error('Chat endpoint failed:', error);
        return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
};
