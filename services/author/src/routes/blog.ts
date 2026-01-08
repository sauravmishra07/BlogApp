import express, { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";
import uploadFile from "../middleware/multer.js";
import { createBlog, updateBlog } from "../controllers/blog.js";

const router = express.Router();

router.post('/blog/new', isAuth, uploadFile, createBlog);
router.put('/blog/update/:id', isAuth, uploadFile, updateBlog);
export default router;