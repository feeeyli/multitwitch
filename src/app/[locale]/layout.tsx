import { UpdateHandler } from "@/components/update-handler";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LocaleProviders } from "./providers";

// Can be imported from a shared config
const locales = ["en", "pt", "es", "fr"];

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Suspense fallback={null}>
        <UpdateHandler />
      </Suspense>
      <LocaleProviders>
        <div lang={locale}>{children}</div>
      </LocaleProviders>
    </NextIntlClientProvider>
  );
}
