# Implementation plan — Apex Legal & Insurance Advisory Myanmar

## Scope and structure

Build a responsive single-page static website with plain HTML5, CSS3 and vanilla JavaScript, as requested. `index.html` contains the semantic page structure and metadata; `styles.css` owns the responsive visual system, motion and accessible interaction states; `script.js` provides mobile navigation, searchable/filterable legal resources, estimator logic, accordion behavior and form/modal feedback. `assets/` contains a locally bundled SVG skyline fallback so the ZIP remains visually usable offline; the preview hero also references original generated artwork through the provided Manus-managed asset URL. `public/` contains the custom brand icon. `manus-routes.json` declares the single `/` route. The project runs as a static page and does not require a backend or collect/store user-submitted form data.

## Product behavior

The page includes a hero with both requested CTAs, an overview of Myanmar's insurance framework and core legislation, five interactive advisory-service cards, a filterable resource hub, a sector/coverage-based risk checklist estimator, and the requested consultation form. The form validates its required inputs on the client and opens an accessible confirmation dialog; the interface clearly states that this demo does not transmit or retain submissions. The estimator is educational and not a fee quote or legal opinion. Legal FAQs use careful, non-conclusive language and direct readers to verify current rules with FRD, Ministry of Planning and Finance, and qualified counsel.

## Design

**Chosen style: Contemporary editorial law-firm** — a restrained, high-trust legal identity, balancing institutional clarity with current digital service design.

- **Design movement:** contemporary editorial law-firm design with subtle Southeast Asian place cues.
- **Core principles:** clarity before ornament; precise hierarchy; calm trust; accessible interactions.
- **Color philosophy:** deep navy `#0B2545` signals institutional confidence, warm gold `#D4AF37` marks decisions and highlights, slate supports long-form reading, and white space keeps legal content approachable.
- **Layout paradigm:** an editorial, left-aligned narrative with wide margins, asymmetric hero composition, horizontal section dividers, and alternating text/image or dark/light bands rather than a uniform centered card grid.
- **Signature elements:** fine gold rulework; a compact monogram seal; restrained outline icons and document-like resource rows.
- **Interaction philosophy:** simple, legible controls with visible focus; filters and estimator return immediate, understandable feedback.
- **Animation:** short fade/slide reveals and gentle hover transitions only; respect reduced-motion settings and avoid motion that delays access.
- **Typography system:** DM Sans for interface and body copy with Playfair Display for major headlines; high-contrast sizes and generous line height for readability.
- **Brand essence:** Myanmar-focused insurance-law guidance for organizations navigating regulation, risk and disputes; precise, measured, practical.
- **Brand voice:** direct, informed and calm. Example lines: “Clarity for complex insurance decisions.” “Resolve risk before it becomes a dispute.”
- **Wordmark & logo:** a bespoke “A” monogram framed by a thin square-cornered legal seal, paired with a clean wordmark.
- **Signature brand color:** midnight navy `#0B2545`.

## Dependencies and serving

No framework, external packages, account, database or server-side API is needed. Google Fonts are loaded as a progressive enhancement with local fallbacks. A static local server on the project's configured Preview port serves the page and route manifest. ZIP packaging contains the source and local assets, excluding `.git` and transient files.

## Legal content safeguards

This is an informational demonstrator, not legal advice. FAQ answers that turn on a current directive, license category or line of business are phrased as prompts for verification rather than universal thresholds. Primary references are linked in the page and the reference check date is stated so users can verify before acting.
