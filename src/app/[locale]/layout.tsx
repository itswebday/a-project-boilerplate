import { NavBarNavMenu } from "@/components/server";
import { NavMenuProvider } from "@/contexts";
import { routing } from "@/i18n";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <html lang={locale}>
        <head>
          <link href="/favicon.ico" rel="icon" sizes="32x32" />
          <link href="/icon.svg" rel="icon" type="image/svg+xml" />
          <link href="/apple-touch-icon.png" rel="apple-touch-icon" />
        </head>

        <body className="text-medium font-poppins">
          <NavMenuProvider>
            <NavBarNavMenu />
            {children}
          </NavMenuProvider>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover={true}
            limit={1}
            style={{
              width: "22rem",
              padding: "1.2rem",
              margin: "1rem",
              borderRadius: "0.5rem",
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.9rem",
              fontWeight: "500",
            }}
          />
        </body>
      </html>
    </NextIntlClientProvider>
  );
};

export default HomeLayout;
