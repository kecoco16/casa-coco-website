import type { NextPage, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'

import { routeUtils, i18nUtils } from 'utils'
import { Seo } from 'components'

const Gallery: NextPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Seo title={t('gallery') || ''} description={t('gallery') || ''} />

      <h1 className='text-center'>{t('gallery')}</h1>
    </>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const locale = routeUtils.getAsString(context.locale)
  const translations = await i18nUtils.getServerSideTranslations(locale)

  return {
    props: {
      ...translations
    }
  }
}

export default Gallery
