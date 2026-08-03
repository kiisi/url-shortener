import { subDays, format } from "date-fns";

export type LinkStatus = "active" | "archived" | "expired";

export interface Link {
  id: string;
  shortLink: string;
  originalUrl: string;
  customAlias?: string;
  clicks: number;
  status: LinkStatus;
  createdAt: string;
  expiresAt?: string;
  hasQrCode: boolean;
}

export interface Domain {
  id: string;
  domain: string;
  status: "verified" | "pending" | "failed";
  ssl: boolean;
  linksCount: number;
  createdAt: string;
}

export interface ClickData {
  date: string;
  clicks: number;
  unique: number;
}

// Generate some mock click data for the past 30 days
export const generateClickData = (days: number): ClickData[] => {
  const data = [];
  for (let i = days; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const baseClicks = Math.floor(Math.random() * 500) + 100;
    data.push({
      date: format(date, "MMM dd"),
      clicks: baseClicks,
      unique: Math.floor(baseClicks * (Math.random() * 0.4 + 0.4)), // 40-80% unique
    });
  }
  return data;
};

export const mockDashboardData = {
  kpis: {
    totalLinks: 124,
    totalLinksGrowth: "+12%",
    totalClicks: 45231,
    totalClicksGrowth: "+24%",
    activeLinks: 118,
    activeLinksGrowth: "+2",
    avgCtr: "24.5%",
    avgCtrGrowth: "+1.2%",
  },
  clickHistory: generateClickData(30),
};

export const mockLinks: Link[] = [
  {
    id: "lnk_1",
    shortLink: "mini.url/launch-q3",
    originalUrl: "https://example.com/marketing/campaigns/q3-launch-details-2026",
    customAlias: "launch-q3",
    clicks: 12450,
    status: "active",
    createdAt: subDays(new Date(), 2).toISOString(),
    hasQrCode: true,
  },
  {
    id: "lnk_2",
    shortLink: "mini.url/tw-post",
    originalUrl: "https://example.com/blog/10-ways-to-improve-seo",
    customAlias: "tw-post",
    clicks: 8432,
    status: "active",
    createdAt: subDays(new Date(), 5).toISOString(),
    hasQrCode: false,
  },
  {
    id: "lnk_3",
    shortLink: "mini.url/x8k92P",
    originalUrl: "https://example.com/docs/api/v2/authentication",
    clicks: 320,
    status: "active",
    createdAt: subDays(new Date(), 10).toISOString(),
    hasQrCode: true,
  },
  {
    id: "lnk_4",
    shortLink: "mini.url/promo-50",
    originalUrl: "https://example.com/store/checkout?coupon=SAVE50",
    customAlias: "promo-50",
    clicks: 54100,
    status: "expired",
    createdAt: subDays(new Date(), 45).toISOString(),
    expiresAt: subDays(new Date(), 15).toISOString(),
    hasQrCode: true,
  },
  {
    id: "lnk_5",
    shortLink: "mini.url/yt-vid-1",
    originalUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    customAlias: "yt-vid-1",
    clicks: 105,
    status: "archived",
    createdAt: subDays(new Date(), 60).toISOString(),
    hasQrCode: false,
  },
];

export const mockDomains: Domain[] = [
  {
    id: "dom_1",
    domain: "links.acme.com",
    status: "verified",
    ssl: true,
    linksCount: 84,
    createdAt: subDays(new Date(), 120).toISOString(),
  },
  {
    id: "dom_2",
    domain: "go.acme.com",
    status: "verified",
    ssl: true,
    linksCount: 12,
    createdAt: subDays(new Date(), 45).toISOString(),
  },
  {
    id: "dom_3",
    domain: "promo.acme.com",
    status: "pending",
    ssl: false,
    linksCount: 0,
    createdAt: subDays(new Date(), 1).toISOString(),
  },
  {
    id: "dom_4",
    domain: "short.acme-corp.invalid",
    status: "failed",
    ssl: false,
    linksCount: 0,
    createdAt: subDays(new Date(), 5).toISOString(),
  },
];

export const mockAnalytics = {
  topCountries: [
    { name: "United States", value: 45 },
    { name: "United Kingdom", value: 20 },
    { name: "Germany", value: 15 },
    { name: "Canada", value: 10 },
    { name: "Australia", value: 5 },
    { name: "Other", value: 5 },
  ],
  topDevices: [
    { name: "Mobile", value: 65, color: "#3964FE" },
    { name: "Desktop", value: 30, color: "#93c5fd" },
    { name: "Tablet", value: 5, color: "#dbeafe" },
  ],
  topBrowsers: [
    { name: "Chrome", value: 55, color: "#3964FE" },
    { name: "Safari", value: 25, color: "#60a5fa" },
    { name: "Firefox", value: 10, color: "#93c5fd" },
    { name: "Edge", value: 5, color: "#bfdbfe" },
    { name: "Other", value: 5, color: "#dbeafe" },
  ],
  referrers: [
    { name: "Direct", clicks: 12500 },
    { name: "Twitter / X", clicks: 8430 },
    { name: "Google", clicks: 6200 },
    { name: "LinkedIn", clicks: 4100 },
    { name: "Facebook", clicks: 2300 },
  ]
};

export const mockBulkHistory = [
  {
    id: "bulk_1",
    filename: "q3_campaign_links.csv",
    status: "completed",
    totalRows: 150,
    successCount: 150,
    failedCount: 0,
    createdAt: subDays(new Date(), 2).toISOString(),
  },
  {
    id: "bulk_2",
    filename: "legacy_links_import.csv",
    status: "completed",
    totalRows: 540,
    successCount: 521,
    failedCount: 19,
    createdAt: subDays(new Date(), 15).toISOString(),
  },
  {
    id: "bulk_3",
    filename: "broken_file.csv",
    status: "failed",
    totalRows: 0,
    successCount: 0,
    failedCount: 0,
    error: "Invalid CSV format",
    createdAt: subDays(new Date(), 20).toISOString(),
  }
];
