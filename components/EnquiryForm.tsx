"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { honeymoonPackages } from "@/lib/packages";

export function EnquiryForm({ initialPackage = "" }: { initialPackage?: string }) {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) return <div className="enquiry-success"><span><Check /></span><h2>Your enquiry is ready for connection.</h2><p>This local prototype did not send your information. Connect the future enquiry API or CRM before launch.</p><button onClick={() => setSent(false)}>Edit enquiry</button></div>;

  return <form className="enquiry-form" onSubmit={submit}>
    <label>Your name<input name="name" required placeholder="Both names are welcome" /></label>
    <label>Email address<input name="email" type="email" required placeholder="you@example.com" /></label>
    <label>Phone number<input name="phone" type="tel" placeholder="Optional" /></label>
    <label>Package<select name="package" defaultValue={initialPackage}><option value="">Still deciding</option>{honeymoonPackages.map(item => <option key={item.slug} value={item.slug}>{item.title}</option>)}</select></label>
    <label>Preferred month<input name="month" type="month" /></label>
    <label>Approximate budget<select name="budget"><option value="">Prefer to discuss</option><option>Under Rs. 50,000</option><option>Rs. 50,000 - Rs. 80,000</option><option>Rs. 80,000 - Rs. 1,20,000</option><option>Rs. 1,20,000+</option></select></label>
    <label className="field-wide">What would make this feel perfect?<textarea name="message" rows={5} placeholder="Tell us about your pace, interests, celebration plans, or must-have moments." /></label>
    <p className="form-consent field-wide">Demo form only. No information is transmitted or stored.</p>
    <button className="field-wide" type="submit">Prepare enquiry <ArrowUpRight /></button>
  </form>;
}
