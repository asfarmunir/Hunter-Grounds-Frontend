import { Schema, model, models } from "mongoose";

// Define a sub-schema for referral earnings
const ReferralEarningSchema = new Schema({
  amount: { type: Number, required: true },              // Amount earned through referral
  referId: { type: Schema.Types.ObjectId, ref: "User", required: true },  // The user who referred
  description: { type: String, required: false },        // Optional description for the referral
  status: { type: String, enum: ['pending', 'paid'], default: 'pending' }, // Status of the earning
  date: { type: Date, default: Date.now },               // Date when the referral was made
});


const BookingPaymentSchema = new Schema({
  amount: { type: Number, required: true },               // Amount to be paid for booking
  bookingRefId: { type: Schema.Types.ObjectId, ref: "Booking", required: true }, // Reference to the booking
  status: { type: String, enum: ['pending', 'paid'], default: 'pending' },  // Payment status
  date: { type: Date, default: Date.now },               // Date when the payment entry was created
  // releaseDate: { type: Date, required: true },           // Date when the payment will be released (after 30 days)
});

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
    huntgroundBio: { type: String, required: false }, // Optional bio
    address: { type: String, required: false }, // Optional address
    city: { type: String, required: false }, // Optional city
    state: { type: String, required: false }, // Optional state
    country: { type: String, required: false }, // Optional country
    phone: { type: String, required: false }, // Optional
    suitNumber: { type: String, required: false }, // Optional
    isVerified: { type: Boolean, required: false }, // Optional

    // Changed referalAmount to referralEarnings array
    referralEarnings: { type: [ReferralEarningSchema], default: [] }, 
    bookingPayments: { type: [BookingPaymentSchema], default: [] },

    referedUsers: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
    referedBy: { type: Schema.Types.ObjectId, ref: "User", required: false }, 
    referalUsed: { type: Boolean, default: false }, 
    withdrawableAmount: { type: Number, default: 0 },
    savedProperties: [{ type: Schema.Types.ObjectId, ref: "Property", required: false, default: [] }],
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
