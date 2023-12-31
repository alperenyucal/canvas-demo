import { nanoid } from "nanoid";
import { Shape, ShapeProperties } from "./Shape";

export interface RectangleProperties extends ShapeProperties {
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
}

export class Rectangle implements Shape<RectangleProperties> {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;

  constructor(public properties: RectangleProperties) {
    this.id = nanoid();
    const { x, y, width, height, ...rest } = properties;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.setProperties(rest);
  }

  getDiff(x: number, y: number): { dx: number; dy: number } {
    return { dx: x - this.x, dy: y - this.y };
  }

  draw(context: CanvasRenderingContext2D) {
    const lineWidth = this.lineWidth || 1;
    context.beginPath();
    context.roundRect(
      this.x + lineWidth / 2,
      this.y + lineWidth / 2,
      this.width - lineWidth,
      this.height - lineWidth,
      this.radius
    );

    context.fillStyle = this.fillStyle || "rgba(52, 73, 94, 1)";
    context.fill();
    context.strokeStyle = this.strokeStyle || "rgba(52, 73, 94, 1)";
    context.lineWidth = this.lineWidth || 1;
    context.stroke();
  }

  isPointInside(x: number, y: number) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }

  highlight(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.rect(this.x - 2, this.y - 2, this.width + 4, this.height + 4);
    context.strokeStyle = "rgba(30, 139, 195, 0.5)";
    context.lineWidth = 2;
    context.stroke();
  }

  select(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = "rgba(30, 139, 195, 0.5)";
    context.fill();
  }

  move(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  resize(x: number, y: number) {
    this.width = x - this.x;
    this.height = y - this.y;
  }

  setProperties(properties: Partial<RectangleProperties>) {
    Object.assign(this, properties);
  }
}
