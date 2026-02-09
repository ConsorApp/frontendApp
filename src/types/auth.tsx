export type BuildingRole = "ADMINISTRATOR" | "CARETAKER";
export type UnitRole = "OWNER" | "RESIDENT";

export interface BuildingMembership {
  buildingId: string;
  roles: BuildingRole[];
}

export interface UnitMembership {
  unitId: string;
  buildingId: string;
  roles: UnitRole[];
}

export interface User {
  id: string;
  name: string;
  buildingMemberships: BuildingMembership[];
  unitMemberships: UnitMembership[];
}
