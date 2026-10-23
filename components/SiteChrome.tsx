"use client";

import Link from "next/link";
import { ArrowUp, Compass, Menu, X } from "lucide-react";
import { useState } from "react";

export function SiteBrand() {
  return <Link className="brand" href="/" aria-label="romanticeskaps home"><span className="brand-mark"><Compass size={18} /></span><span>romanticeskaps</span></Link>;
}

const navItems = [
  ["Packages", "/packages"],
  ["About", "/about"],
  ["Journal", "/journal"],
  ["Enquire", "/enquiry"],
];

export function InnerHeader() {
  const [open, setOpen] = useState(false);
  return <header className="inner-header-shell">
    <div className="inner-header">
      <SiteBrand />
      <nav className="inner-nav" aria-label="Primary navigation">
        {navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
      <Link className="inner-plan" href="/enquiry">Plan our honeymoon</Link>
      <button className="inner-menu-trigger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(value => !value)}>{open ? <X /> : <Menu />}</button>
    </div>
    <nav className={`inner-mobile-nav ${open ? "open" : ""}`} aria-hidden={!open}>
      {navItems.map(([label, href], index) => <Link key={href} href={href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}</Link>)}
    </nav>
  </header>;
}

export function SiteFooter() {
  const groups = [
    ["EXPLORE", [["Home", "/"], ["Packages", "/packages"], ["About", "/about"], ["Journal", "/journal"]]],
    ["PLAN", [["Enquire", "/enquiry"], ["How it works", "/about#how-it-works"], ["FAQ", "/#faq"], ["Contact", "/enquiry"]]],
    ["DESTINATIONS", [["Kerala", "/packages/kerala-backwaters-and-munnar"], ["Kashmir", "/packages/kashmir-valleys-and-shikara"], ["Andaman", "/packages/andaman-island-honeymoon"]]],
    ["LEGAL", [["Privacy", "/privacy"], ["Terms", "/terms"], ["Booking conditions", "/booking-conditions"]]],
  ] as const;

  return <footer className="site-footer">
    <div className="footer-top">
      <div className="footer-brand">
        <SiteBrand />
        <h3>Honeymoons shaped around the two of you.</h3>
        <a href="mailto:hello@romanticeskaps.example">hello@romanticeskaps.example</a>
        <p>Contact details are placeholders until launch.</p>
      </div>
      <div className="footer-links">
        {groups.map(([heading, links]) => <div key={heading}><b>{heading}</b>{links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</div>)}
      </div>
    </div>
    <div className="footer-word" aria-label="romanticeskaps">romanticeskaps</div>
    <div className="footer-bottom"><span>© 2026 ROMANTICESKAPS</span><span>HONEYMOONS, THOUGHTFULLY MADE</span><Link href="#top">Back to top <ArrowUp size={14} /></Link></div>
  </footer>;
}
