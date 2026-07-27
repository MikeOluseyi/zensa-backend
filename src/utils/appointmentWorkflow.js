export const VALID_TRANSITIONS = {

  SCHEDULED: [
    "CHECKED_IN",
    "CANCELLED"
  ],

  CHECKED_IN: [
    "TRIAGED",
    "CANCELLED"
  ],

  TRIAGED: [
    "IN_PROGRESS"
  ],

  IN_PROGRESS: [
    "CONSULTED"
  ],

  CONSULTED: [
    "COMPLETED",
    "ADMITTED"
  ],

  COMPLETED: [],

  ADMITTED: [],

  CANCELLED: []
};

export function canTransition(
  currentStatus,
  newStatus
) {

  return VALID_TRANSITIONS[
    currentStatus
  ]?.includes(newStatus);
}