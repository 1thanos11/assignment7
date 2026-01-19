import { DataTypes, Model } from "sequelize";
import { Post } from "../post/post.model.js";
import { User } from "../user/user.model.js";
import { sequelize } from "../../db.connection.js";

export class Comment extends Model {}

Comment.init(
  {
    id: {
      field: "c_id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      field: "c_content",
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "comment can't be empty" },
      },
    },
    postId: {
      field: "c_post_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Post,
        key: "id",
      },
    },
    userId: {
      field: "c_author_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize: sequelize,
    paranoid: true,
  },
);

Comment.belongsTo(Post, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Comment.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
