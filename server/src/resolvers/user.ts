import { validateRegisterInput } from "../utils/validateRegisterInput";
import { RegisterInput } from "./../types/RegisterInput";
import { UserMutationRespone } from "./../types/UserMutationResponse";
import { User } from "./../entities/User";
import { Arg, Mutation, Resolver } from "type-graphql";
import argon2 from "argon2";

@Resolver()
export class UserResolver {
  @Mutation((_returns) => UserMutationRespone, { nullable: true })
  async register(
    @Arg("registerInput") registerInput: RegisterInput
  ): Promise<UserMutationRespone> {
    const validateRegisterInputErrors = validateRegisterInput(registerInput);
    if (validateRegisterInputErrors !== null)
      return { code: 400, success: false, ...validateRegisterInputErrors };
    try {
      const { username, email, password } = registerInput;
      const existingUser = await User.findOne({
        where: [{ username }, { email }],
      });
      if (existingUser)
        return {
          code: 400,
          success: false,
          message: "Duplicated email or username",
          errors: [
            {
              field: existingUser.username === username ? "username" : "email",
              message: `${
                existingUser.username === username ? "username" : "email"
              } already use`,
            },
          ],
        };

      const hasedPassword = await argon2.hash(password);

      const newUser = User.create({
        username,
        password: hasedPassword,
        email,
      });

      return {
        code: 200,
        success: true,
        message: "User resgistation successfull",
        user: await User.save(newUser),
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        success: false,
        message: `Interal server error ${error.message}`,
      };
    }
  }
}
