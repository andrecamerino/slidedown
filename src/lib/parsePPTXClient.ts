import JSZip from "jszip";

export async function parsePPTXClient(
  file: File,
  onProgress?: (current: number, total: number) => void,
): Promise<{ text: string; slideCount: number }> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);

    const slideEntries: [number, JSZip.JSZipObject][] = [];
    zip.forEach((path, entry) => {
      const match = path.match(/^ppt\/slides\/slide(\d+)\.xml$/);
      if (match) slideEntries.push([parseInt(match[1], 10), entry]);
    });
    slideEntries.sort(([a], [b]) => a - b);

    const slides: string[] = [];
    for (const [index, entry] of slideEntries) {
      onProgress?.(slides.length + 1, slideEntries.length);
      const xml = await entry.async("string");
      const texts = extractTexts(xml);
      if (texts.length > 0) {
        slides.push(`## Slide ${index}\n\n${texts.join("\n")}`);
      }
    }

    return {
      text: slides.join("\n\n---\n\n") || "No text content found in presentation.",
      slideCount: slideEntries.length,
    };
  } catch {
    return {
      text: "Could not parse this PPTX file. Try re-saving it and uploading again.",
      slideCount: 0,
    };
  }
}

function extractTexts(xml: string): string[] {
  const texts: string[] = [];
  for (const match of xml.matchAll(/<a:t[^>]*>([^<]+)<\/a:t>/g)) {
    const text = match[1]
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
    if (text) texts.push(text);
  }
  return [...new Set(texts)];
}
