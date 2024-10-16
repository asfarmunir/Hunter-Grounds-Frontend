import { Schema, model, models } from "mongoose";

// Define a sub-schema for referral earnings
const ReferralEarningSchema = new Schema({
  amount: { type: Number, required: true },
  referId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  date: { type: Date, default: Date.now },
});

// Define a sub-schema for booking payments
const BookingPaymentSchema = new Schema({
  amount: { type: Number, required: true },
  bookingRefId: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
  status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  date: { type: Date, default: Date.now },
});

// Define a sub-schema for user preferences
const PreferencesSchema = new Schema({
  personalizedRecommendations: { type: Boolean, default: false },
  exclusiveOffers: { type: Boolean, default: false },
  newFeatures: { type: Boolean, default: false },
  feedbackSurveys: { type: Boolean, default: false },
  safetyTips: { type: Boolean, default: false },

   // Notification preferences
  newMessages: { type: Boolean, default: false },
  bookingRequestNotifications: { type: Boolean, default: false },
  bookingConfirmationNotification: { type: Boolean, default: false },
  bookingCancellationModificationNotifications: { type: Boolean, default: false },
  bookingReminderNotifications: { type: Boolean, default: false },
  reviewTripReminderNotifications: { type: Boolean, default: false },
  accountSupport: { type: Boolean, default: false }
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
    personalUrl: { type: String, required: false },
    publicLocation: { type: String, required: false },
    huntgroundBio: { type: String, required: false },
    address: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    country: { type: String, required: false },
    phone: { type: String, required: false },
    suitNumber: { type: String, required: false },
    isVerified: { type: Boolean, required: false },
    
    // Referral and booking-related fields
    referralEarnings: { type: [ReferralEarningSchema], default: [] },
    bookingPayments: { type: [BookingPaymentSchema], default: [] },
    referedUsers: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
    referedBy: { type: Schema.Types.ObjectId, ref: "User", required: false },
    referalUsed: { type: Boolean, default: false },
    withdrawableAmount: { type: Number, default: 0 },
    referalWithdrawableAmount: { type: Number, default: 0 },
    savedProperties: [{ type: Schema.Types.ObjectId, ref: "Property", required: false, default: [] }],

    // New field for email/SMS preferences
    preferences: { type: PreferencesSchema, default: {} },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
