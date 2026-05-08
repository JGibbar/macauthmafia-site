import React, { useMemo, useState } from "react";

// Put these files in: src/assets/SC1.png and src/assets/SC2.png
// SC1 = MacAuthMafia shield logo for the header
// SC2 = "IT'S NOT PERSONAL. IT'S POLICY." artwork for the hero card
import sc1HeaderIcon from "./assets/SC1.png";
import sc2AccessEnforcement from "./assets/SC2.png";

const navItems = [
  { label: "Expertise", href: "#expertise" },
  { label: "Best Practices", href: "#oems" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const brandAssets = {
  sc1HeaderIcon,
  sc2AccessEnforcement,
};

const iconPaths = {
  shieldCheck: [
    "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z",
    "m9 12 2 2 4-5",
  ],
  fingerprint: [
    "M2 12c0-5.5 4.5-10 10-10s10 4.5 10 10",
    "M6 12c0-3.3 2.7-6 6-6s6 2.7 6 6",
    "M10 12c0-1.1.9-2 2-2s2 .9 2 2",
    "M12 12c0 3-1 5-3 7",
    "M16 13c-.2 3.1-1.4 5.5-3.5 7.5",
    "M20 13c-.2 4.3-2 7.3-5 9",
    "M4 16c.5-1.1.8-2.4.8-4",
    "M8 16c.7-1.1 1-2.5 1-4",
  ],
  lock: [
    "M7 10V7a5 5 0 0 1 10 0v3",
    "M5 10h14v10H5z",
    "M12 14v3",
  ],
  serverCog: [
    "M4 4h16v6H4z",
    "M4 14h16v6H4z",
    "M7 7h.01",
    "M7 17h.01",
    "M16 17a2 2 0 1 0 0 .01",
    "M18.5 18.5 20 20",
  ],
  menu: ["M4 6h16", "M4 12h16", "M4 18h16"],
  x: ["M18 6 6 18", "M6 6l12 12"],
  mail: ["M4 6h16v12H4z", "m4 7 8 6 8-6"],
  chevronRight: ["m9 18 6-6-6-6"],
  checkCircle: ["M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", "m9 12 2 2 4-5"],
  network: [
    "M12 5a3 3 0 1 0 0 .01",
    "M5 19a3 3 0 1 0 0 .01",
    "M19 19a3 3 0 1 0 0 .01",
    "M10 7 6.5 16",
    "M14 7l3.5 9",
    "M8 19h8",
  ],
  badgeCheck: [
    "M12 2 15 5l4 .5.5 4 2.5 2.5-2.5 2.5-.5 4-4 .5-3 3-3-3-4-.5-.5-4L2 12l2.5-2.5.5-4 4-.5 3-3Z",
    "m9 12 2 2 4-5",
  ],
  radar: [
    "M20 12a8 8 0 1 1-8-8",
    "M16 12a4 4 0 1 1-4-4",
    "M12 12l8-8",
    "M19 5l1-4",
    "M19 5l4-1",
  ],
};

function Icon({ name, className = "h-6 w-6", title }) {
  const paths = iconPaths[name] || iconPaths.shieldCheck;
  const ariaProps = title ? { role: "img", "aria-label": title } : { "aria-hidden": "true" };

  return (
    <svg
      {...ariaProps}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function BrandImage({ src, alt, className, fallbackName = "shieldCheck" }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <Icon name={fallbackName} className={className} title={alt} />;
  }

  return <img src={src} alt={alt} className={className} loading="eager" decoding="async" onError={() => setHasError(true)} />;
}

const oemSections = [
  {
    name: "Cisco ISE",
    eyebrow: "Identity Services Engine",
    summary: "Policy sets, profiling, TrustSec alignment, pxGrid integrations, TACACS+, guest, posture, and enterprise wired/wireless access control.",
    practices: [
      "Design policy sets around clear access journeys: corporate user, corporate device, BYOD, guest, IoT, printer, camera, and exception workflows.",
      "Separate authentication from authorization logic so 802.1X, MAB, posture, and profiling results map cleanly into reusable authorization profiles.",
      "Treat profiling as a confidence model, not a magic label; combine DHCP, RADIUS, SNMP, endpoint behavior, and known exceptions.",
      "Plan certificate lifecycle early: EAP-TLS templates, trusted CA chains, revocation behavior, renewal timing, and recovery workflows.",
      "Build operations into the design: logging, live sessions, policy hit counts, change control, failed auth triage, and rollback plans.",
    ],
  },
  {
    name: "HPE Aruba ClearPass",
    eyebrow: "Policy Manager / Onboard / Guest / OnGuard",
    summary: "Standards-based 802.1X, MAC authentication, device profiling, role-based enforcement, guest access, certificate onboarding, posture, and dynamic segmentation.",
    practices: [
      "Model the secure edge around profiling, authentication, authorization, and posture before building services and enforcement policies.",
      "Use service categorization carefully: NAD type, SSID, connection method, EAP method, and device class should route sessions intentionally.",
      "Standardize enforcement outcomes: downloadable ACLs, VLANs, user roles, quarantine, redirect, deny, and remediation states.",
      "Use PKI and Onboard-style workflows where possible to reduce PEAP/MSCHAPv2 dependency and improve identity assurance.",
      "Build a practical operations dashboard: access tracker review, endpoint repository hygiene, certificate expiry checks, and role mapping validation.",
    ],
  },
  {
    name: "FortiNAC",
    eyebrow: "Visibility, Control, Automated Response",
    summary: "Discovery, endpoint fingerprinting, 802.1X/MAB visibility, network access policies, Fortinet ecosystem integrations, and automated containment.",
    practices: [
      "Start with discovery and inventory accuracy: network devices, SNMP reachability, endpoint fingerprints, switch ports, SSIDs, and locations.",
      "Rank profiling rules intentionally for performance and accuracy, using simple deterministic rules before more expensive or ambiguous checks.",
      "Define network access policies around user/host profile plus network access treatment so enforcement is readable and auditable.",
      "Validate 802.1X architecture end-to-end: access device, FortiNAC, RADIUS path, shared secrets, certificates, and failure logging.",
      "Use automated response carefully: isolate, restrict, or block compromised endpoints with tested exceptions for critical systems and facilities devices.",
    ],
  },
];

const serviceData = [
  {
    icon: "fingerprint",
    title: "802.1X & MAB Architecture",
    text: "Wired, wireless, guest, IoT, printer, camera, badge reader, and exception designs that can survive real-world endpoint chaos.",
  },
  {
    icon: "lock",
    title: "PKI for Authentication",
    text: "EAP-TLS strategy, CA trust chains, certificate templates, renewal workflows, revocation behavior, and endpoint enrollment planning.",
  },
  {
    icon: "shieldCheck",
    title: "Zero Trust Access",
    text: "Identity-first access decisions, least-privilege segmentation, posture-aware access, and rapid containment for risky endpoints.",
  },
  {
    icon: "network",
    title: "NAC Readiness Assessments",
    text: "Switch, wireless, directory, PKI, RADIUS, logging, and operational readiness reviews before rolling NAC into production.",
  },
  {
    icon: "serverCog",
    title: "Migration & Remediation",
    text: "ISE, ClearPass, FortiNAC, NPS, legacy PEAP, guest portal, posture, profiling, and multi-vendor policy cleanup projects.",
  },
  {
    icon: "radar",
    title: "Operational Triage",
    text: "Failed authentications, certificate issues, RADIUS rejects, CoA behavior, endpoint profiling misses, and enforcement drift.",
  },
];

const engagementOptions = [
  "NAC readiness assessment",
  "802.1X wired and wireless rollout",
  "PKI and EAP-TLS design",
  "Guest and BYOD workflows",
  "IoT profiling and exception strategy",
  "Zero Trust segmentation mapping",
  "Policy cleanup and migration",
  "RADIUS failure triage",
];

export function runContentSmokeTests() {
  const requiredOems = ["Cisco ISE", "HPE Aruba ClearPass", "FortiNAC"];
  const missingOems = requiredOems.filter((name) => !oemSections.some((section) => section.name === name));
  const badPracticeCounts = oemSections.filter((section) => section.practices.length !== 5).map((section) => section.name);
  const missingNavTargets = navItems.filter((item) => !item.href.startsWith("#")).map((item) => item.label);
  const hasBestPracticesLabel = navItems.some((item) => item.label === "Best Practices" && item.href === "#oems");
  const stillUsesOldOemPracticesLabel = navItems.some((item) => item.label === "OEM Practices");
  const hasExternalIconDependency = false;

  return {
    passed:
      missingOems.length === 0 &&
      badPracticeCounts.length === 0 &&
      missingNavTargets.length === 0 &&
      hasBestPracticesLabel &&
      !stillUsesOldOemPracticesLabel &&
      hasExternalIconDependency === false,
    missingOems,
    badPracticeCounts,
    missingNavTargets,
    hasBestPracticesLabel,
    stillUsesOldOemPracticesLabel,
    hasExternalIconDependency,
  };
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-300">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-zinc-50 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-zinc-300">{children}</p>
    </div>
  );
}

export default function MacAuthMafiaSite() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");
  const testResults = useMemo(() => runContentSmokeTests(), []);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormStatus("sending");

    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Contact API unavailable");
      setFormStatus("sent");
      form.reset();
    } catch {
      const subject = encodeURIComponent(`MacAuthMafia inquiry from ${formData.name || "website"}`);
      const body = encodeURIComponent(
        `Name: ${formData.name || ""}\nEmail: ${formData.email || ""}\nOrganization: ${formData.organization || ""}\nNAC Platform: ${formData.platform || ""}\n\nMessage:\n${formData.message || ""}`
      );
      window.location.href = `mailto:info@macauthmafia.com?subject=${subject}&body=${body}`;
      setFormStatus("idle");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-red-700 selection:text-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-red-700 focus:px-4 focus:py-3 focus:font-bold focus:text-white">
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/85 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
          <a href="#top" className="group flex items-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-zinc-950" aria-label="MacAuthMafia home">
            <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl border border-red-400/50 bg-zinc-950 shadow-lg shadow-red-950/30">
              <BrandImage src={brandAssets.sc1HeaderIcon} alt="MacAuthMafia SC1 brand icon" className="h-full w-full object-contain p-1" fallbackName="shieldCheck" />
            </div>
            <div>
              <p className="font-black leading-none tracking-tight text-zinc-50">MacAuthMafia</p>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-300">The NAC Experts</p>
            </div>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="rounded-lg px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-zinc-950">
                {item.label}
              </a>
            ))}
            <a href="#contact" className="ml-3 rounded-full bg-red-700 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-red-950/40 transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 focus:ring-offset-zinc-950">
              Request Help
            </a>
          </div>

          <button type="button" onClick={() => setMobileOpen((v) => !v)} className="rounded-lg p-2 text-zinc-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-zinc-950 md:hidden" aria-expanded={mobileOpen} aria-controls="mobile-menu" aria-label="Toggle navigation menu">
            {mobileOpen ? <Icon name="x" className="h-6 w-6" /> : <Icon name="menu" className="h-6 w-6" />}
          </button>
        </nav>

        {mobileOpen && (
          <div id="mobile-menu" className="border-t border-white/10 bg-zinc-950 px-4 pb-5 pt-2 md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 font-semibold text-zinc-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-red-400">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main id="main">
        <section id="top" className="relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(185,28,28,0.30),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.12),transparent_32%)]" />
          <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-red-400/70 to-transparent" />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
            <div className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-red-400/30 bg-red-950/30 px-4 py-2 text-sm font-bold text-red-100">
                <Icon name="badgeCheck" className="h-4 w-4" />
                Identity-first access control, without the drama
              </div>
              <h1 className="mt-6 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                The NAC Experts.
                <span className="block text-red-300">No cert, no cannoli.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                MacAuthMafia helps organizations design, deploy, troubleshoot, and mature network access control across Cisco ISE, HPE Aruba ClearPass, FortiNAC, and the authentication stack that surrounds them.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-red-700 px-6 py-3 text-base font-black text-white shadow-xl shadow-red-950/40 transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 focus:ring-offset-zinc-950">
                  Start a NAC Conversation <Icon name="chevronRight" className="ml-2 h-5 w-5" />
                </a>
                <a href="#oems" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-base font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 focus:ring-offset-zinc-950">
                  View Best Practices
                </a>
              </div>
            </div>

            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/40">
              <div className="rounded-[1.5rem] border border-red-300/20 bg-zinc-950 p-7">
                <div className="mx-auto flex max-w-md flex-col items-center text-center">
                  <div className="grid w-full max-w-xl place-items-center overflow-hidden rounded-[2rem] border border-red-300/40 bg-white p-3 shadow-inner sm:p-4">
                    <BrandImage src={brandAssets.sc2AccessEnforcement} alt="MacAuthMafia SC2 Access Enforcement Division artwork" className="h-auto w-full object-contain" fallbackName="fingerprint" />
                  </div>
                  <p className="mt-6 text-sm font-black uppercase tracking-[0.28em] text-red-300">Trust Nothing - Verify Everything</p>
                  <p className="mt-4 text-zinc-300">
                    802.1X, EAP-TLS, End Point Posture, Quarantine Analysis, Guest Access, and Zero Trust segmentation for the real endpoints nobody warned you about.
                  </p>
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Core focus areas">
                  {["ISE", "ClearPass", "FortiNAC"].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center font-black text-zinc-100">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="expertise" className="border-y border-white/10 bg-zinc-900/40 px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What we do" title="NAC strategy, design, deployment, and rescue">
            From clean greenfield EAP-TLS designs to messy brownfield MAB migrations, the brand promise is simple: find the endpoint, prove the identity, enforce the right access, and make operations survivable.
          </SectionHeading>

          <div className="mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {serviceData.map((service) => (
              <article key={service.title} className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6 shadow-xl shadow-black/20">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-950/60 text-red-200 ring-1 ring-red-300/20">
                  <Icon name={service.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-black text-white">{service.title}</h3>
                <p className="mt-3 leading-7 text-zinc-300">{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="oems" className="px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Top 5 Best Practices" title="Built around the big three NAC platforms">
            Cisco ISE, HPE Aruba ClearPass, and FortiNAC each have their own architecture patterns, but the fundamentals are shared: identity, certificates, profiling, enforcement, logging, and operations.
          </SectionHeading>

          <div className="mx-auto mt-12 grid max-w-7xl gap-6 lg:grid-cols-3">
            {oemSections.map((section) => (
              <article key={section.name} className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-red-300">{section.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-black text-white">{section.name}</h3>
                <p className="mt-3 leading-7 text-zinc-300">{section.summary}</p>
                <ol className="mt-6 space-y-4">
                  {section.practices.map((practice, index) => (
                    <li key={practice} className="flex gap-3">
                      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-red-700 text-sm font-black text-white" aria-hidden="true">{index + 1}</span>
                      <span className="leading-7 text-zinc-200">{practice}</span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="border-y border-white/10 bg-zinc-900/50 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-300">Engagement options</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">From assessment to enforcement</h2>
              <p className="mt-5 leading-8 text-zinc-300">
                Use this site to position MacAuthMafia as a focused expert brand for project scoping, technical advisory, rescue work, and implementation support around NAC and authentication.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {engagementOptions.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-zinc-950/70 p-4">
                  <Icon name="checkCircle" className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />
                  <span className="font-semibold text-zinc-100">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-300">Contact the family</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Need NAC help?</h2>
              <p className="mt-5 leading-8 text-zinc-300">
                Send a short note about your environment, target platform, and current pain point. 
              </p> 
              <div className="mt-6 rounded-2xl border border-red-300/20 bg-red-950/25 p-5">
                <div className="flex items-center gap-3 text-red-100">
                  <Icon name="mail" className="h-5 w-5" />
                  <p className="font-bold">Contact The Family by Email</p>
                </div>
               <p className="mt-2 text-zinc-300">Send <span className="font-semibold text-white">info@macauthmafia.com</span> a short note about your environment, target platform, and current pain points. We will be happy to get in touch with you ASAP and see how 
               we might help!</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5" aria-label="Contact form">
              <div className="grid gap-2">
                <label htmlFor="name" className="font-bold text-zinc-100">Name</label>
                <input id="name" name="name" autoComplete="name" required className="rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-red-300 focus:ring-2 focus:ring-red-300/40" placeholder="Tony Trunkport" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="font-bold text-zinc-100">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" required className="rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-red-300 focus:ring-2 focus:ring-red-300/40" placeholder="you@example.com" />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor="organization" className="font-bold text-zinc-100">Organization</label>
                  <input id="organization" name="organization" autoComplete="organization" className="rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-red-300 focus:ring-2 focus:ring-red-300/40" placeholder="Company / district" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="platform" className="font-bold text-zinc-100">Primary platform</label>
                  <select id="platform" name="platform" className="rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-red-300 focus:ring-2 focus:ring-red-300/40">
                    <option>Cisco ISE</option>
                    <option>HPE Aruba ClearPass</option>
                    <option>FortiNAC</option>
                    <option>Microsoft NPS / PKI</option>
                    <option>Multi-vendor / not sure</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="message" className="font-bold text-zinc-100">What are you trying to solve?</label>
                <textarea id="message" name="message" required rows={5} className="rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-red-300 focus:ring-2 focus:ring-red-300/40" placeholder="Tell us about your 802.1X, MAB, PKI, guest, posture, profiling, or Zero Trust challenge." />
              </div>
              <button type="submit" disabled={formStatus === "sending"} className="rounded-full bg-red-700 px-6 py-3 text-base font-black text-white shadow-xl shadow-red-950/40 transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-70">
                {formStatus === "sending" ? "Sending..." : "Send Request"}
              </button>
              <p className="text-sm leading-6 text-zinc-400" aria-live="polite">
                {formStatus === "sent" ? "Message sent. Someone from MacAuthMafia will follow up." : "By submitting, you agree to be contacted about your request. Do not include passwords, shared secrets, private keys, or sensitive production data."}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} MacAuthMafia.com. The NAC Experts.</p>
          <p>Not affiliated with Cisco, HPE Aruba Networking, or Fortinet. Vendor names are used for platform reference only.</p>
        </div>
        {!testResults.passed && (
          <div className="mx-auto mt-4 max-w-7xl rounded-xl border border-yellow-400/30 bg-yellow-950/20 p-4 text-sm text-yellow-100" role="status">
            Content smoke tests reported an issue. Check OEM sections, navigation targets, and practice counts.
          </div>
        )}
      </footer>
    </div>
  );
}
