import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/Apiresponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";


const generateAndRefreshTokens=async(userId)=>{
    try {

        const user=await User.findById(userId)
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()

        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken};
        
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating refresh and access token") 
    }
}

const registerUser=asyncHandler(async (req,res)=>{
    console.log("you have reached here0");
    const {fullname,email,password}=req.body;
    
 
    console.log("you have reached here");
 
    if([fullname,email,password].some((field)=>
    field?.trim()==="")
    ){
     throw new ApiError(400,"All fields are compulsory")
    }
 
    const existedUser=await User.findOne({
    email 
    })
 
    if(existedUser){
     throw new ApiError(409,"User with email already existed ")
    }
 
    // talking to dbms to create an entry
 
    const user =await  User.create({
     fullname,
     email,
     password,
    })
 
    const createdUser=await User.findById(user._id).select("-password -refreshToken" )// in select - represent which we dont want 
 
    if(!createdUser)
    {
     throw new ApiError(500,"Something went wrong wile registering")
    }
 
    return res.status(200).json(
     new ApiResponse(200,createdUser,"User registered successfully")
     )
})



const loginUser=asyncHandler(async (req,res)=>{
    
    const {loginpassword,loginemail}=req.body;
    const email=loginemail;
    const password=loginpassword;
    if( !email)
    {
        throw new ApiError(400," email is required");
    }

    const user=await User.findOne({
        email
    })

    if(!user)
    {
        throw new ApiError(401,"Invalid user credentials")
    }

    const isPasswordValid=user.isPasswordCorrect(password)

    if(!isPasswordValid)
    {
        throw new ApiError(401,"Invalid user credentials")
    }

    const {accessToken,refreshToken}=await generateAndRefreshTokens(user._id);

    const loggedInUser=await User.findById(user._id).select("-password -refreshToken");

    const options={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,accessToken,refreshToken
            },
            "User logged in Successfully"
        )
    )

})


const logoutUser=asyncHandler(async(req,res)=>{

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true,
        }
    )

    const options={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out"))

})

const getCurrentUser=asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})


export {registerUser,loginUser,logoutUser, getCurrentUser}
 