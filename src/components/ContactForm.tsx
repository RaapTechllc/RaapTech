"use client";

import { useState } from "react";
import { ArrowRight } from "./icons";

type FormState = "idle" | "submitting" | "success" | "error";

const INITIAL_FORM = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState(INITIAL_FORM);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setFormState(res.ok ? "success" : "error");
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <div className="flex h-full flex-col items-start justify-center border-2 border-ink bg-paper p-10">
        <div className="mb-6 flex h-12 w-12 items-center justify-center border-2 border-ink bg-ink">
          <svg
            className="h-6 w-6 text-paper"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="square" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-2 font-display text-2xl font-bold text-ink">
          Message received.
        </h3>
        <p className="mb-6 text-sm text-gray-1">
          We&apos;ll be in touch within one business day.
        </p>
        <button
          onClick={() => {
            setFormState("idle");
            setForm(INITIAL_FORM);
          }}
          className="btn-secondary"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="field"
          />
        </div>
        <div>
          <label htmlFor="email" className="field-label">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@company.com"
            className="field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="field-label">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={form.company}
          onChange={handleChange}
          placeholder="Your shop or company"
          className="field"
        />
      </div>

      <div>
        <label htmlFor="subject" className="field-label">
          Subject *
        </label>
        <select
          id="subject"
          name="subject"
          required
          value={form.subject}
          onChange={handleChange}
          className="field appearance-none"
        >
          <option value="" disabled>
            Select a topic
          </option>
          <option value="database-health-audit">Database Health Audit</option>
          <option value="remediation-sprint">Remediation Sprint</option>
          <option value="monthly-retainer">Monthly Retainer</option>
          <option value="free-diagnostic">Free Database Diagnostic</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="field-label">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your shop, your database setup (CADmep, CAMduct, ESTmep), and what's not working..."
          className="field resize-none"
        />
      </div>

      {formState === "error" && (
        <p role="alert" className="border-2 border-ink bg-paper px-4 py-3 text-sm font-medium text-ink">
          Something went wrong sending that. Email us directly at
          TRaap@RaapTech.com or call 224-202-6962.
        </p>
      )}

      <div className="flex items-center justify-between pt-2">
        <p className="font-mono text-xs text-gray-2">* Required fields</p>
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {formState === "submitting" ? (
            "Sending..."
          ) : (
            <>
              Send Message
              <ArrowRight />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
