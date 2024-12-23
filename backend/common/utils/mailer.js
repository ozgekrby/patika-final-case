import nodemailer from 'nodemailer';
import appConfig from '../config/app.config.js'

const transporterGmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: appConfig.mailer_auth_user,
    pass: appConfig.mailer_auth_password,
  },
})

const sendMail = async (receiverEmail, subject, body) => {
  await transporterGmail.sendMail({
    from: appConfig.mailer_auth_user,
    to: receiverEmail,
    subject: subject,
    html: body
  })
}

export {
  sendMail
}