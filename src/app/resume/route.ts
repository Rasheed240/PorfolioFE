import { NextResponse } from 'next/server';
import { api } from '@/lib/api';

export async function GET() {
    try {
        const profile = await api.getProfile();

        if (profile && profile.resume_url) {
            return NextResponse.redirect(profile.resume_url);
        }

        // If no resume found, redirect to home with a proper status
        return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3000'));
    } catch (error) {
        console.error("Failed to redirect to resume:", error);
        return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3000'));
    }
}
