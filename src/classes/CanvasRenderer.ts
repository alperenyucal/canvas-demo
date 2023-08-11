import { Rectangle } from "./Rectangle";
import { Shape } from "./Shape";

export class CanvasRenderer {
  selectedElement: Shape | null = null;
  highlightedElement: Shape | null = null;
  elementTree: Record<string, Shape> = {};
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
    this.selectedElement?.select(this.context);
    this.renderCount++;
  };

  addElement(element: Shape) {
    this.elementTree[element.id] = element;
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

  removeElement(element: Shape) {
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

  updateRectangleProperties({
    x,
    y,
    w,
    h,
    r,
  }: {
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    r?: number;
  }) {
    if (this.selectedElement instanceof Rectangle) {
      if (x !== undefined) this.selectedElement.x = x;
      if (y !== undefined) this.selectedElement.y = y;
      if (w !== undefined) this.selectedElement.w = w;
      if (h !== undefined) this.selectedElement.h = h;
      if (r !== undefined) this.selectedElement.radius = r;
      this.draw();
    }
  }
}
