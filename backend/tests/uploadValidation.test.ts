import { describe, expect, it } from "vitest";
import { hasValidResumeFileSignature } from "../src/resumeFileValidation";

describe("resume file signature validation", () => {
  it("accepts matching PDF, PNG, and JPEG signatures", () => {
    expect(hasValidResumeFileSignature(Buffer.from("%PDF-1.7"), "application/pdf")).toBe(true);
    expect(
      hasValidResumeFileSignature(
        Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
        "image/png",
      ),
    ).toBe(true);
    expect(
      hasValidResumeFileSignature(Buffer.from([0xff, 0xd8, 0xff, 0xe0]), "image/jpeg"),
    ).toBe(true);
  });

  it("rejects spoofed MIME types and unknown types", () => {
    expect(hasValidResumeFileSignature(Buffer.from("not a PDF"), "application/pdf")).toBe(false);
    expect(hasValidResumeFileSignature(Buffer.from("%PDF-1.7"), "image/png")).toBe(false);
    expect(hasValidResumeFileSignature(Buffer.from("anything"), "text/plain")).toBe(false);
  });

  it("rejects buffers shorter than the expected signature", () => {
    expect(hasValidResumeFileSignature(Buffer.from("%PD"), "application/pdf")).toBe(false);
  });
});
