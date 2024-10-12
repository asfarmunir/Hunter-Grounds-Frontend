'use server'
import Booking from '@/database/booking.model';
import { connectToDatabase } from '..';
import Property from '../property.model';
import { revalidatePath } from 'next/cache';

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

// export const getTopCitiesWithMostBookingsForUser = async (userId:string) => {
//   try {
//     // Perform the aggregation with an additional filter for the owner's userId
//     const topCities = await Booking.aggregate([
//       {
//         // Lookup to join the Booking with the Property collection based on property ID
//         $lookup: {
//           from: "properties", // The collection name in MongoDB (lowercase of Property model)
//           localField: "property", // Field in Booking schema that refers to the Property
//           foreignField: "_id", // Field in Property schema that is the ObjectId
//           as: "propertyDetails", // Output array with property details
//         },
//       },
//       {
//         // Unwind the propertyDetails array to have one document per booking/property
//         $unwind: "$propertyDetails",
//       },
//       {
//         // Match only the properties where the owner matches the provided userId
//         $match: {
//           "propertyDetails.owner": userId, // Filter by the owner field in the Property schema
//         },
//       },
//       {
//         // Group by city and count the number of bookings for each city
//         $group: {
//           _id: "$propertyDetails.city", // Group by the city field in the Property schema
//           totalBookings: { $sum: 1 }, // Count the number of bookings for each city
//         },
//       },
//       {
//         // Sort the cities by the total bookings in descending order
//         $sort: { totalBookings: -1 },
//       },
//       {
//         // Limit the result to the top 3 cities
//         $limit: 3,
//       },
//     ]);

//     // Return the top cities for the specific user's properties
//     return { topCities, status: 200 };
//   } catch (error) {
//     console.error("Error fetching top cities with most bookings for user: ", error);
//     return { message: "Internal Server Error", status: 500 };
//   }
// };





// export const getTopCitiesWithMostBookings = async () => {
//   try {
//     // Perform the aggregation
//     const topCities = await Booking.aggregate([
//       {
//         // Lookup to join the Booking with the Property collection based on property ID
//         $lookup: {
//           from: "properties", // The collection name in MongoDB (should be lowercase of Property model)
//           localField: "property", // Field in Booking schema that refers to the Property
//           foreignField: "_id", // Field in Property schema that is the ObjectId
//           as: "propertyDetails", // Output array with property details
//         },
//       },
//       {
//         // Unwind the propertyDetails array to have one document per booking/property
//         $unwind: "$propertyDetails",
//       },
//       {
//         // Group by city and count the number of bookings for each city
//         $group: {
//           _id: "$propertyDetails.city", // Group by the city field in the Property schema
//           totalBookings: { $sum: 1 }, // Count the number of bookings for each city
//         },
//       },
//       {
//         // Sort the cities by the total bookings in descending order
//         $sort: { totalBookings: -1 },
//       },
//       {
//         // Limit the result to the top 3 cities
//         $limit: 3,
//       },
//     ]);

//     // Return the top cities
//     return { topCities, status: 200 };
//   } catch (error) {
//     console.error("Error fetching top cities with most bookings: ", error);
//     return { message: "Internal Server Error", status: 500 };
//   }
// };