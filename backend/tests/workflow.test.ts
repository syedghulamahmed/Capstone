import { describe, expect, it } from "vitest";
import { ApplicationStatus as Status } from "@prisma/client";
import { canTransitionApplicationStatus } from "../src/applicationTransitions";

describe("application status transitions", () => {
  it("allows valid transitions from submitted", () => {
    expect(canTransitionApplicationStatus(Status.SUBMITTED, Status.UNDER_REVIEW)).toBe(true);
    expect(canTransitionApplicationStatus(Status.SUBMITTED, Status.ACCEPTED)).toBe(true);
    expect(canTransitionApplicationStatus(Status.SUBMITTED, Status.REJECTED)).toBe(true);
  });

  it("allows review to end in accepted or rejected", () => {
    expect(canTransitionApplicationStatus(Status.UNDER_REVIEW, Status.ACCEPTED)).toBe(true);
    expect(canTransitionApplicationStatus(Status.UNDER_REVIEW, Status.REJECTED)).toBe(true);
  });

  it("rejects invalid transitions and keeps terminal states terminal", () => {
    expect(canTransitionApplicationStatus(Status.SUBMITTED, Status.WITHDRAWN)).toBe(false);
    expect(canTransitionApplicationStatus(Status.UNDER_REVIEW, Status.SUBMITTED)).toBe(false);
    for (const terminal of [Status.ACCEPTED, Status.REJECTED, Status.WITHDRAWN]) {
      expect(canTransitionApplicationStatus(terminal, Status.SUBMITTED)).toBe(false);
      expect(canTransitionApplicationStatus(terminal, Status.UNDER_REVIEW)).toBe(false);
      expect(canTransitionApplicationStatus(terminal, Status.ACCEPTED)).toBe(false);
      expect(canTransitionApplicationStatus(terminal, Status.REJECTED)).toBe(false);
    }
  });
});
