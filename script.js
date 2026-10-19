const navToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-nav");

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navToggle.setAttribute(
    "aria-label",
    isOpen ? "Open navigation" : "Close navigation",
  );
  nav?.classList.toggle("is-open", !isOpen);
});

nav?.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open navigation");
  }),
);

document.querySelectorAll(".service-expand").forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    const details = button
      .closest(".service-item")
      ?.querySelector(".service-more");
    button.setAttribute("aria-expanded", String(!expanded));
    button.setAttribute(
      "aria-label",
      `${expanded ? "Show more" : "Show less"} about ${button.closest(".service-item")?.querySelector("h3")?.textContent ?? "this service"}`,
    );
    if (details) details.hidden = expanded;
  });
});

const searchInput = document.querySelector("#resource-search");
const resourceRows = [...document.querySelectorAll(".resource-row")];
const filterButtons = [...document.querySelectorAll(".filter-chip")];
const emptyNotice = document.querySelector("#resource-empty");
let activeFilter = "all";

function filterResources() {
  const term = searchInput?.value.trim().toLowerCase() ?? "";
  let visible = 0;
  resourceRows.forEach((row) => {
    const categoryMatches =
      activeFilter === "all" || row.dataset.category === activeFilter;
    const textMatches =
      !term ||
      `${row.textContent} ${row.dataset.search ?? ""}`
        .toLowerCase()
        .includes(term);
    const show = categoryMatches && textMatches;
    row.hidden = !show;
    if (show) visible += 1;
  });
  if (emptyNotice) emptyNotice.hidden = visible > 0;
}

searchInput?.addEventListener("input", filterResources);
filterButtons.forEach((button) =>
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter ?? "all";
    filterButtons.forEach((chip) => {
      const selected = chip === button;
      chip.classList.toggle("is-active", selected);
      chip.setAttribute("aria-pressed", String(selected));
    });
    filterResources();
  }),
);

document.addEventListener("keydown", (event) => {
  if (
    event.key === "/" &&
    !["INPUT", "TEXTAREA", "SELECT"].includes(
      document.activeElement?.tagName ?? "",
    )
  ) {
    event.preventDefault();
    searchInput?.focus();
  }
  if (event.key === "Escape" && nav?.classList.contains("is-open")) {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.focus();
  }
});

const reviewPrompts = {
  sector: {
    services: [
      "Confirm professional indemnity and cyber exposure against client contracts.",
      "Check business-interruption triggers, waiting periods and evidence requirements.",
    ],
    manufacturing: [
      "Review machinery breakdown, business interruption and supply-chain dependencies.",
      "Match declared values to current replacement costs and site inventories.",
    ],
    construction: [
      "Review project-specific cover, contractor responsibilities and extensions.",
      "Check third-party liability, worker injury and contract indemnity alignment.",
    ],
    logistics: [
      "Trace custody, transit routes and hand-off points across the supply chain.",
      "Check cargo valuation, accumulation limits, carrier liability and territorial scope.",
    ],
    hospitality: [
      "Review property values, guest/public liability and interruption dependencies.",
      "Confirm employee, food-safety and event exposures are addressed.",
    ],
    energy: [
      "Map asset, operational, environmental and business-interruption exposures.",
      "Review specialist exclusions, aggregation and reinsurance capacity.",
    ],
  },
  coverage: {
    property: [
      "Reconcile insured values, locations and named perils with the asset register.",
      "Check business-interruption period, waiting period and supporting records.",
    ],
    liability: [
      "Align limits and territorial scope with contracts and third-party exposure.",
      "Review defence costs, exclusions and incident-notification requirements.",
    ],
    motor: [
      "Separate statutory third-party cover from comprehensive fleet protection.",
      "Verify vehicle schedules, permitted use, drivers and current premium requirements.",
    ],
    marine: [
      "Confirm Incoterms, insured interest, voyage route and goods valuation.",
      "Review packing, delay, accumulation and claims-documentation requirements.",
    ],
    life: [
      "Check eligibility, worker categories, beneficiary records and policy terms.",
      "Keep commercial employee cover distinct from statutory social-security duties.",
    ],
    reinsurance: [
      "Confirm license, approval and counterparty requirements for the proposed placement.",
      "Review cessions, retention, contract wording, sanctions and claims cooperation.",
    ],
  },
};

const sectorSelect = document.querySelector("#sector");
const coverageSelect = document.querySelector("#coverage");
const assessButton = document.querySelector("#assess-button");
const resultPanel = document.querySelector("#assessment-result");

assessButton?.addEventListener("click", () => {
  const sector = sectorSelect?.value ?? "services";
  const coverage = coverageSelect?.value ?? "property";
  const prompts = [
    ...(reviewPrompts.sector[sector] ?? []),
    ...(reviewPrompts.coverage[coverage] ?? []),
  ];
  const base =
    {
      services: 32,
      manufacturing: 48,
      construction: 54,
      logistics: 46,
      hospitality: 40,
      energy: 64,
    }[sector] ?? 40;
  const adjustment =
    {
      property: 10,
      liability: 7,
      motor: 4,
      marine: 12,
      life: 6,
      reinsurance: 14,
    }[coverage] ?? 6;
  const score = Math.min(95, base + adjustment);
  const band =
    score >= 70
      ? "PRIORITY REVIEW"
      : score >= 55
        ? "FOCUSED REVIEW"
        : "ROUTINE REVIEW";
  const scoreElement = document.querySelector("#risk-score");
  const bandElement = document.querySelector("#risk-band");
  const list = document.querySelector("#checklist");
  const title = document.querySelector("#result-title");
  if (scoreElement) scoreElement.textContent = `${score}/100`;
  if (bandElement) bandElement.textContent = band;
  if (title)
    title.textContent = `${sectorSelect?.selectedOptions[0]?.textContent} · ${coverageSelect?.selectedOptions[0]?.textContent}`;
  if (list)
    list.replaceChildren(
      ...prompts.map((prompt) => {
        const li = document.createElement("li");
        li.textContent = prompt;
        return li;
      }),
    );
  if (resultPanel) {
    resultPanel.hidden = false;
    resultPanel.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "nearest",
    });
  }
});

const form = document.querySelector("#consultation-form");
const dialog = document.querySelector("#confirmation-dialog");
const closeDialog = document.querySelector("#close-dialog");
const dialogName = document.querySelector("#dialog-name");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const name =
    form.elements.namedItem("name")?.value.trim().split(/\s+/)[0] || "there";
  if (dialogName) dialogName.textContent = name;
  dialog?.showModal();
});

closeDialog?.addEventListener("click", () => dialog?.close());
dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
dialog?.addEventListener("close", () => closeDialog?.blur());

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
if ("IntersectionObserver" in window && !reducedMotion) {
  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          instance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((element) => observer.observe(element));
} else {
  document
    .querySelectorAll(".reveal")
    .forEach((element) => element.classList.add("is-visible"));
}
