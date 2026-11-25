import { ApplicationStatus } from "@prisma/client";

const allowedTransitions: Record<ApplicationStatus, readonly ApplicationStatus[]> = {
  [ApplicationStatus.SUBMITTED]: [
    ApplicationStatus.UNDER_REVIEW,
    ApplicationStatus.ACCEPTED,
    ApplicationStatus.REJECTED,
  ],
  [ApplicationStatus.UNDER_REVIEW]: [
    ApplicationStatus.ACCEPTED,
    ApplicationStatus.REJECTED,
  ],
  [ApplicationStatus.ACCEPTED]: [],
  [ApplicationStatus.REJECTED]: [],
  [ApplicationStatus.WITHDRAWN]: [],
};

export function canTransitionApplicationStatus(
  current: ApplicationStatus,
  next: ApplicationStatus,
): boolean {
  return allowedTransitions[current].includes(next);
}
