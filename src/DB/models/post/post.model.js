import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db.connection.js";
import { User } from "../user/user.model.js";

export class Post extends Model {}

Post.init(
  {
    id: {
      field: "p_id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      field: "p_title",
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "title can't be empty" },
      },
    },
    content: {
      field: "p_content",
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "content can't be empty" },
      },
    },
    authorID: {
      field: "p_author_id",
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

Post.belongsTo(User, {
  foreignKey: "authorID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Post, {
  foreignKey: "authorID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
