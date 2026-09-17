export function formatPeso(amount: number): string {
  return `₱${Math.round(amount).toLocaleString("en-PH")}`;
}

/**
 * Turns a sentence like "Everything in P1, plus: A, B, and C." into a lead-in
 * line ("Everything in P1, plus:") and a list of bullet items (["A", "B", "C"]).
 * Sentences with no colon are split into bullets directly.
 */
export function splitIncludes(text: string): { lead: string | null; items: string[] } {
  const colonIndex = text.indexOf(":");
  const lead = colonIndex === -1 ? null : text.slice(0, colonIndex + 1).trim();
  const rest = colonIndex === -1 ? text : text.slice(colonIndex + 1);

  const items = splitTopLevelCommas(rest.replace(/\.$/, ""));

  return { lead, items };
}

/**
 * Splits on ", " or ", and " but ignores commas inside parentheses, so
 * "basic parking (parallel, reverse, angle)" stays one item.
 */
function splitTopLevelCommas(text: string): string[] {
  const items: string[] = [];
  let depth = 0;
  let current = "";
  let i = 0;

  while (i < text.length) {
    const ch = text[i];
    if (ch === "(") depth++;
    if (ch === ")") depth--;

    if (ch === "," && depth === 0) {
      items.push(current);
      current = "";
      i++;
      while (text[i] === " ") i++;
      if (text.slice(i, i + 4) === "and ") i += 4;
      continue;
    }
    current += ch;
    i++;
  }
  items.push(current);

  return items.map((s) => s.trim()).filter(Boolean);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    timeZone: "Asia/Manila",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
