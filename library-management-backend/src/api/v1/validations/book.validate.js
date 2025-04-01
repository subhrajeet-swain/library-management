import Joi from 'joi';

// Create book validation schema
export const createBookSchema = Joi.object({
    title: Joi.string()
        .required()
        .trim()
        .min(1)
        .max(255)
        .messages({
            'string.empty': 'Title cannot be empty',
            'string.min': 'Title must be at least 1 character long',
            'string.max': 'Title cannot exceed 255 characters',
            'any.required': 'Title is required'
        }),

    author: Joi.string()
        .required()
        .trim()
        .min(1)
        .max(255)
        .messages({
            'string.empty': 'Author cannot be empty',
            'string.min': 'Author must be at least 1 character long',
            'string.max': 'Author cannot exceed 255 characters',
            'any.required': 'Author is required'
        }),

    genre: Joi.string()
        .trim()
        .max(255)
        .allow(null, '')
        .messages({
            'string.max': 'Genre cannot exceed 255 characters'
        }),

    description: Joi.string()
        .trim()
        .allow(null, '')
        .messages({
            'string.base': 'Description must be a string'
        })
});

// Update book validation schema (similar to create but all fields optional)
export const updateBookSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(1)
        .max(255)
        .messages({
            'string.empty': 'Title cannot be empty',
            'string.min': 'Title must be at least 1 character long',
            'string.max': 'Title cannot exceed 255 characters'
        }),

    author: Joi.string()
        .trim()
        .min(1)
        .max(255)
        .messages({
            'string.empty': 'Author cannot be empty',
            'string.min': 'Author must be at least 1 character long',
            'string.max': 'Author cannot exceed 255 characters'
        }),

    genre: Joi.string()
        .trim()
        .max(255)
        .allow(null, '')
        .messages({
            'string.max': 'Genre cannot exceed 255 characters'
        }),

    description: Joi.string()
        .trim()
        .allow(null, '')
        .messages({
            'string.base': 'Description must be a string'
        })
});

// Param validation schema for ID
export const idParamSchema = Joi.object({
    id: Joi.string()
        .uuid()
        .required()
        .messages({
            'string.guid': 'Invalid ID format',
            'any.required': 'ID is required'
        })
});

// Validation middleware
export const validateRequest = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], { abortEarly: false });

        if (!error) return next();

        const errors = error.details.map(detail => detail.message);
        return res.status(400).json({
            statusCode: 400,
            success: false,
            error: 'Validation Error',
            message: errors
        });
    };
};
