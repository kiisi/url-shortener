import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type ButtonRadialProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonRadial({
    children,
    className,
    type = "button",
    ...props
}: ButtonRadialProps) {
    return (
        <button
            type={type}
            className={clsx(
                "group relative isolate mt-5 w-full cursor-pointer overflow-hidden rounded-xl bg-[#3964FE] px-8 py-3.5 font-medium text-white transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-80",
                className
            )}
            {...props}
        >
            {/* Top highlight */}
            <span
                className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-full bg-gradient-to-b from-white/35 to-transparent"
            />
            {/* Radial light */}
            <span
                className="pointer-events-none absolute -top-8 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-white/20 blur-2xl"
            />
            {/* Shine animation */}
            <span
                className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[430%]"
            />
            {/* Bottom shadow */}
            <span
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-black/15"
            />
            <span className="relative z-10">
                {children}
            </span>
        </button>
    )
}