"use client";

import Link from "next/link";

interface AuthFooterProps {
  text: string;
  linkText: string;
  href: string;
}

export function AuthFooter({ text, linkText, href }: AuthFooterProps) {
  return (
    <p className="mt-6 text-center text-sm text-paragraph">
      {text}{" "}
      <Link
        href={href}
        className="font-semibold text-primary hover:text-primary-hover transition-colors"
      >
        {linkText}
      </Link>
    </p>
  );
}
