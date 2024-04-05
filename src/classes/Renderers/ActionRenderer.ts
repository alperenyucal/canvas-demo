import { CanvasElement } from "../Elements/CanvasElement";
import _ from "lodash";
import { BaseRenderer } from "./BaseRenderer";
import { Application } from "pixi.js";

export class ActionRenderer extends BaseRenderer {
  selectedElement: CanvasElement | null;
  highlightedElement: CanvasElement | null;

  constructor(
    public app: Application,
    selectedElement: CanvasElement | null,
    highlightedElement: CanvasElement | null
  ) {
    super(app);
    this.selectedElement = selectedElement;
    this.highlightedElement = highlightedElement;
  }

  draw() {
    this.highlightedElement?.highlight(this.app);
    if (this.highlightedElement && !this.selectedElement) {
      // set cursor to pointer
      this.app.canvas.style.cursor = "pointer";
    } else {
      this.app.canvas.style.cursor = "default";
    }
    this.selectedElement?.select(this.app);
  }
}
