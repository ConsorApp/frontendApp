"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { loginAsAdmin, loginAsResident } = useAuth();
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center gap-6">
      <Button
        className="rounded bg-black px-6 py-3 text-white"
        onClick={() => {
          loginAsAdmin();
          router.push("/");
        }}
      >
        Entrar como Admin
      </Button>

      <Button
        className="rounded bg-slate-700 px-6 py-3 text-white"
        onClick={() => {
          loginAsResident();
          router.push("/");
        }}
      >
        Entrar como Residente
      </Button>
    </div>
  );
}
