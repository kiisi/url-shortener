"use client";

import { Layers, UploadCloud, FileText, CheckCircle2, XCircle } from "lucide-react";
import { mockBulkHistory } from "@/lib/mockData";
import { format } from "date-fns";
import { cn } from "@/utils";

export default function BulkShorteningPage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-heading">Bulk Shortening</h1>
          <p className="text-sm text-paragraph mt-1">Upload a CSV to shorten multiple links at once.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-border border-dashed rounded-2xl p-12 text-center hover:bg-surface/50 transition-colors cursor-pointer group">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud size={28} />
            </div>
            <h3 className="text-lg font-bold text-heading mb-2">Drag and drop your CSV here</h3>
            <p className="text-sm text-paragraph max-w-sm mx-auto mb-6">
              Your CSV should contain columns for `originalUrl` and optionally `customAlias`. Max 1,000 rows per upload.
            </p>
            <button className="bg-white border border-border text-heading px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-surface transition-colors">
              Browse Files
            </button>
          </div>

          <div>
            <h2 className="text-lg font-bold text-heading mb-4">Previous Imports</h2>
            <div className="bg-white border border-border rounded-2xl overflow-hidden">
              {mockBulkHistory.map((history, i) => (
                <div key={history.id} className={cn("flex items-center justify-between p-4", i !== 0 && "border-t border-border")}>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                      history.status === 'completed' ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                    )}>
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-heading">{history.filename}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-paragraph">
                        <span>{format(new Date(history.createdAt), 'MMM dd, yyyy HH:mm')}</span>
                        <span>•</span>
                        <span>{history.totalRows} rows</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    {history.status === 'completed' ? (
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex flex-col items-end">
                          <span className="flex items-center gap-1 font-medium text-success"><CheckCircle2 size={14} /> {history.successCount}</span>
                          <span className="text-[10px] uppercase text-paragraph">Success</span>
                        </div>
                        {history.failedCount > 0 && (
                          <div className="flex flex-col items-end">
                            <span className="flex items-center gap-1 font-medium text-warning"><XCircle size={14} /> {history.failedCount}</span>
                            <span className="text-[10px] uppercase text-paragraph">Failed</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm font-medium text-danger text-right">
                        Failed: {history.error}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white border border-border rounded-2xl p-6 sticky top-24">
            <h3 className="text-base font-bold text-heading mb-4">Instructions</h3>
            <div className="space-y-4 text-sm text-paragraph">
              <p>To bulk shorten links, prepare a CSV file matching our required format.</p>

              <div className="p-4 bg-surface rounded-xl border border-border">
                <p className="font-semibold text-heading mb-2">Required Columns:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><code>originalUrl</code> - The long URL</li>
                </ul>

                <p className="font-semibold text-heading mb-2 mt-4">Optional Columns:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><code>customAlias</code> - e.g., "summer-promo"</li>
                  <li><code>password</code> - Password protect link</li>
                  <li><code>expiresAt</code> - ISO date string</li>
                </ul>
              </div>

              <button className="w-full text-center text-primary font-medium hover:underline mt-2">
                Download Template CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
