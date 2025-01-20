import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Rutas protegidas que requieren autenticación
const protectedRoutes = ['/profile', '/cart'];
const authRoutes = ['/auth'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Obtener cookies
    const cookieToken = request.cookies.get('@parfumcol/token');
    const cookieUser = request.cookies.get('@parfumcol/user');

    // Debug detallado
    console.log('Middleware Debug:', {
        pathname,
        cookieTokenExists: !!cookieToken?.value,
        cookieUserExists: !!cookieUser?.value,
        cookieTokenValue: cookieToken?.value?.substring(0, 20) + '...',
        cookieUserValue: cookieUser?.value?.substring(0, 20) + '...'
    });

    // Verificar autenticación
    const isAuthenticated = cookieToken?.value && cookieUser?.value;

    // Para rutas protegidas
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
        if (!isAuthenticated) {
            console.log('Access denied - Redirecting to auth');
            return NextResponse.redirect(new URL('/auth', request.url));
        }
    }

    // Para rutas de autenticación
    if (authRoutes.some(route => pathname.startsWith(route))) {
        if (isAuthenticated) {
            console.log('Already authenticated - Redirecting to profile');
            return NextResponse.redirect(new URL('/profile', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};