"use client";

import { useFormik } from "formik";
import { plusJakartaSans, sourGummy } from "./fonts";
import { cn } from "../utils";
import {
  Copy,
  Check,
  QrCode,
  ArrowRight,
  Edit3,
  LinkIcon,
  LoaderCircle,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import Navbar from "./components/layouts/Navbar";
import { ShortenUrlFormValues } from "@/types/link";
import { shortenUrlSchema } from "@/validation/shortenUrlSchema";
import ButtonRadial from "./components/ui/button-radial";

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
};

export default function Home() {

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
        const response = await fetch("/api/shorten", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        setResult(data);
        console.log("Data", data);
        helpers.resetForm();
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
    <>
      {/* NAVIGATION */}
      <Navbar />
      {/* HERO */}
      <div className="w-full max-w-[1200px] mx-auto pt-[80px] pb-[120px] px-6">
        <div>
          <h1
            className={cn(
              "max-w-max text-[42px] lg:text-[48px] font-extrabold mb-6 leading-[125%] mx-auto",
              plusJakartaSans.className,
            )}
          >
            Create Stunning Short{" "}
            <span className="text-primary relative">
              Links!
              <svg
                viewBox="0 0 33 33"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[24px] h-[24px] mdup:w-[33px] mdup:h-[33px] fill-primary absolute -top-[2px] right-[-20px] absolute"
              >
                <path d="M20.883 6.703a.586.586 0 0 1-.258-.516c0-.193.064-.322.258-.45l3.867-1.612L26.297.322c.129-.193.322-.322.515-.322.194 0 .323.129.452.322l1.611 3.803 3.803 1.611c.193.13.322.258.322.452 0 .193-.129.386-.322.515L28.875 8.25l-1.611 3.867c-.13.193-.258.258-.451.258a.586.586 0 0 1-.516-.258L24.75 8.25l-3.867-1.547Zm11.795 19.658c.193.13.322.258.322.451 0 .194-.129.387-.322.516l-3.803 1.547-1.611 3.867c-.13.194-.258.258-.451.258a.586.586 0 0 1-.516-.258l-1.547-3.867-3.867-1.547a.586.586 0 0 1-.258-.515c0-.194.064-.323.258-.452l3.867-1.611 1.547-3.803c.129-.193.322-.322.515-.322.194 0 .323.129.452.322l1.611 3.803 3.803 1.611ZM24.75 16.5c0 .645-.387 1.16-.902 1.418L17.08 21.27l-3.351 6.767a1.503 1.503 0 0 1-1.354.838c-.645 0-1.16-.322-1.418-.838L7.605 21.27.838 17.918C.322 17.66 0 17.145 0 16.5c0-.58.322-1.096.838-1.354l6.767-3.351 3.352-6.768c.516-1.095 2.256-1.095 2.771 0l3.352 6.768 6.768 3.351c.515.258.902.774.902 1.354Zm-9.475 2.256 4.448-2.256-4.448-2.191a1.277 1.277 0 0 1-.709-.71l-2.191-4.447-2.256 4.448c-.129.322-.387.58-.709.709L4.963 16.5l4.447 2.256c.322.129.58.387.71.709l2.255 4.447 2.191-4.447c.13-.322.387-.58.71-.71Z"></path>
              </svg>
            </span>
          </h1>
          <p className="w-full max-w-[580px] text-center mx-auto mb-10">
            Transform long URLs into clean, shareable links for social media,
            presentations, and everywhere else instantly.
          </p>

          <form
            onSubmit={formik.handleSubmit}
            className="w-full max-w-[768px] mx-auto space-y-4 w-full"
            noValidate
          >
            {/* Long URL Field */}
            {!result?.data && (
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
            )}

            {/* Alias Field (Optional) */}
            {!result?.data && (
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
                  <p className="text-xs break-all line-clamp-1 font-mono text-primary bg-primary/5 px-2 py-0.5 rounded-md">
                    shortminiurl.vercel.app/
                    {`${formik.values.alias.trim() === "" ? "your-alias" : formik.values.alias}`}
                  </p>
                </div>
              </fieldset>
            )}

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
            )}

            {/* Feature badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                Free & instant
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                Custom aliases
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                No sign-up required
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* RECENT LINKS */}
      <div className="w-full max-w-[1200px] mx-auto -pt-[80px] pb-[80px] px-6">
        <div></div>
      </div>
      {/* FOOTER */}
      <footer className="mt-auto">
        <div className="bg-gray-50 border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2">
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
                </div>
                <p className="text-sm text-gray-600">
                  Create Stunning Short Links.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-900 transition-colors"
                    >
                      Analytics
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-900 transition-colors"
                    >
                      Plans
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-900 transition-colors"
                    >
                      Login
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">More</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-900 transition-colors"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-900 transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-900 transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {/* <Twitter className="w-6 h-6" /> */}
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {/* <Instagram className="w-6 h-6" /> */}
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {/* <Linkedin className="w-6 h-6" /> */}
                  </a>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Made with ❤️ Kiisi
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
