import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db.connection.js";

export class User extends Model {
  checkNameLength() {
    if (this.name.length <= 2) {
      throw new Error("the name must be greater than 2 characters", {
        cause: { status: 400 },
      });
    }
  }
}

User.init(
  {
    id: {
      field: "u_id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      field: "u_name",
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "name can't be empty" },
      },
    },
    email: {
      field: "u_email",
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: { msg: "enter a valid email format" },
        notEmpty: { msg: "email can't be empty" },
      },
    },
    password: {
      field: "u_password",
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          msg: "password must be greater than 6 and less than 100",
          args: [6, 100],
        },
      },
    },
    role: {
      field: "u_role",
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
  },
  {
    sequelize: sequelize,
    paranoid: true,
    createdAt: "u_created_at",
    updatedAt: "u_updated_at",
  },
);

User.beforeCreate((user, options) => {
  user.checkNameLength();
});
