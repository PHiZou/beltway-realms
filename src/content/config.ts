import { defineCollection, z } from "astro:content";

const quests = defineCollection({
  type: "content",
  schema: z.object({
    id: z.string(),
    title: z.string(),
    region: z.string(),
    difficulty: z.string().optional().default("Medium"),
    tags: z.array(z.string()).optional().default([]),
    rewards: z.array(z.string()).optional().default([]),
    links: z.object({
      demo: z.string().optional().default(""),
      github: z.string().optional().default("")
    }).optional()
  })
});

export const collections = { quests };
