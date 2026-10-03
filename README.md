# Adapt EORE/CPP

A React 19 / TypeScript / Vite Progressive Web App demonstrating evidence-driven adaptation of urban risk education and conflict preparedness guidance. Fictional Aruna scenario; sample content is not operational advice. No explosive-ordnance handling instructions are included.

## Run

Node 22+ recommended. `npm install`, `npm run dev`, `npm test`, `npm run build`. Serve `dist/` over HTTPS (or localhost for service-worker development). Six functional screens share a device-local repository.

## Demo walkthrough

1. Evidence: inspect EV-041/042 or add a report with provenance and a small document attachment. Records are source data, never inferred observations.
2. Analysis: as Leila (Analyst), generate clearly labeled simulated assistance. Review the baseline comparison and enter human analyst judgment, then record it.
3. Messages / Guidance: inspect active v1 and proposed wording, then record edits if needed. Requested Kurdish coverage is metadata; no translated or audio assets are fabricated.
4. Review & Approval: enter rationale and submit as Analyst. Switch the demo role selector to Daniel for technical review, Maya for multidisciplinary review, and Samir for national approval. Each stage needs its assigned role and a rationale. Reviewers may return the proposal to Draft.
5. National approval creates v2 and supersedes v1 atomically in the repository. It does not send or disseminate anything. Both versions remain visible.
6. Use the offline simulation. Read approved guidance and queue field feedback. Connectivity-dependent edits are disabled. End simulation: queued feedback is synchronized to the **local mock repository**, opens reassessment and generates an audit event. Real network reconnection follows the same queue flow.
7. Inspect feedback, coverage gaps and the complete audit trail. Map filters operate on fictional records and coverage metadata; the schematic map is not navigational.

## Architecture

- Shared core: `src/domain.ts` contains typed models, seed records, permission-checked workflow, guidance versioning, feedback synchronization and audit creation. Business logic is separate from presentation.
- Sovereign national configuration: demo country, authority, language policy, permitted sources, standards, AI policy, retention, hosting ownership, integrations and dissemination rules. National approver can configure stage-role assignments while the proposal is Draft. The final approval stage always requires National Approver. There is no global operational authority.
- Operator layer: Civic Relief and Urban Access users submit source reports and feedback, perform analysis and assigned reviews under national rules.
- `src/repository.ts`: replaceable localStorage adapter; no AWS, cloud database, production identity service or enterprise tenancy. Geography, authority and operator relationships model conceptual separation only. Role switching is a demonstration, not a security boundary. This is a single-national-workspace prototype.
- `src/main.tsx`: six operational screens and responsive navigation. The workflow operates on explicit states and preserves source/inference/judgment distinctions.
- `public/sw.js` + build-generated asset manifest: network-first same-origin app-shell caching, with all built JS/CSS pre-cached. Active guidance and key dashboard data persist in localStorage. Previously initialized data remain readable offline. Initial app visit requires connectivity. Cache and localStorage are not encrypted.
- Feedback queue: append-only pending records with stable IDs; reconnect sync changes status once and triggers reassessment. Synchronization is simulated locally, not delivered to a server or another device. Storage failures surface to the user. Full offline editing and approval are deliberately absent.
- A read-only, feature-detected browser WebMCP tool exposes workflow status. There are no agent tools for approval or publication. Supported-context validation was unavailable in this environment.

## AI boundaries

This MVP has **no live model calls**. Its deterministic fixture demonstrates how assistance could structure evidence and suggest adaptations. Machine inference is labeled and displayed separately from source records and human judgment. AI cannot approve, activate, publish, disseminate or determine national policy. Workflow guards reject an AI actor at every stage. No unrestricted OSINT collection, surveillance, personal-attribute inference or hazard-handling recommendations are implemented. Humans remain accountable for analysis, localization, technical review and national approval. Language coverage flags are requests for review, not completed translations.

## Future integration strategy

Keep domain models and approval rules independent of data transport. Replace the repository with authenticated, nationally hosted APIs and add explicit source adapters for IMSMA, ArcGIS, national databases, geospatial services, RAPIDA-style outputs and operator systems. File/API imports must retain origin, licensing, timestamps, restrictions and source IDs. This platform complements existing systems; it does not replace them. No live integrations are implemented in the MVP.

## Validation

`npm test` covers ordered role transitions, wrong-role denial, AI approval prohibition at every stage, offline action denial, analyst validation requirements, rationale requirements, v2 creation/v1 supersession, audit records, rejection, queued feedback, idempotent sync and reassessment. TypeScript and a production Vite build validate source compilation. Browser visual/offline install QA has not been run; see pilot checklist.

## Pilot hardening TODO

- [ ] Production authentication, detailed RBAC, separation of duties and nationally defined stage policies
- [ ] National tenant isolation; operator-scoped access and restrictive document handling
- [ ] Encrypted storage, attachment scanning, privacy assessment and national data-retention controls
- [ ] Durable national API/database and offline acknowledgments, conflict resolution and retry/backoff
- [ ] National hosting options, cloud deployment and country-specific residency controls
- [ ] Production GIS, IMSMA, ArcGIS and national reporting integrations
- [ ] Multilingual workflows, reviewed translations, language/audience/channel variants and localized accessible audio
- [ ] Accessibility audit, keyboard focus trapping for modals, screen-reader and 200% zoom QA
- [ ] Real model governance, model evaluation, evidence-grounding checks and human acceptance criteria
- [ ] Tamper-evident production audit logging and cybersecurity review
- [ ] Real-device PWA installation, cache update, storage eviction and degraded-connectivity field validation
- [ ] Multi-case adaptations, archived guidance and configurable terminology/SOP editing
- [ ] Explicit human-managed dissemination integration with separate national permission controls

Do not use the prototype with sensitive or real operational data. Demo audit and permissions are mutable device-local state and are not production enforcement.

## Independent hosting

This repository is standalone React/TypeScript/Vite source. No ChatGPT account, OpenAI API key or Sites service is required to build or run it. The initial demonstration hosting configuration is excluded.

For AWS: run `npm ci` and `npm run build`, upload the contents of `dist/` to a private S3 origin, and serve through CloudFront using origin access control. Attach your domain with an ACM certificate in us-east-1. Serve over HTTPS for the PWA. Set index.html, sw.js and manifest.webmanifest to revalidate; hashed /assets/ files can use long-lived immutable caching. Preserve /sw.js at the origin root, and invalidate app-shell files on deployment. Keep bucket access private and configure appropriate security headers. This frontend has no production sign-in system; add access controls before sharing beyond a demonstration.

Do not commit AWS credentials. Backend, model access and multi-user synchronization require a separate nationally approved implementation.
