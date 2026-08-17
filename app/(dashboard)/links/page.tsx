"use client";

import { DataTable, ActionDropdown, EmptyState } from "@/app/components/dashboard";
import { format } from "date-fns";
import { Copy, QrCode, Edit, Archive, Trash2, Activity, Link2, ExternalLink, Link as LinkIcon } from "lucide-react";
import { cn } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export interface Link {
  id: string;
  originalUrl: string;
  shortCode: string;
  alias?: string | null;
  expiresAt?: string | null;
  clickCount: number;
  createdAt: string;
  updatedAt: string;
  status: "ACTIVE" | "EXPIRED" | "DISABLED"
}

interface GetLinksResponse {
  data: Link[];
}

export default function LinksPage() {

  const queryClient = useQueryClient();

  const { data: links, isLoading } = useQuery({
    queryKey: ["links"],
    queryFn: async () => {
      const response = await fetch("/api/links", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);

        throw new Error(error?.message || "Failed to fetch links");
      }

      const data: GetLinksResponse = await response.json();
      console.log("Data", data);

      return data.data;
    },
  });

  const deleteLinkMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/links/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);

        throw new Error(error?.message || "Failed to delete link");
      }

      const data: GetLinksResponse = await response.json();

      toast.success(data.message)

      return data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["links"],
      });
    },

    onError: (error) => {
      console.error("Failed to delete link:", error);
    },
  });

  const columns = [
    {
      header: "Short Link",
      cell: (link: Link) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-primary shrink-0 border border-border">
            <LinkIcon size={14} />
          </div>
          <div>
            <a
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/${link.shortCode}`}
              target="_blank" className="font-semibold text-heading hover:text-primary transition-colors flex items-center gap-1">
              {process.env.NEXT_PUBLIC_BASE_URL + "/" + link.shortCode}
            </a>
            <span className="text-xs text-paragraph mt-0.5 inline-block truncate max-w-[200px]">{link.originalUrl}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      cell: (link: Link) => (
        <span className={cn(
          "text-[11px] font-medium px-2.5 py-1.5 rounded-full uppercase tracking-wide",
          link.status === 'ACTIVE' ? 'bg-success/10 text-success' :
            link.status === 'EXPIRED' ? 'bg-warning/10 text-warning' :
              'bg-paragraph/10 text-paragraph'
        )}>
          {link.status}
        </span>
      ),
    },
    {
      header: "Clicks",
      cell: (link: Link) => (
        <span className="font-semibold text-heading">
          {link.clickCount.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Created",
      cell: (link: Link) => (
        <span className="text-sm">
          {format(new Date(link.createdAt), 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      header: "",
      className: "text-right",
      cell: (link: Link) => (
        <div className="flex justify-end items-center gap-1">
          <button className="p-2 text-paragraph hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Copy">
            <Copy size={16} />
          </button>
          <button className="p-2 text-paragraph hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="QR Code">
            <QrCode size={16} />
          </button>
          <ActionDropdown items={[
            { label: "View Analytics", icon: Activity, onClick: () => { } },
            { label: "Edit Link", icon: Edit, onClick: () => { } },
            { label: "Archive", icon: Archive, onClick: () => { } },
            { label: "Delete", icon: Trash2, onClick: () => deleteLinkMutation.mutate(link.id), danger: true },
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
        data={links as Link[]}
        columns={columns}
        keyExtractor={(item) => item.id}
        isLoading={isLoading}
        isPending={deleteLinkMutation.isPending}
        emptyState={
          <EmptyState
            icon={Link2}
            title="No links yet"
            description="You haven't created any short links. Create your first link to get started."
            actionLabel="Create Link"
            onAction={() => { }}
          />
        }
      />
    </>
  );
}
