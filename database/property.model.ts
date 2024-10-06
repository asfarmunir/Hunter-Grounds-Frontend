import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema(
  {
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
    },
    pricePerNight: {
      type: Number,
      required: true, // Assuming price per night is mandatory
    },
    bookedDates: {
      type: [Date], // Array to store the dates when the property is booked
      default: [],
    },
    city:{
      type: String,
      required: true,
    },
    location: {
      longitude: {
        type: Number,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
    },
    owner:{
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true }
);

const Property = models.Property || model("Property", PropertySchema);

export default Property;
