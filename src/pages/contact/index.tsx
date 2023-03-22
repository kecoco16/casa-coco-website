import type { NextPage, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Bars3Icon } from '@heroicons/react/24/outline'

import { routeUtils, i18nUtils } from 'utils'
import { Seo, TextField, Button } from 'components'
import { contactSchema } from 'schemas'
import { ContactFormType } from 'schemas/contact'

const Contact: NextPage = () => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ContactFormType>({
    resolver: yupResolver(contactSchema.schema)
  })

  const onSubmit = handleSubmit(data => {
    console.log('data ====', data)
  })

  return (
    <>
      <Seo title={t('contact') || ''} description={t('contact') || ''} />

      <form onSubmit={onSubmit}>
        <div className='container mx-auto p-2'>
          <h1 className='text-center'>{t('contact')}</h1>
          <TextField
            label={t('firstName')}
            placeholder='Kevin'
            error={t(errors?.['firstName']?.message || '') as string}
            name='firstName'
            register={register}
          />

          <TextField
            label={t('lastName')}
            placeholder='Castillo'
            error={t(errors?.['lastName']?.message || '') as string}
            name='lastName'
            register={register}
          />

          <TextField
            label={t('email')}
            placeholder='contact@casacoco.info'
            error={t(errors?.['email']?.message || '') as string}
            name='email'
            register={register}
          />

          <TextField
            label={t('subject')}
            placeholder='Info'
            error={t(errors?.['subject']?.message || '') as string}
            name='subject'
            register={register}
          />

          <TextField
            label={t('body')}
            placeholder='Message'
            error={t(errors?.['body']?.message || '') as string}
            name='body'
            register={register}
            textarea
          />

          <Button type='submit'>{t('send') as string}</Button>
        </div>
      </form>
    </>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const locale = routeUtils.getAsString(context.locale)
  const translations = await i18nUtils.getServerSideTranslations(locale)

  return {
    props: {
      ...translations
    }
  }
}

export default Contact
