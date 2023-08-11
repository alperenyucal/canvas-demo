import { CanvasElement } from "./CanvasElement";
import { Circle, CircleProperties } from "./Circle";
import { Rectangle, RectangleProperties } from "./Rectangle";
import { TextElement, TextProperties } from "./TextElement";

export class CanvasRenderer {
  selectedElement: CanvasElement | null = null;
  highlightedElement: CanvasElement | null = null;
  elementTree: Record<string, CanvasElement> = {};
  renderCount = 0;
  mousePosition: { x: number; y: number } = { x: 0, y: 0 };

  constructor(public canvas: HTMLCanvasElement) {
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
  }

  get context() {
    return this.canvas.getContext("2d")!;
  }

  setDPI(dpi: number) {
    // Set up CSS size.
    this.canvas.style.width =
      this.canvas.style.width || this.canvas.width + "px";
    this.canvas.style.height =
      this.canvas.style.height || this.canvas.height + "px";

    // Resize canvas and scale future draws.
    const scaleFactor = dpi / 96;
    this.canvas.width = Math.ceil(this.canvas.width * scaleFactor);
    this.canvas.height = Math.ceil(this.canvas.height * scaleFactor);
    this.context.scale(scaleFactor, scaleFactor);
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.setDPI(324);
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
  }

  draw = () => {
    this.clear();
    Object.values(this.elementTree).forEach((element) => {
      element.draw(this.context);
    });
    this.highlightedElement?.highlight(this.context);
    if (this.highlightedElement && !this.selectedElement) {
      // set cursor to pointer
      this.canvas.style.cursor = "pointer";
    } else {
      this.canvas.style.cursor = "default";
    }
    this.selectedElement?.select(this.context);
    this.renderCount++;
  };

  addElement(element: CanvasElement) {
    this.elementTree[element.id] = element;
    this.selectedElement = element;
    this.draw();
  }

  moveElement(dx: number, dy: number) {
    if (!this.selectedElement) return;
    this.selectedElement.move(
      this.mousePosition.x - dx,
      this.mousePosition.y - dy
    );
    this.draw();
  }

  removeElement(element: CanvasElement) {
    this.selectedElement = null;
    delete this.elementTree[element.id];
    this.draw();
  }

  getElementAtPosition(x: number, y: number) {
    const elements = Object.values(this.elementTree);
    for (let i = elements.length - 1; i >= 0; i--) {
      if (elements[i].isPointInside(x, y, this.context)) {
        return elements[i];
      }
    }
    return null;
  }

  selectElement() {
    this.selectedElement = this.getElementAtPosition(
      this.mousePosition.x,
      this.mousePosition.y
    );
    this.draw();
  }

  highlightElement() {
    if (
      this.highlightedElement?.id !==
      this.getElementAtPosition(this.mousePosition.x, this.mousePosition.y)?.id
    ) {
      this.highlightedElement = this.getElementAtPosition(
        this.mousePosition.x,
        this.mousePosition.y
      );
      this.draw();
    }
  }

  updateElementProperties<T = {}>(properties: Partial<T>) {
    if (!this.selectedElement) return;
    this.selectedElement.setProperties(properties);
    this.draw();
  }

  updateRectangleProperties(properties: Partial<RectangleProperties>) {
    if (!this.selectedElement || !(this.selectedElement instanceof Rectangle))
      return;
    this.updateElementProperties<RectangleProperties>(properties);
  }

  updateCircleProperties(properties: Partial<CircleProperties>) {
    if (!this.selectedElement || !(this.selectedElement instanceof Circle))
      return;
    this.updateElementProperties<CircleProperties>(properties);
  }

  updateTextProperties(properties: Partial<TextProperties>) {
    if (!this.selectedElement || !(this.selectedElement instanceof TextElement))
      return;
    this.updateElementProperties<TextProperties>(properties);
  }
}
