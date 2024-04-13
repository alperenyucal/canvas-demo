import { Surface } from "canvaskit-wasm";
import { CanvasElement } from "../Elements/CanvasElement";
import { BaseRenderer } from "../Renderers/BaseRenderer";

export class ElementTreeRenderer extends BaseRenderer {
  elementTree: Record<string, CanvasElement>;

  constructor(
    public surface: Surface,
    elementTree: Record<string, CanvasElement>
  ) {
    super(surface);
    this.elementTree = elementTree;
  }

  draw = () => {
    this.clear();
    Object.values(this.elementTree).forEach((element) => {
      element.draw(this.surface);
    });
  };
}
