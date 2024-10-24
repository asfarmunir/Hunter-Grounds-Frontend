
'use server';
import { connectToDatabase } from "..";
import { IProperty } from "../../lib/types/property";
import Property from '@/database/property.model'
import User from "../user.modal";
import { sendEmail } from "@/lib/sendEmail";
import { revalidatePath } from "next/cache";

export const createProperty = async (property: any) => {
  try {
    await connectToDatabase();

    // Create the property in the database
    const newProperty = new Property(property);
    await newProperty.save();
    if (!newProperty) {
      return JSON.parse(JSON.stringify({ error: "Property not created", status: 400 }));
    }

    // Fetch user details based on the property owner ID
    const user = await User.findById(property.owner);
    if (!user) {
      return JSON.parse(JSON.stringify({ error: "Owner not found", status: 404 }));
    }

    // Prepare email HTML content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1>Property Created Successfully</h1>
        <p>Hello ${user.firstname},</p>
        <p>Congratulations! Your property <strong>${newProperty.name}</strong> has been successfully listed on our platform.</p>
        <p>Here are the details of your new property:</p>
        <ul>
          <li><strong>Name:</strong> ${newProperty.name}</li>
          <li><strong>Location:</strong> ${newProperty.address}</li>
          <li><strong>Price Per Night:</strong> $${newProperty.pricePerNight}</li>
        </ul>
        <p>Thank you for choosing our platform!</p>
        <p>Best regards,</p>
        <p>Your Platform Team</p>
      </div>
    `;

    // Send an email notification to the property owner
    await sendEmail(user.email, "Property Created Successfully", htmlContent);
    revalidatePath('/');
    return JSON.parse(JSON.stringify({ newProperty, status: 200 }));

  } catch (error) {
    console.log("Error in createProperty: ", error);
    return JSON.parse(JSON.stringify({ error, status: 500 }));
  }
};

export const updateProperty = async (id: string, property: any) => {
  try {
    await connectToDatabase();

    const updatedProperty = await Property.findByIdAndUpdate(id, property, { 
      new: true,
      runValidators: true,
    });

    if (!updatedProperty) {
      return JSON.parse(JSON.stringify({ error: "Property not found", status: 404 }));
    }

    revalidatePath('/user-properties');
    return JSON.parse(JSON.stringify({ updatedProperty, status: 200 }));



  }catch (error) {
    console.log("Error in updateProperty: ", error);
    return JSON.parse(JSON.stringify({ error, status: 500 }));
  }}

export const getAllPropertiesLocation = async () => {
  try {
    await connectToDatabase();

    const properties = await Property.find({});

    if (!properties) {
      return JSON.parse(JSON.stringify({error: "Properties not found",status: 404}));
    }
    const propertiesLocation = properties.map((property) => {
      return {
        id: property._id,
        name: property.name,
        location: property.location,
        pricePerNight: property.pricePerNight,
      }});


    return JSON.parse(JSON.stringify({ propertiesLocation  ,status: 200}));

  } catch (error) {
    console.log("Error in getAllPropertiesLocation: ", error);
    return JSON.parse(JSON.stringify({error,status: 500}));
  }
}
export const getAllProperties = async ({
  limit,
  page,
  city,
  priceRange,
  fromDate,
  toDate,
  games,
  
}: {
  limit: number;
  page: number;
  city?: string;
  fromDate?: string;
  toDate?: string;
  priceRange?: { min: number; max: number } | null; // Add priceRange parameter
  games?: string[];
}) => {
  try {
    await connectToDatabase();
    const skipAmount = (Number(page) - 1) * limit;

    const query: any = {}; // Initialize an empty query object

    if (priceRange) {
      query.pricePerNight = {
        $gte: priceRange.min,
        $lte: priceRange.max,
      };
    }

    if (city) {
      query.city = city.toLowerCase().replace(/\s+/g, ''); // Format city to match your requirement
    }

    if (fromDate && toDate) {
      query.bookedDates = {
        $not: {
          $elemMatch: {
            $gte: new Date(fromDate), // From date
            $lte: new Date(toDate),   // To date
          },
        },
      };
    }

    if (games?.length) {
      query.gameAvailable = {
        $all: games,
      };
    }


    const properties = await Property.find(query)
      .skip(skipAmount)
      .limit(limit);

    if (!properties) {
      return JSON.parse(JSON.stringify({ error: "Properties not found", status: 404 }));
    }

    const propertyCount = await Property.countDocuments(query); // Count based on the same query
    return JSON.parse(
      JSON.stringify({
        properties,
        status: 200,
        totalProperties: propertyCount,
        totalPages: Math.ceil(propertyCount / limit),
      })
    );
  } catch (error) {
    console.log("Error in getAllProperties: ", error);
    return JSON.parse(JSON.stringify({ error, status: 500 }));
  }
};

export const getPropertyById = async (id: string) => {
  try {
    await connectToDatabase();

    const property = await Property.findById(id);

    if (!property) {
      return JSON.parse(JSON.stringify({ error: "Property not found", status: 404 }));
    }

    return JSON.parse(JSON.stringify({ property, status: 200 }));
  } catch (error) {
    console.log("Error in getPropertyById: ", error);
    return JSON.parse(JSON.stringify({ error, status: 500 }));
  }
}

export const getUserProperties = async (userId: string) => {
  try {
    await connectToDatabase();

    const properties = await Property.find({ owner: userId });

    if (!properties) {
      return JSON.parse(JSON.stringify({ error: "Properties not found", status: 404 }));
    }

    return JSON.parse(JSON.stringify({ properties, status: 200 }));
  } catch (error) {
    console.log("Error in getUserProperties: ", error);
    return JSON.parse(JSON.stringify({ error, status: 500 }));
  }
}

export const getPropertiesCalendar = async (
  userId: string, 
  propertyName?: string // Optional parameter
) => {
  try {
    await connectToDatabase();

    // Construct the query conditionally based on propertyName
    const query: any = { owner: userId }; 

    // If propertyName is provided and not empty, add it to the query
    if (propertyName && propertyName.trim() !== "") {
      query.name = propertyName;
    }

    // Find properties based on the query
    const properties = await Property.find(query);

    // Check if properties exist
    if (!properties || properties.length === 0) {
      return JSON.parse(JSON.stringify({ error: "Properties not found", status: 404 }));
    }

    // Return the found properties
    return JSON.parse(JSON.stringify({ properties, status: 200 }));
  } catch (error) {
    console.log("Error in getPropertiesCalendar: ", error);
    return JSON.parse(JSON.stringify({ error, status: 500 }));
  }
}

export const getUserPropertyNames = async (userId: string) => {
  try {
    await connectToDatabase();

    const propertyNames = await Property.find({ owner: userId }).select("name");
    if (!propertyNames || propertyNames.length === 0) {
      return JSON.parse(JSON.stringify({ error: "No properties found", status: 404 }));
    }
    return JSON.parse(JSON.stringify({ propertyNames, status: 200 }));
  } catch (error) {
    console.log("Error in getUserPropertyNames: ", error);
    return JSON.parse(JSON.stringify({ error, status: 500 }));
  }
};


export const countUserReviews = async (userId:string) => {
  try {
    // Initialize the review count
    let reviewCount = 0

    // Find all properties
    const properties = await Property.find({});

    // Iterate over each property and check the reviews
    properties.forEach(property => {
      property.reviews.forEach((review:any) => {
        if (review.user.toString() === userId.toString()) {
          reviewCount++;
        }
      });
    });

    // Return the total review count for the user
    return reviewCount;
  } catch (error) {
    console.error('Error counting user reviews:', error);
    throw error;
  }
};


// export const toggleUnavailableDates = async ({
//   propertyId,
//   nonAvailableDates,
// }: {
//   propertyId: string;
//   nonAvailableDates: string[];
// }) => {
//   try {
//     // Validate request data
//     if (!propertyId || !nonAvailableDates || !Array.isArray(nonAvailableDates)) {
//       return JSON.parse(
//         JSON.stringify({ error: "Invalid data provided", status: 400 })
//       );
//     }

//     const formattedDates = nonAvailableDates.map((date) => new Date(date));

//     // Fetch the property to check existing nonAvailableDates
//     const property = await Property.findById(propertyId);
//     if (!property) {
//       return JSON.parse(
//         JSON.stringify({ error: "Property not found", status: 404 })
//       );
//     }

//     // Identify dates to add and remove
//     const datesToAdd = formattedDates.filter(
//       (date) => !property.nonAvailableDates.includes(date)
//     );
//     console.log("🚀 ~ datesToAdd:", datesToAdd)
//     const datesToRemove = property.nonAvailableDates.filter(
//       (date: any) => formattedDates.includes(date)
//     );
//     console.log("🚀 ~ datesToRemove:", datesToRemove)

//     // Step 1: Add dates using $addToSet
//     if (datesToAdd.length > 0) {
//       await Property.findByIdAndUpdate(propertyId, {
//         $addToSet: { nonAvailableDates: { $each: datesToAdd } }, // Add unique dates
//       });
//     }

//     // Step 2: Remove dates using $pull
//     if (datesToRemove.length > 0) {
//       await Property.findByIdAndUpdate(propertyId, {
//         $pull: { nonAvailableDates: { $in: datesToRemove } }, // Remove dates
//       });
//     }

//     // Revalidate the path after both updates
//     revalidatePath("/calendar");

//     // Fetch the updated property to return it
//     const updatedProperty = await Property.findById(propertyId);

//     // Return the updated property
//     return JSON.parse(JSON.stringify({ updatedProperty, status: 200 }));
//   } catch (error) {
//     console.error("Error updating non-available dates:", error);
//     return JSON.parse(JSON.stringify({ error, status: 500 }));
//   }
// };


export const toggleUnavailableDates = async ({
  propertyId,
  nonAvailableDates,
}: {
  propertyId: string;
  nonAvailableDates: string[];
}) => {
  try {
    // Validate request data
    if (!propertyId || !nonAvailableDates || !Array.isArray(nonAvailableDates)) {
      return JSON.parse(
        JSON.stringify({ error: "Invalid data provided", status: 400 })
      );
    }

    // Convert input dates to ISO string format
    const formattedDates = nonAvailableDates.map((date) =>
      new Date(date).toISOString()
    );

    // Fetch the property to ensure it exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return JSON.parse(
        JSON.stringify({ error: "Property not found", status: 404 })
      );
    }

    // Directly update the nonAvailableDates field with the new dates
    await Property.findByIdAndUpdate(propertyId, {
      nonAvailableDates: formattedDates,
    });

    // Revalidate the path after updating the property
    revalidatePath("/calendar");

    // Fetch the updated property to return it
    const updatedProperty = await Property.findById(propertyId);

    // Return the updated property
    return JSON.parse(JSON.stringify({ updatedProperty, status: 200 }));
  } catch (error) {
    console.error("Error updating non-available dates:", error);
    return JSON.parse(JSON.stringify({ error, status: 500 }));
  }
};


