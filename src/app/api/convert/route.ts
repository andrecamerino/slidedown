import { NextRequest, NextResponse } from "next/server";
import { parsePDF } from "@/lib/parsePDF";
import { parsePPTX } from "@/lib/parsePPTX";
import { markdownToPlainText } from "@/lib/markdownToPlainText";
import type { ConvertResponse, OutputFormat } from "@/types";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export async function POST(req: NextRequest): Promise<NextResponse<ConvertResponse>> {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const format = (formData.get("format") as OutputFormat) ?? "markdown";

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: "File too large. Max 50MB." }, { status: 413 });
    }

    const fileName = file.name.toLowerCase();
    const buffer = Buffer.from(await file.arrayBuffer());

    let markdown = "";
    let slideCount: number | undefined;

    if (fileName.endsWith(".pdf")) {
      const result = await parsePDF(buffer);
      markdown = result.text;
      slideCount = result.pageCount;
    } else if (fileName.endsWith(".pptx") || fileName.endsWith(".ppt")) {
      const result = await parsePPTX(buffer);
      markdown = result.text;
      slideCount = result.slideCount;
    } else {
      return NextResponse.json(
        { success: false, error: "Unsupported file type. Please upload a PDF or PPTX." },
        { status: 415 }
      );
    }

    const output = format === "plaintext" ? markdownToPlainText(markdown) : markdown;

    return NextResponse.json({ success: true, output, slideCount });
  } catch (err) {
    console.error("[/api/convert]", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong during conversion." },
      { status: 500 }
    );
  }
}
