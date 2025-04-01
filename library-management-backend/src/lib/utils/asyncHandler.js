//Global Async Handler for error handling

const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch((err) => {
                // Set the status code to indicate an error
                res.status(500).json({
                    statusCode: 500,
                    success: false,
                    error: 'Internal server error',
                    message: err.message
                });
            });
    };
};

export default asyncHandler;