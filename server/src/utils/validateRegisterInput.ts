import { RegisterInput } from "../types/RegisterInput";
export const validateRegisterInput = (registerInput: RegisterInput) => {
//   var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
  if (!registerInput.email.includes("@"))
    return {
      message: "Invalid email",
      error: [
        {
          field: "email",
          message: "Invalid email",
        },
      ],
    };
  if (registerInput.username.length <= 5) {
    return {
      message: "Invalid username",
      error: [
        {
          field: "username",
          message: "Username must be at least 5 characters long",
        },
      ],
    };
  } 
//   else if (registerInput.username.match(format)) {
//     return {
//       message: "Invalid username",
//       error: [
//         {
//           field: "username",
//           message: "Username must not have special characters",
//         },
//       ],
//     };
//   }
  if (registerInput.password.length <= 6)
    return {
      message: "Invalid password",
      error: [
        {
          field: "password",
          message: "password must be at least 6 characters long",
        },
      ],
    };

  return null;
};
