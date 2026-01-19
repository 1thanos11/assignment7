import { Router } from "express";
import { signup } from "./auth.service.js";
const router = Router();

//signup
router.post("/signup", async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await signup({ name, email, password });

  res.status(201).json({ message: "user added successfully", user });
});

export default router;
