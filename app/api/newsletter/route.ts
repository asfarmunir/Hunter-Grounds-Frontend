// /pages/api/subscribe.js
import axios from 'axios';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) { 
    const { email } = await req.json(); // Get email from the request body
    console.log("🚀 ~ POST ~ email:", email)
    if (!email) {
        return NextResponse.json('Email is required', { status: 400 });
    }

    try {
      // Replace with your EmailOctopus API key and List ID
      const API_KEY = process.env.EMAILOCTOPUS_API_KEY;
      const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID;

      // Make a POST request to EmailOctopus API
       await axios.post(
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
      return NextResponse.json("Success",{status:200})

    } catch (error) {
        // console.error('Error subscribing user:', error);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
  
}
