export const errorMiddleware = (error, req, resp, next) => {
    error.message = error.message || "Internal Server Error"

    
    resp.status(404).json({
        success: false,
        message: error
    })
}