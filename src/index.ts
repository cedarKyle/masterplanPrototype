// Notes on CodeSandBox
// if you don't see a preview when you load this page for the first time, reload the browser tab to the right

import { 
    createSession,
    createViewport, 
    BUSY_MODE_DISPLAY, 
    FLAG_TYPE, 
    SPINNER_POSITIONING, 
    VISIBILITY_MODE 
  } from "@shapediver/viewer";

  (async () => {
    // create a viewport
    const viewport = await createViewport({
      canvas: document.getElementById("canvas") as HTMLCanvasElement,
      id: "myViewer"
    });
  // create a session
  const session = await createSession({
    ticket:
      "90377527eeeafdd35ed9c698d21b100d4c7388444aac60838be7ff176eed6b979a8c92632db8f3e96d76c913b5ee0c4ea4bec0908aed7b0fd358b690dd3dc23b39d86476293d56fab2f1ed07615095b459ee9c9e68f9718488a22111dbfb54e0d3f6b315174a46-15abf4140442e14d3fb0095c438c5939",
    modelViewUrl: "https://sdeuc1.eu-central-1.shapediver.com",
    id: "mySession"
  });
})();
