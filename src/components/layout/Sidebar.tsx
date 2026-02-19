"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, Truck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const adminNavItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Consorcios", href: "/consorcios", icon: Building2 },
  { label: "Proveedores", href: "/proveedores", icon: Truck },
];


export default function Sidebar() {
  const pathname = usePathname();
  const { activeContext } = useAuth();
  let navItems = [];

  if (activeContext?.mode === "ADMINISTRATOR") {
    navItems = adminNavItems;
  }

  if (activeContext?.mode === "RESIDENT") {
    navItems = [
      { label: "Dashboard", href: "/building/"+activeContext?.buildingId, icon: LayoutDashboard },
      { label: "Expensas", href: "/expensas/"+activeContext?.buildingId, icon: LayoutDashboard },
    ];
  }
 
  return (
    <aside className="w-64 border-r bg-background p-4">
      <h1 className="mb-6 text-xl font-semibold tracking-tight">
        Consorcios
      </h1>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }
              `}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
