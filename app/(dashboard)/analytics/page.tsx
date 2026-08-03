"use client";

import { ChartCard, StatCard } from "@/app/components/dashboard";
import { mockAnalytics, mockDashboardData } from "@/lib/mockData";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Globe2, Smartphone, Monitor, Globe } from "lucide-react";

export default function AnalyticsPage() {
  const { clickHistory } = mockDashboardData;
  const { topCountries, topDevices, topBrowsers, referrers } = mockAnalytics;

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-heading">Smart Analytics</h1>
          <p className="text-sm text-paragraph mt-1">Deep dive into your traffic and audience.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-white border border-border rounded-xl px-4 py-2 text-sm font-medium text-heading focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
            <option>Custom range</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
        <StatCard title="Unique Visitors" value="28,450" icon={Globe2} trend="+15%" trendDirection="up" />
        <StatCard title="Mobile Traffic" value="65%" icon={Smartphone} trend="+5%" trendDirection="up" />
        <StatCard title="Desktop Traffic" value="30%" icon={Monitor} trend="-2%" trendDirection="down" />
      </div>

      <ChartCard title="Traffic Overview" description="Total vs Unique clicks over time.">
        <div className="h-[350px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={clickHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3964FE" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3964FE" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  // boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                }}
              />
              <Area type="monotone" dataKey="clicks" name="Total Clicks" stroke="#3964FE" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
              <Area type="monotone" dataKey="unique" name="Unique Visitors" stroke="#22C55E" strokeWidth={2} fillOpacity={1} fill="url(#colorUnique)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
        <ChartCard title="Top Countries" description="Where your visitors are coming from.">
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCountries} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#0F172A', fontSize: 12, fontWeight: 500 }} />
                <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0' }} />
                <Bar dataKey="value" fill="#3964FE" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Top Referrers" description="Sources driving traffic to your links.">
          <div className="flex flex-col gap-3 mt-4">
            {referrers.map((ref) => (
              <div key={ref.name} className="flex items-center justify-between p-3 rounded-xl border border-border/50 hover:bg-surface transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-paragraph">
                    <Globe size={14} />
                  </div>
                  <span className="font-semibold text-heading text-sm">{ref.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-heading">{ref.clicks.toLocaleString()}</span>
                  <span className="text-xs text-paragraph ml-1">clicks</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Devices" description="Traffic breakdown by device type.">
          <div className="h-[250px] mt-4 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={topDevices} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {topDevices.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0' }} />
              </PieChart>
            </ResponsiveContainer>
            {/* Custom Legend */}
            <div className="absolute top-0 right-0 flex flex-col gap-2">
              {topDevices.map(d => (
                <div key={d.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-heading font-medium">{d.name}</span>
                  <span className="text-paragraph">({d.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Browsers" description="Traffic breakdown by browser.">
          <div className="h-[250px] mt-4 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={topBrowsers} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {topBrowsers.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0' }} />
              </PieChart>
            </ResponsiveContainer>
            {/* Custom Legend */}
            <div className="absolute top-0 right-0 flex flex-col gap-2">
              {topBrowsers.map(d => (
                <div key={d.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-heading font-medium">{d.name}</span>
                  <span className="text-paragraph">({d.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>
    </>
  );
}
