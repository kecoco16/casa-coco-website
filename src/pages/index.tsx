import type { NextPage, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import { routeUtils, i18nUtils } from 'utils'
import BgImage from '../../public/images/bg.png'

const Home: NextPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <NextSeo title={t('home') || ''} description={t('home') || ''} />

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

        <div className='z-20 relative h-full flex flex-1 flex-col justify-center items-center'>
          <a
            target='_blank'
            href='https://airbnb.com/h/cerro-chompipe'
            className='text-white bg-blue-600 hover:bg-blue-700 focus:ring-1 focus:ring-blue-800 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2'
          >
            {t('book')}
          </a>
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
