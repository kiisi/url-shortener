import { sourGummy } from "@/app/fonts";
import { cn } from "@/utils";

export default function Logo() {
    return (
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
    )
}