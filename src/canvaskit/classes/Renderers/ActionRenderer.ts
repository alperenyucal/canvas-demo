import { CanvasElement } from "../Elements/CanvasElement";
import _ from "lodash";
import { BaseRenderer } from "./BaseRenderer";
import { Surface } from "canvaskit-wasm";

export class ActionRenderer extends BaseRenderer {
  selectedElement: CanvasElement | null;
  highlightedElement: CanvasElement | null;

  constructor(
    public surface: Surface,
    selectedElement: CanvasElement | null,
    highlightedElement: CanvasElement | null
  ) {
    super(surface);
    this.selectedElement = selectedElement;
    this.highlightedElement = highlightedElement;
  }

  draw() {
    this.highlightedElement?.highlight(this.surface);
    // if (this.highlightedElement && !this.selectedElement) {
    //   // set cursor to pointer
    //   this.canvas.style.cursor = "pointer";
    // } else {
    //   this.canvas.style.cursor = "default";
    // }
    this.selectedElement?.select(this.surface);
  }
}
