"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getAvailableContexts } from "@/lib/auth/getAvailableContexts";
import { isValidActiveContext } from "@/lib/auth/isValidActiveContext";

export default function Home() {
  const { user, activeContext, changeActiveContext, isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }

    const contexts = getAvailableContexts(user);
    if (contexts.length === 1) {
      changeActiveContext(contexts[0]);
      router.push("/building/"+contexts[0].buildingId);
      return;
    }

    if (
      activeContext &&
      isValidActiveContext(activeContext, contexts)
    ) {
      router.push("/dashboard");
      return;
    }

    router.push("/select-context");
  }, [user]);

  return null;
}
