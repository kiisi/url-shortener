"use client"
import { plusJakartaSans } from "@/app/fonts";
import { ShortenUrlFormValues } from "@/types/link";
import { cn } from "@/utils";
import { shortenUrlSchema } from "@/validation/shortenUrlSchema";
import { useFormik } from "formik";
import { useState } from "react";
import { ArrowRight, CalendarDays, Check, Copy, Edit3, ExternalLink, LinkIcon, LoaderCircle, QrCode } from "lucide-react";
import ButtonRadial from "@/app/components/ui/button-radial";
import Switch from "@/app/components/ui/switch";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ShortenUrlResponse {
    success: boolean;
    message: string;
    data?: {
        shortCode: string;
        originalUrl: string;
        shortUrl: string;
    };
}

const initialValues: ShortenUrlFormValues = {
    url: "",
    alias: "",
    expiresAt: "",
};

export default function Page() {

    const queryClient = useQueryClient();

    const [isAliasChecked, setAliasChecked] = useState(false)
    const [isExpirationChecked, setExpirationChecked] = useState(false)

    const shortenUrlMutation = useMutation({
        mutationFn: async (payload: {
            url: string;
            alias?: string;
        }) => {
            const response = await fetch("/api/links", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            const data: ShortenUrlResponse = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to shorten URL");
            }

            return data;
        },

        onSuccess: (data) => {
            setResult(data);

            toast.success(data.message);

            // If your links table uses ["links"]
            queryClient.invalidateQueries({
                queryKey: ["links"],
            });
        },

        onError: (error) => {
            setResult({
                success: false,
                message: error.message || "Something went wrong",
            });
        },
    });

    const formik = useFormik<ShortenUrlFormValues>({
        initialValues,
        validationSchema: shortenUrlSchema,
        validateOnBlur: true,
        onSubmit: async (values, helpers) => {

            if (!values.url) {
                return setResult({
                    success: false,
                    message: "Enter a valid URL",
                });
            }

            const payload = {
                url: values.url,
                ...(values.alias.trim() && { alias: values.alias.trim() }),
            };
            console.log(payload);
            setStatus("loading");

            try {
                await shortenUrlMutation.mutateAsync(payload);
            }
            catch (err) {
                setResult(err as ShortenUrlResponse);
            }
            finally {
                setStatus("idle");
                helpers.setSubmitting(false);
            }
        },
    });

    const [status, setStatus] = useState<"idle" | "loading">("idle");
    const [result, setResult] = useState<ShortenUrlResponse>(
        {} as ShortenUrlResponse,
    );
    const [copied, setCopied] = useState(false);
    const [showQr, setShowQr] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(result?.data?.shortUrl ?? '');
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const handleReset = () => {
        setResult({} as ShortenUrlResponse);
        setStatus("idle");
        setShowQr(false);
    };

    return (
        <div
            className="w-full bg-white p-[24px] rounded-xl h-max">
            <div>
                <h1 className={cn(
                    "text-[24px] font-extrabold mb-6 leading-[125%]",
                    plusJakartaSans.className,
                )}>
                    Create short mini link
                </h1>
                <form
                    onSubmit={formik.handleSubmit}
                    className="w-full space-y-4 w-full"
                    noValidate
                >
                    {/* Long URL Field */}
                    <fieldset>
                        <label
                            htmlFor="longUrl"
                            className="inline-block text-sm font-medium text-slate-700 mb-1.5"
                        >
                            Long URL <span className="text-red-500">*</span>
                        </label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <LinkIcon className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                id="url"
                                type="text"
                                value={formik.values.url}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter the URL you want to shorten"
                                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary transition-all text-slate-700 placeholder:text-slate-400 text-sm"
                            />
                        </div>
                        {formik.touched.url && formik.errors.url && (
                            <p className="mt-1 text-sm text-red-500">
                                {formik.errors.url}
                            </p>
                        )}
                    </fieldset>

                    <fieldset className="flex items-center justify-between p-3 rounded-xl border border-border">
                        <div>
                            <p className="text-sm font-medium text-foreground">Set Alias</p>
                            <p className="text-xs text-muted-foreground">
                                Customize your short link
                            </p>
                        </div>
                        <Switch
                            checked={isAliasChecked}
                            onCheckedChange={() => setAliasChecked(prev => !prev)}
                        />
                    </fieldset>

                    {/* Alias Field (Optional) */}
                    {isAliasChecked && (
                        <fieldset>
                            <label
                                htmlFor="alias"
                                className="inline-block text-sm font-medium text-slate-700 mb-1.5"
                            >
                                Alias{" "}
                                <span className="text-slate-400 font-normal">(optional)</span>
                            </label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Edit3 className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="alias"
                                    type="text"
                                    value={formik.values.alias}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="e.g., myblog, summer-sale"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary transition-all text-slate-700 placeholder:text-slate-400 text-sm"
                                />
                            </div>
                            {formik.touched.alias && formik.errors.alias && (
                                <p className="mt-1 text-sm text-red-500">
                                    {formik.errors.alias}
                                </p>
                            )}
                            <div className="block md:flex flex-wrap lg:items-center gap-2 mt-2">
                                <p className="text-xs text-slate-400 leading-[150%]">
                                    Your short URL will be:
                                </p>
                                <p className="text-xs max-w-max break-all line-clamp-1 font-mono text-primary bg-primary/5 px-2 py-0.5 rounded-md">
                                    shortminiurl.vercel.app/
                                    {`${formik.values.alias.trim() === "" ? "your-alias" : formik.values.alias}`}
                                </p>
                            </div>
                        </fieldset>
                    )}

                    <fieldset className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <div>
                            <p className="text-sm font-medium text-foreground">
                                Set Link Expiration
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Set a date for your link to expire
                            </p>
                        </div>
                        <Switch
                            checked={isExpirationChecked}
                            onCheckedChange={() => setExpirationChecked(prev => !prev)}
                        />
                    </fieldset>

                    {
                        isExpirationChecked && (
                            <fieldset>
                                <label
                                    htmlFor="expiresAt"
                                    className="inline-block text-sm font-medium text-slate-700 mb-1.5"
                                >
                                    Expiry Date
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <CalendarDays className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        id="expiresAt"
                                        type="date"
                                        value={formik.values.expiresAt}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        min={new Date().toISOString().split("T")[0]}
                                        className={cn(
                                            // formik.touched.expiresAt && formik.errors.expiresAt && "border-destructive focus-visible:ring-destructive",
                                            "w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary transition-all text-slate-700 placeholder:text-slate-400 text-sm"
                                        )}
                                    />
                                </div>
                                {/* {formik.touched.expiresAt && formik.errors.expiresAt && (
                            <p className="text-xs text-destructive mt-1">{String(formik.errors.expiresAt)}</p>
                        )} */}
                            </fieldset>

                        )
                    }
                    {!result?.data && (
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/35 text-[15px] cursor-pointer"
                        >
                            {formik.isSubmitting ? (
                                <>
                                    <LoaderCircle className="w-5 h-5 animate-spin" />{" "}
                                    Shortening…
                                </>
                            ) : (
                                <>
                                    Shorten URL <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    )}

                    {result?.data && (
                        <>
                            <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 sm:p-5 animate-[fadeIn_0.2s_ease]">
                                <p className="text-left text-[14px] text-gray-500 mb-2">
                                    Your short link is ready
                                </p>
                                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-3">
                                    <span className="text-sm font-mono text-indigo-700 truncate flex-1">
                                        {result.data.shortUrl}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={handleCopy}
                                        className="shrink-0 hidden md:flex justify-center items-center gap-1.5 text-xs font-medium w-[90px] px-3 py-1.5 rounded-md bg-primary text-white hover:bg-primary/90 transition cursor-pointer"
                                    >
                                        {copied ? (
                                            <Check className="w-3.5 h-3.5" />
                                        ) : (
                                            <Copy className="w-3.5 h-3.5" />
                                        )}
                                        {copied ? "Copied" : "Copy"}
                                    </button>
                                </div>

                                <div className="mt-3 flex items-center gap-4">
                                    {/* <button
                    type="button"
                    onClick={() => setShowQr((s) => !s)}
                    className="text-[14px] text-gray-500 hover:text-indigo-600 flex items-center gap-1 cursor-pointer"
                  >
                    <QrCode className="w-4 h-4" /> {showQr ? "Hide" : "Show"} QR
                    code
                  </button> */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            window.open(result?.data?.shortUrl, "_blank", "noopener,noreferrer")
                                        }
                                        className="text-[14px] text-gray-500 hover:text-indigo-600 flex items-center gap-1 cursor-pointer"
                                    >
                                        <ExternalLink className="w-4 h-4" /> Visit link
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCopy}
                                        className="shrink-0 flex md:hidden justify-center items-center gap-1.5 text-xs font-medium w-[90px] px-3 py-1.5 rounded-md text-gray-500 hover:text-indigo-600  transition cursor-pointer hover:bg-primary/10"
                                    >
                                        {copied ? (
                                            <Check className="w-3.5 h-3.5" />
                                        ) : (
                                            <Copy className="w-3.5 h-3.5" />
                                        )}
                                        {copied ? "Copied" : "Copy"}
                                    </button>
                                </div>
                                <ButtonRadial
                                    onClick={handleReset}
                                >
                                    Shorten another link
                                </ButtonRadial>

                                {showQr && (
                                    <div className="mt-3 w-28 h-28 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                                        <QrCode className="w-16 h-16 text-gray-300" />
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    )
}
