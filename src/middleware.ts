import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const defaultLocale = request.headers.get("x-your-custom-locale") || "pt";

  const handleI18nRouting = createIntlMiddleware({
    locales: ["pt", "en", "es", "fr"],
    defaultLocale,
  });
  const response = handleI18nRouting(request);

  response.headers.set("x-your-custom-locale", defaultLocale);

  return response;
}

export const config = {
  matcher: ["/(pt|en|es|fr)", "/(pt|en|es|fr)/:path*"],
};
