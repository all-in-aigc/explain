import type { PlasmoMessaging } from "@plasmohq/messaging"

import { getExplainStreamWithOpenai } from "~services/explain"
import { getOptions } from "~services/options"

// explain selected text
const handler: PlasmoMessaging.PortHandler = async (req, res) => {
  const { text } = req.body
  if (!text) {
    return
  }

  const options = getOptions()

  if (options.explain_llm === "openai") {
    // use openai for explain llm
    const stream = await getExplainStreamWithOpenai(text)
    for await (const part of stream) {
      const reply = part.choices[0]?.delta?.content
      res.send({
        text: reply
      })
    }
  }
}

export default handler
