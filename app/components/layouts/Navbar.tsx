import { sourGummy } from "@/app/fonts";
import { cn } from "@/utils";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full max-w-[1200px] mx-auto py-5 px-6 flex justify-between">
            <figure>
                <h1
                    className={cn(
                        "leading-[100%] font-bold text-[28px]",
                        sourGummy.className,
                    )}
                >
                    <span className="text-[#3964fe]">Mini</span>Url
                </h1>
            </figure>
            <ul className="font-medium flex items-center gap-4">
                <li>
                    <Link
                        href="/analytics"
                        className="rounded-[4px] px-3 py-1.5 hover:bg-[#f5f5f4]"
                    >
                        Analytics
                    </Link>
                </li>
                <li>
                    <Link
                        href="/plans"
                        className="rounded-[4px] px-3 py-1.5 hover:bg-[#f5f5f4]"
                    >
                        Plans
                    </Link>
                </li>
                <li>
                    <Link
                        href="/login"
                        className="rounded-[4px] px-3 py-1.5 hover:bg-[#f5f5f4]"
                    >
                        Login
                    </Link>
                </li>
            </ul>
        </nav>
    )
}