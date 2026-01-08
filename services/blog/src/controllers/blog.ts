import { sql } from "../utils/db.js";
import TryCatch from "../utils/TryCatch.js";
import axios from "axios";

export const getAllBlogs = TryCatch(async (req, res) => {
  const { searchQuery, category } = req.query;

  let blogs;

  if (searchQuery && category) {
    blogs = await sql`SELECT * FROM blogs WHERE title ILIKE ${
      "#" + searchQuery + "%"
    } OR description ILIKE ${"%" + searchQuery + "%"} OR category ILIKE ${
      "%" + category + "%"
    } ORDER BY created_at DESC`;
  } else if (searchQuery) {
    blogs = await sql`SELECT * FROM blogs WHERE title ILIKE ${
      "#" + searchQuery + "%"
    } OR description ILIKE ${"%" + searchQuery + "%"} ORDER BY created_at DESC`;
  } else if (category) {
    blogs = await sql`SELECT * FROM blogs WHERE category ILIKE ${
      "%" + category + "%"
    } ORDER BY created_at DESC`;
  } else {
    blogs = await sql`SELECT * FROM blogs ORDER BY created_at DESC`;
  }

  res.status(200).json({
    message: "✅ Blogs fetched successfully",
    blogs: blogs,
  });
});
