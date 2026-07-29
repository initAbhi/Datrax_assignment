import { z } from "zod";
import { ChangeType } from "../entities/ChangeRequest";

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const createChangeRequestSchema = z.object({
  body: z.object({
    itemId: z.string().uuid("Invalid Item ID"),
    changeType: z.nativeEnum(ChangeType),
    oldValue: z.string().optional(),
    newValue: z.string().min(1, "New value is required"),
    reason: z.string().min(1, "Reason is required"),
  }),
});

export const updateChangeRequestStatusSchema = z.object({
  body: z.object({
    status: z.enum(["APPROVED", "REJECTED"]),
  }),
  params: z.object({
    id: z.string().uuid("Invalid Request ID"),
  }),
});
