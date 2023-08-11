export type CanvasElement<T = {}> = T & {
  id: string;
  draw(context: CanvasRenderingContext2D): void;
  highlight(context: CanvasRenderingContext2D): void;
  select(context: CanvasRenderingContext2D): void;
  isPointInside(
    x: number,
    y: number,
    context: CanvasRenderingContext2D
  ): boolean;
  move(x: number, y: number): void;
  getDiff(x: number, y: number): { dx: number; dy: number };
  resize(x: number, y: number): void;
  setProperties(properties: Partial<T>): void;
};
