const config = {
  projectId: process.env.G_CLOUD_PROJECT_ID || '',
  clientEmail: process.env.G_CLOUD_CLIENT_EMAIL || '',
  privateKey: process.env.G_CLOUD_PRIVATE_KEY?.replace(/\\n/gm, '\n') || ''
}

export default config
