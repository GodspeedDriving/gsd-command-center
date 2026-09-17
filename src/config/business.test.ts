import { describe, expect, it } from "vitest";
import { business, ownerTodos } from "./business";

const HEX_COLOR = /^#[0-9a-f]{6}$/i;

describe("business config", () => {
  it("never hardcodes LTO accreditation as true", () => {
    // SPEC.md Section 8, rule 1: GSD is not LTO-accredited and must never
    // say otherwise. This constant guards against someone flipping the flag
    // by mistake later.
    expect(business.legal.ltoAccredited).toBe(false);
    expect(business.legal.issuesTdcPdc).toBe(false);
  });

  it("retires the banned tagline", () => {
    expect(business.legal.retiredPhrases).toContain("Wag ka matuto sa mali");
  });

  it("uses valid hex codes for the brand colors", () => {
    expect(business.colors.blue).toMatch(HEX_COLOR);
    expect(business.colors.red).toMatch(HEX_COLOR);
    expect(business.colors.background).toMatch(HEX_COLOR);
  });

  it("marks unconfirmed owner values as unconfirmed", () => {
    expect(business.fonts.confirmed).toBe(false);
    expect(business.contact.messengerPageHandle.confirmed).toBe(false);
    expect(business.instructors.unitA.displayName.confirmed).toBe(false);
    expect(business.instructors.unitM.displayName.confirmed).toBe(false);
  });

  it("has at least one owner TODO item", () => {
    expect(ownerTodos.length).toBeGreaterThan(0);
  });
});
