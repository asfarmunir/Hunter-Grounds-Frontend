// /pages/api/subscribe.js
import axios from 'axios';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) { 
    const { email } = await req.json(); // Get email from the request body
    if (!email) {
        return NextResponse.json('Email is required', { status: 400 });
    }

    try {
      const API_KEY = process.env.EMAILOCTOPUS_API_KEY;
      const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID;
       const res = await axios.post(
        `https://emailoctopus.com/api/1.6/lists/${LIST_ID}/contacts?api_key=${API_KEY}`,
        {
          email_address: email,
          status: 'SUBSCRIBED', // Subscribe the user
        },
        {
          headers: {
            'Content-Type': 'application/json',
            // 'X-API-KEY': API_KEY,
          },
        }
      );
       console.log("🚀 ~ POST ~ res:", res.data)
      return NextResponse.json("Success",{status:200})

    } catch (error:any) {
        console.error('Error subscribing user:', error);
        return NextResponse.json('Internal Server Error', { status:  error.response.status || 500 });
    }
  
}
