const SEPARATORS = /[\s._-]+/;

/**
 * 1–2 letter initials from a display name or email, for `Avatar.Fallback`.
 * Emails use the part before `@`. Multi-word input takes the first letter of
 * the first and last word; single-word input takes its first two letters.
 * Splits on Unicode code points (not UTF-16 units) so emoji/astral names don't
 * get cut mid-character.
 */
export function getInitialsFromNameOrEmail(nameOrEmail: string): string {
  const local = nameOrEmail.trim().split("@")[0] ?? "";
  const words = local.split(SEPARATORS).filter(Boolean);

  if (words.length === 0) return "";
  if (words.length === 1) return [...words[0]].slice(0, 2).join("").toUpperCase();

  const first = [...words[0]][0] ?? "";
  const last = [...words[words.length - 1]][0] ?? "";
  return (first + last).toUpperCase();
}
