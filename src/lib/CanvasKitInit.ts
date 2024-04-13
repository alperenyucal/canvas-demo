import CanvasKitInit from "canvaskit-wasm";

export const CanvasKit = await CanvasKitInit({
  locateFile: (file) => "/node_modules/canvaskit-wasm/bin/" + file,
});
