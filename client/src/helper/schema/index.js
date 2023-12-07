import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z.string().min(4, 'Username doit contenir au moins 4 characters'),
    email: z.string().email({ message: 'Adresse mail invalide' }),
    password: z.string().min(6, { message: 'Password must be atleast 6 characters' }),
    confirmPassword: z.string().min(1, { message: 'Passwords must match' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  });

export const loginSchema = z.object({
  username: z.string().min(4, 'Username doit contenir au moins 4 characters'),
  password: z.string().min(6, { message: 'Password must be atleast 6 characters' }),
});
