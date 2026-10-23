import { InnerHeader, SiteFooter } from "@/components/SiteChrome";

export function PolicyPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <main id="top" className="inner-page"><InnerHeader /><section className="policy-page"><p className="eyebrow"><span />{eyebrow}</p><h1>{title}</h1><div className="policy-copy">{children}</div></section><SiteFooter /></main>;
}
