"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Container } from "@/components/ui/container";
import {
  recommendPackage,
  type Experience,
  type Situation,
} from "@/lib/recommend-package";

const EXPERIENCE_OPTIONS: { value: Experience; label: string }[] = [
  { value: "never", label: "I've never driven" },
  { value: "tried_a_few_times", label: "I've tried a few times" },
  { value: "can_drive_not_confident", label: "I can drive, but I'm not confident" },
  { value: "returning_after_break", label: "Returning after a long break" },
];

const NERVOUSNESS_OPTIONS = [
  { value: 1, label: "Not nervous at all" },
  { value: 2, label: "A little nervous" },
  { value: 3, label: "Somewhat nervous" },
  { value: 4, label: "Quite nervous" },
  { value: 5, label: "Very nervous" },
];

const SITUATION_OPTIONS: { value: Situation; label: string }[] = [
  { value: "short_trial", label: "I want to try a short session first" },
  { value: "full_course", label: "I'm ready for a full course" },
  { value: "flexible_busy", label: "I'm busy and need flexible scheduling" },
  { value: "lots_of_practice", label: "I want as much practice as possible" },
];

const PACKAGE_NAMES: Record<string, string> = {
  P1: "Package 1: Basic Road Handling",
  P2: "Package 2: Road-Ready Course",
  VIP: "VIP Experience: All-In Mastery",
  URR: "Ultimate Road Ready",
};

export function PackageRecommender() {
  const [experience, setExperience] = useState<Experience | null>(null);
  const [nervousness, setNervousness] = useState<number | null>(null);
  const [situation, setSituation] = useState<Situation | null>(null);

  const result =
    experience && nervousness && situation
      ? recommendPackage({ experience, nervousness, situation })
      : null;

  function reset() {
    setExperience(null);
    setNervousness(null);
    setSituation(null);
  }

  return (
    <section className="bg-brand-blue/5 py-16 sm:py-20">
      <Container className="max-w-2xl">
        <h2 className="font-heading text-center text-3xl font-bold text-brand-blue sm:text-4xl">
          Not sure which package?
        </h2>
        <p className="mt-4 text-center text-neutral-600">
          Answer 3 quick questions and we&apos;ll suggest a starting point.
        </p>

        {!result ? (
          <div className="mt-8 flex flex-col gap-8">
            <Question
              label="1. Have you driven before?"
              options={EXPERIENCE_OPTIONS}
              selected={experience}
              onSelect={setExperience}
            />
            <Question
              label="2. How nervous do you feel about driving?"
              options={NERVOUSNESS_OPTIONS}
              selected={nervousness}
              onSelect={setNervousness}
            />
            <Question
              label="3. What best describes your situation?"
              options={SITUATION_OPTIONS}
              selected={situation}
              onSelect={setSituation}
            />
          </div>
        ) : (
          <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-medium text-neutral-500">
              Based on your answers, we&apos;d suggest
            </p>
            <p className="font-heading mt-2 text-2xl font-bold text-brand-blue">
              {PACKAGE_NAMES[result]}
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={`/reserve?package=${result}`}
                className="inline-flex items-center justify-center rounded-full bg-brand-blue px-7 py-3.5 text-base font-semibold text-white"
              >
                Reserve {result}
              </Link>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center rounded-full border-2 border-neutral-300 px-7 py-3.5 text-base font-semibold text-neutral-700"
              >
                Start over
              </button>
            </div>
            <a
              href="#packages"
              className="mt-4 inline-block text-sm text-neutral-500 underline"
            >
              See all packages
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}

function Question<T extends string | number>({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: { value: T; label: string }[];
  selected: T | null;
  onSelect: (value: T) => void;
}) {
  return (
    <div>
      <p className="mb-3 font-medium text-neutral-800">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={clsx(
              "rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors",
              selected === opt.value
                ? "border-brand-blue bg-brand-blue text-white"
                : "border-neutral-300 text-neutral-700 hover:border-brand-blue",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
