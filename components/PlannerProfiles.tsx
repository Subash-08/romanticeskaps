import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function PlannerProfiles() {
  return <section className="section planners" id="planners">
    <div className="split-head">
      <div><p className="eyebrow"><span />MEET ROMANTICESKAPS</p><h2><em>People who plan with heart.</em></h2></div>
      <div><p>Behind each journey is a person who listens, researches, and brings the pieces together with care.</p><Link className="text-link" href="/enquiry">Start a conversation <ArrowUpRight size={15} /></Link></div>
    </div>
    <div className="passport">
      <div className="passport-photo"><img src="/images/dinner.jpg" alt="Placeholder travel planner portrait" /><span>PLACEHOLDER PORTRAIT</span></div>
      <div className="passport-info"><p className="passport-title">◉ PASSPORT · PASSEPORT · ROMANTICESKAPS</p><div className="passport-fields">{[["SURNAME", "Placeholder"], ["GIVEN NAMES", "Planner Name"], ["BASE", "To be confirmed"], ["ROLE", "Honeymoon Designer"], ["JOINED", "Pending"], ["JOURNEYS PLANNED", "Not published"]].map(([key, value]) => <div key={key}><small>{key}</small><strong>{value}</strong></div>)}</div><blockquote>“This quotation is placeholder copy and must be replaced with an approved team statement before launch.”</blockquote><p className="machine">P&lt;ROMANTICESKAPS&lt;&lt;PLANNER&lt;DETAILS&lt;PENDING&lt;&lt;&lt;&lt;&lt;</p></div>
    </div>
    <div className="route-ticker"><span>KERALA • KASHMIR • SIKKIM • DARJEELING • SHIMLA • MANALI • ANDAMAN •</span></div>
  </section>;
}
