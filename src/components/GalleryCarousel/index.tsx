import { useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useKeypress from 'react-use-keypress'

import { useGlobal } from 'context/global'
import Gallery from '../Gallery'
import { ImageProps } from 'utils/types'

type GalleryCarouselProps = {
  index: number
  currentPhoto: ImageProps
}

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({
  index,
  currentPhoto
}: GalleryCarouselProps) => {
  const router = useRouter()
  const { setLastViewedPhoto } = useGlobal()

  const closeModal = useCallback(() => {
    setLastViewedPhoto(currentPhoto?.id || null)
    router.push('/gallery', undefined, { shallow: true })
  }, [setLastViewedPhoto, currentPhoto, router])

  const changePhotoId = useCallback((newVal: number) => {
    return newVal
  }, [])

  useKeypress('Escape', () => {
    closeModal()
  })

  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <button
        className='absolute inset-0 z-30 cursor-default bg-black backdrop-blur-2xl'
        onClick={closeModal}
      >
        {currentPhoto?.blurDataUrl ? (
          <Image
            src={currentPhoto.blurDataUrl}
            className='pointer-events-none h-full w-full'
            alt='blurred background'
            fill
            priority={true}
          />
        ) : null}
      </button>
      <Gallery
        index={index}
        changePhotoId={changePhotoId}
        currentPhoto={currentPhoto}
        closeModal={closeModal}
        navigation={false}
      />
    </div>
  )
}

export default GalleryCarousel
