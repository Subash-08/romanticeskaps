"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BedDouble,
  CalendarDays,
  ChevronDown,
  Compass,
  Headphones,
  MapPin,
  Menu,
  Plane,
  Sparkles,
  X,
} from "lucide-react";
import { SiteFooter } from "@/components/SiteChrome";
import { honeymoonPackages } from "@/lib/packages";

const journeys = honeymoonPackages.slice(0, 4).map(item => ({ code: item.code, days: item.duration.toUpperCase(), place: item.destination, title: item.title, copy: item.summary, image: item.image, pos: item.imagePosition, slug: item.slug, price: item.priceLabel }));

const benefits = [
  { title: "Personalised Itinerary", copy: "A journey built around your pace, interests, and time together.", icon: Compass },
  { title: "Handpicked Stays", copy: "Beautiful options selected for privacy, atmosphere, and character.", icon: BedDouble },
  { title: "Flexible Dates", copy: "Thoughtful alternatives when your travel plans need room to move.", icon: CalendarDays },
  { title: "Romantic Experiences", copy: "Meaningful moments chosen to feel personal, never formulaic.", icon: Sparkles },
  { title: "Dedicated Planning", copy: "A real person to guide each decision from first idea to departure.", icon: Headphones },
];

const promises = [
  ["Personal Planning", "A journey shaped through conversation, not a one-size-fits-all package."],
  ["Selected Stays", "Accommodation options chosen for quality, privacy, and a sense of place."],
  ["Meaningful Experiences", "Unhurried moments designed around what the two of you enjoy."],
  ["Flexible Itineraries", "A clear plan with breathing room for slower days and spontaneous choices."],
  ["Clear Inclusions", "Straightforward proposals that make it easy to understand every option."],
  ["Dedicated Assistance", "One planning contact to guide the details and answer your questions."],
];

const faqs = [
  ["Can we customise our honeymoon package?", "Yes. Every sample journey is a starting point. Destinations, stays, activities, pace, and duration can be adjusted in your proposal."],
  ["Are flights included?", "Flights are included only when they are specifically listed in your individual proposal. Options vary by departure city and travel dates."],
  ["Can we choose our accommodation?", "Yes. We can present a considered selection of stays based on your style, priorities, and approximate budget."],
  ["How early should we plan?", "Starting six to nine months ahead usually gives you more choice, though the right lead time depends on destination and season."],
  ["Can we travel on flexible dates?", "Yes. Flexible dates can open up better routing and stay options. We can compare suitable date windows in your proposal."],
  ["How do we request a quotation?", "Share your ideas through the planning form. This prototype does not transmit data; a real enquiry service must be connected before launch."],
];

function Brand() {
  return <Link className="brand" href="/" aria-label="romanticeskaps home"><span className="brand-mark"><Compass size={18} /></span><span>romanticeskaps</span></Link>;
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}><span />{children}</p>;
}

function ArrowButton({ label, primary = false, onClick, href }: { label: string; primary?: boolean; onClick?: () => void; href?: string }) {
  const className = `action ${primary ? "action-primary" : "action-ghost"}`;
  const content = <>{label}<span className="action-icon"><ArrowUpRight size={20} /></span></>;
  return href ? <a className={className} href={href}>{content}</a> : <button className={className} onClick={onClick}>{content}</button>;
}

function Header({ onPlan }: { onPlan: () => void }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const focusable = panel.current?.querySelectorAll<HTMLElement>("a,button");
    focusable?.[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
      if (event.key === "Tab" && focusable?.length) {
        const first = focusable[0]; const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  const links = [["Home", "/"], ["Packages", "/packages"], ["Gallery", "/gallery"], ["About", "/about"], ["Journal", "/journal"]];
  return <>
    <header className="site-header"><Brand /><nav className="desktop-nav" aria-label="Primary navigation">{links.map(([l, h]) => <a href={h} key={h}>{l}</a>)}</nav><button className="header-plan" onClick={onPlan}>Get In Touch <span><Plane size={18} /></span></button><button ref={trigger} className="menu-trigger" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(v => !v)}>{open ? <X /> : <Menu />}<span className="sr-only">Menu</span></button></header>
    <div id="mobile-menu" ref={panel} className={`mobile-menu ${open ? "open" : ""}`} aria-hidden={!open}>
      <div className="mobile-links">{links.map(([l, h], i) => <a href={h} key={h} onClick={() => setOpen(false)}><span>0{i + 1}</span>{l}</a>)}<button onClick={() => { setOpen(false); onPlan(); }}><span>06</span>Get In Touch</button></div>
      <div className="menu-foot"><span>hello@romanticeskaps.example</span><span>PLANNING DEMO</span></div>
    </div>
  </>;
}

function PlanningModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [done, setDone] = useState(false);
  const titleId = useId();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("modal-open");
    return () => { document.removeEventListener("keydown", onKey); document.body.classList.remove("modal-open"); };
  }, [open, onClose]);
  if (!open) return null;
  function submit(e: FormEvent) { e.preventDefault(); setDone(true); }
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}><section className="planner" role="dialog" aria-modal="true" aria-labelledby={titleId}>
    <button className="modal-close" onClick={onClose} aria-label="Close planning form"><X /></button>
    <Eyebrow>YOUR JOURNEY</Eyebrow><h2 id={titleId}>Tell us what the two of you imagine.</h2><p className="modal-intro">A beautiful starting point for a personal conversation.</p>
    {done ? <div className="demo-complete"><span><Sparkles /></span><h3>Demo complete</h3><p>No information was sent. Connect an approved enquiry service before launch.</p><button className="text-link" onClick={onClose}>Close</button></div> : <form onSubmit={submit}>
      <label>Name<input required name="name" autoFocus /></label><label>Email<input required type="email" name="email" /></label><label>Phone<input name="phone" /></label><label>Destination<select name="destination"><option>Undecided</option><option>Maldives</option><option>Bali</option><option>Munnar</option><option>Kashmir</option></select></label><label>Travel date<input type="date" name="date" /></label><label>Approximate budget<select name="budget"><option>Prefer to discuss</option><option>₹2–4 lakh</option><option>₹4–7 lakh</option><option>₹7 lakh+</option></select></label><label className="field-wide">Special requests<textarea rows={3} name="requests" /></label><p className="demo-note field-wide">Demo only — no information is sent.</p><button className="form-submit field-wide" type="submit">Complete Demo <ArrowUpRight size={18} /></button>
    </form>}
  </section></div>;
}

function JourneyCard({ item, index }: { item: typeof journeys[number]; index: number }) {
  return <article className="journey-card reveal" style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}>
    <div className="journey-image"><img src={item.image} alt={`${item.place} honeymoon landscape`} style={{ objectPosition: item.pos }} /><div className="card-pills"><span><Plane size={13} /> {item.code}</span><span>{item.days}</span></div><p className="place">⌖ {item.place}</p></div>
    <div className="journey-copy"><h3>{item.title}</h3><p>{item.copy}</p><div className="journey-bottom"><div><span>STARTING ESTIMATE</span><strong>{item.price}</strong></div><Link aria-label={`View ${item.title}`} href={`/packages/${item.slug}`}><ArrowUpRight /></Link></div></div>
  </article>;
}

function FaqAccordion() {
  const [active, setActive] = useState(0);
  return <div className="faq-list">{faqs.map(([q, a], i) => { const open = active === i; return <div className={`faq-row ${open ? "active" : ""}`} key={q}><button aria-expanded={open} aria-controls={`faq-${i}`} onClick={() => setActive(open ? -1 : i)}><span>Q.{String(i + 1).padStart(2, "0")}</span><strong>{q}</strong><ChevronDown /></button><div id={`faq-${i}`} className="faq-answer" aria-hidden={!open}><div><p>{a}</p></div></div></div>; })}</div>;
}

function TheRomanticeskapsWay({ onPlan }: { onPlan: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const travelerRef = useRef<SVGGElement>(null);
  const [progress, setProgress] = useState(0);
  const [pathLength, setPathLength] = useState(1320);

  const stops = [
    { n: "01", label: "QUIET COASTS", threshold: 0.12, left: "10%", top: "76px" },
    { n: "02", label: "MOUNTAIN TRAILS", threshold: 0.38, left: "37%", top: "98px" },
    { n: "03", label: "VIBRANT CITIES", threshold: 0.68, left: "66%", top: "30px" },
    { n: "04", label: "HIDDEN ESCAPES", threshold: 0.92, right: "4%", top: "68px" },
  ];

  useEffect(() => {
    if (pathRef.current) {
      try {
        const len = pathRef.current.getTotalLength();
        if (len > 0) setPathLength(len);
      } catch (err) { }
    }
  }, []);

  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        // Animation smoothly tracks as section scrolls through viewport
        const start = vh * 0.85;
        const end = vh * 0.15;
        const total = rect.height + (start - end);
        const current = start - rect.top;
        const p = Math.max(0, Math.min(1, current / total));
        setProgress(p);

        if (pathRef.current && travelerRef.current) {
          try {
            const len = pathRef.current.getTotalLength();
            const point = pathRef.current.getPointAtLength(p * len);
            travelerRef.current.setAttribute("transform", `translate(${point.x}, ${point.y})`);
          } catch (e) { }
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="philosophy" id="story" ref={sectionRef}>
      {/* Floating photo cards with refined alignment and subtle scroll parallax */}
      <div
        className="floating-photo fp-one"
        style={{ transform: `translateY(${progress * -24}px) rotate(-6deg)` }}
      >
        <div className="fp-card">
          <img src="/images/island.jpg" alt="Quiet coasts and island mornings" />
          <span className="fp-caption">01 · Quiet Coasts</span>
        </div>
      </div>
      <div
        className="floating-photo fp-two"
        style={{ transform: `translateY(${progress * -34}px) rotate(5deg)` }}
      >
        <div className="fp-card">
          <img src="/images/dinner.jpg" alt="Candlelit dinner by the sea" />
          <span className="fp-caption">02 · Candlelit Moments</span>
        </div>
      </div>
      <div
        className="floating-photo fp-three"
        style={{ transform: `translateY(${progress * 26}px) rotate(3deg)` }}
      >
        <div className="fp-card">
          <img src="/images/pool.jpg" alt="Private sanctuary and pool" />
          <span className="fp-caption">03 · Hidden Sanctuaries</span>
        </div>
      </div>
      <div
        className="floating-photo fp-four"
        style={{ transform: `translateY(${progress * 20}px) rotate(-4deg)` }}
      >
        <div className="fp-card">
          <img src="/images/island.jpg" alt="Scenic mountain trails" />
          <span className="fp-caption">04 · Mountain Trails</span>
        </div>
      </div>

      <div className="philosophy-copy reveal">
        <Eyebrow>THE ROMANTICESKAPS WAY</Eyebrow>
        <h2>Every love story deserves an extraordinary beginning.</h2>
        <p>
          From private island mornings to mountain air and candlelit evenings, we shape
          journeys around the way you want to feel together.
        </p>
        <button className="text-link button-link" onClick={onPlan}>
          Discover Our Story <ArrowUpRight size={15} />
        </button>
      </div>

      {/* Desktop curved journey route with progressive scroll animation */}
      <div className="way-route way-desktop-route reveal" aria-label="A journey from quiet coasts to hidden escapes">
        <svg viewBox="0 0 1200 180" preserveAspectRatio="none" className="way-svg">
          <path
            className="way-track"
            d="M0 112 C150 112 170 25 330 25 S500 142 650 112 S865 5 1010 36 S1120 104 1200 72"
          />
          <path
            ref={pathRef}
            className="way-progress"
            d="M0 112 C150 112 170 25 330 25 S500 142 650 112 S865 5 1010 36 S1120 104 1200 72"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: pathLength * (1 - progress),
            }}
          />
          <g
            ref={travelerRef}
            className="way-traveler"
            style={{ opacity: progress > 0.02 ? 1 : 0 }}
          >
            <circle r="14" className="traveler-halo" />
            <circle r="6" className="traveler-dot" />
          </g>
        </svg>

        {stops.map((stop, i) => {
          const isReached = progress >= stop.threshold;
          return (
            <div
              className={`way-stop way-stop-${i + 1} ${isReached ? "is-reached" : ""}`}
              key={stop.n}
              style={{
                left: stop.left,
                right: stop.right,
                top: stop.top,
              }}
            >
              <span className="way-stop-badge">
                <small>{stop.n}</small>
                <b>{stop.label}</b>
              </span>
              <i className="way-stop-pin" aria-hidden="true">
                <MapPin size={22} />
                {isReached && <span className="pin-pulse" />}
              </i>
            </div>
          );
        })}
      </div>

      {/* Mobile vertical progressive route */}
      <div className="way-mobile-route">
        <div className="way-mobile-track">
          <div
            className="way-mobile-fill"
            style={{ height: `${Math.min(100, Math.max(0, progress * 100))}%` }}
          />
        </div>
        <div className="way-mobile-stops">
          {stops.map((stop) => {
            const isReached = progress >= stop.threshold;
            return (
              <div
                className={`way-mobile-stop ${isReached ? "is-reached" : ""}`}
                key={stop.n}
              >
                <div className="way-mobile-pin">
                  <MapPin size={20} />
                  {isReached && <span className="pin-pulse" />}
                </div>
                <div className="way-mobile-content">
                  <span className="way-mobile-num">{stop.n}</span>
                  <strong className="way-mobile-label">{stop.label}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HeroFlightRoute() {
  const pathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const trailRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const plane = planeRef.current;
    const trail = trailRef.current;
    if (!path || !plane) return;

    let totalLen = 540;
    try {
      const l = path.getTotalLength();
      if (l > 0) totalLen = l;
    } catch (e) {}

    if (trail) {
      trail.style.strokeDasharray = `${totalLen}`;
      trail.style.strokeDashoffset = `${totalLen}`;
    }

    let startTime: number | null = null;
    let frameId: number;
    const duration = 6800; // 6.8s smooth flight cycle

    const loop = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const raw = (elapsed % duration) / duration;

      // 0 to 0.85 is flying; 0.85 to 1.0 is arrival pause before next flight
      let p = 0;
      let opacity = 1;
      if (raw < 0.85) {
        const t = raw / 0.85;
        // Smooth cubic in-out curve for takeoff, cruise and landing
        p = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        if (t < 0.08) opacity = t / 0.08;
        else if (t > 0.92) opacity = (1 - t) / 0.08;
      } else {
        p = 1;
        opacity = 0;
      }

      try {
        const currentLen = Math.max(0.1, Math.min(totalLen, p * totalLen));
        const pt = path.getPointAtLength(currentLen);
        const lookAhead = Math.min(totalLen, currentLen + 3);
        const ptNext = path.getPointAtLength(lookAhead);
        const angle = Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x) * (180 / Math.PI);

        plane.setAttribute("transform", `translate(${pt.x}, ${pt.y}) rotate(${angle})`);
        plane.style.opacity = `${opacity}`;

        if (trail) {
          trail.style.strokeDashoffset = `${totalLen * (1 - p)}`;
          trail.style.opacity = `${opacity * 0.95}`;
        }
      } catch (err) {}

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="hero-route" aria-hidden="true">
      <div className="route-pill">
        <span className="route-pill-dot" />
        <span className="route-pill-text">HONEYMOON FLIGHT</span>
        <span className="route-pill-meta">MLE → DPS</span>
      </div>

      <svg viewBox="0 0 520 180" className="route-svg">
        <defs>
          <linearGradient id="flightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6542" stopOpacity="0.2" />
            <stop offset="35%" stopColor="#ff7a5a" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#ff6542" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffa085" stopOpacity="0.9" />
          </linearGradient>
          <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" mode="over" />
          </filter>
        </defs>

        {/* Base dashed flight arc */}
        <path
          ref={pathRef}
          d="M 44 140 C 180 18, 340 30, 476 132"
          className="route-base-path"
        />

        {/* Dynamic jet stream trail */}
        <path
          ref={trailRef}
          d="M 44 140 C 180 18, 340 30, 476 132"
          className="route-active-trail"
        />

        {/* Departure Pin (MLE) */}
        <g className="route-stop-pin" transform="translate(44, 140)">
          <circle r="12" className="stop-ping" />
          <circle r="7" className="stop-halo" />
          <circle r="4" className="stop-core" />
        </g>

        {/* Arrival Pin (DPS) */}
        <g className="route-stop-pin" transform="translate(476, 132)">
          <circle r="12" className="stop-ping" />
          <circle r="7" className="stop-halo" />
          <circle r="4" className="stop-core" />
        </g>

        {/* Guided Airplane with realistic rotation */}
        <g ref={planeRef} className="route-plane-group">
          <circle r="18" className="plane-halo" />
          <circle r="13" className="plane-core" />
          {/* Symmetrical supersonic passenger jet facing forward (+X / 0deg) */}
          <path
            d="M 9 0 L -2 -7 L -4 -7 L -1 -2 L -6 -2 L -8 -5 L -9 -5 L -8.5 0 L -9 5 L -8.5 5 L -6 2 L -1 2 L -4 7 L -2 7 Z"
            fill="#ffffff"
            className="plane-jet-svg"
          />
        </g>
      </svg>

      {/* Origin Badge */}
      <div className="route-tag tag-mle">
        <div className="tag-box">
          <span className="tag-code">MLE</span>
          <span className="tag-name">Maldives</span>
        </div>
      </div>

      {/* Destination Badge */}
      <div className="route-tag tag-dps">
        <div className="tag-box">
          <span className="tag-code">DPS</span>
          <span className="tag-name">Bali</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [plannerOpen, setPlannerOpen] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("revealed"); observer.unobserve(e.target); } }), { threshold: .1, rootMargin: "0px 0px -8% 0px" });
    nodes.forEach(n => observer.observe(n));
    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--hero-shift", `${Math.min(scrollY * .12, 90)}px`);
      });
    };
    const updatePointer = (event: PointerEvent) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
      root.style.setProperty("--hero-x", `${50 + (event.clientX / innerWidth - .5) * 2.4}%`);
      root.style.setProperty("--hero-y", `${48 + (event.clientY / innerHeight - .5) * 1.6}%`);
    };
    updateScroll();
    addEventListener("scroll", updateScroll, { passive: true });
    addEventListener("pointermove", updatePointer, { passive: true });
    return () => { observer.disconnect(); cancelAnimationFrame(frame); removeEventListener("scroll", updateScroll); removeEventListener("pointermove", updatePointer); root.classList.remove("motion-ready"); };
  }, []);
  return <main id="top">
    <div className="cursor-glow" aria-hidden="true" />
    <a className="skip-link" href="#content">Skip to content</a>
    <section className="hero">
      <Header onPlan={() => setPlannerOpen(true)} />
      <div className="hero-shade" />
      <div className="hero-content">
        <Eyebrow light>HONEYMOONS, THOUGHTFULLY MADE</Eyebrow>
        <h1><span>Just Married.</span><em>Forever Exploring.</em></h1>
        <p className="hero-copy">Beautiful destinations, private stays, and unforgettable experiences — thoughtfully planned for the two of you.</p>
        <div className="hero-actions"><ArrowButton label="Plan Our Honeymoon" primary onClick={() => setPlannerOpen(true)} /><ArrowButton label="Explore Destinations" href="#journeys" /></div>
      </div>
      <HeroFlightRoute />
      <div className="hero-lower"><div className="service-bar">{["TAILORED JOURNEY", "PRIVATE MOMENTS", "HANDPICKED STAYS", "HUMAN SUPPORT"].map((x, i) => <div key={x}><strong>0{i + 1}</strong><span>{x}</span></div>)}</div><div className="ticket"><img src="/images/island.jpg" alt="Maldives island" /><div><span>FEATURED ESCAPE</span><strong>Maldives, Made for Two</strong><p>MLE <i /> 7 nights <i /> Sample</p></div><Plane /></div></div>
    </section>

    <div id="content">
      <TheRomanticeskapsWay onPlan={() => setPlannerOpen(true)} />

      <section className="section journeys" id="journeys"><div className="split-head reveal"><div><Eyebrow>EXPLORE</Eyebrow><h2>Find a honeymoon that feels like yours.</h2></div><div><p>Private islands, vibrant culture, misty mountains, and unhurried days — shaped around the two of you.</p><a className="text-link" href="#journey-grid">View All Journeys <ArrowUpRight size={15} /></a></div></div><div className="journey-grid" id="journey-grid">{journeys.map((j, i) => <JourneyCard key={j.code} item={j} index={i} />)}</div></section>

      <section className="experiences" id="experiences"><div className="experience-head reveal"><div><Eyebrow light>EXPERIENCE</Eyebrow><h2>Not just a beautiful place.<br /><em>A beautiful way to begin.</em></h2></div><div><p>We leave room for privacy, connection, small discoveries, and the joy of having nowhere else to be.</p><Link className="text-link light-link" href="/gallery">Explore Experiences <ArrowUpRight size={15} /></Link></div></div><div className="polaroids">
        {[{ n: "01", t: "Private Beach Dinners", c: "An evening arranged only for the two of you.", img: "/images/dinner.jpg" }, { n: "02", t: "Local Encounters", c: "Experiences that make a place feel personal.", img: "/images/island.jpg" }, { n: "03", t: "Slow Mornings", c: "Leave room for nowhere else to be.", img: "/images/pool.jpg" }].map((p, i) => <article className={`polaroid polaroid-${i + 1} reveal`} key={p.n}><span className="tape" /><img src={p.img} alt={p.t} /><h3><small>{p.n}</small>{p.t}</h3><p>{p.c}</p></article>)}
      </div></section>

      <section className="section benefits"><div className="split-head reveal"><div><Eyebrow>PLAN WITH EASE</Eyebrow><h2>Beautifully planned. Effortlessly enjoyed.</h2></div><div><p>From the first idea to the journey home, every detail is made clear, calm, and personal.</p><button className="text-link button-link" onClick={() => setPlannerOpen(true)}>Start Planning <ArrowUpRight size={15} /></button></div></div><div className="benefit-line">{benefits.map((b, i) => { const Icon = b.icon; return <article key={b.title} className={`benefit-card ${i % 2 === 0 ? "light" : "dark"} reveal`} style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}><span className="benefit-icon"><Icon /></span><h3>{b.title}</h3><p>{b.copy}</p><small>TAG 0{i + 1}</small></article> })}</div></section>

      <section className="stories"><div className="section story-inner"><div className="story-intro reveal"><Eyebrow>COUPLE STORIES</Eyebrow><h2>The journeys couples carry home.</h2><p>Review-ready layouts for approved stories. The copy below remains clearly marked as sample content.</p></div><div className="review-summary reveal"><div><strong>5.0</strong><span>★★★★★</span><small>SAMPLE RATING</small></div><p>Every published review will be linked to a completed romanticeskaps journey and approved by the couple.</p><span>01 / 03</span></div><div className="story-cards review-cards">{["Everything felt calm, personal, and beautifully paced from the first conversation.", "The thoughtful details made the journey feel like ours rather than a packaged itinerary.", "There was room to explore, slow down, and simply enjoy being together."].map((q, i) => <article key={q}><div className="review-card-top"><span>★★★★★</span><small>REVIEW 0{i + 1}</small></div><blockquote>“{q}”</blockquote><div className="review-author"><b>{String.fromCharCode(65 + i)}</b><div><h3>Couple {String.fromCharCode(65 + i)}</h3><small>SAMPLE REVIEW · DESTINATION PENDING</small></div></div></article>)}</div></div></section>

      <section className="section promises"><div className="promise-intro reveal"><Eyebrow>WHY ROMANTICESKAPS</Eyebrow><h2>Six promises behind every honeymoon.</h2><p>Thoughtful planning, carefully selected options, and a real person to help shape your journey.</p></div><div className="promise-grid">{promises.map(([t, c], i) => <article className="reveal" style={{ "--delay": `${i * 65}ms` } as React.CSSProperties} key={t}><span>0{i + 1}</span><div><h3>{t}</h3><p>{c}</p></div></article>)}</div></section>

      <section className="section journal journal-home-cta" id="journal"><div className="split-head reveal"><div><Eyebrow>THE JOURNAL</Eyebrow><h2>Useful guidance, published with purpose.</h2></div><div><p>Destination notes and honeymoon-planning answers will appear here only after they are researched, reviewed, and approved.</p><Link className="text-link" href="/journal">Visit the journal <ArrowUpRight size={15} /></Link></div></div></section>

      <section className="section faq" id="faq"><div className="faq-intro reveal"><Eyebrow>GOOD TO KNOW</Eyebrow><h2>Everything you need before you go.</h2><p>A few helpful answers while you imagine the journey.</p><button className="text-link button-link" onClick={() => setPlannerOpen(true)}>Talk to a Planner <ArrowUpRight size={15} /></button></div><FaqAccordion /></section>

      <section className="closing cta-section" id="start-planning">
        <img src="/images/dinner.jpg" alt="Romantic candlelit dinner over the water at sunset" className="closing-hero-img" />
        <div className="closing-shade" />
        <div className="closing-glow" aria-hidden="true" />
        <div className="closing-card reveal">
          <div className="cta-badge">
            <span className="cta-badge-dot" />
            <span>START YOUR JOURNEY</span>
          </div>
          <h2>Your forever starts with a <em>beautiful journey</em>.</h2>
          <p className="cta-copy">
            Tell us how you imagine your honeymoon. From private island mornings to mountain air and candlelit evenings, we’ll help shape an experience that feels unmistakably yours.
          </p>
          <div className="cta-actions">
            <button className="cta-primary-btn" onClick={() => setPlannerOpen(true)}>
              <span>Start Planning Our Honeymoon</span>
              <span className="cta-btn-arrow"><ArrowUpRight size={18} /></span>
            </button>
            <Link className="cta-secondary-btn" href="/enquiry">
              <span>Request Custom Proposal</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="cta-trust-strip">
            <div className="trust-item"><Sparkles size={14} /><span>Complimentary Initial Proposal</span></div>
            <div className="trust-item"><Compass size={14} /><span>Handpicked Romantic Stays</span></div>
            <div className="trust-item"><Plane size={14} /><span>100% Personalised Route</span></div>
          </div>
        </div>
      </section>

      <div className="destination-marquee" aria-label="Featured destinations"><div>{Array(2).fill("Kerala · Kashmir · Gangtok · Darjeeling · Shimla · Manali · Andaman · Munnar · Alleppey · Havelock · ").map((x, i) => <span key={i}>{x}</span>)}</div></div>

      <SiteFooter />
    </div>
    <PlanningModal open={plannerOpen} onClose={() => setPlannerOpen(false)} />
  </main>;
}
