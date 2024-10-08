'use server'

import User from '@/database/user.modal';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/database';
import { revalidatePath } from 'next/cache';
import { StreamChat } from 'stream-chat';
export const getUserDetails = async (email: string) => {
    try {
        await connectToDatabase();
        const user = await User.findOne({ email });
        if (!user) {
            return { message: 'User not found' };
        }
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.error('Get user details error: ', error);
        return { message: 'Internal Server Error' };
    }
}
    
export const updateUserDetails = async (email: string, data: any, path:string) => {
    console.log("🚀 ~ updateUserDetails ~ data:", data)
    try {
        await connectToDatabase();
        
        const user = await User.findOneAndUpdate({
            email
        }, data, { new: true });
        if (!user) {
            return { message: 'User not found' };
        }
        revalidatePath(path)
        return JSON.parse(JSON.stringify(user));
    }
    catch (error) {
        console.error('Update user details error: ', error);
        return { message: 'Internal Server Error' };
    }
}

export const updateUserPassword = async (email: string, password: string) => {
    try {
        await connectToDatabase();
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        const user = await User.findOneAndUpdate({ email }, { password }, { new: true });
        if (!user) {

            throw new Error('User not found');
        }
        revalidatePath('/account/settings')
        return JSON.parse(JSON.stringify({user,status:200}));
    } catch (error:any) {
        console.error('Update user password error: ', error);
        return JSON.parse(JSON.stringify({ message: error.message, status:400 },
          ));
            
    }
}

export const updateUserProfileImage = async (email: string, profileImage: string) => {
    try {
        await connectToDatabase();
        const user = await User.findOneAndUpdate({ email }, { profileImage }, { new: true });
        if (!user) {
            return { message: 'User not found', status: 404 };
        }
        revalidatePath('/account/settings')
        return JSON.parse(JSON.stringify({user,  status: 200 }));
    } catch (error) {
        console.error('Update user profile image error: ', error);
        return { message: 'Internal Server Error', status: 500 };
    }
}

const serverClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!, process.env.STREAM_SECRET_KEY);

export const createStreamUserToken = async (id:string): Promise<string> =>{
    
    return serverClient.createToken(id);

}

export const createNewStreamUser = async (id:string, name:string, image:string) =>{
   return serverClient.upsertUser({
        id,
        name,
        image
    })
}


export const updateUserStatus = async (userId:string) => {

    try {
        await connectToDatabase();
       const user = await User.findById(userId);
         if (!user) {
            return { message: 'User not found', status: 404 };
        }
        
        user.isVerified = true;
        await user.save();
        return JSON.parse(JSON.stringify({status:200}))
        
    } catch (error) {
         console.error('error updating user status: ', error);
        return { message: 'Internal Server Error', status: 500 };
    }
}


export const getReferralEarningsOfLastMonth = async (userId: string) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return { message: "User not found", status: 404 };
    }

    // Get the current date and calculate the date 30 days ago
    const currentDate = new Date();
    const last30DaysDate = new Date(currentDate);
    last30DaysDate.setDate(currentDate.getDate() - 30);

    // Filter referral earnings in the last 30 days
    const recentEarnings = user.referralEarnings.filter((earning : any) => {
      return earning.date >= last30DaysDate;
    });

    // Calculate the total amount earned
    const totalEarnings = recentEarnings.reduce((acc:any, earning:any) => {
      return acc + earning.amount;
    }, 0);

    return { amount: totalEarnings, status: 200 };
  } catch (error) {
    console.error("Error fetching referral earnings of the last 30 days: ", error);
    return { message: "Internal Server Error", status: 500 };
  }
};


// export const getWithdrawableReferralAmount = async (userId: string) => {
//   try {
//     // Connect to the database
//     await connectToDatabase();

//     // Fetch the user by ID
//     const user = await User.findById(userId);
//     if (!user) {
//       return { message: "User not found", status: 404 };
//     }

//     // Get the current date and calculate the date 30 days ago (withdrawable period)
//     const currentDate = new Date();
//     const oneMonthAgo = new Date(currentDate);
//     oneMonthAgo.setDate(currentDate.getDate() - 30); // Set the date to 30 days ago

//     // Filter referral earnings that are older than one month and have status 'paid'
//     const withdrawableEarnings = user.referralEarnings.filter((earning:any) => {
//       return earning.date <= oneMonthAgo;
//     });

//     // Calculate the total withdrawable amount
//     const totalWithdrawableAmount = withdrawableEarnings.reduce((acc:any, earning:any) => {
//       return acc + earning.amount;
//     }, 0);

//     return { amount: totalWithdrawableAmount, status: 200 };
//   } catch (error) {
//     console.error("Error fetching withdrawable referral amount: ", error);
//     return { message: "Internal Server Error", status: 500 };
//   }
// };

export const getWithdrawableReferralAmount = async (userId: string) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return { message: "User not found", status: 404 };
    }

    // Get the current date and calculate the date 30 days ago (withdrawable period)
    const currentDate = new Date();
    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setDate(currentDate.getDate() - 30); // Set the date to 30 days ago

    // Initialize a variable to accumulate the new withdrawable amount
    let newWithdrawableAmount = 0;

    // Loop through referral earnings and find the ones older than one month
    user.referralEarnings = user.referralEarnings.map((earning: any) => {
      if (earning.date <= oneMonthAgo && earning.status === "pending") {
    //   if ( earning.status === "pending") {
        // Update the status to 'paid'
        earning.status = "paid";

        // Add this earning's amount to the new withdrawable amount
        newWithdrawableAmount += earning.amount;
      }
      return earning;
    });

    // Update the user's withdrawableAmount by adding the new amount
    user.withdrawableAmount += newWithdrawableAmount;

    // Save the updated user document
    await user.save();

    return { message: "Withdrawable amount updated", amount: user.withdrawableAmount, status: 200 };
  } catch (error) {
    console.error("Error fetching withdrawable referral amount: ", error);
    return { message: "Internal Server Error", status: 500 };
  }
};
