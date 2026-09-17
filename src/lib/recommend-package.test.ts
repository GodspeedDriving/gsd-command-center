import { describe, expect, it } from "vitest";
import { recommendPackage } from "./recommend-package";

describe("recommendPackage", () => {
  it("recommends URR for someone who has never driven", () => {
    expect(
      recommendPackage({
        experience: "never",
        nervousness: 2,
        situation: "short_trial",
      }),
    ).toBe("URR");
  });

  it("recommends URR for high nervousness regardless of experience", () => {
    expect(
      recommendPackage({
        experience: "tried_a_few_times",
        nervousness: 5,
        situation: "short_trial",
      }),
    ).toBe("URR");
  });

  it("recommends VIP for someone returning after a long break", () => {
    expect(
      recommendPackage({
        experience: "returning_after_break",
        nervousness: 2,
        situation: "short_trial",
      }),
    ).toBe("VIP");
  });

  it("recommends VIP for a busy professional needing flexibility", () => {
    expect(
      recommendPackage({
        experience: "can_drive_not_confident",
        nervousness: 2,
        situation: "flexible_busy",
      }),
    ).toBe("VIP");
  });

  it("recommends P2 for someone ready for a full course", () => {
    expect(
      recommendPackage({
        experience: "tried_a_few_times",
        nervousness: 2,
        situation: "full_course",
      }),
    ).toBe("P2");
  });

  it("recommends P1 for someone who just wants a short trial", () => {
    expect(
      recommendPackage({
        experience: "can_drive_not_confident",
        nervousness: 1,
        situation: "short_trial",
      }),
    ).toBe("P1");
  });

  it("nervousness overrides a full-course request", () => {
    expect(
      recommendPackage({
        experience: "tried_a_few_times",
        nervousness: 4,
        situation: "full_course",
      }),
    ).toBe("URR");
  });
});
