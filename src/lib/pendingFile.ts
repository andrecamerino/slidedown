let pending: File | null = null;

export function setPendingFile(f: File): void {
  pending = f;
}

export function consumePendingFile(): File | null {
  const f = pending;
  pending = null;
  return f;
}
