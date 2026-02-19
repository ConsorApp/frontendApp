import { ActiveContext } from "./getAvailableContexts";

export function isValidActiveContext(
  stored: ActiveContext,
  available: ActiveContext[]
) {
  return available.some(
    (ctx) =>
      ctx.buildingId === stored.buildingId &&
      ctx.mode === stored.mode
  );
}
