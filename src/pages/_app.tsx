import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";
import { getMessages } from "~/i18n/getMessages";
import { ThemeProvider } from "~/components/theme-provider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { locale } = useRouter();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <IntlProvider
        locale={String(locale)}
        messages={getMessages(String(locale))}
      >
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </IntlProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
