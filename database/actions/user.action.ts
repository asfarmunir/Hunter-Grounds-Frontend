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