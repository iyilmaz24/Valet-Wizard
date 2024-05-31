import { z } from "zod";

export const carIdSchema = z.string().cuid();

export const carFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Must be atleast 3 characters long" })
    .max(100),
  ownerName: z
    .string()
    .trim()
    .min(2, { message: "Must be atleast 2 characters long" })
    .max(100),
  imageUrl: z.union([
    z.literal(""),
    z.string().trim().url({ message: "Please provide a valid image URL" }),
  ]),
  age: z.coerce
    .number()
    .int()
    .min(1950, { message: "Year must be greater than 1950" })
    .max(new Date().getFullYear() + 2, {
      message: `Year must be less than ${new Date().getFullYear() + 2}`,
    }),
  notes: z.union([
    z.literal(""),
    z
      .string()
      .trim()
      .max(300, { message: "Notes must be less than 300 characters long" }),
  ]),
});
// .transform((data) => ({
//   // if no imageUrl provided, set as empty string to prevent error on form submit
//   ...data,
//   imageUrl: data.imageUrl || "",
// })); // CURRENTLY DEPRECATED: useForm getValues() method will not run the transform function

export type TCarForm = z.infer<typeof carFormSchema>;

export const authSchema = z.object({
  email: z.string().email().max(40),
  password: z.string().min(4).max(40),
});

export type TAuthLogin = z.infer<typeof authSchema>;
