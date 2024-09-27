import {Schema, model, models } from "mongoose";

const PropertySchema = new Schema({
   address: {
    type: String,
    required: true,
  },
  acres: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photos: {
    type: [String], // Array of photo URLs
    default: [],
  },
  insurance: {
    type: String,
  },
  gameAvailable: {
    type: String, // Specify the type or name of the game available
  }
}, { timestamps: true });

const Property = models.Property || model("Property", PropertySchema);

export default Property;