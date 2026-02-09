import { User } from "@/types/auth";

export const mockAdminUser: User = {
  id: "1",
  name: "Juan",
  buildingMemberships: [
    { buildingId: "A", roles: ["ADMINISTRATOR"] },
    { buildingId: "B", roles: ["ADMINISTRATOR"] },
  ],
  unitMemberships: [
    { unitId: "A-101", buildingId: "A", roles: ["OWNER", "RESIDENT"] },
    { unitId: "A-102", buildingId: "A", roles: ["OWNER"] },
  ],
};

export const mockResidentUser: User = {
  id: "2",
  name: "Pedro",
  buildingMemberships: [],
  unitMemberships: [
    { unitId: "C-201", buildingId: "C", roles: ["RESIDENT"] },
  ],
};
