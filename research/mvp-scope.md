# Phase 3: MVP Scope Definition

**Project:** AI Receptionist
**Date:** 2026-04-24
**Status:** Draft 1

The goal of the Minimum Viable Product (MVP) is to prove the core value hypothesis—that an AI can effectively act as a personal barrier and outbound dispatcher—without getting bogged down in administrative or regulatory hurdles (like KYC for payment processing or native mobile app store approvals).

---

## 1. What is IN Scope for MVP (The "V1" Build)

### 📞 Inbound Screening (The Shield)
* **Dedicated Cloud Number:** A Twilio phone number that acts as the front door. (Chris can manually forward his cell to this number if he doesn't answer).
* **AI Greeting & Triage:** Retell AI answers, asks for the caller's name and purpose.
* **Emergency "Break Glass":** If the AI detects urgency or hears the pre-programmed "Safe Word", it immediately forwards the call to Chris's actual cell phone.
* **Spam/Robocall Handling:** AI politely hangs up on obvious spam or robocalls.
* **Message Taking & Notification:** For legitimate non-emergencies, AI takes a message, ends the call, and instantly texts Chris a structured summary (Caller ID, Stated Name, Intent, Urgency).

### 🚀 Outbound Dispatch (The Scout)
* **SMS Command Channel:** Chris can text the Twilio number (e.g., *"Call Home Depot on 1604 and ask what time they close today"*).
* **Information Retrieval Calling:** AI makes the call, asks the question, and texts Chris the answer. (No money changing hands yet).

### ⚙️ Tech & Config
* **Hardcoded Personality:** We will write one incredibly solid system prompt for the AI's personality and tone. No complex UI for tweaking sliders yet.
* **Basic Webhook Server:** A lightweight Python/Node app to glue Twilio, Retell, and the LLM together.

---

## 2. What is OUT of Scope for MVP (Saved for V2)

* **🚫 The Secure Financial Layer (Payments):** Ordering food or paying deposits requires integrating Privacy.com/Stripe. This requires business KYC, banking approvals, and strict error handling. We will prove the AI can *talk* first, then teach it to *buy*.
* **🚫 Native iOS / Android App:** Building, submitting, and maintaining mobile apps adds months. V1 will be entirely controlled via SMS text messages.
* **🚫 Live Web Search Verification:** Verifying businesses via Tavily is powerful, but adds latency and complexity. For V1, the AI will rely on the caller's stated identity and its own LLM reasoning to detect BS.
* **🚫 Calendar Integrations:** Booking meetings directly onto Google/Outlook calendars is deferred to V2 to avoid OAuth scope approvals early on.

---

## 3. Success Criteria for the MVP

We know the MVP is successful and ready for Phase 2 investment when:
1. Chris can route 100% of his unknown calls to the AI for a week without missing an actual emergency.
2. Chris successfully dispatches the AI via text to call 5 different retail stores to get inventory/hours, and the AI returns accurate text summaries.
3. The latency from the caller speaking to the AI responding feels natural (<800ms).

---

## 4. Resource & Timeline Estimate

* **Timeline:** 3 to 5 weeks.
* **Infrastructure Costs:** ~$20 - $50/month (Twilio number, Twilio voice/SMS usage, Retell AI minutes, LLM tokens, basic cloud hosting).
* **Effort:** Nexus3 writes the code and prompts; Chris handles testing, tuning the personality, and providing the real-world scenarios.