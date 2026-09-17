/**
 * Single source of truth for brand, contact, and legal facts that aren't
 * meant to live in the database (policies, packages, FAQs, templates —
 * those are owner-editable and belong in Supabase tables, per SPEC.md).
 *
 * Anything the owner hasn't confirmed yet is marked `confirmed: false`.
 * UI code must check that flag and show a neutral placeholder or an
 * "Owner to confirm" badge instead of guessing a value — never invent
 * a business fact. See SPEC.md Section 1, rule 4 and Section 8.
 */

export interface OwnerValue<T> {
  value: T;
  confirmed: boolean;
}

function unconfirmed<T>(value: T): OwnerValue<T> {
  return { value, confirmed: false };
}

export const business = {
  name: "Godspeed Driving Tutorial Services",
  shortName: "GSD",
  tagline: "Confidence starts here.",
  enrollmentHeadline:
    "From nervous to ready. From anxious to confident.",

  location: {
    city: "Quezon City",
    region: "Metro Manila",
    country: "Philippines",
  },

  timezone: "Asia/Manila",
  currency: "PHP",

  colors: {
    blue: "#1A4FA0",
    red: "#D0191B",
    background: "#FDFBF5",
  },

  fonts: unconfirmed({
    heading: "Oswald",
    body: "Barlow",
  }),

  positioning: {
    tagline: "More than driving lessons. This is driving coaching.",
    betweenText:
      "With structured sessions, personalized guidance, and purposeful practice, GSD helps you build the skills, habits, and confidence to drive safely on your own.",
    pillars: [
      "One dedicated coach per student for the whole package",
      "Personalized pace, adapted to each student's strengths and weaknesses",
      "Attitude as well as skill: confident, capable, responsible drivers",
    ],
  },

  audiences: [
    "Nervous beginners",
    "Late learners",
    "Students burned by aggressive instructors",
    "Parents enrolling themselves or their children",
    "Busy professionals",
    "People returning to driving after a long break",
  ],

  legal: {
    dtiRegisteredOnly: true,
    birRegistered: false,
    lguRegistered: false,
    ltoAccredited: false,
    issuesTdcPdc: false,
    internalStandards: ["GSD Approved", "Godspeed-Certified"],
    footerRegistrationText: {
      value: "DTI Business Name Registration No. 7441384.",
      confirmed: true,
    },
    retiredPhrases: ["Wag ka matuto sa mali"],
  },

  contact: {
    // TODO(OWNER): replace with a proper m.me/<username> link once we have
    // the Page's username (this share-link works but isn't a direct m.me link).
    facebookPageUrl: {
      value: "https://www.facebook.com/share/1CWvQDURPi/",
      confirmed: true,
    },
    messengerPageHandle: unconfirmed(""), // used to build m.me/<handle>
    phones: {
      value: [
        { label: "Globe", number: "0906 433 3182" },
        { label: "Landline", number: "(02) 8724 6803" },
      ],
      confirmed: true,
    },
    email: { value: "godspeeddrivingph@gmail.com", confirmed: true },
    viber: unconfirmed(""),
  },

  domain: unconfirmed(""),

  instructors: {
    unitA: {
      transmission: "A/T" as const,
      displayName: unconfirmed("GSD Coach (A/T)"),
      yearsExperience: 26,
      vehicleLabel: "Borrowed automatic vehicle",
      vehicleOwned: false,
      instructorDayRate: 1500,
      vehicleDayRate: 1500,
    },
    unitM: {
      transmission: "M/T" as const,
      displayName: unconfirmed("GSD Coach (M/T)"),
      yearsExperience: 5,
      vehicleLabel: "GSD-owned manual vehicle",
      vehicleOwned: true,
      instructorDayRate: 2000,
      vehicleDayRate: 0, // fuel/upkeep tracked manually as expenses, not a fixed day rate
    },
  },

  language: unconfirmed<"english" | "english-taglish">("english"),

  meetingPoints: {
    value: [
      "Godspeed Driving, Grass Residences, Misamis Street, Bago Bantay, Quezon City 1105",
    ],
    confirmed: true,
  },

  waitlistPriorityRule: unconfirmed(
    "VIP and URR students can see and book slots 3 days before other students.",
  ),

  packageValidityDays: 60,
  defaultHoldHours: 24,
  utilizationAlertThreshold: 0.85,
  followUpDaysAfterCreation: [1, 3, 7],
} as const;

/**
 * Flat list of every unconfirmed owner decision, for the admin "Setup"
 * checklist and for badges on individual fields. Kept in one place so
 * M1's admin shell can show a single "N things need your input" count.
 */
export const ownerTodos = [
  "Confirm fonts (Oswald / Barlow) or provide alternatives",
  "Messenger Page username (for a direct m.me link) and Viber number",
  "Domain name",
  "Coach display names, short bios, and photos (Unit A and Unit M)",
  "Website language: English only, or English with Taglish",
  "Any pickup fee for meeting points outside Bago Bantay",
  "Confirm VIP/URR priority booking rule",
  "Package tier display order and mixed weekday/weekend rule",
  "Teaching days and hours per unit",
  "Payment methods and account details (GCash name/number, bank)",
  "Deposit %, reschedule fees, package validity, refund rule",
  "Whether coaches/car owner are paid on late cancellations or no-shows",
  "Whether permit-less students can do anything besides waitlist",
  "Final FAQ answers and message templates",
] as const;

export type Business = typeof business;
