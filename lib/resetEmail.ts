import sgMail from '@sendgrid/mail';

export const resetEmail = async (to:string, subject:string, text :string) => {

  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  const msg = {
    to,
    from: process.env.SENDGRID_EMAIL!,
    subject,
    html: `<p>You requested a password reset. Click <a href="${text}">here</a> to reset your password.</p>`,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(error);
  }
};