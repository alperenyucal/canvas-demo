import { nanoid } from "nanoid";
import { CanvasElement } from "./CanvasElement";
import { Application, Graphics } from "pixi.js";

export class Group implements CanvasElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(public elements: CanvasElement[]) {
    this.id = nanoid();

    this.x = Math.min(...elements.map((element) => element.x));
    this.y = Math.min(...elements.map((element) => element.y));

    this.width =
      Math.max(...elements.map((element) => element.x + element.width)) -
      this.x;
    this.height =
      Math.max(...elements.map((element) => element.y + element.height)) -
      this.y;
  }

  select(app: Application): void {
    const rect = new Graphics().rect(this.x, this.y, this.width, this.height).stroke(0x1E8BC3);
    app.stage.addChild(rect);
    // context.beginPath();
    // context.rect(this.x, this.y, this.width, this.height);
    // context.fillStyle = "rgba(30, 139, 195, 0.5)";
    // context.fill();
  }

  addChild(element: CanvasElement): void {
    const relativeX = element.x - this.x;
    const relativeY = element.y - this.y;
    this.width = Math.max(this.width, relativeX + element.width);
    this.height = Math.max(this.height, relativeY + element.height);
    this.x = Math.min(this.x, element.x);
    this.y = Math.min(this.y, element.y);
    this.elements.push(element);
  }

  getDiff(x: number, y: number): { dx: number; dy: number } {
    return { dx: x - this.x, dy: y - this.y };
  }

  draw(app: Application) {
    this.elements.forEach((element) => element.draw(app));
  }

  isPointInside(x: number, y: number) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }

  highlight(app: Application) {
    const rect = new Graphics().rect(this.x - 2, this.y - 2, this.width + 4, this.height + 4).stroke(0x1E8BC3);
    app.stage.addChild(rect);
    // context.beginPath();
    // context.rect(this.x - 2, this.y - 2, this.width + 4, this.height + 4);
    // context.strokeStyle = "rgba(30, 139, 195, 0.5)";
    // context.stroke();
  }

  move(x: number, y: number) {
    this.elements.forEach((element) => {
      element.move(x + element.x - this.x, y + element.y - this.y);
    });
    this.x = x;
    this.y = y;
  }

  resize(width: number, height: number) {
    console.log(width, height);
    throw new Error("Method not implemented.");
  }

  setProperties(properties: any) {
    console.log(properties);
    throw new Error("Method not implemented.");
  }
}
