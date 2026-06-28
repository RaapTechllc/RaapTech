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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setFormState("success");
  };

  if (formState === "success") {
    return (
      <div className="flex h-full flex-col items-start justify-center border-2 border-ink bg-volt p-10 shadow-hard">
        <div className="mb-6 flex h-12 w-12 items-center justify-center border-2 border-ink bg-paper">
          <svg
            className="h-6 w-6 text-ink"
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
        <p className="mb-6 text-sm text-ink/80">
          We&apos;ll be in touch within 24 hours.
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
            placeholder="Kyle Raap"
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
            placeholder="kyle@company.com"
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
          placeholder="Your company name"
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
          <option value="fabrication-consulting">
            Autodesk Fabrication Consulting
          </option>
          <option value="ai-onboarding">AI Onboarding</option>
          <option value="database-maintenance">
            Fabrication Database Maintenance
          </option>
          <option value="estimating-workflow">
            Estimating Workflow Optimization
          </option>
          <option value="on-site-training">On-Site Training</option>
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
          placeholder="Tell us about your shop, your fabrication setup, and where you want AI or workflow help..."
          className="field resize-none"
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <p className="font-mono text-xs text-steel">* Required fields</p>
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {formState === "submitting" ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Sending...
            </>
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
