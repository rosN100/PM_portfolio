
**Iro AI · August – October 2025**

---

## A voice AI system that handled luxury villa enquiries at 2 AM — so a ₹1.5 lakh booking never went to voicemail.

7-week live pilot · ~300 calls/day · 95% accuracy · Full client handover approved

---

## The Problem

Lohono Stays manages ultra-premium villa rentals across India — properties priced between ₹60,000 and ₹2,50,000 per night. Their guests are high-intent, high-value travellers, many calling from international time zones.

The problem: no representatives were available overnight. Calls went unanswered. Enquiries dropped. At those price points, a single missed call could mean a ₹10–15 lakh booking lost.

---

## The Product Experience

When a guest calls after hours, the AI answers immediately.

It asks where they want to stay, their travel dates, and group size. It explains available villas, answers questions about amenities and pricing, and captures the guest's name and number. If a specific property is mentioned, it quotes the stay pricing directly.

Before ending the call, it confirms a callback window with a human experience manager for the next morning — verified between 10 AM and 8 PM.

The guest experiences this as one natural conversation. The underlying system is five specialised agents working in concert.

---

## System Architecture

**Inbound call → Triage agent → Specialist agent → Callback scheduled**

A routing agent qualifies every call and directs it to the right specialist:

- **Agent 1 — Triage & Router:** Identifies call type and routes accordingly
- **Agent 2 — Availability:** Handles location-first enquiries — collects dates, guest count, budget
- **Agent 3 — Details Capture:** Handles property-specific enquiries — confirms pricing, captures contact details
- **Agent 4 — Booking Support:** Handles existing reservation queries
- **Agent 5 — Non-Business Handler:** Handles off-topic queries gracefully without breaking the caller experience

Every flow ends with a confirmed callback — so no lead ends without a next step.

![[Screenshot 2026-03-15 at 12.24.09 PM.png]]
Conversation samples and call recordings are omitted due to client confidentiality.

---

## Build Snapshot

Build period: August – October 2025 Agents deployed: 5 (multi-agent orchestration) Pilot duration: 7 weeks Call volume: ~300 calls per day Real-world accuracy: 95% Scenario coverage: 90% handled end-to-end Knowledge coverage: 93% at launch — improved weekly Properties served: Ultra-premium villas, ₹60,000–₹2,50,000 per night

---

## Pilot Results

95% accuracy across all calls. The remaining 5% — mostly callers in extremely noisy environments — were handled with a callback promise rather than failed interactions.

90% of call scenarios were resolved end-to-end by the AI. The remaining 10% were escalated gracefully — complete caller details captured, morning callback confirmed.

Knowledge gaps were tracked systematically. Every question the agent couldn't answer was surfaced at weekly review — the knowledge base was updated each week and coverage tightened continuously.

**One insight that shaped the product during the pilot:** the most common enquiry pattern was location-first ("Do you have anything in Alibaug?") rather than property-first. The routing logic was updated during the pilot to prioritise location discovery before property qualification — reducing unnecessary back-and-forth in early turns.

---

## Client Outcome

> The product manager reviewed the pilot results and approved full handover. The AI system became the permanent night shift.

**No missed calls. No lost leads. No human required between 8 PM and 10 AM.**

At ₹1.5 lakh average booking value, even recovering five enquiries per week represents significant revenue protected.

---

## Product Skills Demonstrated

- **Multi-agent orchestration** — five specialised agents operating as a single coherent experience
- **Conversational flow architecture** — branching call scenarios with graceful fallbacks at every step
- **Voice AI for high-stakes contexts** — ultra-premium clientele, international callers, high booking values
- **Knowledge management** — systematic gap tracking and weekly improvement cycles
- **Pilot-to-production delivery** — 7-week live pilot resulting in full client handover

---

_This project demonstrates how AI can hold down an entire operational shift — not as a chatbot, but as a reliable, revenue-protecting system._

_Built by Iro AI_

