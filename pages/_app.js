import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

import { Inter } from "next/font/google";
const inter = Inter({
  weight: ["100", "300", "400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <main className={inter.className}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  );
}
