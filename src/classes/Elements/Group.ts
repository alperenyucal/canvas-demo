import { nanoid } from "nanoid";
import { CanvasElement } from "./CanvasElement";

export class Group implements CanvasElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  children: CanvasElement[];

  constructor(children: CanvasElement[]) {
    this.id = nanoid();
    this.children = children;
    this.x = Math.min(...children.map((element) => element.x));
    this.y = Math.min(...children.map((element) => element.y));
    this.width = Math.max(
      ...children.map((element) => element.x + element.width)
    );
    this.height = Math.max(
      ...children.map((element) => element.y + element.height)
    );
  }
  select(context: CanvasRenderingContext2D): void {
    this.children.forEach((element) => element.select(context));
  }
  getDiff(x: number, y: number): { dx: number; dy: number } {
    return { dx: 0, dy: 0 };
  }

  draw(context: CanvasRenderingContext2D) {
    this.children.forEach((element) => element.draw(context));
  }

  isPointInside(x: number, y: number) {
    return this.children.some((element) => element.isPointInside(x, y));
  }

  highlight(context: CanvasRenderingContext2D) {
    this.children.forEach((element) => element.highlight(context));
  }

  move(x: number, y: number) {
    this.children.forEach((element) => element.move(x, y));
  }

  resize(width: number, height: number) {
    this.children.forEach((element) => element.resize(width, height));
  }

  setProperties(properties: any) {
    this.children.forEach((element) => element.setProperties(properties));
  }
}
