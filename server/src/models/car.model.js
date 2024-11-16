import mongoose, { Schema } from "mongoose";

const carSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User schema
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      index: true, // Useful for search functionality
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String], // Array of strings for flexible tagging
      default: [],
    },
    images: {
      type: [String], // Array of image URLs
      validate: {
        validator: function (images) {
          return images.length <= 10; // Allow a maximum of 10 images
        },
        message: "You can upload up to 10 images only.",
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Method to add a new tag
carSchema.methods.addTag = function (tag) {
  if (!this.tags.includes(tag)) {
    this.tags.push(tag);
  }
  return this.tags;
};

carSchema.methods.removeTag = function (tag) {
  this.tags = this.tags.filter((existingTag) => existingTag !== tag);
  return this.tags;
};


carSchema.statics.searchCars = function (keyword) {
  return this.find({
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { tags: { $regex: keyword, $options: "i" } },
    ],
  });
};

// Export the Car model
export const Car = mongoose.model("Car", carSchema);
