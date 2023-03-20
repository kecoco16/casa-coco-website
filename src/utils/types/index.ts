export type ImageProps = {
  id: number
  height: string
  width: string
  public_id: string
  format: string
  blurDataUrl?: string
}

export type SharedModalProps = {
  index: number
  images?: ImageProps[]
  currentPhoto?: ImageProps
  changePhotoId: (newVal: number) => void
  closeModal: () => void
  navigation: boolean
  direction?: number
}
