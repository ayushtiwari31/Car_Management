import { Car } from "../models/car.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

// 1. Add a new car with images uploaded to Cloudinary
export const addCar = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const userId = req.user._id; 
    const files = req.files; 


    const uploadedFiles = [];
    
    if(req.files)
      {
  
         
          for (const file of req.files) {
              console.log(file.path)
              const result =await uploadOnCloudinary(file.path);
              uploadedFiles.push(result.secure_url);
          }
      }

    // console.log(uploadedFiles);

    const car = new Car({
      userId,
      title,
      description,
      tags,
      images: uploadedFiles,
    });

    await car.save();
    res.status(201).json({ message: "Car added successfully", car });
  } catch (error) {
    res.status(500).json({ message: "Error adding car", error: error.message });
  }
};

// 2. Get all cars of the logged-in user
export const getUserCars = async (req, res) => {
  try {
    const userId = req.user._id;
    const cars = await Car.find({ userId });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cars", error: error.message });
  }
};

// 3. Get details of a specific car
export const getCarDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);

    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: "Error fetching car details", error: error.message });
  }
};

// 4. Update car details, including images
export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tags, existingImages } = req.body;
    const files = req.files;
    const userId = req.user._id;

   
    let existingImageUrls = [];
    if (existingImages) {
      existingImageUrls = JSON.parse(existingImages); // Existing Cloudinary URLs
    }

    const uploadedFiles = [];
    
    
    if (files && files.length > 0) {
      for (const file of files) {
        const result = await uploadOnCloudinary(file.path);
        uploadedFiles.push(result.secure_url);
      }
    }

    // Combine existing URLs with newly uploaded files
    const allImages = [...existingImageUrls, ...uploadedFiles];

    // Create fields to update
    const updatedFields = {
      title,
      description,
      tags,
      ...(allImages.length && { images: allImages }), // Merge existing and new images
    };


    const car = await Car.findOneAndUpdate(
      { _id: id, userId },
      updatedFields,
      { new: true }
    );

    if (!car) return res.status(404).json({ message: "Car not found or not authorized" });
    res.status(200).json({ message: "Car updated successfully", car });
  } catch (error) {
    res.status(500).json({ message: "Error updating car", error: error.message });
  }
};

// 5. Delete a car and its images from Cloudinary
export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const car = await Car.findOneAndDelete({ _id: id, userId });

    if (!car) return res.status(404).json({ message: "Car not found or not authorized" });

    

    res.status(200).json({ message: "Car and images deleted successfully" });
  } catch (error) {
    
    res.status(500).json({ message: "Error deleting car", error: error.message });
  }
};

// 6. Search cars globally (across all users)
export const searchCars = async (req, res) => {
  try {
    const { keyword } = req.query;

    const cars = await Car.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { tags: { $regex: keyword, $options: "i" } },
      ],
    });

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error searching cars", error: error.message });
  }
};
