import { Plus_Jakarta_Sans } from "next/font/google";
import { Sour_Gummy } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";

export const sourGummy = Sour_Gummy({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-sour-gummy",
    subsets: ["latin"],
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
