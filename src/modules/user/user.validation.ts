import { z } from "zod";

export const RoleEnum = z.enum(["SUPER_ADMIN", "ADMIN", "GUIDE", "USER"]);

export const IsActiveEnum = z.enum(["ACTIVE", "INACTIVE", "PENDING", "SUSPENDED", "BANNED"]);

export const AuthProviderSchema = z.object({
  provider: z.string().min(1, "Provider is required"),
  providerid: z.string().min(1, "Provider ID is required"),
});

export const UserSchema = z.object({
  name: z.string({error:""}),
  email: z.email(),
  password: z.string().optional(),
  phone: z.string().optional(),
  picture: z.string().describe("enter your picture").optional(),
  address: z.string().optional(),
  isDeleted: z.string().optional(),
  isActive: IsActiveEnum.optional(),
  isVerified: z.string().optional(),
  // role: RoleEnum,
  // auths: z.array(AuthProviderSchema).optional(),
  bookings: z.array(z.any()).optional(),
  guides: z.array(z.any()).optional(),
});
