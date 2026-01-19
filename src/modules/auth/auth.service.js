import { User } from "../../DB/models/user/user.model.js";

//signup
export const signup = async (inputs) => {
  const { name, email, password } = inputs;

  const isExist = await User.findOne({
    where: {
      email,
    },
  });
  if (isExist) {
    throw new Error("email exist", { cause: { status: 409 } });
  }

  const user = User.build({ name, email, password });
  await user.save();

  return user;
};
