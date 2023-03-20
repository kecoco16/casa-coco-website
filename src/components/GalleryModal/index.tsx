import { useCallback, useRef, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import useKeypress from 'react-use-keypress'

import Gallery from '../Gallery'
import { ImageProps } from 'utils/types'
import { getAsString } from 'utils/route'

type GalleryModalProps = {
  images: ImageProps[]
  onClose?: () => void
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  images,
  onClose
}: GalleryModalProps) => {
  const overlayRef = useRef(null)
  const router = useRouter()
  const index = Number(getAsString(router.query?.photoId))
  const [direction, setDirection] = useState(0)
  const [curIndex, setCurIndex] = useState(index)

  const handleClose = useCallback(() => {
    router.push('/gallery', undefined, { shallow: true })
    onClose?.()
  }, [router, onClose])

  const changePhotoId = useCallback(
    (newVal: number) => {
      if (newVal > index) {
        setDirection(1)
      } else {
        setDirection(-1)
      }
      setCurIndex(newVal)
      router.push(
        {
          query: { photoId: newVal }
        },
        `/gallery/${newVal}`,
        { shallow: true }
      )
    },
    [index, router]
  )

  useKeypress('ArrowRight', () => {
    if (index + 1 < images.length) {
      changePhotoId(index + 1)
    }
  })

  useKeypress('ArrowLeft', () => {
    if (index > 0) {
      changePhotoId(index - 1)
    }
  })

  return (
    <Dialog
      static
      open={true}
      onClose={handleClose}
      initialFocus={overlayRef}
      className='fixed inset-0 z-10 flex items-center justify-center'
    >
      <Dialog.Overlay
        ref={overlayRef}
        as={motion.div}
        key='backdrop'
        className='fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <Gallery
        index={curIndex}
        direction={direction}
        images={images}
        changePhotoId={changePhotoId}
        closeModal={handleClose}
        navigation={true}
      />
    </Dialog>
  )
}

export default GalleryModal
