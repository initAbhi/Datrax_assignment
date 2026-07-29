import { z } from 'zod';
import { ChangeType } from '../types/enums';

export const createRequestSchema = z.object({
  itemId: z.string().min(1, 'Please select an item'),
  changeType: z.nativeEnum(ChangeType),
  newValue: z.string().min(1, 'New value is required'),
  reason: z.string().min(1, 'Reason is required'),
});

export type CreateRequestFormData = z.infer<typeof createRequestSchema>;
