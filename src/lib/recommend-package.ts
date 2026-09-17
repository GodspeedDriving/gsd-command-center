export type Experience =
  | "never"
  | "tried_a_few_times"
  | "can_drive_not_confident"
  | "returning_after_break";

export type Situation =
  | "short_trial"
  | "full_course"
  | "flexible_busy"
  | "lots_of_practice";

export interface RecommendInput {
  experience: Experience;
  nervousness: number; // 1-5
  situation: Situation;
}

/**
 * SPEC.md Section 6 (M3) recommender rules:
 * - Never driven, or nervousness 4–5, or wants lots of practice -> URR
 * - Returning after a long break, or busy professional needing flexibility,
 *   or needs extra practice -> VIP
 * - Tried before and ready to drive properly, wants a full course -> P2
 * - Wants to try first, or wants a short course / LTO basics -> P1
 */
export function recommendPackage({
  experience,
  nervousness,
  situation,
}: RecommendInput): "URR" | "VIP" | "P2" | "P1" {
  if (
    experience === "never" ||
    nervousness >= 4 ||
    situation === "lots_of_practice"
  ) {
    return "URR";
  }

  if (experience === "returning_after_break" || situation === "flexible_busy") {
    return "VIP";
  }

  if (situation === "full_course") {
    return "P2";
  }

  return "P1";
}
