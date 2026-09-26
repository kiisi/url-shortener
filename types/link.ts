export interface ShortenUrlFormValues {
    url: string;
    alias: string;
    expiresAt: string;
}

export type LinkType = {
    id: string;
    shortCode: string;
    originalUrl: string;
    clickCount: number;
    status: string;
    createdAt: string;
};