import { getDocument, GlobalWorkerOptions, version } from "pdfjs-dist";

// CDN worker avoids build-tool-specific URL resolution issues (Turbopack, Webpack, etc.)
GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;

export async function parsePDFClient(
  file: File,
  onProgress?: (current: number, total: number) => void,
): Promise<{ text: string; pageCount: number }> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: new Uint8Array(arrayBuffer) }).promise;

  const pageTexts: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    onProgress?.(i, pdf.numPages);
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .filter((item) => "str" in item)
      .map((item) => (item as { str: string }).str)
      .join(" ");
    pageTexts.push(pageText);
  }

  const raw = pageTexts.join("\n\n");
  return {
    text: convertToMarkdown(cleanText(raw)),
    pageCount: pdf.numPages,
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
