"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, Edit, Copy, QrCode, Archive, Trash2 } from "lucide-react";
import { cn } from "@/utils";

interface ActionItem {
  label: string;
  icon: React.ElementType;
  onClick: () => void;
  danger?: boolean;
}

interface ActionDropdownProps {
  items: ActionItem[];
}

export function ActionDropdown({ items }: ActionDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="p-2 text-paragraph/60 hover:text-heading hover:bg-surface rounded-lg transition-colors focus:outline-none">
          <MoreHorizontal size={18} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[160px] bg-white rounded-xl border border-border shadow-lg p-1 z-50 animate-in fade-in-80 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
          sideOffset={4}
          align="end"
        >
          {items.map((item, index) => (
            <DropdownMenu.Item
              key={index}
              onSelect={item.onClick}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg cursor-default outline-none transition-colors",
                item.danger
                  ? "text-danger hover:bg-danger/10 focus:bg-danger/10"
                  : "text-paragraph hover:text-heading hover:bg-surface focus:bg-surface focus:text-heading"
              )}
            >
              <item.icon size={14} />
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
