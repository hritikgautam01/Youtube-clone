class ApiError extends Error{
    constructor(
        statusCode, 
        message = "Something went wrong", 
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors




        // Ye agr samajh aaye to badhiya, naa aaye to copy paste kar do abhi ke liye to
        if(stack){
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}