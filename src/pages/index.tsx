/* eslint-disable formatjs/no-literal-string-in-jsx */
import Head from "next/head";
import { FormattedMessage, useIntl } from "react-intl";
import Nav from "~/components/nav";

export default function Home() {
  const intl = useIntl();

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
      <main className="min-w-min p-16">
        <Nav />
        <section className="flex flex-col gap-8 pt-24">
          <h1 className="text-8xl font-semibold">
            <FormattedMessage id="COMING_SOON" />
          </h1>
        </section>
        <section className="flex flex-col gap-8 pl-16 pt-16">
          <div className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
            illo nisi doloremque rerum magni beatae? Beatae atque dolores,
            cupiditate voluptas, totam vel sed repellat iure ex esse sit maxime
            molestiae odit omnis doloribus alias, voluptatum nostrum! Modi
            laborum at voluptates in mollitia adipisci numquam, animi
            perferendis voluptatem exercitationem, laudantium tempore distinctio
            repellat quaerat dicta eum nam ea fugiat facilis, consequuntur
            aliquam.
          </div>
          <div className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
            illo nisi doloremque rerum magni beatae? Beatae atque dolores,
            cupiditate voluptas, totam vel sed repellat iure ex esse sit maxime
            molestiae odit omnis doloribus alias, voluptatum nostrum! Modi
            laborum at voluptates in mollitia adipisci numquam, animi
            perferendis voluptatem exercitationem, laudantium tempore distinctio
            repellat quaerat dicta eum nam ea fugiat facilis, consequuntur
            aliquam. Autem blanditiis harum nisi rem facilis molestias deserunt
            qui, dolor ex nam reprehenderit tempore error accusamus aspernatur
            magni quaerat similique dignissimos iste, possimus commodi! Error
            necessitatibus repellendus molestiae laborum explicabo, natus
            obcaecati aspernatur laboriosam repellat soluta nam itaque
            voluptates quos quis omnis ad iste. Deserunt labore earum ut saepe
            ipsum!
          </div>
          <div className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
            illo nisi doloremque rerum magni beatae? Beatae atque dolores,
            cupiditate voluptas, totam vel sed repellat iure ex esse sit maxime
            molestiae odit omnis doloribus alias, voluptatum nostrum! Modi
            laborum at voluptates in mollitia adipisci numquam, animi
            perferendis voluptatem exercitationem, laudantium tempore distinctio
            repellat quaerat dicta eum nam ea fugiat facilis, consequuntur
            aliquam. Error necessitatibus repellendus molestiae laborum
            explicabo, natus obcaecati aspernatur laboriosam repellat soluta nam
            itaque voluptates quos quis omnis ad iste. Deserunt labore earum ut
            saepe ipsum!
            aliquam. Error necessitatibus repellendus molestiae laborum
            explicabo, natus obcaecati aspernatur laboriosam repellat soluta nam
            itaque voluptates quos quis omnis ad iste. Deserunt labore earum ut
            saepe ipsum!
          </div>
        </section>
      </main>
    </>
  );
}
