import cloudinary from 'cloudinary'

import { cloudinaryConfig } from 'config'

cloudinary.v2.config({
  cloud_name: cloudinaryConfig.cloudName,
  api_key: cloudinaryConfig.apiKey,
  api_secret: cloudinaryConfig.apiSecret,
  secure: true
})

export default cloudinary
