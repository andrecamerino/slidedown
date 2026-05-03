export type FileType = "pdf" | "pptx";
export type OutputFormat = "markdown" | "plaintext";

export interface UploadedFile {
  id: string;
  name: string;
  type: FileType;
  size: number;
  file: File;
}

export interface ConversionResult {
  id: string;
  fileName: string;
  output: string;
  format: OutputFormat;
  slideCount?: number;
  convertedAt: Date;
}

export interface ConvertRequest {
  format: OutputFormat;
}

export interface ConvertResponse {
  success: boolean;
  output?: string;
  slideCount?: number;
  error?: string;
}
