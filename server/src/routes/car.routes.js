import express from "express";
import { addCar, updateCar,getUserCars,getCarDetails ,deleteCar,searchCars} from "../controllers/car.controller.js";

import {verifyJWT} from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();
// console.log("verification pending")
// router.use(verifyJWT); 
// console.log("verified")

// Routes for creating and updating cars with image upload
router.post("/" , verifyJWT,upload.array("images",10),addCar);      // Add a new car with images
router.put("/:id",verifyJWT, upload.array("images", 10), updateCar); // Update a car's details and images

// Routes for other actions (no multer needed here)

router.get("/mycars",verifyJWT,  getUserCars);           // Get all cars of the logged-in user
router.get("/:id",verifyJWT,  getCarDetails);            // Get details of a specific car
router.delete("/:id",verifyJWT,  deleteCar);             // Delete a specific car
router.get("/search",searchCars);            // Search cars globally

export default router;
