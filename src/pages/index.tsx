import type { NextPage, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'

import { routeUtils, i18nUtils } from 'utils'

const Home: NextPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <NextSeo title={t('home')} description={t('home')} />

      <main className='min-h-screen	p-4 flex flex-1 flex-col justify-center items-center'>
        <h1 className='text-center text-5xl'>
          {t('welcomeTo', { appName: 'Timber Trader!' })}
        </h1>
      </main>
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

export default Home
