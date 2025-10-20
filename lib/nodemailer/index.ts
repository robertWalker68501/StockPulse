import nodemailer from 'nodemailer';

import { WELCOME_EMAIL_TEMPLATE } from '@/lib/nodemailer/templates';

export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL!,
    pass: process.env.NODEMAILER_PASSWORD!,
  },
});

export const sendWelcomeEmail = async ({
  email,
  name,
  intro,
}: WelcomeEmailData) => {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace('{{name}}', name).replace(
    '{{intro}}',
    intro
  );

  const mailOptions = {
    from: `"StockPulse" <robert.walker6580@gmail.com>`,
    to: email,
    subject: 'Welcome to StockPulse - your stock market toolkit is ready!',
    text: 'Thanks for joining StockPulse',
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};
