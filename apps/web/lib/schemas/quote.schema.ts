import { z } from "zod";

// TODO: Phase 2 — this schema is the source of truth for the owner-operator application form.
// When you build the NestJS backend, export this as a shared type via packages/shared
// and use it as the DTO validation source with class-validator.
export const applicationFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  // NOTE: Use z.e164() or a custom regex for stricter validation if needed
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.email("Enter a valid email address"),
  yearsOfExperience: z
    .number({ message: "Enter a valid number" })
    .min(0, "Must be 0 or more")
    .max(60, "Must be 60 or less"),
  equipmentType: z.string().min(2, "Equipment type is required"),
});

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;
