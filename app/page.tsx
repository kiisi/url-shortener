'use client'

import Link from "next/link";
import { plusJakartaSans, sourGummy } from "./fonts";
import { cn } from "../utils";
import { ArrowRight, Edit3, LinkIcon } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* NAVIGATION */}
      <nav className="w-full max-w-[1200px] mx-auto py-5 px-6 flex justify-between">
        <figure>
          <h1 className={cn("leading-[100%] font-bold text-[28px]", sourGummy.className)}>
            <span className="text-[#3964fe]">Mini</span>Url
          </h1>
        </figure>
        <ul className="font-medium flex items-center gap-4">
          <li>
            <Link href="/analytics" className="rounded-[4px] px-3 py-1.5 hover:bg-[#f5f5f4]">
              Analytics
            </Link>
          </li>
          <li>
            <Link href="/plans" className="rounded-[4px] px-3 py-1.5 hover:bg-[#f5f5f4]">
              Plans
            </Link>
          </li>
          <li>
            <Link href="/login" className="rounded-[4px] px-3 py-1.5 hover:bg-[#f5f5f4]">
              Login
            </Link>
          </li>
        </ul>
      </nav>
      {/* HERO */}
      <div className="w-full max-w-[1200px] mx-auto pt-[80px] pb-[120px] px-6">
        <div className="text-center">
          <h1 className={cn("max-w-max text-[42px] lg:text-[48px] font-extrabold mb-6 leading-[125%] mx-auto", plusJakartaSans.className)}>
            Create Stunning Short <span className="text-primary relative">Links!
              <svg viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg" className="w-[24px] h-[24px] mdup:w-[33px] mdup:h-[33px] fill-primary absolute -top-[2px] right-[-20px] absolute"><path d="M20.883 6.703a.586.586 0 0 1-.258-.516c0-.193.064-.322.258-.45l3.867-1.612L26.297.322c.129-.193.322-.322.515-.322.194 0 .323.129.452.322l1.611 3.803 3.803 1.611c.193.13.322.258.322.452 0 .193-.129.386-.322.515L28.875 8.25l-1.611 3.867c-.13.193-.258.258-.451.258a.586.586 0 0 1-.516-.258L24.75 8.25l-3.867-1.547Zm11.795 19.658c.193.13.322.258.322.451 0 .194-.129.387-.322.516l-3.803 1.547-1.611 3.867c-.13.194-.258.258-.451.258a.586.586 0 0 1-.516-.258l-1.547-3.867-3.867-1.547a.586.586 0 0 1-.258-.515c0-.194.064-.323.258-.452l3.867-1.611 1.547-3.803c.129-.193.322-.322.515-.322.194 0 .323.129.452.322l1.611 3.803 3.803 1.611ZM24.75 16.5c0 .645-.387 1.16-.902 1.418L17.08 21.27l-3.351 6.767a1.503 1.503 0 0 1-1.354.838c-.645 0-1.16-.322-1.418-.838L7.605 21.27.838 17.918C.322 17.66 0 17.145 0 16.5c0-.58.322-1.096.838-1.354l6.767-3.351 3.352-6.768c.516-1.095 2.256-1.095 2.771 0l3.352 6.768 6.768 3.351c.515.258.902.774.902 1.354Zm-9.475 2.256 4.448-2.256-4.448-2.191a1.277 1.277 0 0 1-.709-.71l-2.191-4.447-2.256 4.448c-.129.322-.387.58-.709.709L4.963 16.5l4.447 2.256c.322.129.58.387.71.709l2.255 4.447 2.191-4.447c.13-.322.387-.58.71-.71Z"></path></svg>
            </span>
          </h1>
          <p className="w-full max-w-[580px] text-center mx-auto mb-10">
            Transform long URLs into clean, shareable links for social media, presentations, and everywhere else instantly.
          </p>

          {/* <input
              placeholder="Paste URL link"
              className="w-full h-[42px] lg:h-[46px] px-4 border-[1px] border-[#c2c4c6] rounded-[4px]"
            />
            <button className="bg-primary text-white rounded-[4px] h-[42px] lg:h-[46px] px-4 whitespace-nowrap">
              Shorten Link
            </button> */}
          <form className="w-full max-w-[768px] mx-auto space-y-4 w-full">
            {/* Long URL Field */}
            <fieldset className="flex flex-col items-start">
              <label htmlFor="longUrl" className="inline-block text-sm font-medium text-slate-700 mb-1.5">
                Long URL <span className="text-red-500">*</span>
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LinkIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="longUrl"
                  type="text"
                  placeholder="Enter the URL you want to shorten"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none transition-all text-slate-700 placeholder:text-slate-400"
                />
              </div>
              {/* <p className="mt-1.5 text-xs text-slate-400">
                  
                </p> 
              */}
            </fieldset>

            {/* Alias Field (Optional) */}
            <fieldset className="flex flex-col items-start">
              <label htmlFor="alias" className="block text-sm font-medium text-slate-700 mb-1.5">
                Alias <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Edit3 className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="alias"
                  type="text"
                  placeholder="e.g., myblog, project2024, summer-sale"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary transition-all text-slate-700 placeholder:text-slate-400 text-sm"
                />
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs text-slate-400">Your short URL will be:</span>
                <span className="text-xs font-mono text-primary bg-primary/5 px-2 py-0.5 rounded-md">
                  shortminiurl.vercel.app/{'your-alias'}
                </span>
              </div>
            </fieldset>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/35 text-sm cursor-pointer"
            >
              <span>Shorten URL</span>
              <ArrowRight className="w-4 h-4" />
            </button>

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
      <div className="w-full max-w-[1200px] mx-auto pt-[80px] pb-[120px] px-6">
        <div>

        </div>
      </div>
      {/* FOOTER */}
      <footer className="mt-auto">
        <div className="bg-gray-50 border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2">
                  <figure>
                    <h1 className={cn("leading-[100%] font-bold text-[28px]", sourGummy.className)}>
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
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Analytics</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Plans</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Login</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">More</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Contact</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    {/* <Twitter className="w-6 h-6" /> */}
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    {/* <Instagram className="w-6 h-6" /> */}
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
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
