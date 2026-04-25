"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        setFormState("error");
        setErrorMessage(
          data?.message ||
            "We couldn’t send your message right now. Please email tim@raaptech.com instead."
        );
        return;
      }

      setFormState("success");
    } catch {
      setFormState("error");
      setErrorMessage(
        "We couldn’t send your message right now. Please email tim@raaptech.com instead."
      );
    }
  };

  if (formState === "success") {
    return (
      <div className="flex flex-col items-start justify-center h-full py-12">
        <div className="w-12 h-12 border-2 border-brand-emerald flex items-center justify-center mb-6">
          <svg
            className="w-6 h-6 text-brand-emerald"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="square"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Message received.</h3>
        <p className="text-slate-400 text-sm mb-6">
          Your inquiry was sent to the RaapTech intake system. We&apos;ll follow up as soon as we review it.
        </p>
        <button
          onClick={() => {
            setFormState("idle");
            setErrorMessage("");
            setForm({
              name: "",
              email: "",
              company: "",
              subject: "",
              message: "",
            });
          }}
          className="btn-secondary text-xs"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2"
          >
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Tim Raap"
            className="w-full bg-dark-surface border border-dark-border text-white text-sm px-4 py-3 placeholder:text-slate-600 focus:outline-none focus:border-brand-orange transition-colors font-sans"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2"
          >
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="tim@company.com"
            className="w-full bg-dark-surface border border-dark-border text-white text-sm px-4 py-3 placeholder:text-slate-600 focus:outline-none focus:border-brand-orange transition-colors font-sans"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="company"
          className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2"
        >
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={form.company}
          onChange={handleChange}
          placeholder="Your company name"
          className="w-full bg-dark-surface border border-dark-border text-white text-sm px-4 py-3 placeholder:text-slate-600 focus:outline-none focus:border-brand-orange transition-colors font-sans"
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2"
        >
          Subject *
        </label>
        <select
          id="subject"
          name="subject"
          required
          value={form.subject}
          onChange={handleChange}
          className="w-full bg-dark-surface border border-dark-border text-white text-sm px-4 py-3 focus:outline-none focus:border-brand-orange transition-colors font-sans appearance-none"
        >
          <option value="" disabled>
            Select a topic
          </option>
          <option value="workflow-audit">Workflow Audit + First Fix</option>
          <option value="ops-upgrade">Construction Ops Upgrade</option>
          <option value="ongoing-support">Operations Support</option>
          <option value="fabrication">Fabrication Consulting</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your project, what you're building, and what kind of help you're looking for..."
          className="w-full bg-dark-surface border border-dark-border text-white text-sm px-4 py-3 placeholder:text-slate-600 focus:outline-none focus:border-brand-orange transition-colors font-sans resize-none"
        />
      </div>

      <div className="flex items-center justify-between pt-2 gap-4">
        <p className="font-mono text-xs text-slate-600">
          * Required fields
        </p>
        {formState === "error" ? (
          <p className="max-w-xs text-right text-xs text-red-400">{errorMessage}</p>
        ) : null}
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="btn-primary text-xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formState === "submitting" ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
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
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="square"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
