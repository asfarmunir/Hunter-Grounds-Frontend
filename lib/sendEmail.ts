import sgMail from '@sendgrid/mail';

export const sendEmail = async (to: string, subject: string, html: string) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  const msg = {
    to,
    from: process.env.SENDGRID_EMAIL!, 
    subject,
    html, 
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
