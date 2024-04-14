import { CanvasElement } from "./CanvasElement";

export interface ShapeProperties {
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
}

export type Shape<Properties = {}> = CanvasElement<
  Properties & ShapeProperties
>;
