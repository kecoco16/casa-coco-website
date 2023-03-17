import type { NextPage, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'

import { routeUtils, i18nUtils } from 'utils'
import { Seo } from 'components'

const Contact: NextPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Seo title={t('contact') || ''} description={t('contact') || ''} />

      <h1 className='text-center'>{t('contact')}</h1>
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

export default Contact
