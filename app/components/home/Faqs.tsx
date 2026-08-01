import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FAQ_ITEMS = [
    {
        q: "Is the URL shortener free to use?",
        a: "Yes. You can create and manage short links for free. Premium features like branded domains and advanced analytics are available on paid plans.",
    },
    {
        q: "Can I customize my short links?",
        a: "Absolutely. Create custom aliases to make your links more memorable, professional, and easier to share.",
    },
    {
        q: "Do you provide click analytics?",
        a: "Yes. Track clicks, visitor locations, devices, browsers, referrers, and other key insights from your dashboard.",
    },
    {
        q: "Can I use my own domain?",
        a: "Yes. Connect your custom domain to create branded short links that reinforce your brand and build trust.",
    },
    {
        q: "Can I edit or delete my links later?",
        a: "Yes. You can manage your links from your dashboard, including editing, organizing, or deleting them whenever you need.",
    },
    {
        q: "Are my links secure and reliable?",
        a: "Yes. All links are served over HTTPS and backed by reliable infrastructure to ensure fast, secure, and consistent redirects.",
    },
];

export default function FAQs() {
    return (
        <section id="faq" className="py-20 md:py-28 bg-white border-t border-gray-100">
            <div className="max-w-[720px] mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-16"
                >
                    {/* Badge — pill with blue left accent */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-6">
                        <span className="text-[14px]">❓</span>
                        <span className="text-[13px] leading-[100%] font-semibold text-gray-600 tracking-wide">FAQs</span>
                    </div>
                    <h2 className="text-[28px] md:text-[42px] font-black text-gray-900 tracking-tight leading-[1.15]">
                        Questions? We&apos;ve got<br /><span className="text-primary">answers.</span>
                    </h2>
                </motion.div>

                {/* FAQ List */}
                <div>
                    {/* Top divider */}
                    <div className="h-px bg-gray-200" />

                    {FAQ_ITEMS.map((item, i) => (
                        <FAQItem key={i} item={item} index={i} isLast={i === FAQ_ITEMS.length - 1} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQItem({ item, index, isLast }: { item: { q: string; a: string }; index: number; isLast: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const number = String(index + 1).padStart(2, "0");

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
        >
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer group"
            >
                {/* Row */}
                <div className="flex items-center gap-5 md:gap-8 py-6 md:py-7">
                    {/* Number */}
                    <span className="text-[28px] md:text-[36px] font-black text-gray-200 leading-none select-none shrink-0 w-[48px] md:w-[60px] tabular-nums">
                        {number}
                    </span>

                    {/* Question */}
                    <h4 className="flex-1 text-[15px] md:text-[17px] font-bold text-gray-900 group-hover:text-gray-700 transition-colors leading-snug">
                        {item.q}
                    </h4>

                    {/* Toggle Icon */}
                    <div className="shrink-0 h-8 w-8 md:h-9 md:w-9 rounded-full flex items-center justify-center text-gray-400 group-hover:text-gray-600 transition-colors">
                        <motion.div
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="9" y1="2" x2="9" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <line x1="2" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </motion.div>
                    </div>
                </div>

                {/* Expanded answer */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="pb-6 pl-[68px] md:pl-[92px] pr-10">
                                <p className="text-[14px] md:text-[15px] text-gray-500 leading-relaxed">
                                    {item.a}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Divider */}
            {!isLast && <div className="h-px bg-gray-200" />}
        </motion.div>
    );
}
