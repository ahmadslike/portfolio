import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Exclude `icon` (from src/app/icon.tsx): it's a root, extensionless,
  // non-locale metadata route, so it must bypass locale prefixing.
  // opengraph-image lives under src/app/[locale]/ and stays locale-prefixed,
  // so it is intentionally NOT excluded here.
  matcher: ["/((?!api|trpc|_next|_vercel|icon|.*\\..*).*)"],
};
