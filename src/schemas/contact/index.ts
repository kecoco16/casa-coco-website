import * as yup from 'yup'

export type ContactFormType = {
  firstName: string
  lastName: string
  email: string
  subject: string
  body: string
}

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  body: ''
}

const schema = yup.object().shape({
  firstName: yup.string().required('requiredField'),
  lastName: yup.string().required('requiredField'),
  email: yup.string().email('invalidEmail').required('requiredField'),
  subject: yup.string().required('requiredField'),
  body: yup.string().required('requiredField')
})

const contactSchema = {
  defaultValues,
  schema
}

export default contactSchema
