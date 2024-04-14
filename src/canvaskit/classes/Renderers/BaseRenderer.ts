import { Surface } from "canvaskit-wasm";
import _ from "lodash";
import { CanvasKit } from "../../lib/CanvasKitInit";

export class BaseRenderer {
  renderCount = 0;
  fps = 0;
  lastLoop = new Date();

  constructor(public surface: Surface) {
    this.render();
  }

  clear() {
    this.surface.getCanvas().clear(CanvasKit.TRANSPARENT);
  }

  draw() {
    if (this.draw === undefined)
      throw new Error("draw() method not implemented");
  }

  render() {
    this.clear();
    this.draw();
    this.surface.flush();
    this.renderCount++;

    const currentLoop = new Date();
    this.fps = 1000 / (currentLoop.getTime() - this.lastLoop.getTime());
    this.lastLoop = currentLoop;
  }
}
