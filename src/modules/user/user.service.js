import { Post } from "../../DB/models/post/post.model.js";
import { User } from "../../DB/models/user/index.js";

//update
export const updateProfile = async (inputs) => {
  const { name, email, password, userID } = inputs;
  const updates = {};
  if (name) {
    updates.name = name;
  }
  if (email) {
    updates.email = email;
  }
  if (password) {
    updates.password = password;
  }
  const result = await User.update(updates, {
    where: {
      id: userID,
    },
    validate: false,
  });
  if (result[0] === 0) {
    throw new Error("User not found", { cause: { status: 404 } });
  }

  return result;
};

//find by email
export const findByEmail = async (email) => {
  const user = await User.findOne({
    where: {
      email,
    },
    attributes: { exclude: ["password", "deletedAt", "role"] },
    include: { model: Post, attributes: ["title", "content"] },
  });
  if (!user) {
    throw new Error("User not found", { cause: { status: 404 } });
  }

  return user;
};

//get by id
export const getByID = async (userID) => {
  const user = await User.findByPk(userID, {
    include: { model: Post, attributes: ["title", "content"] },
    attributes: { exclude: ["password", "role", "deletedAt"] },
  });
  if (!user) {
    throw new Error("User not found", { cause: { status: 404 } });
  }

  return user;
};
