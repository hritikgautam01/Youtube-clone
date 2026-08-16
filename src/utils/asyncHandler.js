const asyncHandler = (requestHandler)=>{
    (req,res,next) =>{
        Promise.resolve(requestHandler(req,res, next)).catch((err) => next(err))
    }
}

export {asyncHandler}




// Ye async wala h, uper wala promises wala h - koi bhi use kar skte h 


// const asyncHandler = (fn) => async (req,res,next) => {
//     try{
//         await fn(req,res, next);
//     } catch (error){
//         res.status(error.code || 500).json({
//             success : false,
//             message: error.message
//         })
//     }
// }