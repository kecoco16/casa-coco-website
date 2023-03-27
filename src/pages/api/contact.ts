// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise'

import { routeUtils } from 'utils'
import { Header } from 'config/constants'
import { reCaptchaConfig, gCloudConfig, emailConfig } from 'config'

type Response = {
  message: string
}

const reCaptchaClient = new RecaptchaEnterpriseServiceClient({
  credentials: {
    client_email: gCloudConfig.clientEmail,
    private_key: gCloudConfig.privateKey
  }
})

const contact = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
): Promise<void> => {
  try {
    const query = req?.query
    const reCaptchaToken = routeUtils.getAsString(
      req?.headers?.[Header.RE_CAPTCHA_TOKEN]
    )

    const [assessment] = await reCaptchaClient.createAssessment({
      parent: reCaptchaClient.projectPath(gCloudConfig.projectId),
      assessment: {
        event: {
          token: reCaptchaToken,
          siteKey: reCaptchaConfig.key
        }
      }
    })

    const isReCaptchaTokenValid = assessment?.tokenProperties?.valid === true
    if (!isReCaptchaTokenValid) {
      return res.status(401).json({ message: 'Invalid re captcha token' })
    }

    const firstName = routeUtils.getAsString(query?.firstName)
    const lastName = routeUtils.getAsString(query?.lastName)
    const subject = routeUtils.getAsString(query?.subject)
    const body = routeUtils.getAsString(query?.body)
    const email = routeUtils.getAsString(query?.email)

    const transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      auth: {
        user: emailConfig.user,
        pass: emailConfig.password
      },
      secure: true
    })

    const emailResponse = await transporter.sendMail({
      from: emailConfig.user,
      to: emailConfig.to,
      subject: `Contact form: ${subject}`,
      text: `From: ${firstName} ${lastName}, with email ${email} just send you this message: ${body}`
    })

    if (emailResponse?.response) {
      res.status(200).json({ message: 'Email sended successfully' })
    } else {
      res.status(500).json({ message: 'failed to send email' })
    }
  } catch (e) {
    const error = e as Error
    res
      .status(500)
      .json({ message: `Interval server error: ${error?.message}` })
  }
}

export default contact
