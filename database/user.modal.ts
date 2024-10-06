import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: false },  
    lastname: { type: String, required: false },   
    password: { type: String, required: false },    
    zip: { type: String, required: false },
    profileImage: { type: String, required: false }, 
    authProviders: { type: [String], required: false }, 
    resetToken: { type: String, required: false },
    resetTokenExpiry: { type: Date, required: false },
    instagramHandle: { type: String, required: false },
    twitterHandle: { type: String, required: false },
    personalUrl: { type: String, required: false }, // Personal URL for public display
    publicLocation: { type: String, required: false }, // Optional public location
    huntgroundBio : { type: String, required: false }, // Optional bio
    address: { type: String, required: false }, // Optional address
    city: { type: String, required: false }, // Optional city
    state: { type: String, required: false }, // Optional state
    country: { type: String, required: false }, // Optional country
    phone: { type: String, required: false }, // Optional
    suitNumber: { type: String, required: false }, // Optional
    isVerified: { type: Boolean, required: false }, // Optional

  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
