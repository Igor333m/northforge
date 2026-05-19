import { z } from "zod";

// TODO: Phase 2 — this schema is the source of truth for the contact form.
// When you build the NestJS backend, export this as a shared type via packages/shared
// and use it as the DTO validation source with class-validator.
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional(),
  // NOTE: Use z.e164() or a custom regex for stricter validation if needed
  phone: z.string().min(10, "Enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
