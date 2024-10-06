export interface IUser {
  _id?: string;
  email: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  zip?: string;
  profileImage?: string;
  authProviders?: string[];
  resetToken?: string;
  resetTokenExpiry?: Date;
  instagramHandle?: string;
  twitterHandle?: string;
  personalUrl?: string; // Personal URL for public display
  publicLocation?: string; // Optional public location
  huntgroundBio?: string; // Optional bio
  address?: string; // Optional address
  city?: string; // Optional city
  state?: string; // Optional state
  country?: string; // Optional country
  phone?: string; // Optional phone
  suitNumber?: string; // Optional suite number
  createdAt?: Date;
  updatedAt?: Date;
  isVerified?: boolean; // Optional
}
