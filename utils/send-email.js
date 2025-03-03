const nodemailer = require('nodemailer')

const sendEmail = async options => {
   // 1) create a  transporter  to send the eamil
   const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
         user: process.env.EMAIL_USERNAME,
         pass: process.env.EMAIL_PASSWORD
      }
      //ACTIVATE LESS SECURE  APP OPTION IN GEMAIL 
   })
   // 2)  Define the email options.....
   const emailOption = {
      from: 'farman khan <testing@node.io>',
      to: options.email,
      subject: options.subject,
      text: options.message,

   }
   // 3) Accutily send the email......
   await transporter.sendMail(emailOption)
}

module.exports = sendEmail