# Phase 2: Technical Architecture & Feasibility

**Project:** AI Receptionist
**Date:** 2026-04-24
**Status:** Draft 1

This document outlines the technical blueprint for building the AI Receptionist MVP. The architecture is designed to be assembled mostly from managed services (Low-Code/No-Code friendly) rather than built from scratch.

## 1. Core Technology Stack

| Component | Recommended Service | Why |
| :--- | :--- | :--- |
| **Telephony (Phone Numbers, Call Routing, SMS)** | **Twilio** | Industry standard. Cheap numbers (~$1.15/mo), bulletproof API for incoming/outgoing calls, and handles SMS text dispatching perfectly. |
| **Voice AI Runtime (The "Mouth & Ears")** | **Retell AI** (or Vapi) | Handles the hardest part of voice AI: latency (<600ms), interrupting when the human speaks, and turn-taking. Connects directly to Twilio. |
| **The Brain (LLM)** | **Anthropic Claude 3.5 Sonnet** or **Gemini 3.1 Pro** | Excellent at tool-use (function calling) which is required for looking up businesses, booking calendars, and triggering payments. |
| **Caller Identity / Live Web Search** | **Tavily API** | Fast, optimized for AI agents to instantly search "Does ABC Plumbing exist at 555-1234?" |
| **Financial Layer (Payments)** | **Privacy.com API** or **Stripe Issuing** | Allows the AI to generate a temporary, single-use, limit-capped virtual credit card on the fly to pay for food/deposits without exposing real cards. |
| **Orchestration / Logic Glue** | **Node.js / Python on Render/Vercel** (or Make.com) | A lightweight middle layer that holds your custom rules (the "Safe Word", VIP lists) and connects the SMS texts to the Voice Agent. |

---

## 2. System Workflows

### Flow A: Inbound Screening (The Shield)
1. **Ring:** Unknown number calls your Twilio number (or your carrier forwards your unanswered calls to it).
2. **Answer:** Twilio hands the call to Retell AI.
3. **Triage:** Retell AI (using Claude/Gemini) greets the caller: *"Hi, you've reached Chris's personal assistant. He's currently unavailable. May I ask what this is regarding?"*
4. **Verification (Tool Call):** If caller says "I'm calling from Blue Cross", the LLM triggers a web search (Tavily) to verify the caller ID matches Blue Cross.
5. **Decision:** 
   - *Emergency / VIP / Safe Word detected:* AI triggers a Twilio Call Transfer directly to your physical cell phone.
   - *Sales / Spam:* AI politely ends the call.
   - *Legit Message:* AI takes the message and sends you an SMS summary.

### Flow B: Outbound Dispatch (The Chief of Staff)
1. **Command:** You send an SMS to your Twilio number: *"Call Home Depot on 1604, see if they have 8ft 2x4s, then text me."*
2. **Parsing:** Your orchestration layer receives the text, parses the intent, and tells Retell AI to initiate an outbound call.
3. **Execution:** Retell AI calls Home Depot. Navigates their IVR (Press 1 for lumber). Speaks to the rep.
4. **Report:** Once the call ends, the LLM summarizes the transcript and texts you: *"Home Depot has 45 in stock. Aisle 12."*

### Flow C: The Secure Payment (Food Ordering)
1. You text: *"Call Luigi's Pizza and order a large pepperoni for pickup under Chris."*
2. AI calls Luigi's. 
3. When Luigi's asks for payment, the AI triggers a backend function: `generate_virtual_card(amount_limit=$30)`.
4. The backend uses Privacy.com API to create a card, returns the 16-digit number, expiry, and CVV to the AI.
5. AI reads the card details to the cashier.
6. Card auto-destructs or locks after the single transaction.

---

## 3. The "No-Code" vs "Pro-Code" Spectrum

To build this MVP:
- **Level 1 (No-Code):** Use Retell AI's dashboard + Make.com. You can build 80% of this without writing a single line of code. (Limits: Complex payments and advanced state management get messy in Make.com).
- **Level 2 (Low-Code):** *Recommended.* A simple Python or Node.js server (which I can write for you) that manages the Webhooks, Twilio SMS routing, and Privacy.com API calls, while Retell handles the actual voice. 

## 4. Phase 2 Conclusion & Feasibility
**Feasibility:** HIGH. 
Every API required for this exists today, is mature, and is relatively cheap. The hardest technical hurdle historically was the Voice AI latency and interruption handling, but Retell/Vapi solved this in late 2024. The payment layer requires business verification (KYC) with Stripe or Privacy.com, which is an administrative hurdle, but not a technical one.

**Next Step:** Build a "Level 2" prototype of **Flow A (Inbound Screening)** with a hardcoded VIP list and SMS summaries.