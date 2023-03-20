import { useRef, useEffect } from 'react'
import type { NextPage, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import { i18nUtils } from 'utils'
import { getBase64ImageUrl } from 'utils/imagesServer'
import { getAsString } from 'utils/route'
import { Seo, GalleryModal } from 'components'
import cloudinary from 'lib/cloudinary'
import { cloudinaryConfig } from 'config'
import { ImageProps } from 'utils/types'
import { useGlobal } from 'context/global'

type GalleryProps = {
  images: ImageProps[]
}

const Gallery: NextPage<GalleryProps> = ({ images }: GalleryProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const query = router.query
  const photoId = getAsString(query?.photoId)
  const { lastViewedPhoto, setLastViewedPhoto } = useGlobal()
  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef?.current?.scrollIntoView?.({ block: 'center' })
      setLastViewedPhoto(null)
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto])

  return (
    <>
      <Seo title={t('gallery') || ''} description={t('gallery') || ''} />

      <div className='mx-auto max-w-[1960px] p-4'>
        {photoId ? (
          <GalleryModal
            images={images}
            onClose={() => {
              setLastViewedPhoto(Number(photoId))
            }}
          />
        ) : null}
        <div className='columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4'>
          {images.map(({ id, public_id, format, blurDataUrl }) => (
            <Link
              key={id}
              href={`gallery/?photoId=${id}`}
              as={`/gallery/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow={true}
              className='after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight'
            >
              <Image
                alt='Casa Coco photo'
                className='transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110'
                style={{ transform: 'translate3d(0, 0, 0)' }}
                placeholder='blur'
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/c_scale,w_720/${public_id}.${format}`}
                width={720}
                height={480}
                sizes='(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw'
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const locale = getAsString(context.locale)
  const translations = await i18nUtils.getServerSideTranslations(locale)
  const imageResults = await cloudinary.v2.search
    .expression(`folder:${cloudinaryConfig.folder}/*`)
    .sort_by('public_id', 'desc')
    .max_results(400)
    .execute()
  const imageResources = imageResults.resources as ImageProps[]
  const blurImagePromises = imageResources?.map(image =>
    getBase64ImageUrl(image)
  )
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)
  const reducedResults: ImageProps[] = imageResources?.map(
    (resource, index) => ({
      id: index,
      height: resource.height,
      width: resource.width,
      public_id: resource.public_id,
      format: resource.format,
      blurDataUrl: imagesWithBlurDataUrls?.[index]
    })
  )

  return {
    props: {
      ...translations,
      images: reducedResults
    }
  }
}

export default Gallery
