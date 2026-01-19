import { Op } from "sequelize";
import { Post } from "../../DB/models/post/post.model.js";
import { User } from "../../DB/models/user/user.model.js";
import { Comment } from "../../DB/models/comment/comment.model.js";

//create
export const create = async (inputs) => {
  const { title, content, authorID } = inputs;
  const isExist = await User.findByPk(authorID);
  if (!isExist) {
    throw new Error("invalid user id", { cause: { status: 404 } });
  }
  const post = new Post({ title, content, authorID: parseInt(authorID) });
  await post.save();

  return post;
};

//delete
export const deletePost = async (inputs) => {
  const { postId, userId } = inputs;

  const result = await Post.destroy({
    where: {
      [Op.and]: {
        id: postId,
        authorID: userId,
      },
    },
  });
  if (result == 0) {
    throw new Error(
      "invalid user id or post doesn't exist or you are not authorized",
      { cause: { status: 400 } },
    );
  }

  return result;
};

//get all
export const getAll = async () => {
  const posts = await Post.findAll({
    include: [
      { model: User, attributes: ["id", "name"] },
      { model: Comment, attributes: ["id", "content"] },
    ],
    attributes: ["id", "title"],
  });

  return posts;
};
