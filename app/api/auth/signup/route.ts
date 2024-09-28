import { NextResponse,NextRequest } from "next/server";
import User from "@/database/user.modal";
import { connectToDatabase } from "@/database";
import * as bcryptjs from "bcryptjs";
export async function POST(req:NextRequest, res:NextResponse ){
    try {
        
        await connectToDatabase();
        const {email, password, firstname,lastname,zip} = await req.json();

      // console.log("🚀 ~ POST ~ emailing:", emailing)
      console.log("values",
        email,
        password,
        firstname,
        lastname,
        zip
        )

        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json({status: 400 , message: "User already exists"});
        }

        const salt = await bcryptjs.genSalt(12);
        const hashedPassword = await bcryptjs.hash(password, salt); 

        const newUser = new User({email, password : hashedPassword , firstname,lastname,zip});
        await newUser.save();

        return NextResponse.json({status: 200 , message: "User created successfully"});


    } catch (error) {
            console.error("Login failed", error);
            return NextResponse.json({status: 400 , message: "Invalid login credentials"});
    }

}