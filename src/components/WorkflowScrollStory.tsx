"use client";

import { useEffect, useRef, useState } from "react";

const scenes = [
  {
    number: "01",
    eyebrow: "See the whole job",
    title: "Map where work actually moves.",
    body: "We trace the handoffs between the office, PMs, foremen, and the shop so the bottleneck is visible before it becomes rework.",
    signal: "INPUTS CONNECTED",
    detail: "Email · RFIs · daily reports · submittals",
  },
  {
    number: "02",
    eyebrow: "Fix the friction",
    title: "Build the handoff your team needs.",
    body: "The right fix makes information easier to find, easier to trust, and harder to lose. We focus on one workflow that can save time immediately.",
    signal: "FLOW SIMPLIFIED",
    detail: "Clear owner · clear next step · clear record",
  },
  {
    number: "03",
    eyebrow: "Keep it moving",
    title: "Leave with a process that sticks.",
    body: "Your team gets a practical working change—not a binder of recommendations—plus documentation they can use after the audit is over.",
    signal: "TEAM ENABLED",
    detail: "Built · tested · handed off",
  },
] as const;

export default function WorkflowScrollStory() {
  const [activeScene, setActiveScene] = useState(0);
  const sceneRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleScene = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleScene) {
          setActiveScene(Number(visibleScene.target.getAttribute("data-scene-index")));
        }
      },
      { rootMargin: "-32% 0px -32% 0px", threshold: [0.25, 0.5, 0.75] },
    );

    sceneRefs.current.forEach((scene) => scene && observer.observe(scene));
    return () => observer.disconnect();
  }, []);

  const active = scenes[activeScene];

  return (
    <section className="border-y border-dark-border bg-dark-surface" aria-labelledby="workflow-story-heading">
      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,0.8fr)] lg:gap-20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-emerald" />
              <span className="section-tag">A better workflow has a story</span>
            </div>
            <h2 id="workflow-story-heading" className="text-3xl md:text-5xl font-bold text-white tracking-tight max-w-xl">
              From scattered information to a working system.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              Good operations are connected. As the job changes, the right information should move with it—without someone chasing an inbox or rebuilding a spreadsheet at the end of the day.
            </p>

            <div className="mt-12 space-y-6">
              {scenes.map((scene, index) => (
                <article
                  key={scene.number}
                  ref={(element) => {
                    sceneRefs.current[index] = element;
                  }}
                  data-scene-index={index}
                  className={`border-l-2 py-2 pl-6 transition-all duration-500 motion-reduce:transition-none ${
                    activeScene === index ? "border-brand-orange" : "border-dark-border"
                  }`}
                >
                  <div className="font-mono text-xs tracking-widest text-brand-emerald">{scene.number} / {scene.eyebrow}</div>
                  <h3 className={`mt-2 text-xl font-semibold transition-colors duration-500 motion-reduce:transition-none ${activeScene === index ? "text-white" : "text-slate-500"}`}>
                    {scene.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">{scene.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start" aria-live="polite">
            <div className="relative overflow-hidden border border-dark-border bg-dark-bg p-6 sm:p-8 min-h-[25rem]">
              <div className="absolute inset-0 opacity-30" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(16,185,129,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,.18) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
              <div className={`absolute -right-24 -top-24 h-64 w-64 border border-brand-orange/50 transition-transform duration-700 motion-reduce:transition-none ${activeScene === 0 ? "translate-x-0 translate-y-0" : activeScene === 1 ? "-translate-x-16 translate-y-16" : "-translate-x-28 translate-y-28"}`} aria-hidden="true" />
              <div className={`absolute -bottom-20 -left-20 h-52 w-52 border border-brand-emerald/50 transition-transform duration-700 motion-reduce:transition-none ${activeScene === 2 ? "translate-x-12 -translate-y-10" : "translate-x-0 translate-y-0"}`} aria-hidden="true" />

              <div className="relative flex items-center justify-between border-b border-dark-border pb-4 font-mono text-xs">
                <span className="text-slate-500">RAAPTECH / WORKFLOW VIEW</span>
                <span className="text-brand-emerald">{activeScene + 1} / {scenes.length}</span>
              </div>

              <div className="relative flex min-h-[18rem] flex-col justify-end pt-16">
                <div className="mb-auto flex items-center gap-3 font-mono text-xs tracking-widest text-brand-emerald">
                  <span className="inline-block h-2 w-2 bg-brand-emerald animate-pulse motion-reduce:animate-none" />
                  {active.signal}
                </div>
                <div className="font-mono text-7xl font-bold leading-none text-dark-muted" aria-hidden="true">{active.number}</div>
                <h3 className="mt-4 max-w-sm text-2xl font-bold text-white sm:text-3xl">{active.title}</h3>
                <p className="mt-4 border-l border-brand-orange pl-4 font-mono text-xs leading-relaxed text-slate-400">{active.detail}</p>
              </div>

              <div className="relative mt-8 flex gap-2" aria-hidden="true">
                {scenes.map((scene, index) => (
                  <span key={scene.number} className={`h-px flex-1 transition-colors duration-500 motion-reduce:transition-none ${index <= activeScene ? "bg-brand-orange" : "bg-dark-border"}`} />
                ))}
              </div>
            </div>
            <p className="mt-4 font-mono text-xs leading-relaxed text-slate-500">
              Scroll through the workflow. The visual system follows the same principle as the work: one connected progression, not disconnected steps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
