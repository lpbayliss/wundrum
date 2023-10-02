import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { api } from "~/utils/api";
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";
import { getMessages } from "~/i18n/getMessages";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "~/theme/theme";

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
      <ChakraProvider resetCSS theme={theme}>
        <SessionProvider session={session}>
          {process.env.NODE_ENV !== "production" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
          <Component {...pageProps} />
        </SessionProvider>
      </ChakraProvider>
    </IntlProvider>
  );
};

export default api.withTRPC(MyApp);
