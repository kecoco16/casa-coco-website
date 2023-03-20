import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { i18nUtils } from 'utils'
import { Seo, GalleryCarousel } from 'components'
import { getAsString } from 'utils/route'
import { getBase64ImageUrl, getCachedImageResults } from 'utils/imagesServer'
import cloudinary from 'lib/cloudinary'

import type { ImageProps } from '../../utils/types'
import { cloudinaryConfig } from 'config'

type ImagePageProps = {
  currentPhoto: ImageProps
}

const Image: NextPage<ImagePageProps> = ({ currentPhoto }: ImagePageProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const query = router.query
  const index = Number(getAsString(query?.photoId) || 0)
  const currentPhotoUrl = `https://res.cloudinary.com/${cloudinaryConfig?.cloudName}/image/upload/c_scale,w_2560/${currentPhoto?.public_id}.${currentPhoto?.format}`
  console.log('currentPhotoUrl ==', currentPhotoUrl)
  return (
    <>
      <Seo
        title={t('image') || ''}
        description={t('image') || ''}
        openGraph={{
          images: [{ url: currentPhotoUrl }]
        }}
      />

      <div className='mx-auto max-w-[1960px] p-4'>
        <h1 className='text-center'>{t('image')}</h1>
        <GalleryCarousel currentPhoto={currentPhoto} index={index} />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const locale = getAsString(context.locale)
  const translations = await i18nUtils.getServerSideTranslations(locale)
  const imageResults = await getCachedImageResults()
  const photoId = Number(getAsString(context?.params?.photoId) || 0)
  const imageResources = imageResults.resources
  const currentPhoto = imageResources
    ?.map((resource, index) => ({
      id: index,
      height: resource.height,
      width: resource.width,
      public_id: resource.public_id,
      format: resource.format,
      blurDataUrl: ''
    }))
    ?.find(img => img.id === photoId)

  if (currentPhoto) {
    currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto)
  }

  return {
    props: {
      ...translations,
      currentPhoto: currentPhoto
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const results = await cloudinary.v2.search
    .expression(`folder:${cloudinaryConfig.folder}/*`)
    .sort_by('public_id', 'desc')
    .max_results(400)
    .execute()

  const fullPaths = []
  for (let i = 0; i < results.resources.length; i++) {
    fullPaths.push({ params: { photoId: i.toString() } })
  }

  return {
    paths: fullPaths,
    fallback: false
  }
}

export default Image
