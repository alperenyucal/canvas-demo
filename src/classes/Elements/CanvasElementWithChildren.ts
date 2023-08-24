// import { nanoid } from "nanoid";
// import { Shape, ShapeProperties } from "./Shape";
// import { CanvasElement } from "./CanvasElement";

// export interface CanvasElementWithChildrenProperties extends CanvasElement {
//   children: CanvasElement[];
// }

// export class CanvasElementWithChildren
//   implements Shape<CanvasElementWithChildrenProperties>
// {
//   id: string;
//   fillStyle?: string;
//   strokeStyle?: string;
//   children: CanvasElement[];

//   constructor(public properties: CanvasElementWithChildrenProperties) {
//     const { children, ...rest } = properties;
//     this.id = nanoid();
//     this.children = children;
//     this.setProperties(rest);
//   }
//   draw(context: CanvasRenderingContext2D): void {
//     throw new Error("Method not implemented.");
//   }
//   highlight(context: CanvasRenderingContext2D): void {
//     throw new Error("Method not implemented.");
//   }
//   select(context: CanvasRenderingContext2D): void {
//     throw new Error("Method not implemented.");
//   }
//   isPointInside(
//     x: number,
//     y: number,
//     context: CanvasRenderingContext2D
//   ): boolean {
//     throw new Error("Method not implemented.");
//   }
//   move(x: number, y: number): void {
//     throw new Error("Method not implemented.");
//   }
//   getDiff(x: number, y: number): { dx: number; dy: number } {
//     throw new Error("Method not implemented.");
//   }
//   resize(x: number, y: number): void {
//     throw new Error("Method not implemented.");
//   }
//   setProperties(properties: Partial<{}>): void;
//   setProperties(
//     properties: Partial<CanvasElementWithChildrenProperties & ShapeProperties>
//   ): void;
//   setProperties(: unknown): void {
//     throw new Error("Method not implemented.");
//   }
//   lineWidth?: number | undefined;
// }
