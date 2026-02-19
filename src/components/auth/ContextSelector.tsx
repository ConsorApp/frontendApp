"use client";

import { useAuth } from "@/contexts/AuthContext";
import { getAvailableContexts, ActiveContext } from "@/lib/auth/getAvailableContexts";
import { Button } from "@/components/ui/button";

interface ContextSelectorProps {
  onSelect?: (context: ActiveContext) => void;
}

export function ContextSelector({ onSelect }: ContextSelectorProps) {
  const { user, changeActiveContext } = useAuth();

  if (!user) return null;

  const contexts = getAvailableContexts(user);

  function handleSelect(context: ActiveContext) {
    changeActiveContext(context);
    onSelect?.(context);
  }

  return (
    <div className="space-y-2">
      {contexts.map((ctx, index) => (
        <Button
          key={index}
          variant="outline"
          className="w-full justify-start"
          onClick={() => handleSelect(ctx)}
        >
          {ctx.mode} — Edificio {ctx.buildingId}
        </Button>
      ))}
    </div>
  );
}
