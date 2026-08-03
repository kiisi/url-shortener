"use client";

import { useState } from "react";
import { DataTable, ActionDropdown, EmptyState } from "@/app/components/dashboard";
import { mockLinks, type Link as LinkType } from "@/lib/mockData";
import { format } from "date-fns";
import { Copy, QrCode, Edit, Archive, Trash2, Activity, Link2, ExternalLink } from "lucide-react";
import { cn } from "@/utils";

export default function LinksPage() {
  const [links, setLinks] = useState(mockLinks);

  const columns = [
    {
      header: "Short Link",
      cell: (link: LinkType) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-primary shrink-0 border border-border">
            <Link2 size={14} />
          </div>
          <div>
            <a href={`https://${link.shortLink}`} target="_blank" className="font-semibold text-heading hover:text-primary transition-colors flex items-center gap-1">
              {link.shortLink}
            </a>
            <span className="text-xs text-paragraph mt-0.5 inline-block truncate max-w-[200px]">{link.originalUrl}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      cell: (link: LinkType) => (
        <span className={cn(
          "text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide", 
          link.status === 'active' ? 'bg-success/10 text-success' : 
          link.status === 'expired' ? 'bg-warning/10 text-warning' : 
          'bg-paragraph/10 text-paragraph'
        )}>
          {link.status}
        </span>
      ),
    },
    {
      header: "Clicks",
      cell: (link: LinkType) => (
        <span className="font-semibold text-heading">{link.clicks.toLocaleString()}</span>
      ),
    },
    {
      header: "Created",
      cell: (link: LinkType) => (
        <span className="text-sm">{format(new Date(link.createdAt), 'MMM dd, yyyy')}</span>
      ),
    },
    {
      header: "",
      className: "text-right",
      cell: (link: LinkType) => (
        <div className="flex justify-end items-center gap-1">
          <button className="p-2 text-paragraph hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Copy">
            <Copy size={16} />
          </button>
          <button className="p-2 text-paragraph hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="QR Code">
            <QrCode size={16} />
          </button>
          <ActionDropdown items={[
            { label: "View Analytics", icon: Activity, onClick: () => {} },
            { label: "Edit Link", icon: Edit, onClick: () => {} },
            { label: "Archive", icon: Archive, onClick: () => {} },
            { label: "Delete", icon: Trash2, onClick: () => {}, danger: true },
          ]} />
        </div>
      ),
    }
  ];

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-heading">Links</h1>
          <p className="text-sm text-paragraph mt-1">Manage all your shortened links.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search links..."
              className="pl-4 pr-10 py-2 w-full sm:w-64 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <button className="bg-white border border-border text-heading px-4 py-2 rounded-xl text-sm font-medium hover:bg-surface transition-colors">
            Filter
          </button>
        </div>
      </div>

      <DataTable 
        data={links} 
        columns={columns} 
        keyExtractor={(item) => item.id} 
        emptyState={
          <EmptyState 
            icon={Link2} 
            title="No links yet" 
            description="You haven't created any short links. Create your first link to get started." 
            actionLabel="Create Link" 
            onAction={() => {}} 
          />
        }
      />
    </>
  );
}
