import express from 'express';

import { getUserProfile, loginUser, myProfile, updateUser,  } from '../controllers/user.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

router.post("/login", loginUser);
router.get("/profile", isAuth, myProfile );
router.get("/user/:id", isAuth, getUserProfile);
router.put("/user/update", isAuth, updateUser);

export default router;