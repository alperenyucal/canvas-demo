import { Shape } from "./Shape";

export class Rectangle implements Shape {
  radius = 0;
  fillStyle?: string;

  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number,
    public id: string
  ) {}

  getDiff(x: number, y: number): { dx: number; dy: number } {
    return { dx: x - this.x, dy: y - this.y };
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.roundRect(this.x, this.y, this.w, this.h, this.radius);
    context.strokeStyle = this.fillStyle || "rgba(52, 73, 94, 1)";
    context.lineWidth = 1;
    context.stroke();
  }

  isPointInside(x: number, y: number) {
    return (
      x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h
    );
  }

  highlight(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.rect(this.x - 2, this.y - 2, this.w + 4, this.h + 4);
    context.strokeStyle = "rgba(30, 139, 195, 0.5)";
    context.lineWidth = 2;
    context.stroke();
  }

  select(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.rect(this.x, this.y, this.w, this.h);
    context.fillStyle = "rgba(30, 139, 195, 0.5)";
    context.fill();
  }

  move(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  resize(x: number, y: number) {
    this.w = x - this.x;
    this.h = y - this.y;
  }
}
