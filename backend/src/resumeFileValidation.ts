const signatures: Record<string, Buffer> = {
  "application/pdf": Buffer.from("%PDF-"),
  "image/png": Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  "image/jpeg": Buffer.from([0xff, 0xd8, 0xff]),
};

/**
 * Check the file's leading magic bytes rather than trusting the browser-provided
 * MIME type. This is a format sanity check, not a complete malware/content scan.
 */
export function hasValidResumeFileSignature(buffer: Buffer, mimeType: string): boolean {
  const expected = signatures[mimeType];
  return Boolean(expected && buffer.length >= expected.length && buffer.subarray(0, expected.length).equals(expected));
}
