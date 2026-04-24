# AI Receptionist

**Owner:** Chris Gonzales
**Created:** 2026-04-24
**Status:** Discovery / Market Research

## Vision

A personal AI receptionist for the *average consumer's cell phone* — not a business IVR. Acts as an intelligent barrier between the user and their incoming calls/messages, with a personality that reflects the user.

## Core Capabilities (as described by Chris)

### Inbound (call handling)
- Answer incoming calls on behalf of the user
- Triage: identify caller, determine purpose
- Verify caller identity via live web search (e.g., "I'm from ABC Business" → check if ABC Business exists / matches caller ID)
- Detect spam / robocalls / fraud and act on user-defined rules (take message, hang up, warn, etc.)
- Transfer call to user when appropriate
- Schedule appointments on user's calendar
- Take messages with structured context (caller, reason, urgency)
- **Emergency "Break Glass" Protocol:** Detect panic/urgency or recognize a secret "safe word" to immediately bypass all screening and ring the user's physical phone.

### Outbound / Agentic
- **Make outbound phone calls on the user's behalf**
- Call businesses to schedule appointments (doctors, haircuts, etc.)
- Call restaurants to place food orders from the user's favorite spots
- Call retail stores to check inventory for specific products or ask about services offered
- **Secure Financial Layer (The Payment Problem):** Integration with virtual cards (e.g., Privacy.com/Stripe) to generate single-use cards so the AI can securely pay for food or deposits over the phone without exposing real credit card numbers.
- User can instruct the receptionist to send texts, post to social media (Instagram, etc.), etc.
- Act as a connector across the user's digital communication surfaces

### Personality
- Not a generic answering machine
- Configurable voice, tone, style — reflects the user's own personality
- User sets rules: how to handle meeting requests, who's allowed through, etc.

### User Interface / Dispatch
- **Low-Friction Command Channel:** User can text or send voice memos directly to the AI to dispatch tasks (e.g., "Call Home Depot and see if they have 2x4s, then text me"). Must be as easy as texting a human.

### Platforms
- Must work for iPhone and Android (Galaxy) users
- Deployment model TBD — native app, cloud number forwarding, carrier integration, etc.

## Primary Goals

1. **Reduce fraud** — AI triages before the human is reached
2. **Reduce stress / nuisance calls** — spam/robocalls don't reach the user
3. **Act as a personal assistant** — not just a filter

## Key Questions to Answer (Phase 1 — Market Research)

- Does a consumer-grade product like this already exist?
- Who's building it (startups, Big Tech, carriers)?
- What's the state of the art (2025-2026)?
- Technical feasibility for a non-coder to ship this
- Regulatory landscape (call recording laws, TCPA, carrier policies)
- Distribution: can this be an app, or does it need carrier-level integration?

## Phase Plan

- **Phase 1:** Market research + competitive analysis → `research/market-landscape.md`
- **Phase 2:** Technical feasibility + architecture options → `research/tech-feasibility.md`
- **Phase 3:** Business model + go-to-market → `research/business-model.md`
- **Phase 4:** Prototype plan (if green-lit)

## Files

- `README.md` — this file (project brief)
- `research/` — market + technical research outputs
