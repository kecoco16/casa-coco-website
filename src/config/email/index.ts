const config = {
  host: process.env.EMAIL_HOST || '',
  port: Number(process.env.EMAIL_PORT || 465),
  user: process.env.EMAIL_USER || '',
  password: process.env.EMAIL_PASSWORD || '',
  to: process.env.EMAIL_TO || ''
}

export default config
