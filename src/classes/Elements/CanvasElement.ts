import { Application } from "pixi.js";

export type CanvasElement<T = {}> = T & {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  draw(app: Application): void;
  highlight(app: Application): void;
  select(app: Application): void;
  isPointInside(
    x: number,
    y: number,
    app?: Application
  ): boolean;
  move(x: number, y: number): void;
  getDiff(x: number, y: number): { dx: number; dy: number };
  resize(x: number, y: number): void;
  setProperties(properties: Partial<T>): void;
};
