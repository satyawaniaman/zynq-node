import { inngest } from "./client";
import {generateText} from "ai"
import {createGoogleGenerativeAI} from "@ai-sdk/google"

const google = createGoogleGenerativeAI()
export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ step }) => {
    const {steps} = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.0-flash"),
        system: "You are a helpful assistant",
        prompt: "what is the capital of france?",
      }
    )
    return steps;
  },
);