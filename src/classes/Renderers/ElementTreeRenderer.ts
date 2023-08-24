import { CanvasElement } from "../Elements/CanvasElement";
import { BaseRenderer } from "../Renderers/BaseRenderer";

export class ElementTreeRenderer extends BaseRenderer {
  elementTree: Record<string, CanvasElement>;

  constructor(
    public canvas: HTMLCanvasElement,
    elementTree: Record<string, CanvasElement>
  ) {
    super(canvas);
    this.elementTree = elementTree;
  }

  draw = () => {
    this.clear();
    Object.values(this.elementTree).forEach((element) => {
      element.draw(this.context);
    });
  };
}
