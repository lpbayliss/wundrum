import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";
import { getMessages } from "~/i18n/getMessages";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { locale } = useRouter();

  return (
    <IntlProvider
      locale={String(locale)}
      messages={getMessages(String(locale))}
    >
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </IntlProvider>
  );
};

export default api.withTRPC(MyApp);
