import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

export function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(
            new URL("/", request.url)
        );
    }

    const payload = verifyToken(token);

    if (!payload) {
        const response = NextResponse.redirect(
            new URL("/", request.url)
        );

        response.cookies.delete("token");

        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/home/:path*",
        "/dashboard/:path*",
        "/links/:path*",
        "/analytics/:path*",
        "/qr-codes/:path*",
        "/bulk/:path*",
        "/domains/:path*",
        "/settings/:path*",
    ],
};