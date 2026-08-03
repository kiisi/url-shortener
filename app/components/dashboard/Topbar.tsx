"use client";

import { Search, Bell, Plus, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils";
import Link from "next/link";
import { CreateLinkModal } from "./CreateLinkModal";

export function Topbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-border bg-white flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-paragraph hover:text-heading p-2 -ml-2 rounded-lg hover:bg-surface">
            <Menu size={20} />
          </button>
          <div className="relative hidden sm:flex items-center">
            <Search className="absolute left-3 text-paragraph/40" size={16} />
            <input
              type="text"
              placeholder="Search links, domains..."
              className="pl-9 pr-4 py-2 w-64 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <div className="absolute right-3 hidden lg:flex items-center gap-1">
              <kbd className="text-[10px] font-sans font-medium text-paragraph/50 bg-white border border-border rounded px-1.5 py-0.5 shadow-sm">
                ⌘
              </kbd>
              <kbd className="text-[10px] font-sans font-medium text-paragraph/50 bg-white border border-border rounded px-1.5 py-0.5 shadow-sm">
                K
              </kbd>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button className="relative p-2 text-paragraph hover:text-heading rounded-full hover:bg-surface transition-colors">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger border border-white" />
          </button>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98]"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Create Link</span>
          </button>

          <div className="md:hidden w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center cursor-pointer">
            <span className="text-xs font-bold text-primary">JD</span>
          </div>
        </div>
      </header>

      <CreateLinkModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
