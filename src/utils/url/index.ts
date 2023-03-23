import { ContactFormType } from 'schemas/contact'

export const getContactUrl = ({
  firstName,
  lastName,
  subject,
  body,
  email
}: ContactFormType): string =>
  `/api/contact/?firstName=${firstName}&lastName=${lastName}&subject=${subject}&body=${body}&email=${email}`

const routeUtils = {
  getContactUrl
}

export default routeUtils
