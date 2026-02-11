"use client";

import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default function HomePage() {
  const { user } = useAuth();

  // if (isLoading) return null;

  if (!user) {
    redirect("/login");
  }

  redirect("/dashboard");
}
