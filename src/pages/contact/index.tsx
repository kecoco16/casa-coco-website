import { useState } from 'react'
import type { NextPage, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

import { routeUtils, i18nUtils } from 'utils'
import { getContactUrl } from 'utils/url'
import { useFetch } from 'hooks'
import { Seo, TextField, Button } from 'components'
import { contactSchema } from 'schemas'
import { ContactFormType } from 'schemas/contact'
import { Header } from 'config/constants'

const Contact: NextPage = () => {
  const { t } = useTranslation()
  const [emailSended, setEmailSended] = useState(false)
  const { executeRecaptcha } = useGoogleReCaptcha()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormType>({
    resolver: yupResolver(contactSchema.schema)
  })
  const { fetch, loading, error } = useFetch({
    onCompleted: () => {
      reset()
      setEmailSended(true)
    }
  })

  const onSubmit = handleSubmit(async data => {
    try {
      if (loading) {
        return
      }

      setEmailSended(false)
      const reCaptchaToken = await executeRecaptcha?.('submit')
      if (!reCaptchaToken) {
        return
      }

      const contactUrl = getContactUrl(data)

      await fetch(contactUrl, {
        headers: {
          [Header.RE_CAPTCHA_TOKEN]: reCaptchaToken
        }
      })
    } catch (e) {
      const error = e as Error
      console.error(error?.message)
    }
  })

  return (
    <>
      <Seo title={t('contact') || ''} description={t('contact') || ''} />

      <form onSubmit={onSubmit}>
        <div className='container mx-auto p-2'>
          <h1 className='text-center text-2xl mb-4'>{t('contact')}</h1>
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
            placeholder={t('subject') as string}
            error={t(errors?.['subject']?.message || '') as string}
            name='subject'
            register={register}
          />

          <TextField
            label={t('body')}
            placeholder={t('message') as string}
            error={t(errors?.['body']?.message || '') as string}
            name='body'
            register={register}
            textarea
          />

          {error ? <p className='text-sm text-red-600 mb-2'>{error}</p> : null}

          {emailSended ? (
            <p className='text-sm text-green-600 mb-2'>
              {t('emailSendedMessage')}
            </p>
          ) : null}

          <Button type='submit' disabled={loading} loading={loading}>
            {t('send') as string}
          </Button>
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
