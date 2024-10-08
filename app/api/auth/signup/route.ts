import { NextResponse,NextRequest } from "next/server";
import User from "@/database/user.modal";
import { connectToDatabase } from "@/database";
import * as bcryptjs from "bcryptjs";
import { createNewStreamUser } from "@/database/actions/user.action";
export async function POST(req:NextRequest, res:NextResponse ){
    try {
        
        await connectToDatabase();
        const {email, password, firstname,lastname,zip, referalCode } = await req.json();


        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json({status: 400 , message: "User already exists"});
        }



        const salt = await bcryptjs.genSalt(12);
        const hashedPassword = await bcryptjs.hash(password, salt); 

        if(referalCode && referalCode !== ""){
            const referalUser = await User.findById(referalCode);
            referalUser.referedUsers.push(referalCode);
             await referalUser.save();
        }

        const newUser = new User({
            email,
             password : hashedPassword , 
            firstname,
            lastname,
            zip, 
            referedBy : referalCode ? referalCode : null,
        });
        await newUser.save();
        await  createNewStreamUser(
                newUser._id.toString(),
                `${firstname} ${lastname}`,
                "https://getstream.io/random_svg/?id=broken-waterfall-5&name=Broken+waterfall"
      );
        return NextResponse.json({status: 200 , message: "User created successfully"});


    } catch (error) {
            console.error("Login failed", error);
            return NextResponse.json({status: 400 , message: "something went wrong"});
    }

}