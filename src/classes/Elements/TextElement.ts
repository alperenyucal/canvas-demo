import { nanoid } from "nanoid";
import { CanvasElement } from "./CanvasElement";
import { Application,Graphics,Text } from "pixi.js";

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

  get width() {
    return 200;
  }

  get height() {
    return this.fontSize || 16;
  }

  setProperties(properties: Partial<TextProperties>): void {
    Object.assign(this, properties);
  }

  draw(app: Application) {
    const text = new Text({
      text: this.text,
     
    },);
    text.x = this.x;
    text.y = this.y;
    app.stage.addChild(text);

    // context.beginPath();
    // context.font = `${this.fontSize || 16}px Arial`;
    // context.fillStyle = this.fillStyle || "rgba(52, 73, 94, 1)";
    // context.fillText(this.text, this.x, this.y);
  }

  isPointInside(x: number, y: number) {
    const width = this.width;
    const height = this.fontSize || 16;

    return (
      x >= this.x && x <= this.x + width && y >= this.y - height && y <= this.y
    );
  }

  highlight(app: Application) {
    const rect = new Graphics().rect(this.x, this.y - this.height, this.width, this.height).stroke(0x1E8BC3);
    app.stage.addChild(rect);
    // context.beginPath();
    // const width = this.measuringRenderer.measureText(
    //   this.text,
    //   this.fontSize || 16
    // ).width;
    // const height = this.fontSize || 16;
    // context.rect(this.x - 1, this.y - 1 - height, width + 1, height + 1);
    // context.strokeStyle = "rgba(30, 139, 195, 0.5)";
    // context.lineWidth = 2;
    // context.stroke();
  }

  select(app: Application) {
    const rect = new Graphics().rect(this.x, this.y - this.height, this.width, this.height).fill(0x1E8BC3);
    app.stage.addChild(rect);


    // context.beginPath();
    // const width = this.measuringRenderer.measureText(
    //   this.text,
    //   this.fontSize || 16
    // ).width;
    // const height = this.fontSize || 16;
    // context.rect(this.x, this.y - height, width, height);
    // context.fillStyle = "rgba(30, 139, 195, 0.5)";
    // context.fill();
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
