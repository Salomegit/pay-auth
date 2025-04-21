import { z } from "zod";

const configSchema = z.object({
  BASE_URL: z.string().url().refine((url) => url.includes("localhost"), {
    message: "BASE_URL must include 'localhost'",
  }),
  BASE_URL_VERSION: z.string().regex(/^v\d+$/, {
    message: "VERSION must be in the format 'v<number>' (e.g. 'v1')",
  }),
});

const rawEnv = {
    

BASE_URL: process.env.BASE_URL , // Check both
BASE_URL_VERSION: process.env.BASE_URL_VERSION , // Check both
};


const parsed = configSchema.parse(rawEnv); // throws if invalid

console.log("Validated config:", parsed);


export const envConfig = parsed; // Use this in your application
export const FULL_BASE_URL = `${envConfig.BASE_URL}/${envConfig.BASE_URL_VERSION}`;
console.log("FULL_BASE_URL:", FULL_BASE_URL);