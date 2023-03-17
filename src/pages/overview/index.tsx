import type { NextPage, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'

import { routeUtils, i18nUtils } from 'utils'
import { Seo } from 'components'

const Overview: NextPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Seo title={t('overview') || ''} description={t('overview') || ''} />

      <h1 className='text-center'>{t('overview')}</h1>
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

export default Overview
