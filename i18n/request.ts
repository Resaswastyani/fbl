import { getRequestConfig } from "next-intl/server";
import { routing } from "@/i18n/routing";

export default getRequestConfig(async ({ locale }) => {
  const messages = (await import(`../../messages/${locale}.json`)).default;
  return { messages };
});
