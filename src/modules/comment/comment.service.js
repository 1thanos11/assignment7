import { User } from "../../DB/models/user/user.model.js";
import { Post } from "../../DB/models/post/post.model.js";
import { Comment } from "../../DB/models/comment/comment.model.js";
import { Op } from "sequelize";

//create
export const create = async (inputs) => {
  const { content, postId, userId } = inputs;
  const comments = await Comment.bulkCreate(inputs, {
    validate: true,
  });

  return comments;
};

//update
export const updateContent = async (inputs) => {
  const { content, commentId, userId, postId } = inputs;
  const checkUserExist = await User.findByPk(userId);
  const checkPostExist = await Post.findByPk(postId);
  if (!checkUserExist || !checkPostExist) {
    throw new Error("user or post not exist");
  }

  const result = await Comment.update(
    { content },
    {
      where: {
        id: commentId,
        postId,
        userId,
      },
    },
  );
  if (result[0] === 0) {
    throw new Error("something went wrong", { cause: { status: 400 } });
  }

  return result;
};

//search
export const search = async (key) => {
  const comments = await Comment.findAndCountAll({
    where: {
      content: { [Op.substring]: key },
    },
  });
  if (comments.count === 0) {
    throw new Error("No comments found", { cause: { status: 404 } });
  }

  return comments;
};
