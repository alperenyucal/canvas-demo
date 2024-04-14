import { nanoid } from "nanoid";
import { Shape, ShapeProperties } from "./Shape";
import { CanvasKit } from "../../lib/CanvasKitInit";
import { Surface } from "canvaskit-wasm";

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

  draw(surface: Surface) {
    const canvas = surface.getCanvas();
    const rr = CanvasKit.RRectXY(
      CanvasKit.LTRBRect(
        this.x,
        this.y,
        this.x + this.width,
        this.y + this.height
      ),
      this.radius || 0,
      this.radius || 0
    );

    // fill
    const fillPaint = new CanvasKit.Paint();
    fillPaint.setColor(CanvasKit.parseColorString(this.fillStyle || "#000000"));
    fillPaint.setStyle(CanvasKit.PaintStyle.Fill);
    fillPaint.setAntiAlias(true);

    canvas.drawRRect(rr, fillPaint);

    // stroke
    const strokePaint = new CanvasKit.Paint();
    strokePaint.setColor(
      CanvasKit.parseColorString(this.strokeStyle || "#000000")
    );
    strokePaint.setStyle(CanvasKit.PaintStyle.Stroke);
    strokePaint.setStrokeWidth(this.lineWidth || 1);
    strokePaint.setAntiAlias(true);
    canvas.drawRRect(rr, strokePaint);
  }

  isPointInside(x: number, y: number) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }

  highlight(surface: Surface) {
    const canvas = surface.getCanvas();
    const rr = CanvasKit.RRectXY(
      CanvasKit.LTRBRect(
        this.x - 2,
        this.y - 2,
        this.x + this.width + 2,
        this.y + this.height + 2
      ),
      this.radius || 0,
      this.radius || 0
    );

    // stroke
    const strokePaint = new CanvasKit.Paint();
    strokePaint.setColor(CanvasKit.parseColorString("#1E8BC399"));
    strokePaint.setStyle(CanvasKit.PaintStyle.Stroke);
    strokePaint.setStrokeWidth(2);
    strokePaint.setAntiAlias(true);
    canvas.drawRRect(rr, strokePaint);
  }

  select(surface: Surface) {
    const canvas = surface.getCanvas();
    const rr = CanvasKit.RRectXY(
      CanvasKit.LTRBRect(
        this.x,
        this.y,
        this.x + this.width,
        this.y + this.height
      ),
      0,
      0
    );

    // fill
    const fillPaint = new CanvasKit.Paint();
    fillPaint.setColor(CanvasKit.parseColorString("#1E8BC399"));
    fillPaint.setStyle(CanvasKit.PaintStyle.Fill);
    fillPaint.setAntiAlias(true);

    canvas.drawRRect(rr, fillPaint);
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
