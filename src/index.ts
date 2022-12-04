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
      "84d1db61bc0f126c9abbc51cfbf770685e31976b9796f73f2d4c60f6aa83e61f6e10ed4040956b60500dc522405f0da45f0fe596b6f8ee1245ea0168abc009f6f7706d8dc062625e57d836250a8c06be83c5624b1ac8c7965645ee3e9f03c93b03765dbe1747d9-2c95930c258b458ad510b5e6180c339e",
    modelViewUrl: "https://sdeuc1.eu-central-1.shapediver.com",
    id: "mySession"
  });
})();
