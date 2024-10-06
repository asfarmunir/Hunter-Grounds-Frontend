
'use server';
import { connectToDatabase } from "..";
import { IProperty } from "../../lib/types/property";
import Property from '@/database/property.model'

export const createProperty = async (property: any) => {
  try {
    await connectToDatabase();

    const newProperty = new Property(property);
    await newProperty.save();
    if (!newProperty) {
      return JSON.parse(JSON.stringify({error: "Property not created",status: 400}));
    }

    return JSON.parse(JSON.stringify({newProperty,status: 200}));


  } catch (error) {
    console.log("Error in createProperty: ", error);
    return JSON.parse(JSON.stringify({error,status: 500}));
  }
};

export const getAllPropertiesLocation = async () => {
  try {
    await connectToDatabase();

    const properties = await Property.find({});

    if (!properties) {
      return JSON.parse(JSON.stringify({error: "Properties not found",status: 404}));
    }
    const propertiesLocation = properties.map((property) => {
      return {
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
  
}: {
  limit: number;
  page: number;
  city?: string;
  fromDate?: string;
  toDate?: string;
  priceRange?: { min: number; max: number } | null; // Add priceRange parameter
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