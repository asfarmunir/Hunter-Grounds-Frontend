
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import User from '@/database/user.modal';
import { connectToDatabase } from '@/database';
import { sendEmail } from '@/lib/sendgrid';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
      await connectToDatabase();
    // Check if the user exists in the database
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1-hour expiration

    // Update the user's reset token and expiry
    
    await User
      .findOneAndUpdate(
        { email: email },
        {
          resetToken: resetToken,
          resetTokenExpiry: resetTokenExpiry,
        },
        { new: true }
      )
      .exec();
      const userId = user._id.toString();
    // Generate the password reset link (fallback link)
    const resetLink = `${process.env.APP_URL}/reset-password/${userId}?token=${resetToken}`;

    console.log("🚀 ~ POST ~ resetLink:", resetLink)
    // Send the email with the reset link
      await sendEmail(email, "Password Reset", resetLink);  

    return NextResponse.json({ message: 'Reset email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending reset email:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
