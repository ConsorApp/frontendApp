"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { loginAsAdmin, loginAsResident } = useAuth();
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center gap-6">
      <button
        className="rounded bg-black px-6 py-3 text-white"
        onClick={() => {
          loginAsAdmin();
          router.push("/select-building");
        }}
      >
        Entrar como Admin
      </button>

      <button
        className="rounded bg-slate-700 px-6 py-3 text-white"
        onClick={() => {
          loginAsResident();
          router.push("/building/C");
        }}
      >
        Entrar como Residente
      </button>
    </div>
  );
}
