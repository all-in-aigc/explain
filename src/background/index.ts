import { sendToContentScript } from "@plasmohq/messaging"

import { getOptions } from "~services/options"

export {}

const explainMenuId = "explain"

chrome.runtime.onInstalled.addListener(() => {
  const options = getOptions()

  chrome.contextMenus.create({
    id: explainMenuId,
    title: options.explain_menu_title,
    contexts: ["selection"]
  })
})

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === explainMenuId) {
    sendToContentScript({
      name: "showExplainPanel",
      body: {}
    })
  }
})
