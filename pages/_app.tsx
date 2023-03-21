import '@/styles/globals.scss';
import type {AppProps} from 'next/app';
import Header from "@/components/Header/Header";
import '@/styles/reset.css';
import {Inter} from "next/font/google";

const inter = Inter({ subsets: ['latin'] })

export default function App({Component, pageProps}: AppProps) {
    return <main className={inter.className}>
      <Header />
      <Component {...pageProps} />
    </main>
}
