"use client";

import { useAuth } from "@/contexts/AuthContext";
import { ContextSelector } from "@/components/auth/ContextSelector";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <header className="h-16 bg-white border-b flex items-center justify-end px-6">
      <DropdownMenu>
        
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-3 hover:bg-slate-100 px-3 py-2 rounded-md transition">
            
            {/* Avatar */}
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-sm font-medium">
              {user.name?.[0]}
            </div>

            {/* Name */}
            <span className="text-sm text-slate-700">
              {user.name}
            </span>

          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-64"
        >
          <DropdownMenuLabel>
            Cambiar contexto
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <div className="p-2">
            <ContextSelector />
          </div>
        </DropdownMenuContent>

      </DropdownMenu>
    </header>
  );
}
