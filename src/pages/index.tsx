import type { NextPage, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import { routeUtils, i18nUtils } from 'utils'
import Logo from '../../public/logo.png'
import BgImage from '../../public/images/bg.png'

const Home: NextPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <NextSeo title={t('home')} description={t('home')} />

      <div className='relative'>
        <div className='z-10'>
          <Image
            src={BgImage}
            alt='Header'
            layout='fill'
            objectFit='cover'
            placeholder='blur'
          />
        </div>

        <div className='z-20 relative h-[90vh] p-4 flex flex-1 flex-col justify-center items-center'>
          <h1 className='text-white	text-center text-5xl mb-10'>
            {t('welcomeTo', { appName: '' })}
          </h1>
          <Image alt='Logo' src={Logo} />
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
