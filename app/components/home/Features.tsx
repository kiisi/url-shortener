import { plusJakartaSans } from "@/app/fonts";
import { cn } from "@/utils";
import {
    ArrowRight,
    BarChart3,
    Link2,
    QrCode,
    Layers3,
    Globe,
    FolderKanban,
} from "lucide-react";

const features = [
    {
        icon: BarChart3,
        title: "Smart Analytics",
        description:
            "Track clicks, visitors, locations, devices, browsers, and referrers with detailed insights.",
    },
    {
        icon: Link2,
        title: "Custom Aliases",
        description:
            "Create memorable, branded short links that are easy to recognize and share.",
    },
    {
        icon: QrCode,
        title: "QR Codes",
        description:
            "Generate downloadable QR codes for every short link with a single click.",
    },
    {
        icon: Layers3,
        title: "Bulk Shortening",
        description:
            "Shorten multiple URLs at once to save time and simplify large campaigns.",
    },
    {
        icon: Globe,
        title: "Branded Domains",
        description:
            "Use your own domain to create professional short links that build trust.",
    },
    {
        icon: FolderKanban,
        title: "Link Management",
        description:
            "Search, edit, organize, and manage all your links from one clean dashboard.",
    },
];

export default function Features() {
    return (
        <section className="bg-slate-50 py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex rounded-full -bg-primary/5 px-4 py-1 text-[16px] font-medium text-primary">
                        Features
                    </span>

                    <h2 className={cn("mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl", plusJakartaSans.className)}>
                        Manage <span className="text-primary">Links Better</span>
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-slate-600">
                        Powerful tools to shorten, organize, track, and share links from
                        one intuitive dashboard.
                    </p>
                </div>

                {/* Cards */}
                <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="group rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-[#3964FE]/40 cursor-pointer"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3964FE]/10 transition-transform duration-300 group-hover:scale-110">
                                    <Icon className="h-6 w-6 text-[#3964FE]" />
                                </div>

                                <h3 className="mt-8 text-xl font-semibold text-slate-900">
                                    {feature.title}
                                </h3>

                                <p className="mt-4 leading-7 text-slate-600">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="grid place-items-center pt-12">
                    <button className="bg-primary text-white inline-flex items-center gap-2 font-medium rounded-lg px-[52px] py-[12px] transition-all group-hover:gap-3">
                        Get Started
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}