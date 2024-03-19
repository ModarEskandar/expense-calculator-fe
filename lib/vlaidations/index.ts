import { coerce, number, preprocess, string, z } from "zod";

export const SignupSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "the name is too short" })
      .max(50, { message: "the name is too long" }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be 6 charecters at least" }),
    passwordConfirm: z
      .string()
      .min(6, { message: "Password must be 6 charecters at least" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Password don't match",
  });

  export const RestPasswordSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be 6 charecters at least" }),
    passwordConfirm: z
      .string()
      .min(6, { message: "Password must be 6 charecters at least" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Password don't match",
  });

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be 6 charecters at least" }),
});

export const ExpenseSchema = z.object({
  name: string({ required_error: 'Name is required' }).min(2, { message: "the name is too short" })
  .max(50, { message: "the name is too long" }),
    date: coerce.date(
        { required_error: 'Date is required' }
    ),
    
    amount: preprocess((a) => parseInt(z.string().parse(a),10),
    number().gte(0, 'Must be 0 and above'))
      ,
      category: string({ required_error: 'Category is required' }),
      description: string().optional(),
      user : string({ required_error: 'User is required' }),
});