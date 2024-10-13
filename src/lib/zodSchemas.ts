import { z } from 'zod';

export const LoginSchema = z.object({
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: "Invalid Email address format" }),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(100, { message: "Password must be at most 100 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[@$!%*?&#]/, { message: "Password must contain at least one special character" })
});

export const RegistrationSchema = z.object({
    username: z
        .string()
        .min(3, { message: "Username must be atleast 3 characters long" })
        .max(20, { message: "Username must be atmost 20 characters long" })
        .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),

    collegeName: z
        .string()
        .min(2, { message: "College name must be atleast 2 characters long" })
        .max(100, { message: "College name must be atmost 100 characters long" }),

    phone: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, { message: "Phone number must be in a valid international format" }),

    email: z
        .string()
        .email({ message: "Invalid email address" })
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: "Invalid Email address format" }),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(100, { message: "Password must be at most 100 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[@$!%*?&#]/, { message: "Password must contain at least one special character" }),

    confirmPassword: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(100, { message: "Password must be at most 100 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[@$!%*?&#]/, { message: "Password must contain at least one special character" }),
})
    .refine(data => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: "Passwords do not match",
    });