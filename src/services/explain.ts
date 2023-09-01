import type { ChatCompletionMessage } from "openai/resources/chat"

import { getClient as getOpenaiClient } from "./openai"
import { getOptions } from "./options"

// get explain stream with openai
export const getExplainStreamWithOpenai = async (text: string) => {
  const client = getOpenaiClient()
  const options = getOptions()

  const messages: ChatCompletionMessage[] = [
    { role: "system", content: options.openai_explain_prompt },
    { role: "user", content: text }
  ]

  const stream = await client.chat.completions.create({
    messages: messages,
    stream: true,
    model: options.openai_explain_model,
    temperature: options.openai_explain_temperature
  })

  return stream
}
