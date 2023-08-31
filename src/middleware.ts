//Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(request: NextRequestWithAuth) {
//     //augments your 'request' with user's token
//     console.log(request.nextUrl.pathname);
//     console.log(request.nextauth.token);

//     if (
//       request.nextUrl.pathname.startsWith("/extra") &&
//       request.nextauth.token?.role !== "admin"
//     ) {
//       return NextResponse.rewrite(new URL("/denied", request.url));
//     }

//     else if (
//         request.nextUrl.pathname.startsWith("/client") &&
//         request.nextauth.token?.role !== "admin" &&
//         request.nextauth.token?.role !== "manager"
//     ) {
//       return NextResponse.rewrite(new URL("/denied", request.url));
//     }
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//   }
// );


import acceptLanguage from "accept-language";
import { fallbackLng, languages } from "./app/i18n/setting";

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

const cookieName = 'i18next';

export function middleware(req: any) {
    let lng
    if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName).value)
    if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
    if (!lng) lng = fallbackLng
  
    // Redirect if lng in path is not supported
    if (
      !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
      !req.nextUrl.pathname.startsWith('/_next')
    ) {
      return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
    }
  
    if (req.headers.has('referer')) {
      const refererUrl = new URL(req.headers.get('referer'))
      const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
      const response = NextResponse.next()
      if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
      return response
    }
  
    return NextResponse.next()
  }

// Without a defined matcher, this one line applies next-auth
// to the entire project
export { default } from "next-auth/middleware";

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// export const config = { matcher: ["/extra", "/dashboard","/client"] };

