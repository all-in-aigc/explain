import cssText from "data-text:~style.css"
import { useEffect, useState } from "react"

import { useMessage, usePort } from "@plasmohq/messaging/hook"

import { getOptions } from "~services/options"
import type { Position } from "~types/position"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export default () => {
  const [showPanel, setShowPanel] = useState(false)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [text, setText] = useState("")
  const [result, setResult] = useState("")

  const explainPort = usePort("explain")

  const doExplain = async (text: string) => {
    explainPort.send({
      text: text
    })
  }

  // receive message from background
  useMessage<string, string>(async (req, res) => {
    const options = getOptions()

    // buildExplain panel at the position where text was selected
    if (req.name === "buildExplainPanel") {
      const body = JSON.parse(JSON.stringify(req.body))
      if (!body.text) {
        return
      }

      setText(body.text)
      setPosition(body.position)

      // show explain panel immediately when text is selected
      if (options.explain_on_selected) {
        setShowPanel(true)
        doExplain(body.text)
      }
      return
    }

    // explain menu was clicked
    if (req.name === "showExplainPanel") {
      if (!text) {
        return
      }

      setShowPanel(true)
      doExplain(text)
    }
  })

  useEffect(() => {
    setResult("")
  }, [text])

  useEffect(() => {
    explainPort.listen((msg) => {
      if (msg.text !== undefined) {
        setResult((result) => (result += msg.text))
      }
    })
  }, [])

  return (
    <>
      {showPanel && (
        <div
          style={{
            position: "absolute",
            left: `${position.x}px`,
            top: `${position.y}px`
          }}>
          <div className="w-96 bg-white border border-slate-300 rounded-md">
            <div className="bg-slate-100 px-4 py-2">Explain</div>
            <div className="px-4 py-4">
              <div className="text-md my-2">{text}</div>
              <div
                className="text-md text-gray-500 overflow-y-auto"
                style={{ maxHeight: "300px" }}>
                {result}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
