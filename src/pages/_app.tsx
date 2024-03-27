import AppShell from '@/components/layouts/AppShell'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
// import { SWRConfig } from 'swr'
import { SessionProvider } from 'next-auth/react'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={pageProps.session} basePath="http://localhost:3000/api/auth">
      <AppShell>
        {/* kalau mau static site generation, harus pake SWRConfig biar gak error */}
        {/* <SWRConfig 
          value={{
            refreshInterval: 3000,
            fetcher: (url: string) => fetch(url).then(res => res.json())
          }}
        > */}
          {/* <SWRConfig
            value={{
              dedupingInterval: 200, // will override the parent value since the value is primitive
              fallback: { a: 2, c: 2 }, // will merge with the parent value since the value is a mergeable object
            }}
          > */}
            <Component {...pageProps} />
          {/* </SWRConfig> */}
        {/* </SWRConfig> */}
      </AppShell>
    </SessionProvider>
  )
}