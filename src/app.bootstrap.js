import { PORT } from "../config/config.service.js";
import express from "express";
import { DBauthoticate, DBsync } from "./DB/db.connection.js";
import {
  authRouter,
  userRouter,
  postRouter,
  commentRouter,
} from "./modules/index.js";
// import { User } from "./DB/models/user/user.model.js";

async function bootstrap() {
  await DBauthoticate();
  await DBsync();

  const app = express();
  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/post", postRouter);
  app.use("/comment", commentRouter);

  app.use((err, req, res, next) => {
    const status = err.cause?.status ?? 500;
    const error = err.name.includes("Sequelize")
      ? err.errors[0].message
      : err.message;
    res.status(status).json({ error, err });
  });
  app.listen(PORT, () => {
    console.log(`Server Is Running On PORT ${PORT} 🚀`);
  });
}

export default bootstrap;
