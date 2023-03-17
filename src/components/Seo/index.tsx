import { useRouter } from 'next/router'
import { NextSeo, NextSeoProps } from 'next-seo'

import { url } from 'config/seo'

const Seo: React.FC<NextSeoProps> = props => {
  const router = useRouter()
  const pathname = router?.pathname
  const href = `${url}${pathname}`
  const esHref = `${url}/es${pathname}`

  return (
    <NextSeo
      canonical={href}
      languageAlternates={[
        { hrefLang: 'en', href },
        { hrefLang: 'es', href: esHref }
      ]}
      {...props}
    />
  )
}

export default Seo
