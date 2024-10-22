"use server";
import Payout from "@/database/payout.model";
import { connectToDatabase } from "..";
import User from "../user.modal";
import { revalidatePath } from 'next/cache';
import { sendEmail } from "@/lib/sendEmail"; 

export const createPayout = async (data: any, path: string) => {
    try {
        await connectToDatabase();

        const user = await User.findById(data.user);
        if (!user) {
            return JSON.parse(JSON.stringify({ status: 404, message: "User not found" }));
        }

        // Check the type (booking or referral)
        let availableAmount = 0;
        if (data.type === "booking") {
            availableAmount = user.withdrawableAmount; // Check booking withdrawable amount
        } else if (data.type === "referal") {
            availableAmount = user.referalWithdrawableAmount; // Check referral withdrawable amount
        } else {
            return JSON.parse(JSON.stringify({ status: 400, message: "Invalid payout type" }));
        }

        // Ensure the user has enough available funds for the payout
        if (data.amount * 100 > availableAmount) {
            return JSON.parse(JSON.stringify({ status: 400, message: "Insufficient withdrawable amount" }));
        }

        // Create the payout
        const payout = new Payout({
            user: data.user,
            amount: data.amount,
            accountEmail: data.accountEmail,
            type: data.type // Store the type of payout (booking/referral)
        });

        await payout.save();

        // Deduct the payout amount based on the type
        if (data.type === "booking") {
            user.withdrawableAmount -= data.amount * 100;
        } else if (data.type === "referal") {
            user.referalWithdrawableAmount -= data.amount * 100;
        }

        await user.save();

        // Revalidate the dashboard path after payout creation
        revalidatePath(path);

        // Send a confirmation email
        const emailSubject = `Payout Confirmation - ${data.type} Payment`;
        const emailBody = generateEmailTemplate(user.firstname, data.amount, data.type);
        await sendEmail( 
            user.email  , emailSubject, emailBody);

        return JSON.parse(JSON.stringify({ status: 200 }));
    } catch (error) {
        console.error("Error creating payout", error);
        return JSON.parse(JSON.stringify({ status: 400, message: "Error creating payout" }));
    }
};


// Function to generate the email template
const generateEmailTemplate = (userName: string, amount: number, type: string) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7f7f7;">
        <div style="max-width: 600px; margin: auto; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2c3e50; text-align: center;">Payout Confirmation</h2>
            <p>Hi ${userName},</p>
            <p>We are pleased to inform you that your payout of <strong>$${(amount).toFixed(2)}</strong> for the <strong>${type}</strong> has been successfully processed.</p>
            <p>Details of the payout:</p>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Payout Type</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${type}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Amount</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">$${(amount).toFixed(2)}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Date</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleDateString()}</td>
                </tr>
            </table>
            <p>If you have any questions, feel free to reply to this email or contact our support team.</p>
            <p>Thank you for using our platform!</p>
            <p style="color: #95a5a6;">Best regards,<br>The Support Team</p>
            <div style="text-align: center; margin-top: 20px;">
                <a href="#" style="text-decoration: none; background-color: #3498db; color: white; padding: 10px 20px; border-radius: 5px;">Visit Dashboard</a>
            </div>
        </div>
    </div>
  `;
};

export const handleRejectedPayouts = async () => {
  try {
    // Find all rejected payouts
    const rejectedPayouts = await Payout.find({ status: 'rejected' });

    // Iterate over each rejected payout
    for (const payout of rejectedPayouts) {
      // Find the user associated with the payout
      const user = await User.findById(payout.user);

      if (user) {
        // Add the payout amount back to the user's withdrawable amount
        // Multiply the payout amount by 100 to convert to cents
        const amountInCents = payout.amount * 100;

        // Add the payout amount (in cents) back to the user's withdrawable amount
        user.withdrawableAmount += amountInCents;

        // Save the updated user
        await user.save();
        // Delete the processed payout
        await Payout.findByIdAndDelete(payout._id);
      } else {
        console.log(`User not found for payout ${payout._id}`);
      }
    }

    console.log('Processed all rejected payouts');
  } catch (error) {
    console.error('Error processing rejected payouts:', error);
  }
};


export const getPayoutsOfUser = async (userId: string) => {
  try {
    await connectToDatabase();

    const payouts = await Payout.find({ user: userId });

    return JSON.parse(JSON.stringify({ status: 200, data: payouts }));
  } catch (error) {
    console.error("Error getting payouts:", error);
    return JSON.parse(JSON.stringify({ status: 400, message: "Error getting payouts" }));
  }
}
