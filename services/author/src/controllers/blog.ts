import type { AuthenticatedRequest } from "../middleware/isAuth.js";
import getBuffer from "../utils/dataUri.js";
import { sql } from "../utils/db.js";
import TryCatch from "../utils/TryCatch.js";
import { v2 as cloudinary } from "cloudinary";

export const createBlog = TryCatch(async (req: AuthenticatedRequest, res) => {
    const { title, description, blogcontent, category } = req.body;

    const file = req.file;

    if (!file) {
        res.status(400).json({
            message: "❌ No file to Upload",
        });
        return;
    }

    const fileBuffer = getBuffer(file);

    if (!fileBuffer) {
        res.status(400).json({
            message: "❌ Failed to generate file buffer",
        });
        return;
    }

    const cloud = await cloudinary.uploader.upload(
        fileBuffer.content as string,
        {
            folder: "blog_images",
        }
    );

    const result = await sql`
    INSERT INTO blogs (author_id, title, description, blogcontent, image, category) VALUES (${req.user?._id}, ${title}, ${description}, ${blogcontent}, ${cloud.secure_url}, ${category}) RETURNING *`;

    res.status(200).json({
        message: "✅ Blog created successfully",
        blog: result[0],
    });
});
