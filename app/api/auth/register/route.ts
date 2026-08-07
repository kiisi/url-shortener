import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/jwt";
import { registerSchema } from "@/validation/auth";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const parsed = registerSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid input.",
                    errors: parsed.error.flatten(),
                },
                { status: 400 }
            );
        }

        const { email, password, firstName, lastName } = parsed.data;

        const existingEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingEmail) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email already exists.",
                },
                { status: 409 }
            );
        }

        // if (username) {
        //     const existingUsername = await prisma.user.findUnique({
        //         where: {
        //             username,
        //         },
        //     });

        //     if (existingUsername) {
        //         return NextResponse.json(
        //             {
        //                 success: false,
        //                 message: "Username is already taken.",
        //             },
        //             { status: 409 }
        //         );
        //     }
        // }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
            },
        });

        const token = signToken({
            userId: user.id,
        });

        const response = NextResponse.json(
            {
                success: true,
                message: "Account created successfully.",
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
            },
            {
                status: 201,
            }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (error) {
        console.error("Registration Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal server error.",
            },
            {
                status: 500,
            }
        );
    }
}