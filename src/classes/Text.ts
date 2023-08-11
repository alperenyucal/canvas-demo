import { Shape } from "./Shape";

export class Text implements Shape {
  fillStyle?: string;

  constructor(
    public x: number,
    public y: number,
    public text: string,
    public id: string
  ) {}

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.font = "12px Arial";
    context.fillStyle = this.fillStyle || "rgba(52, 73, 94, 1)";
    context.fillText(this.text, this.x, this.y);
  }

  isPointInside(x: number, y: number, context: CanvasRenderingContext2D) {
    const width = context.measureText(this.text).width;
    const height = context.measureText(this.text).actualBoundingBoxAscent;

    return (
      x >= this.x &&
      x <= this.x + width &&
      y >= this.y - height / 2 &&
      y <= this.y + height / 2
    );
  }

  highlight(context: CanvasRenderingContext2D) {
    context.beginPath();
    const width = context.measureText(this.text).width;
    const height = context.measureText(this.text).actualBoundingBoxAscent;
    context.rect(
      this.x - 2,
      this.y - 2 - height / 2,
      width + 2,
      height / 2 + 2
    );
    context.strokeStyle = "rgba(30, 139, 195, 0.5)";
    context.lineWidth = 2;
    context.stroke();
  }

  select(context: CanvasRenderingContext2D) {
    context.beginPath();
    const width = context.measureText(this.text).width;
    const height = context.measureText(this.text).actualBoundingBoxAscent;
    context.rect(this.x, this.y - height / 2, width, height / 2);
    context.fillStyle = "rgba(30, 139, 195, 0.5)";
    context.fill();
  }

  move(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  resize(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getDiff(x: number, y: number): { dx: number; dy: number } {
    return { dx: x - this.x, dy: y - this.y };
  }
}
