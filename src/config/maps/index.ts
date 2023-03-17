const lat = Number(process.env.NEXT_PUBLIC_GOOGLE_MAPS_LAT || 9.938959)
const lng = Number(process.env.NEXT_PUBLIC_GOOGLE_MAPS_LNG || -84.476213)

const config = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  lat,
  lng,
  center: {
    lat,
    lng
  },
  containerStyle: {
    width: '400px',
    height: '400px'
  }
}

export default config
