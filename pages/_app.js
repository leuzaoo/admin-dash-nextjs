import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

import { Roboto } from "next/font/google";
const roboto = Roboto({
  weight: ["100", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <main className={roboto.className}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  );
}
