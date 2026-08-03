"use client";

import { Globe, Plus, AlertCircle, CheckCircle2, RefreshCw } from "lucide-react";
import { mockDomains } from "@/lib/mockData";
import { format } from "date-fns";
import { cn } from "@/utils";
import { ActionDropdown } from "@/app/components/dashboard";

export default function DomainsPage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-heading">Branded Domains</h1>
          <p className="text-sm text-paragraph mt-1">Connect your own domain to create branded short links.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-heading text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-heading/90 transition-all">
          <Plus size={16} />
          Add Domain
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {mockDomains.map((domain) => (
          <div key={domain.id} className="bg-white border border-border rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  domain.status === 'verified' ? "bg-primary/10 text-primary" :
                    domain.status === 'pending' ? "bg-warning/10 text-warning" : "bg-danger/10 text-danger"
                )}>
                  <Globe size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-heading">{domain.domain}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className={cn("w-2 h-2 rounded-full",
                      domain.status === 'verified' ? 'bg-success' :
                        domain.status === 'pending' ? 'bg-warning animate-pulse' : 'bg-danger'
                    )} />
                    <span className="text-xs text-paragraph capitalize">{domain.status}</span>
                  </div>
                </div>
              </div>
              <ActionDropdown items={[
                { label: "Verify Configuration", icon: RefreshCw, onClick: () => { } },
                { label: "Remove Domain", icon: AlertCircle, onClick: () => { }, danger: true },
              ]} />
            </div>

            <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-paragraph uppercase">Links Using</p>
                <p className="font-semibold text-heading mt-1">{domain.linksCount}</p>
              </div>
              <div>
                <p className="text-xs text-paragraph uppercase">SSL Status</p>
                <div className="flex items-center gap-1 mt-1">
                  {domain.ssl ? (
                    <><CheckCircle2 size={14} className="text-success" /> <span className="font-semibold text-heading">Active</span></>
                  ) : (
                    <><AlertCircle size={14} className="text-warning" /> <span className="font-semibold text-heading">Pending</span></>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6 lg:p-8 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-primary shrink-0 mt-1">
          <AlertCircle size={20} />
        </div>
        <div>
          <h3 className="text-base font-bold text-heading">How to connect a domain</h3>
          <p className="text-sm text-paragraph mt-2 mb-4 max-w-3xl">
            To use a custom domain (like <code>link.yourbrand.com</code>), you need to add a CNAME record to your DNS provider pointing to <code>cname.miniurl.com</code>. We automatically provision SSL certificates for all verified domains.
          </p>
          <a href="#" className="text-sm font-semibold text-primary hover:underline">
            Read the full guide →
          </a>
        </div>
      </div>
    </>
  );
}
