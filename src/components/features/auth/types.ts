import { z } from "zod";

export const AuthSignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type AuthSignInSchemaType = z.infer<typeof AuthSignInSchema>;

export const AuthSignUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      if (data.confirmPassword === undefined) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type AuthSignUpSchemaType = z.infer<typeof AuthSignUpSchema>;
