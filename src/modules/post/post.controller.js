import { Router } from "express";
import { create, deletePost, getAll } from "./post.service.js";
const router = Router();

//create
router.post("/create/:authorID", async (req, res, next) => {
  const { authorID } = req.params;
  const { title, content } = req.body;
  const post = await create({ title, content, authorID: parseInt(authorID) });

  res.status(201).json({ message: "Done", post });
});

//delete
router.delete("/delete/:postId/:userId", async (req, res, next) => {
  const { postId, userId } = req.params;
  const result = await deletePost({ postId, userId });

  res.status(200).json({ message: "Done", result });
});

//get all
router.get("/get-all", async (req, res, next) => {
  const posts = await getAll();

  res.status(200).json({ message: "Done", posts });
});

export default router;
