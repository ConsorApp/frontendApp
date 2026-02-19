"use client";

import { useRouter } from "next/navigation";
import { ContextSelector } from "@/components/auth/ContextSelector";

export default function SelectContextPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-md space-y-6 p-6">
      <h1 className="text-xl font-semibold">
        Seleccionar contexto
      </h1>

      <ContextSelector
        onSelect={() => router.push("/dashboard")}
      />
    </div>
  );
}
