import { sendToBackground } from "@plasmohq/messaging"

window.addEventListener("mouseup", (e) => {
  const selectedText = window.getSelection().toString()
  // when text was selected, tell background to build panel
  if (selectedText) {
    sendToBackground({
      name: "buildPanel",
      body: {
        text: selectedText,
        position: {
          x: e.pageX,
          y: e.pageY
        }
      }
    })
  }
})
