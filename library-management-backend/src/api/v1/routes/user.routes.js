import express from 'express';
import {
    registerController,
    loginController,
    getUserProfileController,
    updateUserController,
    deleteUserController
} from '../controllers/user.controller.js';
import {
    registerSchema,
    loginSchema,
    updateUserSchema,
    validateRequest
} from '../validations/user.validate.js';
import verifyToken from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/register',
    validateRequest(registerSchema),
    registerController
);

router.post('/login',
    validateRequest(loginSchema),
    loginController
);

// Protected routes
router.get('/profile',
    verifyToken,
    getUserProfileController
);

router.put('/update',
    verifyToken,
    validateRequest(updateUserSchema),
    updateUserController
);

router.delete('/delete',
    verifyToken,
    deleteUserController
);

export default router;
