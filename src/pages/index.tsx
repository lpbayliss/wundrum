import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import GoogleButton from "react-google-button";
import { FormattedMessage, useIntl } from "react-intl";

import { api } from "~/utils/api";

export default function Home() {
  const intl = useIntl();
  const { data: sessionData } = useSession();
  const hello = api.example.hello.useQuery({ text: "from Wundrum" });

  return (
    <>
      <Head>
        <title>{intl.formatMessage({ id: "APP_NAME" })}</title>
        <meta
          name="description"
          content={intl.formatMessage({ id: "APP_NAME" })}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-[hsl(280,100%,70%)] sm:text-[5rem]">
            <FormattedMessage id="APP_NAME" />
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <div className="flex flex-col items-center justify-center gap-4">
              {!sessionData ? (
                <GoogleButton onClick={() => void signIn("google")} />
              ) : (
                <button
                  className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                  onClick={() => void signOut()}
                >
                  <FormattedMessage id="SIGN_OUT" />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
