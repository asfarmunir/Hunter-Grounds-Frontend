'use server'
import Booking from '@/database/booking.model';
import { connectToDatabase } from '..';
import Property from '../property.model';
import { revalidatePath } from 'next/cache';
import { subHours, subDays, subWeeks, startOfDay, endOfDay } from 'date-fns';
import User from '../user.modal';

export async function createBooking(data:any) {
    try {
        await connectToDatabase();
        const booking = new Booking(data);
        console.log("🚀 ~ createBooking ~ booking:", booking)
        await booking.save();
        return JSON.parse(JSON.stringify({booking, status: 200}));
    } catch (error) {
        console.error("Error creating booking", error);
        return JSON.parse(JSON.stringify({status: 400, message: "Error creating booking"}));
    }
}

export const getUserBookings = async (userId: string) => {
    try {
        await connectToDatabase();
        const bookings = await Booking.find({user: userId}).populate('property');
        return JSON.parse(JSON.stringify({bookings, status: 200}));
    } catch (error) {
        console.error("Error getting user bookings", error);
        return JSON.parse(JSON.stringify({status: 400, message: "Error getting user bookings"}));
    }
}

export const addRatings = async (bookingId: string, rating: number, userId: string) => {
    try {
        // Connect to the database
        await connectToDatabase();

        // Find the booking by ID
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return { status: 404, message: "Booking not found" };
        }

        // Mark the booking as reviewed
        booking.reviewed = true;
        await booking.save();

        // Find the associated property
        const property = await Property.findById(booking.property);
        if (!property) {
            return { status: 404, message: "Property not found" };
        }

        const existingReviewIndex = property.reviews.findIndex((review:any) => review.user.toString() === userId);

        if (existingReviewIndex !== -1) {
            property.reviews[existingReviewIndex].rating = rating;
        } else {
            property.reviews.push({
                user: userId,
                rating: rating
            });
        }

        await property.save();
        revalidatePath('/account')
        return { status: 200, message: "Rating updated successfully" };
    } catch (error) {
        console.error("Error adding/updating rating", error);
        return { status: 400, message: "Error adding/updating rating" };
    }
};


export const getTopPropertiesByOwner = async (userId: string) => {
  try {
    const result = await Booking.aggregate([
      {
        $lookup: {
          from: 'properties', // Join with the Property collection
          localField: 'property', // Link to the 'property' field in bookings
          foreignField: '_id', // Corresponding _id in Property collection
          as: 'propertyInfo', // Alias for the joined property data
        },
      },
      { $unwind: '$propertyInfo' }, // Unwind to access individual property details
      {
        $match: { 'propertyInfo.owner': userId }, // Match properties where the owner matches the userId
      },
      {
        $group: {
          _id: '$propertyInfo._id', // Group by property ID
          totalBookings: { $sum: 1 }, // Count the number of bookings per property
          propertyDetails: { $first: '$propertyInfo' }, // Keep property details for the result
        },
      },
      { $sort: { totalBookings: -1 } }, // Sort by total bookings in descending order
      { $limit: 3 }, // Limit to the top 3 properties
    ]);

    return JSON.parse(JSON.stringify({ topCities: result, status: 200 }));
  } catch (error) {
    console.error('Error fetching top properties by owner', error);
    throw new Error('Failed to fetch top properties for the user');
  }
};

// export const getUserBookingsByTimeFrame = async (userId: string, timeFrame: string) => {
//   try {
//     await connectToDatabase();

//     // Fetch the properties owned by the user
//     const properties = await Property.find({ owner: userId }).select('_id');
//     const propertyIds = properties.map((property) => property._id);

//     // Determine the time frame filter
//     let dateFilter;
//     const now = new Date();
//     if (timeFrame === '12h') {
//       dateFilter = subHours(now, 12);
//     } else if (timeFrame === '24h') {
//       dateFilter = subHours(now, 24);
//     } else if (timeFrame === 'week') {
//       dateFilter = subDays(now, 7);
//     } else if (timeFrame === 'month') {
//       dateFilter = subWeeks(now, 4); // Approximate month by 4 weeks
//     } else {
//       dateFilter = startOfDay(new Date());
//     }

//     // Fetch the bookings within the time frame
//     const bookings = await Booking.find({
//       property: { $in: propertyIds },
//       createdAt: { $gte: dateFilter, $lte: now },
//     });

//     return JSON.parse(JSON.stringify({ bookings, status: 200 }));
//   } catch (error) {
//     console.log('Error fetching bookings by time frame:', error);
//     return JSON.parse(JSON.stringify({ error, status: 500 }));
//   }
// };

export const getBookingCountByTimeFrame = async (userId: string, timeFrame?: string) => {
  try {
    await connectToDatabase();

    // Fetch the properties owned by the user
    const properties = await Property.find({ owner: userId }).select('_id');
    const propertyIds = properties.map((property) => property._id);

    // Determine the time frame filter
    let dateFilter;
    const now = new Date();
    if (timeFrame === '12h') {
      dateFilter = subHours(now, 12);
    } else if (timeFrame === '24h') {
      dateFilter = subHours(now, 24);
    } else if (timeFrame === 'week') {
      dateFilter = subDays(now, 7);
    } else if (timeFrame === 'month') {
      dateFilter = subWeeks(now, 4); // Approximate month by 4 weeks
    } else {
      dateFilter = subDays(now, 1); // Default to last 24 hours
    }

    // Count the bookings within the time frame
    const bookingCount = await Booking.countDocuments({
      property: { $in: propertyIds },
      createdAt: { $gte: dateFilter, $lte: now },
    });

    return JSON.parse(JSON.stringify({ bookingCount, status: 200 }));
  } catch (error) {
    console.log('Error fetching booking count by time frame:', error);
    return JSON.parse(JSON.stringify({ error, status: 500 }));
  }
};



export const getAllBookingsForUserProperties = async (userId:string) => {
  console.log("🚀 ~ getAllBookingsForUserProperties ~ userId:", userId)
  try {
    // Ensure the database is connected
    await connectToDatabase();

    // Step 1: Find the user and ensure they exist
    const user = await User.findById(userId).select('email firstname lastname');
    if (!user) {
      return {
        error: "User not found.",
        status: 404,
      };
    }

    // Step 2: Find all properties owned by the user
    const properties = await Property.find({ owner: userId }).select('_id name address');
    
    // Check if the user owns any properties
    if (properties.length === 0) {
      return {
        error: "No properties found for this user.",
        status: 404,
      };
    }

    // Extract property IDs
    const propertyIds = properties.map(property => property._id);

    // Step 3: Find all bookings related to those properties
    const bookings = await Booking.find({ property: { $in: propertyIds } })
      .populate('user', 'firstname lastname email')  // Populate user details
      .populate('property', 'name address')  // Populate property details
      .exec();

    // Step 4: Prepare the response
    return {
      status: 200,
      user: {
        email: user.email,
        name: `${user.firstname} ${user.lastname}`,
        preferences: user.preferences,  // Include user preferences if needed
      },
      bookings: bookings.map(booking => ({
        bookingId: booking._id,
        propertyId: booking.property._id,
        propertyName: booking.property.name,
        propertyAddress: booking.property.address,
        userName: `${booking.user.firstname} ${booking.user.lastname}`,
        userEmail: booking.user.email,
        bookingFirstname: booking.bookingFirstname,
        bookingLastname: booking.bookingLastname,
        bookingEmail: booking.bookingEmail,
        bookingPhone: booking.bookingPhone,
        totalAmount: booking.totalAmount,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: booking.guests,
        paymentStatus: booking.paymentStatus,
        reviewed: booking.reviewed,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      })),
    };
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return {
      error: "Failed to fetch bookings.",
      status: 500,
    };
  }
};
