**Iro AI · Build3 Startup Accelerator · May – July 2025**

---

## An end-to-end interview scheduling system that called 40 founders, matched them with mentors, and sent calendar invites — all without a single human making a call.

10-day build · 40-application pilot · 82.5% scheduled in first call · 100% completion

---

## The Context

Iro AI was selected for the Build3 startup accelerator cohort (May–July 2025). On pitch day, the Build3 team was so impressed they asked us to build this system for them — the problem was one they were experiencing themselves.

---

## The Problem

Founders applying to Build3's fundraising programme fill out a detailed application on the official website. Applications flow into Zoho CRM after basic validation, where a mentor manually reviews and qualifies each one.

Once qualified, the next step was simple in theory: call the founder, check their availability, and schedule an interview with one of four Build3 mentors.

In practice, this meant a team member spending hours on the phone — one call at a time, cross-checking mentor calendars, manually updating CRM records. The scheduling process was consuming a disproportionate share of the team's bandwidth every single cohort.

---

## The Solution

We built a fully automated scheduling pipeline that runs the moment a lead is marked as qualified in Zoho CRM.

The AI calls the founder directly. It checks their availability, offers three date options drawn from real mentor calendar slots, selects the appropriate mentor using availability and load-balancing logic, and sends the calendar invitation before the call ends. When the call closes, the transcript and scheduling status are automatically written back into Zoho CRM.

The team's involvement: zero — unless a call needed a manual fix and rerun.

---

## System Architecture

**Qualified in CRM → Automation triggered → AI calls founder → Availability checked → 3 slots offered → Mentor matched → Invite sent on call → CRM updated**

The mentor selection logic accounted for availability, load distribution, and fit across four Build3 mentors — so the right person was always assigned without human intervention.

For calls that didn't result in a schedule (7 out of 40), the failure reason was surfaced in CRM, the record was manually corrected, and the flow was rerun — resulting in 100% eventual completion.

![[Screenshot 2026-03-15 at 1.19.25 PM.png]]
---

## Build Snapshot

Build period: May – July 2025 Build time: 10 days (including testing) Pilot size: 40 applications Scheduled in first call: 33 (82.5%) Scheduled after rerun: 7 (remaining 17.5%) Final completion rate: 100% Mentors integrated: 4 CRM: Zoho (bidirectional sync) Manual calls made by team: 0

---

## Pilot Results

33 of 40 founders were scheduled in a single automated call — no follow-up, no human intervention, no back-and-forth.

The remaining 7 required a manual CRM correction and a rerun of the flow. Every one of them was subsequently scheduled. Final completion: 100%.

The entire bandwidth the team had been spending on scheduling calls was returned to them. The work that used to consume hours per cohort now happens while the team is doing something else entirely.

**One detail that shaped the build:** mentor availability was the hardest constraint to solve cleanly. Early versions could offer slots that conflicted across multiple simultaneous candidates. We built a real-time slot reservation layer so that once a slot was offered to a founder, it was locked until the call concluded — preventing double-booking across concurrent calls.

---

## Client Outcome

> Build3 asked us to build this during our own cohort pitch day. The system ran on their live applicant pipeline and returned full scheduling capacity to the team.

**From manual calls to zero manual calls — in 10 days.**

The relationship started as accelerator and founder. It ended as client and product team.

---

## Product Skills Demonstrated

- **End-to-end workflow automation** — CRM trigger to calendar invite, fully closed loop
- **CRM integration** — bidirectional Zoho sync, transcript and status logging
- **AI voice agent design** — structured call flows with real-time decision logic
- **Scheduling system design** — real-time slot reservation, multi-mentor availability matching
- **Rapid delivery** — production-ready system built and piloted in 10 days

---

_AI agents can own entire operational workflows — not just assist with them._

_Built by Iro AI_