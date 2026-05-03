export async function parsePPTX(buffer: Buffer): Promise<{ text: string; slideCount: number }> {
  // Phase 1: basic PPTX parsing via pptx2json
  // Phase 2: swap this for Python microservice (python-pptx)
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pptx2json = require("pptx2json");
    const result = await pptx2json(buffer);
    const slides: string[] = [];

    if (result?.slides) {
      result.slides.forEach((slide: Record<string, unknown>, i: number) => {
        const texts = extractTextsFromSlide(slide);
        if (texts.length > 0) {
          slides.push(`## Slide ${i + 1}\n\n${texts.join("\n")}`);
        }
      });
    }

    return {
      text: slides.join("\n\n---\n\n") || "No text content found in presentation.",
      slideCount: result?.slides?.length ?? 0,
    };
  } catch {
    return {
      text: "Could not parse this PPTX file. Try re-saving it and uploading again.",
      slideCount: 0,
    };
  }
}

function extractTextsFromSlide(slide: Record<string, unknown>): string[] {
  const texts: string[] = [];

  function recurse(obj: unknown): void {
    if (!obj || typeof obj !== "object") return;
    if (Array.isArray(obj)) {
      obj.forEach(recurse);
      return;
    }
    const record = obj as Record<string, unknown>;
    if (typeof record["text"] === "string" && record["text"].trim()) {
      texts.push(record["text"].trim());
    }
    Object.values(record).forEach(recurse);
  }

  recurse(slide);
  return [...new Set(texts)]; // deduplicate
}
