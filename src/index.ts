import { createViewport, createSession } from "@shapediver/viewer";

(async () => {
  // create a viewport
  const viewport = await createViewport({
    canvas: document.getElementById("canvas") as HTMLCanvasElement,
    id: "myViewport"
  });

  // create a session
  const session = await createSession({
    ticket:
      "d4ed559232a32c7736939fbfeabb1c655157affd4d7438ee746aaa6bdd480d239527505c4018ff997a894881f95dffd3d0645510b52d950c329364527cad6c65b88a6ad3c93b8d5484d844771e08c0e91feb0ef3ec8e64bccfd947e3584f5db594f930366f7d48-f35cf89c2c59d28170e3138341bfd337-7516be37cb2d968a0b3c545baf3ae51e",
    modelViewUrl: "https://sdeuc1.eu-central-1.shapediver.com",
    id: "mySession"
  });
})();
