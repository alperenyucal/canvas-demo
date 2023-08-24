import { CanvasElement } from "../Elements/CanvasElement";
import _ from "lodash";
import { BaseRenderer } from "./BaseRenderer";

export class ActionRenderer extends BaseRenderer {
  selectedElement: CanvasElement | null;
  highlightedElement: CanvasElement | null;

  constructor(
    public canvas: HTMLCanvasElement,
    selectedElement: CanvasElement | null,
    highlightedElement: CanvasElement | null
  ) {
    super(canvas);
    this.selectedElement = selectedElement;
    this.highlightedElement = highlightedElement;
  }

  draw() {
    this.highlightedElement?.highlight(this.context);
    if (this.highlightedElement && !this.selectedElement) {
      // set cursor to pointer
      this.canvas.style.cursor = "pointer";
    } else {
      this.canvas.style.cursor = "default";
    }
    this.selectedElement?.select(this.context);
  }
}
