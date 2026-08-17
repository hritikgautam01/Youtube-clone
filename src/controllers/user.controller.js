import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // Get user details from frontend
    const { fullname, email, username, password } = req.body;

    // Cheaking for validation
    // if(fullname === "") throw new ApiError(400, "Fullname is required")
    // Iss tarah se saari fields ke liye validation lga do ek ek kar ke

    // Better way
    if (
        [fullname, email, username, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists
    const existedUser = User.findOne({
        $or: [{ username }, { email }],
    });
    if (existedUser)
        throw new ApiError(409, "User with email or username already exists");


    // Images and avatar checking
    const avatarLocalPath = req.files?.avatar[0]?.path 
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }



    // Upload them on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)



    // Check whether avatar is there 
    if(!avatar)
        throw new ApiError(400, "Avatar file is required")



    // Create object and make entry in db 
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })



    // Check if user is created
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    
    if(!createdUser)
        throw new ApiError(500, "Something went wrong while registering a user")

    
    // return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )



});

export { registerUser };
