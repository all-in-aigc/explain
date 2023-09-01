import { sendToContentScript, type PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.Handler = async (req, res) => {
  // tell content to build explain panel
  sendToContentScript({
    name: "buildExplainPanel",
    body: req.body
  })
}

export default handler
