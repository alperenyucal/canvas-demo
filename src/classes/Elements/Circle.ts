import { nanoid } from "nanoid";
import { Shape, ShapeProperties } from "./Shape";

export interface CircleProperties extends ShapeProperties {
  r: number;
  cx: number;
  cy: number;
  x?: number;
  y?: number;
}

export class Circle implements Shape<CircleProperties> {
  id: string;
  r: number;
  cx: number;
  cy: number;
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;

  constructor(public properties: CircleProperties) {
    this.id = nanoid();
    const { r, cx, cy, ...rest } = properties;
    this.r = properties.r;
    this.cx = properties.cx;
    this.cy = properties.cy;
    this.setProperties(rest);
  }

  get x() {
    return this.cx - this.r;
  }

  set x(x: number) {
    this.cx = x + this.r;
  }

  get y() {
    return this.cy - this.r;
  }

  set y(y: number) {
    this.cy = y + this.r;
  }

  get width() {
    return 2 * this.r;
  }

  get height() {
    return 2 * this.r;
  }

  getDiff(x: number, y: number): { dx: number; dy: number } {
    return { dx: x - this.x, dy: y - this.y };
  }

  draw(context: CanvasRenderingContext2D) {
    const lineWidth = this.lineWidth || 1;

    context.beginPath();
    context.arc(this.cx, this.cy, this.r - lineWidth / 2, 0, 2 * Math.PI);

    context.strokeStyle = this.strokeStyle || "rgba(52, 73, 94, 1)";
    context.lineWidth = this.lineWidth || 1;
    context.stroke();

    context.fillStyle = this.fillStyle || "rgba(52, 73, 94, 1)";
    context.fill();
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
    this.x = x;
    this.y = y;
  }

  resize(x: number, y: number) {
    this.r = Math.sqrt((x - this.cx) ** 2 + (y - this.cy) ** 2);
  }

  setProperties(properties: Partial<CircleProperties>) {
    Object.assign(this, properties);
  }
}
