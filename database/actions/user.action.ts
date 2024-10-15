'use server'

import User from '@/database/user.modal';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/database';
import { revalidatePath } from 'next/cache';
import { StreamChat } from 'stream-chat';
import { sendEmail } from '@/lib/sendEmail';
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

export const getUserbyId = async (id: string) => {
    try {
        await connectToDatabase();
        const user = await User.findById(id);
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

export const updateUserPassword = async (email: string, password: string, currentPassword:string) => {
    try {
        await connectToDatabase();
     
        const user = await User.findOne({ email });
        if (!user) {
            return JSON.parse(JSON.stringify({ message: 'User not found', status: 404 }));
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return JSON.parse(JSON.stringify({ message: 'Invalid current password', status: 400 }));
        }
           const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        user.password = password;
        await user.save();
        
        revalidatePath('/account/settings')

      await  sendEmail(user.email, 'Password Updated', 'Your password has been updated successfully!');

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

    return JSON.parse(JSON.stringify({ amount: totalEarnings, status: 200 }));
  } catch (error) {
    console.error("Error fetching referral earnings of the last 30 days: ", error);
    return { message: "Internal Server Error", status: 500 };
  }
};


export const updateWithdrawableReferralAmount = async (userId: string) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch the user by ID
    const user = await User.findById(userId);
    if (!user) {
      console.error(`User with ID ${userId} not found.`);
      return;
    }

    // Get the current date and calculate the date 30 days ago (withdrawable period)
    const currentDate = new Date();
    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setDate(currentDate.getDate() - 14); // Set the date to 30 days ago

    // Initialize a variable to accumulate the new withdrawable amount
    let newWithdrawableAmount = 0;

    // Loop through referral earnings and find the ones older than one month
    let earningsUpdated = false;
    user.referralEarnings = user.referralEarnings.map((earning: any) => {
      if (earning.date <= oneMonthAgo && earning.status === "pending") {
        // Update the status to 'paid'
        earning.status = "paid";
        earningsUpdated = true;

        // Add this earning's amount to the new withdrawable amount
        newWithdrawableAmount += earning.amount;
      }
      return earning;
    });

    // If no new earnings are updated, don't proceed with saving
    if (!earningsUpdated) {
      console.log(`No withdrawable referral earnings for user ID ${userId}.`);
    revalidatePath('/hunt-cash');

      return;
    }

    // Update the user's withdrawableAmount by adding the new amount
    user.referalWithdrawableAmount += newWithdrawableAmount;

    // Save the updated user document
    await user.save();
    revalidatePath('/hunt-cash');


    console.log(`User ID ${userId} withdrawable amount updated by ${newWithdrawableAmount}`);
    
  } catch (error) {
    console.error("Error updating withdrawable referral amount: ", error);
  }
};

export const updateBookingWithdrawableAmount = async (userId: string) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch the user by ID
    const user = await User.findById(userId);
    if (!user) {
      console.error(`User with ID ${userId} not found.`);
      return;
    }

    // Get the current date and calculate the date 30 days ago (withdrawable period)
    const currentDate = new Date();
    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setDate(currentDate.getDate() - 14); // Set the date to 30 days ago

    // Initialize a variable to accumulate the new withdrawable amount from booking payments
    let newBookingWithdrawableAmount = 0;

    // Flag to track if any updates were made
    let paymentsUpdated = false;

    // Loop through booking payments and find the ones older than one month
    user.bookingPayments = user.bookingPayments.map((payment: any) => {
      if (payment.date <= oneMonthAgo && payment.status === "pending") {
        // Update the status to 'paid'
        payment.status = "paid";
        paymentsUpdated = true;

        // Add this payment's amount to the new withdrawable amount
        newBookingWithdrawableAmount += payment.amount;
      }
      return payment;
    });

    // If no payments were updated, no need to save the user
    if (!paymentsUpdated) {
      console.log(`No withdrawable booking payments for user ID ${userId}.`);
    revalidatePath('/dashboard');

      return;
    }

    // Update the user's withdrawableAmount by adding the new amount from booking payments
    user.withdrawableAmount += newBookingWithdrawableAmount;

    // Save the updated user document
    await user.save();
    revalidatePath('/dashboard');


    console.log(`User ID ${userId} withdrawable amount updated from booking payments: ${newBookingWithdrawableAmount}`);
    
  } catch (error) {
    console.error("Error updating booking withdrawable amount: ", error);
  }
};



export const addSavedProperty = async (userId: string, propertyId: string) => {
  try {
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) {
      return { message: "User not found", status: 404 };
    }

    const isPropertySaved = user.savedProperties && user.savedProperties.includes(propertyId);
    if (isPropertySaved) {
      return { message: "Property already saved!", status: 400 };
    }

    user.savedProperties.push(propertyId);
    await user.save();
    revalidatePath('/');
    return JSON.parse(JSON.stringify({ message: "Property saved successfully", status: 200 }));


  } catch (error) {

    console.error("Error saving property: ", error);
    return { message: "Internal Server Error", status: 500 };
  }

}

export const removeSavedProperty = async (userId: string, propertyId: string) => {
  try {
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) {
      return { message: "User not found", status: 404 };
    }

    const isPropertySaved = user.savedProperties && user.savedProperties.includes(propertyId);
    if (!isPropertySaved) {
      return { message: "Property not saved!", status: 400 };
    }
    user.savedProperties = user.savedProperties.filter((id: string) => {
      id !== propertyId.toString();
    });
    await user.save();
    revalidatePath('/account');
    return JSON.parse(JSON.stringify({ message: "Property removed successfully", status: 200 }));
  } catch (error) {
    console.error("Error removing property: ", error);
    return { message: "Internal Server Error", status: 500 };
  }
}


export const getUserSavedProperties = async (userId: string) => {
  try {
    await connectToDatabase();
    const user = await User.findById(userId).populate('savedProperties');
    if (!user) {
      return { message: "User not found", status: 404 };
    }

    return JSON.parse(JSON.stringify({ properties: user.savedProperties, status: 200 }));
  } catch (error) {
    console.error("Error fetching saved properties: ", error);
    return { message: "Internal Server Error", status: 500 };
  }
}



// --------------------------






