"use client";

import { StatCard, ChartCard, ActionDropdown } from "@/app/components/dashboard";
import { Link2, MousePointerClick, TrendingUp, Activity, ExternalLink, Copy, QrCode } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { mockDashboardData, mockLinks } from "@/lib/mockData";
import { format } from "date-fns";
import { cn } from "@/utils";

export default function DashboardOverviewPage() {
  const { kpis, clickHistory } = mockDashboardData;

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-heading">Overview</h1>
          <p className="text-sm text-paragraph mt-1">Here&apos;s what&apos;s happening with your links today.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-white border border-border rounded-xl px-4 py-2 text-sm font-medium text-heading focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This month</option>
            <option>All time</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4">
        <StatCard
          title="Total Links"
          value={kpis.totalLinks.toLocaleString()}
          icon={Link2}
          trend={kpis.totalLinksGrowth}
          trendDirection="up"
        />
        <StatCard
          title="Total Clicks"
          value={kpis.totalClicks.toLocaleString()}
          icon={MousePointerClick}
          trend={kpis.totalClicksGrowth}
          trendDirection="up"
        />
        <StatCard
          title="Active Links"
          value={kpis.activeLinks.toLocaleString()}
          icon={Activity}
          trend={kpis.activeLinksGrowth}
          trendDirection="up"
        />
        <StatCard
          title="Avg. Click Rate"
          value={kpis.avgCtr}
          icon={TrendingUp}
          trend={kpis.avgCtrGrowth}
          trendDirection="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
        <div className="lg:col-span-2">
          <ChartCard title="Clicks over time" description="Total clicks across all your short links.">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={clickHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3964FE" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3964FE" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748B', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748B', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      // boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="clicks"
                    stroke="#3964FE"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorClicks)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div>
          <ChartCard title="Top Performing Links" className="h-full">
            <div className="flex flex-col gap-4 mt-4">
              {mockLinks.slice(0, 4).map((link) => (
                <div key={link.id} className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-surface/50 hover:bg-surface transition-colors">
                  <div className="min-w-0 flex-1 mr-4">
                    <p className="text-sm font-semibold text-heading truncate">{link.shortLink}</p>
                    <p className="text-xs text-paragraph truncate">{link.originalUrl}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-heading">{link.clicks.toLocaleString()}</p>
                    <p className="text-[10px] text-paragraph uppercase">Clicks</p>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-heading mb-4 mt-2">Recent Activity</h2>
        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          {mockLinks.slice(0, 3).map((link, i) => (
            <div key={link.id} className={cn("flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4", i !== 0 && "border-t border-border")}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Link2 size={20} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <a href={`https://${link.shortLink}`} target="_blank" className="font-semibold text-heading hover:text-primary transition-colors">
                      {link.shortLink}
                    </a>
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full uppercase", link.status === 'active' ? 'bg-success/10 text-success' : 'bg-paragraph/10 text-paragraph')}>
                      {link.status}
                    </span>
                  </div>
                  <p className="text-sm text-paragraph truncate max-w-md mt-1">{link.originalUrl}</p>
                  <p className="text-xs text-paragraph/60 mt-1">Created {format(new Date(link.createdAt), 'MMM dd, yyyy')}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center ml-14 sm:ml-0">
                <div className="text-right mr-4 hidden sm:block">
                  <p className="text-sm font-bold text-heading">{link.clicks.toLocaleString()}</p>
                  <p className="text-[10px] text-paragraph uppercase">Clicks</p>
                </div>
                <button className="p-2 text-paragraph hover:text-primary hover:bg-primary/10 rounded-lg transition-colors tooltip-trigger" title="Copy Link">
                  <Copy size={16} />
                </button>
                <button className="p-2 text-paragraph hover:text-primary hover:bg-primary/10 rounded-lg transition-colors tooltip-trigger" title="QR Code">
                  <QrCode size={16} />
                </button>
                <ActionDropdown items={[
                  { label: "View Analytics", icon: Activity, onClick: () => { } },
                  { label: "Edit Link", icon: Link2, onClick: () => { } },
                  { label: "Archive", icon: ExternalLink, onClick: () => { } },
                ]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
