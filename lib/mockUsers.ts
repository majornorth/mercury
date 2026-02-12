/**
 * Mock users for assignment. In production, replace with IdP / user directory.
 * Roles align with PRD and Technical Design (Risk Strategist, Investigator, Operations).
 */

export type UserRole = "Risk Strategist" | "Investigator" | "Operations" | "Compliance";

export interface MockUser {
  id: string;
  name: string;
  role: UserRole;
}

export const MOCK_USERS: MockUser[] = [
  { id: "user-1", name: "Jordan Lee", role: "Risk Strategist" },
  { id: "user-2", name: "Sam Chen", role: "Investigator" },
  { id: "user-3", name: "Alex Rivera", role: "Operations" },
  { id: "user-4", name: "Morgan Taylor", role: "Risk Strategist" },
  { id: "user-5", name: "Casey Kim", role: "Compliance" },
];

/** Current user (you). Used for "Assign to me" and to show assignable others. */
export const CURRENT_USER_ID = "user-1";

export function getMockUser(id: string | null): MockUser | null {
  if (!id) return null;
  if (id === "me") return MOCK_USERS.find((u) => u.id === CURRENT_USER_ID) ?? null;
  return MOCK_USERS.find((u) => u.id === id) ?? null;
}

/** Users that can be assigned to (excluding current user). */
export function getAssignableUsers(): MockUser[] {
  return MOCK_USERS.filter((u) => u.id !== CURRENT_USER_ID);
}
