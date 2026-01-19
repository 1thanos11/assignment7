import { Router } from "express";
import { findByEmail, getByID, updateProfile } from "./user.service.js";
const router = Router();

//update
router.patch("/update/:userID", async (req, res, next) => {
  const { name, email, password } = req.body;
  const { userID } = req.params;
  const result = await updateProfile({ name, email, password, userID });

  res
    .status(201)
    .json({ message: "user updated or created successfully", result });
});

//find by email

router.get("/by-email", async (req, res, next) => {
  const { email } = req.query;
  const user = await findByEmail(email);

  res.status(200).json({ message: "Done", user });
});

//get by id
router.get("/get/:userID", async (req, res, next) => {
  const { userID } = req.params;
  const user = await getByID(userID);

  res.status(200).json({ message: "Done", user });
});

export default router;
