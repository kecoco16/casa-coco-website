import { DefaultSeoProps } from 'next-seo'
const title = 'Casa Coco'
const description = 'Casa coco website.'
export const url = process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://casacoco.info'

const SEO: DefaultSeoProps = {
  titleTemplate: '%s | Casa Coco',
  title,
  description,
  canonical: url,
  openGraph: {
    type: 'website',
    locale: 'en',
    url,
    title,
    description,
    site_name: 'Casa Coco'
    // images: [
    //   {
    //     url: `${url}/images/preview-image.png`,
    //     alt: title,
    //   },
    // ],
  },
  twitter: {
    handle: 'Casa Coco',
    site: 'Casa Coco',
    cardType: 'summary_large_image'
  }
}

export default SEO
