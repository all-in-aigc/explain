import OpenAI from "openai"

import { getOptions } from "./options"

export const getClient = () => {
  const options = getOptions()

  const openai = new OpenAI({
    apiKey: options.openai_api_key,
    dangerouslyAllowBrowser: true
  })

  return openai
}
