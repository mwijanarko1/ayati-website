import { readFileSync } from "node:fs";
import { join } from "node:path";

const DESKTOP_DIR = join(process.cwd(), "src/content/desktop");

const FILE_NAMES = {
  privacy: "PRIVACY_POLICY.md",
  terms: "TERMS_OF_SERVICE.md",
} as const;

export type LegalPageId = keyof typeof FILE_NAMES;

function readLegalFile(page: LegalPageId): string {
  const filePath = join(DESKTOP_DIR, FILE_NAMES[page]);
  return readFileSync(filePath, "utf8");
}

/** Full file (for `/llms/*.md` routes). */
export function getLegalDocumentFullMarkdown(page: LegalPageId): string {
  return readLegalFile(page);
}

/** `**Effective date:** YYYY-MM-DD` from the source markdown. */
export function getLegalEffectiveDate(page: LegalPageId): string | undefined {
  const text = readLegalFile(page);
  const match = text.match(/\*\*Effective date:\*\*\s*(\d{4}-\d{2}-\d{2})/);
  return match?.[1];
}

/**
 * Body for the HTML legal pages: drops the leading title / metadata block
 * up through the first horizontal rule, since the page template renders its
 * own title and effective date.
 */
export function getLegalDocumentBodyForPage(page: LegalPageId): string {
  const full = readLegalFile(page);
  const separator = full.match(/\n---\s*\n/);
  if (!separator || separator.index === undefined) {
    return full.trim();
  }
  return full.slice(separator.index + separator[0].length).trimStart();
}
