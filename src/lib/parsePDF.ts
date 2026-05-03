// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse");

export async function parsePDF(buffer: Buffer): Promise<{ text: string; pageCount: number }> {
  const data = await pdfParse(buffer);
  const cleaned = cleanText(data.text);
  return {
    text: convertToMarkdown(cleaned),
    pageCount: data.numpages,
  };
}

function cleanText(raw: string): string {
  return raw
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function convertToMarkdown(text: string): string {
  const lines = text.split("\n");
  const result: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      result.push("");
      continue;
    }
    // Heuristic: short lines in ALL CAPS or title-like → heading
    if (trimmed.length < 80 && trimmed === trimmed.toUpperCase() && trimmed.length > 3) {
      result.push(`## ${toTitleCase(trimmed)}`);
    } else if (trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("·")) {
      result.push(`- ${trimmed.replace(/^[•\-·]\s*/, "")}`);
    } else {
      result.push(trimmed);
    }
  }

  return result.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function toTitleCase(str: string): string {
  return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}
