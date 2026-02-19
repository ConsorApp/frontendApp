import { User } from "@/types/auth";

export type ActiveMode =
  | "ADMINISTRATOR"
  | "CARETAKER"
  | "OWNER"
  | "RESIDENT";

export interface ActiveContext {
  buildingId: string;
  mode: ActiveMode;
}

export function getAvailableContexts(user: User): ActiveContext[] {
  const contexts: ActiveContext[] = [];

  user.buildingMemberships.forEach((membership) => {
    membership.roles.forEach((role) => {
      contexts.push({
        buildingId: membership.buildingId,
        mode: role,
      });
    });
  });

  user.unitMemberships.forEach((membership) => {
    membership.roles.forEach((role) => {
      contexts.push({
        buildingId: membership.buildingId,
        mode: role,
      });
    });
  });

  return contexts;
}
