import type { NextPage, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import { GoogleMap } from '@react-google-maps/api'

import { routeUtils, i18nUtils } from 'utils'
import { mapsConfig } from 'config'

const Map: NextPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <NextSeo title={t('map') || ''} description={t('map') || ''} />

      <div className='flex flex-col items-center'>
        <h1 className='text-center mb-2'>{t('map')}</h1>
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

export default Map
