import { FormattedMessage } from "react-intl";
import { ModeToggle } from "./ui/toggle-mode";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "~/components/ui/button";
import Link from "next/link";
import NavMenu from "./nav-menu";

const Nav = () => {
  const { data: sessionData } = useSession();

  return (
    <header>
      <nav>
        <ul className="flex items-center justify-between">
          <li>
            <ul className="flex items-center gap-4">
              <li>
                <Link
                  href=""
                  className="text-5xl font-extrabold tracking-tight text-[hsl(280,100%,70%)]"
                >
                  <FormattedMessage id="APP_NAME" />
                </Link>
              </li>
              <li className="mt-auto">
                <NavMenu />
              </li>
            </ul>
          </li>
          <li>
            <ul className="flex items-center gap-4">
              <li>
                {!sessionData ? (
                  <Button
                    variant="default"
                    onClick={() => void signIn("google")}
                  >
                    <FormattedMessage id="SIGN_IN" />
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => void signOut()}>
                    <FormattedMessage id="SIGN_OUT" />
                  </Button>
                )}
              </li>
              <li>
                <ModeToggle />
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
