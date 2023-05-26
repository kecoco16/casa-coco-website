import type { NextPage, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import { routeUtils, i18nUtils } from 'utils'
import { Seo } from 'components'
import BgImage from '../../public/images/bg.png'

const Home: NextPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Seo
        title={t('homeSEOTitle') || ''}
        description={t('homeSEODescription') || ''}
      />

      <div className='relative h-[90vh]'>
        <div className='z-10'>
          <Image
            src={BgImage}
            alt='Header'
            fill
            className='object-cover'
            placeholder='blur'
          />
        </div>

        <div className='z-20 relative h-full flex flex-1 flex-col justify-center items-center px-2'>
          <h1 className='text-white text-4xl'>
            <a
              target='_blank'
              href='https://airbnb.com/h/cerro-chompipe'
              className='bg-blue-600 hover:bg-blue-700 focus:ring-1 focus:ring-blue-800'
            >
              {t('book')}
            </a>
          </h1>
        </div>
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

export default Home
