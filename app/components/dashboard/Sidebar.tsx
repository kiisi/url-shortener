"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import Logo from "../ui/Logo";
import {
  LayoutDashboard,
  Link as LinkIcon,
  BarChart3,
  QrCode,
  Layers,
  Globe,
  Settings,
  LogOut,
  Moon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Links", href: "/links", icon: LinkIcon },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "QR Codes", href: "/qr-codes", icon: QrCode },
  { name: "Bulk Shortening", href: "/bulk", icon: Layers },
  { name: "Branded Domains", href: "/domains", icon: Globe },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 260 }}
      className="hidden md:flex flex-col border-r border-border bg-white h-screen sticky top-0 left-0 transition-all duration-300 z-20"
    >
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        {collapsed ? (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
            <LinkIcon size={18} />
          </div>
        ) : (
          <Logo />
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-paragraph hover:bg-surface hover:text-heading"
              )}
            >
              <item.icon
                size={18}
                className={cn(
                  "shrink-0",
                  isActive ? "text-primary" : "text-paragraph/60 group-hover:text-heading"
                )}
              />
              {!collapsed && (
                <span className="truncate">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border space-y-1">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group text-paragraph hover:bg-surface hover:text-heading",
            pathname === "/settings" && "bg-primary/10 text-primary"
          )}
        >
          <Settings size={18} className={cn("shrink-0", pathname === "/settings" ? "text-primary" : "text-paragraph/60 group-hover:text-heading")} />
          {!collapsed && <span>Settings</span>}
        </Link>
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group text-paragraph hover:bg-danger/10 hover:text-danger"
        >
          <LogOut size={18} className="shrink-0 text-paragraph/60 group-hover:text-danger" />
          {!collapsed && <span>Logout</span>}
        </button>

        {/* User Profile Summary */}
        {!collapsed && (
          <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-primary">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-heading truncate">John Doe</p>
              <p className="text-xs text-paragraph truncate">john@example.com</p>
            </div>
            <button className="text-paragraph/40 hover:text-heading p-1">
              <Moon size={16} />
            </button>
          </div>
        )}

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-white text-paragraph/50 hover:text-heading hover:shadow-sm transition-all z-30"
          )}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </motion.aside>
  );
}
