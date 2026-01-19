import { Router } from "express";
import { create, search, updateContent } from "./comment.service.js";
const router = Router();

//create
router.post("/create", async (req, res, next) => {
  const comments = await create(req.body);

  res.status(201).json({ message: "Done", comments });
});

//update
router.put("/update/:commentId", async (req, res, next) => {
  const { commentId } = req.params;
  const { content, postId, userId } = req.body;
  const result = await updateContent({ content, commentId, postId, userId });

  res.status(201).json({ message: "Done", result });
});

//search
router.get("/search", async (req, res, next) => {
  const { key } = req.query;
  const comments = await search(key);

  res.status(200).json({ message: "Done", comments });
});

export default router;
