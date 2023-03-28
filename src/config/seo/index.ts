import { DefaultSeoProps } from 'next-seo'
const title = 'Casa Coco'
const description = 'Vacation rental home in Costa Rica'
export const url = process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://casacoco.info'

const SEO: DefaultSeoProps = {
  titleTemplate: '%s | Casa Coco',
  title,
  description,
  canonical: url,
  openGraph: {
    siteName: 'casacoco',
    type: 'website',
    locale: 'en',
    url,
    title,
    description,
    site_name: 'Casa Coco',
    images: [
      {
        url: `${url}/images/bg.png`,
        alt: title
      },
      {
        url: `${url}/images/logo.png`,
        alt: `${title} logo`
      }
    ]
  },
  twitter: {
    handle: 'Casa Coco',
    site: 'Casa Coco',
    cardType: 'summary_large_image'
  }
}

export default SEO
