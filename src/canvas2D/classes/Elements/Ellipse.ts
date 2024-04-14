import { nanoid } from "nanoid";
import { Shape, ShapeProperties } from "./Shape";

export interface EllipseProperties extends ShapeProperties {
  width: number;
  height: number;
  x: number;
  y: number;
}

export class Ellipse implements Shape<EllipseProperties> {
  id: string;
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(public properties: EllipseProperties) {
    this.id = nanoid();
    const { x, y, width, height, ...rest } = properties;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.setProperties(rest);
  }

  get rx() {
    return this.width / 2;
  }

  get ry() {
    return this.height / 2;
  }

  get cx() {
    return this.x + this.rx;
  }

  get cy() {
    return this.y + this.ry;
  }

  getDiff(x: number, y: number): { dx: number; dy: number } {
    return { dx: x - this.x, dy: y - this.y };
  }

  draw(context: CanvasRenderingContext2D) {
    const lineWidth = this.lineWidth || 1;

    context.beginPath();
    context.ellipse(
      this.cx,
      this.cy,
      this.rx - lineWidth / 2,
      this.ry - lineWidth / 2,
      0,
      0,
      2 * Math.PI
    );

    context.strokeStyle = this.strokeStyle || "rgba(52, 73, 94, 1)";
    context.lineWidth = this.lineWidth || 1;
    context.stroke();

    context.fillStyle = this.fillStyle || "rgba(52, 73, 94, 1)";
    context.fill();
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

  resize(width: number, height: number) {
    console.log(width, height);
    throw new Error("Method not implemented.");
  }

  setProperties(properties: Partial<EllipseProperties>) {
    Object.assign(this, properties);
  }
}
