import { DefaultSeoProps } from 'next-seo'
const title = 'Timber Trader'
const description = 'Timber Trader website.'
const url = 'https://timbertrader.app'

const SEO: DefaultSeoProps = {
  titleTemplate: 'Timber Trader | %s',
  title,
  description,
  canonical: url,
  openGraph: {
    type: 'website',
    locale: 'en',
    url,
    title,
    description,
    site_name: 'Timber Trader'
    // images: [
    //   {
    //     url: `${url}/images/preview-image.png`,
    //     alt: title,
    //   },
    // ],
  },
  twitter: {
    handle: 'Timber Trader',
    site: 'Timber Trader',
    cardType: 'summary_large_image'
  }
}

export default SEO
