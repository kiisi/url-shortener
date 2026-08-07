import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function signToken(payload: { userId: string }) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "7d",
    });
}

export function verifyToken(
    token: string
) {
    try {
        const payload = jwt.verify(token, JWT_SECRET);

        if (
            typeof payload !== "object" ||
            payload === null ||
            typeof payload.userId !== "string"
        ) {
            return null;
        }

        return payload
    } catch {
        // Invalid, expired or tampered token
        return null;
    }
}