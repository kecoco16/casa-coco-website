import { NextComponentType } from 'next'
import { AppProps, AppContext, AppInitialProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import { DefaultSeo } from 'next-seo'
import { appWithTranslation } from 'next-i18next'
import '../styles/globals.css'

import { seoConfig, analyticsConfig } from 'config'

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps
}: AppProps) => {
  return (
    <>
      <DefaultSeo {...seoConfig} />

      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.trackingCode}`}
      />

      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${analyticsConfig.trackingCode}', {
              page_path: window.location.pathname,
            });
          `
        }}
      />

      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default appWithTranslation(MyApp)
