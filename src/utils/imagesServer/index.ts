import imagemin from 'imagemin'
import imageminJpegtran from 'imagemin-jpegtran'
import cloudinary from 'lib/cloudinary'

import { ImageProps } from '../types'
import { cloudinaryConfig } from 'config'

const cache = new Map<ImageProps, string>()

export const getBase64ImageUrl = async (image: ImageProps): Promise<string> => {
  const cachedUrl = cache.get(image)
  if (cachedUrl) {
    return cachedUrl
  }

  const response = await fetch(
    `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/f_jpg,w_8,q_70/${image.public_id}.${image.format}`
  )
  const buffer = await response.arrayBuffer()
  const minified = await imagemin.buffer(Buffer.from(buffer), {
    plugins: [imageminJpegtran()]
  })

  const url = `data:image/jpeg;base64,${Buffer.from(minified).toString(
    'base64'
  )}`
  cache.set(image, url)
  return url
}

type CachedResults = {
  resources: ImageProps[]
}

let cachedResults: CachedResults

export const getCachedImageResults = async (): Promise<CachedResults> => {
  if (!cachedResults) {
    const fetchedResults = await cloudinary.v2.search
      .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
      .sort_by('public_id', 'desc')
      .max_results(400)
      .execute()

    cachedResults = fetchedResults
  }

  return cachedResults
}

const imageUtils = {
  getBase64ImageUrl
}

export default imageUtils
