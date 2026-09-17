import { describe, expect, it } from "vitest";
import { formatPeso, splitIncludes, splitPackageTitle } from "./format";

describe("formatPeso", () => {
  it("formats whole numbers with the peso sign and thousands separators", () => {
    expect(formatPeso(14800)).toBe("₱14,800");
    expect(formatPeso(5000)).toBe("₱5,000");
  });

  it("rounds fractional amounts", () => {
    expect(formatPeso(5000.4)).toBe("₱5,000");
    expect(formatPeso(5000.6)).toBe("₱5,001");
  });
});

describe("splitIncludes", () => {
  it("splits a lead-in and comma-separated items", () => {
    const result = splitIncludes(
      "Everything in P1, plus: real driving on actual roads, basic parking, and vehicle maintenance basics.",
    );
    expect(result.lead).toBe("Everything in P1, plus:");
    expect(result.items).toEqual([
      "real driving on actual roads",
      "basic parking",
      "vehicle maintenance basics",
    ]);
  });

  it("does not split commas inside parentheses", () => {
    const result = splitIncludes(
      "Everything in P1, plus: basic parking (parallel, reverse, angle), and vehicle maintenance basics (tire check, oil, coolant).",
    );
    expect(result.items).toEqual([
      "basic parking (parallel, reverse, angle)",
      "vehicle maintenance basics (tire check, oil, coolant)",
    ]);
  });

  it("handles sentences with no lead-in colon", () => {
    const result = splitIncludes(
      "Starting and stopping smoothly, basic turning, and light traffic driving.",
    );
    expect(result.lead).toBeNull();
    expect(result.items).toEqual([
      "Starting and stopping smoothly",
      "basic turning",
      "light traffic driving",
    ]);
  });
});

describe("splitPackageTitle", () => {
  it("splits a colon-separated name into label and subtitle", () => {
    expect(splitPackageTitle("Package 1: Basic Road Handling")).toEqual({
      label: "Package 1",
      subtitle: "Basic Road Handling",
    });
    expect(splitPackageTitle("VIP Experience: All-In Mastery")).toEqual({
      label: "VIP Experience",
      subtitle: "All-In Mastery",
    });
  });

  it("returns a null subtitle for names with no colon", () => {
    expect(splitPackageTitle("Ultimate Road Ready")).toEqual({
      label: "Ultimate Road Ready",
      subtitle: null,
    });
  });
});
