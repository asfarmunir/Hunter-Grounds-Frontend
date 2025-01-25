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
      type: [String],
      default: [],
    },
    pricePerNight: {
      type: Number,
      required: true, // Assuming price per night is mandatory
    },
    bookingsAllowed: {
      type: Number,
      required: true, // Maximum number of guests the property can accommodate
      default: 10, // Default to 10 guests
    },
    bookedDates: {
      type: [
        {
          date: { type: Date, required: true },
          spotsRemaining: {
            type: Number,
            required: true,
            default: function () {
              //@ts-ignore
              return this.bookingsAllowed; // Default to the value of guestsAllowed
            },
          },
        },
      ],
      default: [],
    },
    nonAvailableDates: {
      type: [Date], // Array to store dates when the owner does not want to rent out the property
      default: [],
    },
    city: {
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: {
      type: [
        {
          user: { type: Schema.Types.ObjectId, ref: "User" },
          review: { type: String },
          rating: { type: Number },
        },
      ],
      default: [],
    },
   extraServices: {
    type: [
      {
        name: { type: String,  }, 
        description: { type: String }, 
        price: { type: Number }, 
      },
    ],
    default: null, 
    },
    country: {
      type: String,
      default: "canada",
      enum: ["canada", "usa", "mexico"],
    },
    state: {
      type: String,
    },
    guidedTours: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

PropertySchema.pre("save", function (next) {
  this.bookedDates.forEach((entry) => {
    if (entry.spotsRemaining > this.bookingsAllowed) {
      throw new Error("Spots remaining cannot exceed bookingsAllowed.");
    }
  });
  next();
});


const Property = models.Property || model("Property", PropertySchema);

export default Property;


