import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('@parfumcol/token');
    const path = request.nextUrl.pathname;

    // Debug info
    console.log('Middleware executing for path:', path);
    console.log('Token present:', !!token);

    // Redirect logic for protected routes
    if (path.startsWith('/profile')) {
        if (!token?.value) {
            // Store the attempted URL to redirect back after login if needed
            const url = new URL('/auth', request.url);
            return NextResponse.redirect(url);
        }
    }

    if (path.startsWith('/cart')) {
        if (!token?.value) {
            const url = new URL('/auth', request.url);
            return NextResponse.redirect(url);
        }
    }

    // Redirect logic for auth routes when already authenticated
    if (path.startsWith('/auth')) {
        if (token?.value) {
            const url = new URL('/profile', request.url);
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

// Configuración del matcher para que coincida con la estructura src/app
export const config = {
    matcher: [
        // Rutas que quieres proteger
        '/cart',
        '/cart/:path*',
        '/profile/:path*',
        '/auth/:path*',
        '/profile',
        '/auth'
    ]
};