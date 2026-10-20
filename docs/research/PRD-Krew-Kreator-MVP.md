# Krew and Kreator MVP: Product Requirements Document

| | |
|---|---|
| Product | **Krew**: run a client job from the first DM to getting paid, for videographers, photographers, designers and their crews. **Kreator** is the solo plan of the same app. |
| Release | MVP (the P0 scope in `claude/orry-product-map.html`, Krew tab) |
| Scale target | 500 users or fewer (creators plus their team members) |
| Market | India |
| Build approach | White-label and assemble proven platforms; build only the Krew layer that no platform provides |
| Relation to Trakker | Separate product, separate deployment. Krew's link to Trakker's CRM is P1 and not part of this MVP. |
| Date | 19 Oct 2026 |
| Sources | Specs in `CONTEXT/`; decisions in `claude/`; Krew research in `R&D/krew-kreator/research/01` to `05`; shared research in `R&D/research/02`, `04`, `05`, `06` (all checked 19 Oct 2026) |

**How to read the references.**
- `[K03]` means `R&D/krew-kreator/research/03-invoicing-gst-payments.md`.
- `[T05]` means the shared research file `R&D/research/05-chatbot-inbox.md`.
- The source URLs are listed in those files.
- Where research could not confirm something, this document says so and states the fallback.

---

## 1. Summary

The MVP lets a creator or crew:

1. **Connect Instagram, WhatsApp Business and Gmail**, and see client conversations in one inbox. Personal chats are never stored.
2. **Auto-reply on Instagram** with rates and portfolio, ask budget, date and type of work, then hand the chat to the creator.
3. **Send a brief** the client fills on a phone with no login.
4. **Send a quote** the client accepts online, and collect the advance by payment link.
5. **Turn the job into tasks** from a template and assign them to team members (Krew only).
6. **Share drafts for review.** The client comments on a video timestamp or an area of an image and approves, and the approved version is locked.
7. **Raise a GST or non-GST invoice** with a UPI and card link. The money goes straight to the creator's bank, tax deducted at source (TDS) is recorded, and the ledger stays current.
8. **Get reminders** (creator: push and email; client: email) that stop as soon as the thing is done.

**How we build it:**
- **We buy or reuse:**
  - **Chatwoot Community Edition** (self-hosted, rebranded) for the inbox, with one Chatwoot account per creator.
  - **Meta Cloud API with coexistence** for WhatsApp, plus the Instagram API.
  - **The Claude API** for the Instagram bot.
  - **`gmail.send`** for outgoing email from the creator's address.
  - **Cloudflare Stream and R2**, with the **Uppy** uploader and **Annotorious** image comments, for review.
  - **The creator's own Razorpay account** through Razorpay's partner sign-in, with a UPI link as the fallback.
  - **BullMQ** for reminders, **`web-push`** for push notifications, and **Amazon SES** for email.
- **We build** the **Krew layer**:
  - job record, brief form, quote and acceptance log;
  - task module and team permissions;
  - review comments and the approval lock;
  - GST invoice documents and numbering, and the ledger;
  - the reminder rules;
  - the "client or personal" gate that keeps personal chats out.

---

## 2. Goals and non-goals

### 2.1 Goals
| # | Goal | Measured by |
|---|---|---|
| G1 | A creator takes one real job from enquiry to payment inside Krew | Pilot: at least one full job per creator |
| G2 | Personal chats are never stored | Zero personal threads in storage (audit sample during the pilot) |
| G3 | No reminder is sent after the client has already acted | Zero such sends in the reminder log |
| G4 | Invoices meet GST rules | Accountant review of pilot invoices against the Rule 46 checklist [K03] |
| G5 | Creators get paid faster | AN-13, days to get paid |
| G6 | No data is ever seen across creators, or by a team member outside their jobs | Isolation tests |

### 2.2 Non-goals (not in the MVP)
- **Growth features:** the CRM pipeline, content to lead, Meta ads, profile evaluation, the intent filter.
- **Planning and job changes:** calendar and clash warnings, change requests, the revision-round count.
- **Review and delivery extras:** watermarked previews, a client job page, editing-tool plugins.
- **Money extras:** separate advance and balance invoices (but see receipt vouchers in 5.3), e-invoicing, e-sign.
- **Automation:** call notes, WhatsApp automation, any automatic WhatsApp message.
- **Reporting and plans:** analytics beyond the two money metrics, and full plan gating.
- **Other platforms:** native mobile apps, and anything from Trakker.

---

## 3. Users, roles and plans

| Role | Plan | Sees | Can do |
|---|---|---|---|
| Owner (the creator) | Krew and Kreator | Everything in their account | Connections, inbox, jobs, quotes, review, invoices, ledger, team, settings |
| Team member (shooter, editor, designer) | Krew only | Only jobs and tasks assigned to them | Update task status, upload drafts for their jobs |
| Inbox member | Krew only | The account's client inbox | Reply to clients (owner grants this per member) |
| Client | Both | Only their own brief, quote, review link and invoice, by link | Fill the brief, accept the quote, pay, comment, approve |
| Orry operations | Internal | Connection health across accounts | Support, with no access to message content |

**Plans in the MVP:**
- One codebase with a plan flag: **solo (Kreator)** or **team (Krew)**.
- Team members exist only on Krew.
- Everything else is the same on both plans in P0 (`claude/decisions.md` S7).

---

## 4. Solution approach

### 4.1 Architecture

```
  Creator / team ─► KREW APP (our build; installable, mobile-first web, push)
  Client (no login) ─► brief · quote · review · invoice pages (our build)
                         │
        ┌────────────────┼──────────────────────────────┐
        ▼                ▼                              ▼
  KREW CORE (our build)  INBOX (bought)                 FILES & REVIEW (bought)
  jobs, briefs, quotes,  Chatwoot Community,            Cloudflare Stream (video)
  acceptance log, tasks, self-hosted, one account       Cloudflare R2 (images/files)
  invoices, ledger,      per creator; API-channel       Uppy (resumable upload)
  reminders (BullMQ),    inboxes fed by our gate        Annotorious (image areas)
  CLIENT-OR-PERSONAL     ▲
  GATE, Instagram bot    │ only client chats pass
        │                │
        ├── Meta Cloud API (WhatsApp, coexistence) · Instagram API (Instagram Login)
        ├── Gmail: inbound by creator's forwarding filter; outbound by gmail.send
        ├── Claude API (Instagram bot: citations + structured outputs)
        ├── Razorpay (creator's own account via Technology Partner OAuth) / UPI link
        └── Amazon SES (email) · web-push (VAPID) notifications
```

**One rule drives the inbox design.** Chatwoot stores every message it receives, and Meta has no filter for personal WhatsApp chats [K04]. So no channel feeds Chatwoot directly:
- **WhatsApp and Instagram** webhooks come into our gate first.
- **Gmail** only ever sends Krew the mail that matches the creator's own forwarding filter.
- The gate posts **only client conversations** into Chatwoot API-channel inboxes [K04].

**Hosting:** Chatwoot's recommended production size (4 vCPU, 8 GB RAM, Postgres, Redis) is the starting point, and must be load-tested at 500 accounts [K04, T05]. The core runs in AWS Mumbai. Drafts live on Cloudflare: Stream has data centres in 22 Indian cities, and R2 has no India region [K02]. DPDP sets no general data-localisation duty [T06].

### 4.2 Why this approach (evidence)

| Option researched | What the evidence says | Decision |
|---|---|---|
| Creator business suites (Dubsado, Bonsai, Studio Ninja, VSCO Workspace, Pixieset, Plutio, Moxie) | They take payments through Stripe, PayPal or Square only. Stripe is invite-only in India, so there is no UPI flow [K01, K03] | Not chosen |
| HoneyBook; Assembly (formerly Copilot) | HoneyBook is available only in the US, Canada, UK and Australia. Assembly holds client funds before paying out, and only to those four countries [K01] | Not chosen (country, and holding funds) |
| SuiteDash reseller | Best published resale terms ($14–69 per month per account wholesale, branded app), but no Indian payment gateway [K01] | Not chosen: the whole payment flow would sit outside it |
| Perfex CRM plus a third-party SaaS module | **For:** self-hosted, proposals with online acceptance, tasks, Razorpay module, about $490 one-off [K01]. **Against:** the SaaS module is by a third-party author ("themesic"), not Perfex. Envato's licence page covers "a single end product" and says "you can't use one of our Standard Licenses on multiple clients", without settling multi-tenant use (checked 19 Oct 2026). GST invoice format and per-creator Razorpay keys are not confirmed [K01]. | Not chosen: licence risk plus GST and payment gaps, and it has no inbox or review |
| Invoice engines (Invoice Ninja, Akaunting, Crater, Zoho Invoice, InvoiceShelf) | **Invoice Ninja:** its licence (ELv2) bars hosting for others without a reseller deal. **Akaunting:** its licence bars white-labelling. **Crater:** no release since 2022. **Zoho Invoice:** shows "Powered by Zoho Invoice". **InvoiceShelf:** may be rebranded (AGPL), but its GST support is not confirmed [K03]. | Build the invoice layer. The required field list is short and fixed (Rule 46/50/53) [K03] |
| Review and proofing tools (Frame.io, Filestage, Ziflow, ReviewStudio, Wipster, Krock.io, Pastel, Kollaborate) | None is confirmed as a white-label layer we can resell to many creators at our scale. White-label is Enterprise-only where it exists [K02] | Assemble from Stream, R2, Uppy and Annotorious, plus our own comment and approval layer |
| Form builders (Formbricks, OpnForm, HeyForm, Tally, Fillout, Jotform) | Removing their branding needs Enterprise or paid tiers; Tally stores files in the EU [K05] | Build a native brief form. Tally Pro ($24 per month) is the stop-gap |
| Task tools (Plane, Vikunja, OpenProject, Taiga, Leantime) | AGPL, GPL or MPL licences; no documented embed or white-label mode [K05] | Build a small task module tied to job and team permissions |
| Per-creator inbox tools (Interakt Instagram plan ₹999 per month, ManyChat) | Not white-label, and they cost more than an inbox-only creator's Meta bill [K04] | Not chosen |
| **Chatwoot plus our gate** | One account per creator is confirmed through the Platform API. The MIT Community Edition allows rebranding [K04, T05] | **Chosen** for the inbox |

### 4.3 Components

| Layer | Component | Role | Licence or cost basis | Ref |
|---|---|---|---|---|
| Inbox | Chatwoot Community, self-hosted, rebranded; one account per creator via the Platform API; **API-channel inboxes** | PF-02 inbox, take over and hand back | MIT, $0. Fallback: Premium at $19 per agent per month | K04, T05 |
| WhatsApp | Meta Cloud API, coexistence through Embedded Signup v4, Orry as Tech Provider | PF-06, inbox only | Free to access. API replies are free up to 1,000 a month per number; replies typed in the app are always free | K04, T04, T06 |
| Instagram | Instagram API with Instagram Login (creator and business accounts) | PF-04, PF-14 | Needs App Review and Advanced Access (Orry) | K04, T04 |
| Gmail | **Inbound:** creator-made Gmail filter forwarding to a Krew address (SES inbound or Chatwoot's forwarding ingress). **Outbound:** `gmail.send` | PF-05 | `gmail.send` is a sensitive scope: about 10 business days of review and **no CASA assessment**. Read scopes are restricted and need CASA plus about 6 weeks | K04 |
| Bot | Claude API (Haiku 5.5 by default) with Citations and structured outputs | PF-14, PF-15 on Instagram only | Usage-billed | K04, T05 |
| Video review | Cloudflare Stream: encoding free; $5 per 1,000 minutes stored; $1 per 1,000 minutes delivered; signed tokens; tus upload above 200 MB, up to 30 GB by default; scheduled deletion | PF-21, PF-36 | Usage-billed | K02 |
| Files | Cloudflare R2: $0.015 per GB-month, no download (egress) fees, lifecycle deletion rules | PF-21, PF-36 | Usage-billed | K02 |
| Upload | Uppy (MIT): `@uppy/tus` to Stream, `@uppy/aws-s3` multipart uploads to R2, resumable | PF-21 | $0 | K02 |
| Image comments | Annotorious (BSD-3-Clause), React bindings | PF-21 | $0 | K02 |
| Payments | The creator's **own** Razorpay account through Technology Partner OAuth, creating Payment Links. Fallback: UPI link and QR to the creator's own UPI ID, marked paid by hand | PF-09, PF-24 | 2% on UPI, domestic cards and netbanking, plus 18% GST, paid by the creator. ₹0 setup | K03 |
| Reminders | BullMQ (MIT) delayed jobs, re-checked at send time | PF-29, PF-30 | $0 | K05 |
| Push | `web-push` (MPL-2.0) with VAPID keys | PF-37 | $0 | K05 |
| Email | Amazon SES, Mumbai | PF-29, PF-30 | $0.10 per 1,000 | T06 |

---

## 5. Functional requirements

Delivery: **Buy** = a bought component does it, **Configure** = a bought component set up by us, **Build** = Krew layer.

### 5.1 Set-up and profile

**Sign-up (Build)**
- Asks for skill (video, photo, design), city, and solo or crew. Crew sets the team plan.

**PF-34 Rate card and portfolio (Build)**
- Services, "starting from" prices, portfolio links and availability.
- Stored as the bot's approved facts, which the bot cites [K04].

**PF-35 Business and tax profile (Build)**

- **Fields:**
  - legal name, PAN, address, State and State code;
  - GSTIN, optional; when it is set, GST mode is on;
  - UPI ID and the Razorpay connection;
  - a SAC code pick-list;
  - a declared turnover band.
- **Number series:** three per financial year: invoices, credit notes and receipt vouchers. Each number is at most 16 characters (A–Z, 0–9, `-`, `/`), unique within the year, and the series reset on 1 April [K03].
- **SAC pick-list** (from the official CBIC list; the creator or their accountant chooses):

  | SAC | Description |
  |---|---|
  | 998381 | Portrait photography |
  | 998382 | Advertising photography |
  | 998383 | Event photography and videography |
  | 998385 | Photo restoration and retouching |
  | 998386 | Photo and video processing |
  | 998391 | Specialty design |
  | 998392 | Design originals |
  | 999612 | Video production |
  | 999613 | Audiovisual post-production |

  [K03]
- **Turnover-band rules** [K03]:
  - Nudge the creator to register for GST as declared turnover nears ₹20 lakh (₹10 lakh in special category States).
  - Above ₹5 crore, SAC codes need 6 digits and e-invoicing applies; show "e-invoicing not supported yet".

**PF-04 Connect Instagram (Configure and Build)**
- Professional accounts only, creator or business. A personal account gets an explanation and a guide to switching.
- For creator accounts, Krew makes a Conversations API call straight after login, because creator accounts receive no webhooks until one is made.
- Krew checks that "Allow access to messages" is on, and guides the creator if it is not [K04].

**PF-06 Connect WhatsApp Business (Configure and Build)**
- Embedded Signup v4 with coexistence, so the creator keeps using the WhatsApp Business app (version 2.24.17 or later) on the same number [K04, T04].
- No company papers are needed: a business portfolio under the creator's trade name is enough. A payment method must be added on the Tech Provider route [K04].
- Krew tells the creator to choose **"don't share chat history"**, and the gate drops any history payload [K04].
- **Inbox only:** Krew sends nothing automatically on WhatsApp.

**PF-05 Connect Gmail (Configure and Build)**
- **Inbound:** a guided step where the creator creates a Gmail filter (by client domain or a "Krew" label) that forwards to their Krew address. They can also forward any single email by hand. Only matching mail ever reaches Krew [K04].
- **Outbound:** one Google consent for `gmail.send`. Quotes, invoices and replies go from the creator's own address, threaded with the `References` and `In-Reply-To` headers [K04].
- Krew does not use Chatwoot's Gmail channel, because it needs a restricted scope [K04].

**Connection health (Build)**
- If an account disconnects, the creator gets a push and an email at once, with a reconnect button (EC-04, RM-08).
- WhatsApp coexistence drops after about 14 days of phone inactivity, so a reminder goes out before day 13 [K04].

### 5.2 Enquiries

**PF-02 Unified inbox (Buy and Configure: Chatwoot)**
- One Chatwoot account per creator, created through the Platform API. Sign-in to it is passed through from Krew [K04].
- Each conversation shows its person, channel and links to the job and invoice.
- **The client-or-personal gate (Build)** stores a WhatsApp or Instagram thread only when:
  1. the number or handle is already a Krew client or lead, or
  2. the creator taps "This is a client" on a new-chat notice.

  Until then, the message is held in a short-lived encrypted buffer for 24 hours and then discarded. Contacts marked "personal" go on a hashed block list. The same gate applies to replies the creator sends from the app (`smb_message_echoes`) [K04]. Legal review of the buffer is task V4.
- **WhatsApp replies outside the 24-hour window:** the reply box is disabled and "Reply in WhatsApp Business" opens the app on that chat. App replies are free, are not bound by the window, and come back into Krew through the gate [K04].
- **Matching:** one person per client, matched on phone, Instagram handle or email (EC-01).

**PF-14 Auto DMs (Build, on Instagram only)**
- DMs and story replies are answered automatically, but only inside 24 hours of the person's last message.
- A comment keyword gets **one** private reply within 7 days, carrying rates, the portfolio link and a question. The conversation continues only if the person replies [K04].
- The bot says it is automated, and always offers a way to reach a person [K04].

**PF-15 Enquiry questions (Build)**
- **What the bot does:**
  - Asks work type, date, budget band and location, captured as structured output.
  - May quote only the rate card's "starting from" text, and only with a citation.
  - Hands any negotiation or custom-quote intent to the creator, with a summary.

  [K04, T05]
- **Pause on creator reply:** Krew records the IDs of every message the bot sends. Any outgoing message whose ID is not on that list is the creator's own reply, and pauses the bot for that thread [K04].

### 5.3 Win the job

**PF-08 Brief capture (Build)**
- A native mobile form, opened by link with no login. It covers job type, date, location, deliverables and references, with file uploads to R2 through Uppy.
- The output is scope, deliverables, dates and revision rounds, which the creator edits and confirms.
- **Stop-gap if time is short:** Tally Pro ($24 per month: branding removed, webhooks). It stores files in the EU [K05].

**PF-09 Quote and acceptance (Build)**
- The quote is generated from the brief. The client accepts online by typing their name and ticking a box.
- **Acceptance log (cannot be changed):** the accepted version's hash, the typed name, email or phone, timestamp, IP address and device.
  - Online contract formation is supported by IT Act s.10A and the Supreme Court's *Trimex v Vedanta* (2010) [K05].
  - A typed name is **not** an "electronic signature" under the IT Act, and no Indian ruling on typed-name acceptance was found. So the log is the evidence, under s.63 of the Bharatiya Sakshya Adhiniyam [K05]. Legal sign-off is task V4.
- **Advance:** a Payment Link in the creator's own Razorpay account, or a UPI link and QR [K03].
  - **For GST-registered creators**, GST is due when the advance is received, so Krew issues a **receipt voucher** (Rule 50) as soon as it is paid. The final invoice adjusts for it [K03]. This is not the separate advance invoice that stays in P1.
- **Advance not paid before the shoot:** the job is marked "at risk" (EC-24).

**PF-01 Job record (Build)**
- Ties together the brief, quote, acceptance log, tasks, review rounds, invoice, receipts and ledger entries for one client.

### 5.4 Do the work

**PF-17 Tasks from templates (Build)**
- Templates per job type (shoot, edit, design), editable. Due dates are set back from the delivery date.

**PF-18 Assignment and status (Build)**
- Tasks are assigned to team members (Kreator: self only), with one-tap status updates.
- Overdue tasks are escalated to the owner.

**PF-03 Team and roles (Build)**
- The owner invites members. Each member sees only their assigned jobs and tasks; inbox access is granted separately.
- This is enforced in the Krew layer. How it maps onto Chatwoot's own roles is not confirmed, so Chatwoot access is limited to the owner and inbox members [K04].

**Today view and jobs list (Build)**
- **Today view:** tasks due, shoots and reminders.
- **Jobs list:** stage and amount pending for every job.

### 5.5 Approval

**PF-21 Review and approval (Buy and Build)**
- **Upload:**
  - Uppy with resumable upload. Videos go to Cloudflare Stream by tus (above 200 MB, up to 30 GB by default); images and files go to R2 by multipart upload [K02].
  - Uploads are made with one-time URLs, so no API key is ever in the browser [K02].
- **Review page (opened by link, no login):**
  - private Stream playback with signed tokens [K02];
  - comments on a video timestamp (Build) and on an image area (Annotorious) [K02];
  - comments shown by reviewer;
  - the approve button always visible.
- **Versions:** each upload is a new version of the same deliverable.
- **Approval lock:** approving locks that exact version with date, time and approver name (EC-19).

**PF-36 Storage limits and clean-up (Build on Stream and R2)**
- Per-plan limits, with a storage meter.
- Drafts are deleted 90 days after the job closes, with a warning 7 days before.
  - Stream supports scheduled deletion.
  - R2 lifecycle rules work on file age, so our job deletes files by job folder when the 90 days end [K02].
- **Invoices, credit notes, receipt vouchers and payment records are never deleted.** GST law requires keeping them for 72 months from the annual-return due date [K03].

### 5.6 Get paid

**PF-24 Invoice generation (Build)**
- **GST mode:** a tax invoice with the Rule 46 fields:
  - supplier and recipient details;
  - serial number;
  - SAC code;
  - taxable value;
  - CGST plus SGST, or IGST, decided by place of supply;
  - reverse-charge flag.

  An electronic invoice needs no signature. Overseas clients get the export endorsement [K03].
- **Non-GST mode:** a plain invoice with no tax lines, because an unregistered creator must not collect GST (s.32) [K03].
- **Tax rates:** 18% by default for heading 9983, editable per line. Later rate changes were not checked [K03].
- **Payment:** a Payment Link in the creator's own Razorpay account. Payment status comes from webhooks. Or a UPI link and QR, marked paid by hand [K03].
- **Corrections:** a paid invoice is locked, and changes go through a credit note (Rule 53(1A)), referencing the original invoice. GST credit notes are blocked after 30 November of the following financial year (s.34) [K03].
- **Timing:** invoices are due within 30 days of the work (Rule 47), which feeds the "job not invoiced" reminder [K03].

**PF-26 Receivables ledger (Build)**
- Per client: invoiced, cash received, TDS, credit notes, pending, days overdue.
- **TDS:** record only what the client actually deducted (amount, optional section, date). Never pre-fill a rate, because the client chooses 194C or 194J [K03].
- A "TDS receivable, not yet matched" report is reconciled by the creator against Form 26AS. The new form name under the Income-tax Act 2025 is not confirmed [K03].
- **Accountant export:**
  - Tally XML vouchers with stable IDs, plus a ledger-masters XML;
  - a CSV in Zoho Books' import layout;
  - a plain CSV and PDF bundle for each financial year.

  [K03]

### 5.7 Reminders and notifications

**PF-29 Reminders for the creator (Build)**
- RM-01 to RM-08 at the default timings in tab 7: unanswered lead, quote with no reply, task due, shoot tomorrow, missing advance, job not invoiced, account disconnected.
- Sent by push and email, with the WhatsApp coexistence warning before day 13.

**PF-30 Reminders for the client (Build)**
- RM-12 to RM-17 (brief, quote, feedback, advance, invoice due, receipt), **by email only**, from the creator's address through `gmail.send`, or from SES if Gmail is not connected.
- At the moment of sending, the job reloads and the reminder is cancelled if the client has already acted (EC-30) [K05].
- Quiet hours apply: 20:00–10:00, no Sundays or national holidays. The creator can mute or slow reminders for a client.

**PF-37 Push notifications (Build)**
- `web-push` with VAPID keys, and email is always sent as well [K05].
- **iPhone:** push needs iOS 16.4 or later, the app added to the Home Screen as a standalone app, and permission asked from a tap. Krew shows a step-by-step guide [K05].

### 5.8 Metrics (Build)
| ID | Metric | Calculation | Note |
|---|---|---|---|
| AN-12 | Invoiced, received, pending | Invoiced = invoices minus credit notes. Received = confirmed receipts. Pending = invoiced − received − TDS | [K03] |
| AN-13 | Days to get paid | Median of (date fully settled − invoice date) | UPI payments marked by hand are tagged "manually confirmed" [K03] |

---

## 6. Must-hold rules and where they are enforced

| Rule | Enforced in | Proof |
|---|---|---|
| Creators fully isolated | Every Krew row tagged with its creator account; one Chatwoot account per creator; one Razorpay connection per creator | Cross-account read tests |
| Team members see only assigned jobs | Krew permission layer; Chatwoot access only for the owner and inbox members | Role tests |
| Personal chats never stored | The client-or-personal gate in front of Chatwoot; history dropped; Gmail filter forwarding only | Storage audit sample in the pilot |
| Every reminder re-checked at send time | BullMQ job reloads state before sending | Test: client pays while a reminder is queued |
| The bot never commits to a price | Citation-only answers; negotiation goes to handoff; bot on Instagram only | Red-team set in English, Hindi and Hinglish |
| Orry never holds client money | Payment Links in the creator's own Razorpay account; no Route or split products | Payment flow review; legal opinion (task V4) |
| Mobile-first, plain language | Design review | Pilot on phones over 4G |

---

## 7. Integration requirements and prerequisites

| Integration | Prerequisite (owner) | Known constraint | Ref |
|---|---|---|---|
| Meta app (WhatsApp, Instagram) | Orry Business Verification and App Review, with Advanced Access for messaging and comments (Orry). Krew is a separate product; whether it shares an app with Trakker is task V9 | Onboarding cap of 10 new businesses a week until Orry is verified | T04, K04 |
| WhatsApp per creator | Business portfolio and payment method (creator) | Coexistence is fixed at 20 messages a second; it disconnects after about 14 days of inactivity; replies outside the window go through the app | K04 |
| Instagram per creator | Professional account; messages access switched on (creator) | Bot replies inside 24 hours only; one private reply per comment within 7 days | K04 |
| Gmail | Orry's sensitive-scope verification for `gmail.send` (about 10 business days); the creator sets the forwarding filter | Capped at 100 users until verified | K04 |
| Razorpay | Orry joins the Technology Partner programme; each creator signs up as "Individual / Unregistered" or a business type and authorises Krew | Access tokens expire every 90 days, so Krew must prompt the creator to reconnect | K03 |
| UPI fallback | The creator's UPI ID | NPCI stopped person-to-person collect requests from 1 Oct 2025, so payment is always started by the client. No status callback | K03 |
| Cloudflare Stream and R2 | Orry Cloudflare account | Account or plan fees beyond usage are not confirmed | K02 |
| SES | Production access; inbound email domain (Orry) | Sandbox limit until production access is granted | T06 |

---

## 8. Compliance requirements

| Area | Requirement for the MVP | Ref |
|---|---|---|
| Payments (RBI) | Orry provides technology only, with no handling of funds. That keeps it outside the Payment Aggregator Directions 2025, which would otherwise need a ₹15 crore net worth. Get a one-page legal opinion | K03 |
| GST | Rule 46 tax invoice; no GST charged by unregistered creators (s.32); receipt voucher on advance (s.13, Rule 50); credit notes (Rule 53, s.34 deadline); 72-month retention (s.36); e-invoicing blocked at ₹5 crore or more | K03 |
| TDS | Record what the client deducted; no rate pre-filled | K03 |
| DPDP | The creator is the Data Fiduciary for client data, and Krew is the Data Processor, under terms accepted at sign-up. Rights requests answered within 90 days; 72-hour breach runbook; personal chats are not stored | T06, K04 |
| Online acceptance | Clickwrap with a log that cannot be changed (s.10A IT Act; s.63 BSA) | K05 |
| Gmail | Least-privilege scope (`gmail.send` only); demo video and privacy policy for verification | K04 |
| Meta | Bot disclosure and a route to a human on Instagram; no automatic WhatsApp messages | K04 |

---

## 9. Non-functional requirements

| Area | Requirement |
|---|---|
| Scale | 500 users or fewer. Load-test Chatwoot at 500 accounts on 4 vCPU / 8 GB (task V7) [K04] |
| Uploads | Resumable; videos up to 30 GB by default on Stream [K02] |
| Security | Signed playback tokens; one-time upload URLs; Razorpay tokens encrypted; client links unguessable and revocable |
| Reliability | Payment webhooks handled once only; reminders re-checked at send time; our own retry for Chatwoot webhooks, which cannot be replayed [T05] |
| Performance | Lists and profiles load without visible delay on 4G |
| Language | Interface in English; the Instagram bot answers in English and Hindi, and in Hinglish once task V6 passes |

---

## 10. Costs we know (from research only)

| Item | Cost | Paid by | Ref |
|---|---|---|---|
| Chatwoot Community | $0 (fallback Premium at $19 per agent per month) | Orry | T05 |
| WhatsApp, inbox only | ₹0 for up to 1,000 API replies a month per number; app replies always free | Creator, billed by Meta | K04 |
| Gmail `gmail.send` | No CASA assessment; only Google's sensitive-scope verification | Orry | K04 |
| Cloudflare Stream | Encoding free; $5 per 1,000 minutes stored; $1 per 1,000 minutes delivered | Orry | K02 |
| Cloudflare R2 | $0.015 per GB-month; no download fees | Orry | K02 |
| Review storage illustration | About $64 a month for Stream plus R2 images, under the stated assumptions (200 jobs a month reaching review, 2 rounds, 5-minute drafts, 4-month retention) | Orry | K02 |
| Razorpay | 2% on UPI, domestic cards and netbanking, plus 18% GST; ₹0 setup and annual fees | Creator | K03 |
| UPI link fallback | No gateway fee | — | K03 |
| Claude Haiku 5.5 | $0.10 input / $0.50 output per million tokens | Orry | T05 |
| SES | $0.10 per 1,000 emails | Orry | T06 |
| Brief stop-gap (Tally Pro) | $24 per month, only if used | Orry | K05 |

**Not yet priced:** AWS servers, and the cost of the Chatwoot instance at 500 accounts. Both are priced in phase 0.

---

## 11. Delivery plan

Durations are given only where a source states them.

| Phase | Work | Gate to pass |
|---|---|---|
| **0. Start now** | Meta App Review for Krew's Instagram and WhatsApp permissions; Google sensitive-scope verification for `gmail.send` (about 10 business days); Razorpay Technology Partner application (task V2); legal opinions (task V4); Chatwoot written check (task V1); price the servers | Approvals filed; Razorpay answers received |
| **1. Platform** | Chatwoot hosted and rebranded, with one account per creator; Krew core (accounts, plans, team permissions); client-or-personal gate; SES inbound and outbound | Isolation and gate tests pass |
| **2. Enquiries** | Instagram connect and bot (citations, structured outputs, pause on creator reply); WhatsApp coexistence through the gate; Gmail forwarding and `gmail.send` | No personal thread is stored in test |
| **3. Win and work** | Rate card and business profile, brief form, quote and acceptance log, advance link and receipt voucher, job record, tasks and team, today view | A full job from brief to accepted quote |
| **4. Review** | Stream and R2 with Uppy, review page with timestamp and image comments, versions, approval lock, storage clean-up | Approval locked to a version; a 5 GB upload survives a dropped connection |
| **5. Money** | Invoices (GST and non-GST), Razorpay webhooks, UPI fallback, credit notes, ledger with TDS, Tally and Zoho exports, AN-12 and AN-13 | Accountant checks sample invoices against Rule 46 |
| **6. Reminders and push** | BullMQ rules, quiet hours, email to clients, push to creators, iPhone guide | No reminder is sent after the client has acted |
| **7. Pilot** | 10 creators (video, photo, design), including at least 2 crews (`claude/p0-build-plan.md`) | Goals in section 2.1 met |

---

## 12. Verification tasks

Each task is a written confirmation from a vendor or adviser, or an internal test. The fallback is already decided.

| # | Confirm with | What | If the answer is no |
|---|---|---|---|
| V1 | Chatwoot | Shipping a rebranded Community Edition inside Krew | Self-hosted Premium at $19 per agent per month [T05] |
| V2 | Razorpay partner support | That partners can create Payment Links under the `read_write` scope; that "Individual / Unregistered" creators can be onboarded; commission terms | All creators use the UPI link and QR with manual "mark paid" [K03] |
| V3 | Meta | Whether coexistence contact and history sync calls can be skipped | Make the calls, keep the data in memory only, and write nothing [K04] |
| V4 | Legal adviser | That Orry stays outside the RBI Payment Aggregator Directions; that the 24-hour buffer for unknown chats is acceptable under DPDP; that typed-name acceptance plus the log holds up | No buffer (unknown chats show as a notice only, with no content kept); add Aadhaar eSign later (Leegality ₹25 per signer) [K05] |
| V5 | Accountant | Current GST rate for SAC 9983 and 9996 after the 2025 changes; whether TDS applies to the GST part of an invoice | Rates stay editable per line; TDS stays recorded as entered |
| V6 | Internal test | Claude on Roman-script Hinglish DMs | Hand off Hinglish turns to the creator [T05] |
| V7 | Internal test | Chatwoot with 500 accounts on 4 vCPU / 8 GB | Larger server or a second node |
| V8 | Internal build spike | Stop Chatwoot sending its own email copy when we send through `gmail.send` | Use an API-channel inbox for email too [K04] |
| V9 | Meta | Whether Krew and Trakker can share one Orry Meta app | A separate Meta app for Krew |
| V10 | Internal test | UPI links on GPay, PhonePe and Paytm | Show the QR code and UPI ID only [K03] |

---

## 13. Risks

| # | Risk | Evidence | Mitigation |
|---|---|---|---|
| K1 | Chatwoot objects to the rebrand | The FAQ "discourages" rebranding services [T05] | V1; Premium fallback |
| K2 | Chatwoot's coexistence support is incomplete | Syncing app-side messages is an open, on-hold pull request [K04] | Our gate handles both directions into API-channel inboxes |
| K3 | WhatsApp link drops if the creator's phone is inactive | Drops after about 14 days of inactivity [K04] | Reminder before day 13; reconnect flow |
| K4 | Gmail growth is capped before verification | 100-user cap until verified [K04] | File for `gmail.send` verification in phase 0 |
| K5 | Razorpay access lapses | Tokens expire every 90 days [K03] | Reconnect prompt; UPI fallback stays available |
| K6 | Personal chats leak into storage | Meta has no personal-chat filter [K04] | The gate; history dropped; storage audits in the pilot |
| K7 | Invoice compliance errors | Rule 46 fields, the s.34 deadline and rate changes [K03] | Accountant review (V5); editable rates; a checklist test |
| K8 | Review costs grow with video volume | Stream bills per minute stored and delivered [K02] | Per-plan storage limits and the 90-day clean-up |

---

## Appendix A. Build vs buy by feature

| ID | Feature | Delivered by | Bought or configured part | Our build |
|---|---|---|---|---|
| PF-01 | Job record | Build | — | Record linking everything |
| PF-02 | Unified inbox | Buy + Build | Chatwoot accounts and API inboxes | Client-or-personal gate, links to jobs |
| PF-03 | Team and roles | Build | — | Permissions |
| PF-04 | Connect Instagram | Configure + Build | Instagram API with Instagram Login | Connect checks, guides |
| PF-05 | Connect Gmail | Configure + Build | Gmail forwarding filter, `gmail.send`, SES inbound | Guided filter step, threading |
| PF-06 | Connect WhatsApp | Configure + Build | Cloud API coexistence | Gate, "Reply in WhatsApp Business" |
| PF-08 | Brief capture | Build | R2 + Uppy for uploads (Tally Pro as stop-gap) | Form, brief output |
| PF-09 | Quote and acceptance | Build | Razorpay Payment Links / UPI | Quote, acceptance log, receipt voucher |
| PF-14 | Auto DMs | Build | Claude, Meta private replies | Bot rules |
| PF-15 | Enquiry questions | Build | Claude structured outputs | Handoff, pause rule |
| PF-17 | Tasks from templates | Build | — | Templates, dates |
| PF-18 | Assignment and status | Build | — | Assignment, escalation |
| PF-21 | Review and approval | Buy + Build | Stream, R2, Uppy, Annotorious | Timestamp comments, versions, approval lock |
| PF-24 | Invoice generation | Build | Razorpay webhooks | GST documents, numbering, credit notes |
| PF-26 | Receivables ledger | Build | — | Ledger, TDS, exports |
| PF-29 | Creator reminders | Build | BullMQ, web-push, SES | Rules |
| PF-30 | Client reminders | Build | BullMQ, `gmail.send` / SES | Rules, quiet hours |
| PF-34 | Rate card and portfolio | Build | — | Profile; bot facts |
| PF-35 | Business and tax profile | Build | — | Profile, number series |
| PF-36 | Storage limits and clean-up | Build | Stream scheduled deletion, R2 lifecycle | Meter, job-based deletion, keep financial records |
| PF-37 | Push notifications | Build | `web-push` (VAPID) | Installable app, iPhone guide |

## Appendix B. Research files
| File | Topic |
|---|---|
| `research/01-white-label-creator-platforms.md` | 20 creator and business platforms against P0 |
| `research/02-review-video-storage.md` | Review tools, video hosting, uploads, storage prices |
| `research/03-invoicing-gst-payments.md` | Payment routes, RBI, invoice engines, GST rules, TDS, exports |
| `research/04-creator-inbox-channels.md` | Gmail scopes and CASA, WhatsApp for creators, Instagram creator accounts, Chatwoot per creator |
| `research/05-briefs-tasks-reminders.md` | Form builders, task tools, push, reminder engines, online acceptance |
| `../research/02, 04, 05, 06` | Shared: WhatsApp platforms, Meta rules, Chatwoot and Claude, costs and DPDP |
