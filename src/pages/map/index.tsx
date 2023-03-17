import type { NextPage, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { GoogleMap } from '@react-google-maps/api'

import { routeUtils, i18nUtils } from 'utils'
import { mapsConfig } from 'config'
import { Seo } from 'components'

const Map: NextPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Seo title={t('map') || ''} description={t('map') || ''} />

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
