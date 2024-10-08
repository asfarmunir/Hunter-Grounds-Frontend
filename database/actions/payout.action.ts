"use server";
import Payout from "@/database/payout.model";
import { connectToDatabase } from "..";
import User from "../user.modal";
import { revalidatePath } from 'next/cache';
export const createPayout = async (data: any) => {
    try {
        // Connect to the database
        await connectToDatabase();

        console.log(data);
        // Fetch the user by ID
        const user = await User.findById(data.user);
        console.log("🚀 ~ pehly ~ user:", user)
        if (!user) {
            return JSON.parse(JSON.stringify({ status: 404, message: "User not found" }));
        }

        // Check if the payout amount is less than or equal to the user's withdrawable amount
        if (data.amount * 100 > user.withdrawableAmount) {
            return JSON.parse(JSON.stringify({ status: 400, message: "Insufficient withdrawable amount" }));
        }

        const payout = new Payout({
            user: data.user,
            amount: data.amount,
            accountEmail: data.accountEmail,
        });

        // Save the payout
        await payout.save();

        user.withdrawableAmount -= data.amount*100;
        console.log("🚀 ~ badme ~ user:", user)

        await user.save();

        revalidatePath('/dashboard');
        // Return the success response with the payout details
        return JSON.parse(JSON.stringify({  status: 200 }));
    } catch (error) {
        console.error("Error creating payout", error);
        return JSON.parse(JSON.stringify({ status: 400, message: "Error creating payout" }));
    }
};
