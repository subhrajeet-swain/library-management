import Joi from 'joi';

// Registration validation schema
export const registerSchema = Joi.object({
    name: Joi.string()
        .required()
        .trim()
        .min(2)
        .max(50)
        .messages({
            'string.empty': 'Name cannot be empty',
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name cannot exceed 50 characters',
            'any.required': 'Name is required'
        }),

    email: Joi.string()
        .required()
        .trim()
        .email()
        .messages({
            'string.empty': 'Email cannot be empty',
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),

    password: Joi.string()
        .required()
        .min(6)
        .max(100)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'))
        .messages({
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password must be at least 6 characters long',
            'string.max': 'Password cannot exceed 100 characters',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
            'any.required': 'Password is required'
        }),

    confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref('password'))
        .messages({
            'any.only': 'Passwords do not match',
            'any.required': 'Password confirmation is required'
        })
});

// Login validation schema
export const loginSchema = Joi.object({
    email: Joi.string()
        .required()
        .trim()
        .email()
        .messages({
            'string.empty': 'Email cannot be empty',
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),

    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'Password cannot be empty',
            'any.required': 'Password is required'
        })
});

// Update user validation schema
export const updateUserSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .messages({
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name cannot exceed 50 characters'
        }),

    email: Joi.string()
        .trim()
        .email()
        .messages({
            'string.email': 'Please provide a valid email address'
        }),

    currentPassword: Joi.string()
        .when('newPassword', {
            is: Joi.exist(),
            then: Joi.required(),
            otherwise: Joi.forbidden()
        })
        .messages({
            'any.required': 'Current password is required to set new password'
        }),

    newPassword: Joi.string()
        .min(6)
        .max(100)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'))
        .messages({
            'string.min': 'New password must be at least 6 characters long',
            'string.max': 'New password cannot exceed 100 characters',
            'string.pattern.base': 'New password must contain at least one uppercase letter, one lowercase letter, and one number'
        }),

    confirmNewPassword: Joi.string()
        .valid(Joi.ref('newPassword'))
        .when('newPassword', {
            is: Joi.exist(),
            then: Joi.required(),
            otherwise: Joi.forbidden()
        })
        .messages({
            'any.only': 'New passwords do not match',
            'any.required': 'New password confirmation is required'
        })
}).min(1).messages({
    'object.min': 'At least one field must be provided for update'
});

// Updated Validation middleware
export const validateRequest = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], {
            abortEarly: false,
            stripUnknown: true
        });

        if (!error) return next();

        const validationErrors = {};
        error.details.forEach((detail) => {
            const key = detail.path[0];
            if (!validationErrors[key]) {
                validationErrors[key] = detail.message;
            }
        });

        return res.status(400).json({
            statusCode: 400,
            success: false,
            error: validationErrors,
            message: 'Validation Errors'
        });
    };
};
