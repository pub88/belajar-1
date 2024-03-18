import AppShell from '@/components/layouts/AppShell'
import Navbar from '@/components/layouts/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppShell>
      <SWRConfig 
        value={{
          refreshInterval: 3000,
          fetcher: (url: string) => fetch(url).then(res => res.json())
        }}
      >
        <SWRConfig
          value={{
            dedupingInterval: 200, // will override the parent value since the value is primitive
            fallback: { a: 2, c: 2 }, // will merge with the parent value since the value is a mergeable object
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </SWRConfig>
    </AppShell>
  )
}