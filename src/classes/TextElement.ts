import { nanoid } from "nanoid";
import { CanvasElement } from "./CanvasElement";

export interface TextProperties {
  text: string;
  x: number;
  y: number;
  fontSize?: number;
  fillStyle?: string;
}

export class TextElement implements CanvasElement<TextProperties> {
  id: string;
  x: number;
  y: number;
  text: string;
  fontSize?: number;
  fillStyle?: string;

  constructor(properties: TextProperties) {
    this.id = nanoid();
    const { text, x, y, ...rest } = properties;
    this.text = text;
    this.x = x;
    this.y = y;
    this.setProperties(rest);
  }

  setProperties(properties: Partial<TextProperties>): void {
    Object.assign(this, properties);
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.font = `${this.fontSize || 16}px Arial`;
    context.fillStyle = this.fillStyle || "rgba(52, 73, 94, 1)";
    context.fillText(this.text, this.x, this.y);
  }

  isPointInside(x: number, y: number, context: CanvasRenderingContext2D) {
    const width = context.measureText(this.text).width;
    const height = this.fontSize || 16;

    return (
      x >= this.x && x <= this.x + width && y >= this.y - height && y <= this.y
    );
  }

  highlight(context: CanvasRenderingContext2D) {
    context.beginPath();
    const width = context.measureText(this.text).width;
    const height = this.fontSize || 16;
    context.rect(this.x - 1, this.y - 1 - height, width + 1, height + 1);
    context.strokeStyle = "rgba(30, 139, 195, 0.5)";
    context.lineWidth = 2;
    context.stroke();
  }

  select(context: CanvasRenderingContext2D) {
    context.beginPath();
    const width = context.measureText(this.text).width;
    const height = this.fontSize || 16;
    context.rect(this.x, this.y - height, width, height);
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
