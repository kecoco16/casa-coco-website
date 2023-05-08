import type { NextPage, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { GoogleMap } from '@react-google-maps/api'

import { routeUtils, i18nUtils } from 'utils'
import { Seo } from 'components'
import { mapsConfig } from 'config'

const Overview: NextPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Seo
        title={t('overviewSEOTitle') || ''}
        description={t('overviewSEODescription') || ''}
      />

      <div className='flex flex-col items-center'>
        <h1 className='text-center'>{t('overview')}</h1>

        <a
          target='_blank'
          href='https://airbnb.com/h/cerro-chompipe'
          className='text-white bg-blue-600 hover:bg-blue-700 focus:ring-1 focus:ring-blue-800 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2'
        >
          {t('book')}
        </a>

        <GoogleMap
          mapContainerStyle={mapsConfig.containerStyle}
          center={mapsConfig.center}
          zoom={19}
          mapTypeId='satellite'
        />
      </div>
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
