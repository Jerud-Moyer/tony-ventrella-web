import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

type Data = {
  name: string,
  email: string,
  message: string,
  subject: string
}

type Mail = {
  subject: string,
  from: string,
  to: string,
  text: string
}

type MailerResponse = {
  ok: boolean,
  response: string
}

const mailHost = process.env.EMAIL_HOST as string
const mailPort = process.env.EMAIL_PORT
const reciever = process.env.EMAIL_RECIEVER as string
const emailUser = process.env.EMAIL_USER as string
const password = process.env.EMAIL_PASSWORD as string

const sendMail = (reqBody: Data) => {
  const {
    name,
    email,
    message,
    subject
  } = reqBody

  const content = `name: ${name} \nemail: ${email} \n\nmessage: ${message}`

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: emailUser,
      pass: password
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  transporter.verify((error: Error) => {
    if(error) console.log(error);
    else console.log('Server is ready to take our messages');
  })

  const mail = {
    subject,
    from: emailUser,
    to: reciever,
    text: content
  }

  const send = async(message: Mail) => {
    return await transporter.sendMail(message)
  }

  const mailerResponse = send(mail)

  return mailerResponse
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MailerResponse>
  
) {
  const mailResponse = await sendMail(req.body)
  let isOk = false
  if(mailResponse.accepted.length) {
    isOk = true
  }
  res.status(200).json({ 
    ok: isOk, 
    response: 'Sent the Email!' 
  })
}
