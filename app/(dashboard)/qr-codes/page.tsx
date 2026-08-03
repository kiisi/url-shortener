"use client";

import { QrCode, Download, Copy, Share2 } from "lucide-react";
import { mockLinks } from "@/lib/mockData";
import { EmptyState } from "@/app/components/dashboard";
import { cn } from "@/utils";

export default function QrCodesPage() {
  const qrLinks = mockLinks.filter(l => l.hasQrCode);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-heading">QR Codes</h1>
          <p className="text-sm text-paragraph mt-1">Manage and download your generated QR codes.</p>
        </div>
      </div>

      {qrLinks.length === 0 ? (
        <EmptyState
          icon={QrCode}
          title="No QR codes generated"
          description="You haven't generated any QR codes yet. Enable QR code generation when creating a link."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {qrLinks.map((link) => (
            <div key={link.id} className="bg-white border border-border rounded-2xl overflow-hidden group">
              <div className="aspect-square bg-surface border-b border-border p-8 flex items-center justify-center relative">
                <div className="w-full h-full max-w-[200px] max-h-[200px] bg-white rounded-xl border border-border flex items-center justify-center text-paragraph">
                  {/* Placeholder for actual QR code rendering logic */}
                  <QrCode size={120} strokeWidth={1} />
                </div>

                <div className="absolute inset-0 bg-heading/5 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-heading hover:text-primary transition-colors tooltip-trigger" title="Download PNG">
                    <Download size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-heading hover:text-primary transition-colors tooltip-trigger" title="Copy Link">
                    <Copy size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-heading hover:text-primary transition-colors tooltip-trigger" title="Share">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <p className="font-semibold text-heading truncate mb-1">{link.shortLink}</p>
                <p className="text-xs text-paragraph truncate">{link.originalUrl}</p>

                <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                  <span className="text-xs font-medium text-paragraph">Customizations</span>
                  <button className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors">
                    Edit Style
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
