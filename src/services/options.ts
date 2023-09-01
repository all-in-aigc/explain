import type { Options } from "~types/options"

// get options for explain
export const getOptions = (): Options => {
  let defaultOptions: Options = {
    explain_menu_title: "Explain it",
    explain_on_selected: false,
    explain_llm: "openai",
    openai_base_uri: "https://api.openai.com",
    openai_api_key: process.env.PLASMO_PUBLIC_OPENAI_API_KEY,
    openai_explain_model: "gpt-3.5-turbo",
    openai_explain_prompt: `Explain text put in user content, meaning or wiki info, as detail as possible.
Output chinese if text is chinese.`,
    openai_explain_temperature: 0.8
  }

  // todo: get custom options

  return defaultOptions
}
