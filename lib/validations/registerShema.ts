import { z } from "zod";


export const RegisterSchema = z
  .object({
    businessName: z.string().min(2, "Business name is required"),
    officeAddress: z.string().min(2, "Office address is required"),
    postCode: z.string().min(3, "Post code is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
