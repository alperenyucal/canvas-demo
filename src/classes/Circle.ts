import { Shape } from "./Shape";

export class Circle implements Shape {
  fillStyle?: string;

  constructor(
    public r: number,
    public cx: number,
    public cy: number,
    public id: string
  ) {}

  getDiff(x: number, y: number): { dx: number; dy: number } {
    return { dx: x - this.cx, dy: y - this.cy };
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.cx, this.cy, this.r, 0, 2 * Math.PI);
    context.strokeStyle = this.fillStyle || "rgba(52, 73, 94, 1)";
    context.lineWidth = 1;
    context.stroke();
  }

  isPointInside(x: number, y: number) {
    return Math.sqrt((x - this.cx) ** 2 + (y - this.cy) ** 2) <= this.r;
  }

  highlight(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.cx, this.cy, this.r + 2, 0, 2 * Math.PI);
    context.strokeStyle = "rgba(30, 139, 195, 0.5)";
    context.lineWidth = 2;
    context.stroke();
  }

  select(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.rect(this.cx - this.r, this.cy - this.r, 2 * this.r, 2 * this.r);
    context.fillStyle = "rgba(30, 139, 195, 0.5)";
    context.fill();
  }

  move(x: number, y: number) {
    this.cx = x;
    this.cy = y;
  }

  resize(x: number, y: number) {
    this.r = Math.sqrt((x - this.cx) ** 2 + (y - this.cy) ** 2);
  }
}
