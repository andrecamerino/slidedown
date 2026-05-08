let pending: File[] = [];

export function setPendingFiles(files: File[]): void {
  pending = files;
}

export function consumePendingFiles(): File[] {
  const f = pending;
  pending = [];
  return f;
}

export function setPendingFile(f: File): void {
  pending = [f];
}

export function consumePendingFile(): File | null {
  return consumePendingFiles()[0] ?? null;
}
