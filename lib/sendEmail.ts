import sendgrid from '@sendgrid/mail';
import { getSignupEmailTemplate } from './templates/welcome';
import { getAddPropertyTemplate } from './templates/propertyAdd';
import { getKycSuccessTemplate } from './templates/kycSuccess';
import { getResetEmailTemplate } from './templates/resetEmail';
import { getBookingTemplate } from './templates/booking';
import { getBookedTemplate } from './templates/Booked';
sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);


const FROM_EMAIL = process.env.SENDGRID_EMAIL!;

export const sendEmail = async (to: string, subject: string, html: string) => {
  const msg = {
    to,
    from: process.env.SENDGRID_EMAIL!, 
    subject,
    html, 
  };

  try {
    await sendgrid.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

export async function sendGreetingEmail(to: string, name: string) {
  const message = {
    to,
    from: FROM_EMAIL,
    subject: getSignupEmailTemplate(to).title,
    // text: `Hello ${name},\n\nThank you for signing up to PicksHero. We're excited to have you on board!`,
    html: getSignupEmailTemplate(to).template,
  };

  try {
    const response = await sendgrid.send(message);
    console.log("Greeting email sent successfully:", response);
  } catch (error) {
    console.error("Error sending greeting email:", error);
  }
}

export async function sendPropertyListEmail ( to:string) {
 const message = {
    to,
    from: FROM_EMAIL,
    subject: getAddPropertyTemplate().title,
    html: getAddPropertyTemplate().template,
  };

  try {
    const response = await sendgrid.send(message);
    console.log("email sent successfully:", response);
  } catch (error) {
    console.error("Error sending  email:", error);
  }
}


export async function sendKycSuccessEmail ( to:string) {
 const message = {
    to,
    from: FROM_EMAIL,
    subject: getKycSuccessTemplate().title,
    html: getKycSuccessTemplate().template,
  };

  try {
    const response = await sendgrid.send(message);
    console.log("email sent successfully:", response);
  } catch (error) {
    console.error("Error sending  email:", error);
  }
}


export async function sendResetEmail ( to:string,link:string) {
 const message = {
    to,
    from: FROM_EMAIL,
    subject: getResetEmailTemplate(link).title,
    html: getResetEmailTemplate(link).template,
  };

  try {
    const response = await sendgrid.send(message);
    console.log("email sent successfully:", response);
  } catch (error) {
    console.error("Error sending  email:", error);
  }
}


export async function sendBookingEmail ( to:string,  totalAmount:number, address:string, totalNights:string, rent: number, ownerEmail:string, checkIn:string, checkOut:string,name:string ) {
 const message = {
    to,
    from: FROM_EMAIL,
    subject: getBookingTemplate(totalAmount,address, totalNights, rent,ownerEmail, checkIn,checkOut, name ).title,
    html: getBookingTemplate(totalAmount,address, totalNights,rent,ownerEmail, checkIn,checkOut, name ).template,
  };

  try {
    const response = await sendgrid.send(message);
    console.log("email sent successfully:", response);
  } catch (error) {
    console.error("Error sending  email:", error);
  }
}
export async function sendBookedEmail ( to:string,  totalAmount:number, address:string, totalNights:string, rent: number, BookingPersonEmail:string, checkIn:string, checkOut:string, name:string ) {
 const message = {
    to,
    from: FROM_EMAIL,
    subject: getBookedTemplate(totalAmount,address, totalNights, rent, BookingPersonEmail,  checkIn,checkOut,name  ).title,
    html: getBookedTemplate(totalAmount,address, totalNights, rent, BookingPersonEmail,  checkIn,checkOut,name  ).template,
  };

  try {
    const response = await sendgrid.send(message);
    console.log("email sent successfully:", response);
  } catch (error) {
    console.error("Error sending  email:", error);
  }
}