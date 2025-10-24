import { inngest } from "./client";
import {generateText} from "ai"
import {createGoogleGenerativeAI} from "@ai-sdk/google"
import * as Sentry from "@sentry/nextjs";
const google = createGoogleGenerativeAI()
export const execute = inngest.createFunction(

  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ step }) => {
    await step.sleep("pretend","1s");
    Sentry.logger.info('User triggered test log', { log_source: 'sentry_test' })
    const {steps} = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.0-flash"),
        system: "You are a helpful assistant",
        prompt: "what is the capital of france?",
         experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    )
    return steps;
  },
);