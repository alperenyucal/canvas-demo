import { Surface } from "canvaskit-wasm";

export type CanvasElement<T = Record<string, never>> = T & {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  draw(surface: Surface): void;
  highlight(surface: Surface): void;
  select(surface: Surface): void;
  isPointInside(x: number, y: number, surface?: Surface): boolean;
  move(x: number, y: number): void;
  getDiff(x: number, y: number): { dx: number; dy: number };
  resize(x: number, y: number): void;
  setProperties(properties: Partial<T>): void;
};
