import { Application } from "pixi.js";
import { CanvasElement } from "../Elements/CanvasElement";
import { BaseRenderer } from "../Renderers/BaseRenderer";

export class ElementTreeRenderer extends BaseRenderer {
  elementTree: Record<string, CanvasElement>;

  constructor(
    public app: Application,
    elementTree: Record<string, CanvasElement>
  ) {
    super(app);
    this.elementTree = elementTree;
  }

  draw = () => {
    Object.values(this.elementTree).forEach((element) => {
      element.draw(this.app);
    });
  };
}
