import express from 'express';
const router = express.Router();
import v1Routes from './v1/index.js';

// Mount version-specific routes
router.use('/v1', v1Routes);

export default router;