"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";



const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Consorcios", href: "/consorcios" },
  { label: "Proveedores", href: "/proveedores" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <h1 className="text-xl font-bold mb-6">
        Consorcios
      </h1>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded px-3 py-2 transition
                ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
