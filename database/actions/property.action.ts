
'use server';
import { connectToDatabase } from "..";
import { IProperty } from "../../lib/types/property";
import Property from '@/database/property.model'

export const createProperty = async (property: IProperty) => {
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
