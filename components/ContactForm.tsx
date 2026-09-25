"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("company_website")) return; // spam trap
    const name = String(f.get("name") || "");
    const email = String(f.get("email") || "");
    const phone = String(f.get("phone") || "");
    const message = String(f.get("message") || "");

    if (site.formEndpoint) {
      setState("sending");
      try {
        const r = await fetch(site.formEndpoint, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, message }),
        });
        setState(r.ok ? "sent" : "error");
        if (r.ok) e.currentTarget.reset();
      } catch {
        setState("error");
      }
      return;
    }
    // No form service set up: open the visitor's email app with the message filled in.
    const body = `${message}\n\n— ${name}\n${email}${phone ? "\n" + phone : ""}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Website enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
    setState("sent");
  };

  if (state === "sent")
    return (
      <div className="form-done" role="status">
        <h3>Thank you!</h3>
        <p>{site.formEndpoint ? "Your message has been sent. We’ll get back to you soon." : "Your email app should now be open with your message — just press Send."}</p>
      </div>
    );

  return (
    <form className="form" onSubmit={submit}>
      <div className="form-row">
        <label>
          <span>Your name *</span>
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          <span>Email *</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <label>
        <span>Phone</span>
        <input name="phone" type="tel" autoComplete="tel" />
      </label>
      <label>
        <span>How can we help? *</span>
        <textarea name="message" rows={5} required />
      </label>
      <input name="company_website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      {state === "error" && <p className="form-error">Sorry, something went wrong. Please email or call us instead.</p>}
      <button className="btn" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send message"}
      </button>
      <p className="form-note">We only use your details to reply to your enquiry.</p>
    </form>
  );
}
