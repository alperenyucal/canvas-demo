import _ from "lodash";
import { Application } from "pixi.js";

export class BaseRenderer {
  constructor(public app: Application) {
    // this.resizeCanvas();
    // window.addEventListener("resize", () => this.resizeCanvas());
  }

  // get context() {
  //   return this.canvas.getContext("2d")!;
  // }

  // setDPR() {
  //   // Get the DPR and size of the canvas
  //   const dpr = window.devicePixelRatio;
  //   const rect = this.canvas.getBoundingClientRect();

  //   // Set the "actual" size of the canvas
  //   this.canvas.width = rect.width * dpr;
  //   this.canvas.height = rect.height * dpr;

  //   // Scale the context to ensure correct drawing operations
  //   this.context.scale(dpr, dpr);

  //   // Set the "drawn" size of the canvas
  //   this.canvas.style.width = `${rect.width}px`;
  //   this.canvas.style.height = `${rect.height}px`;
  // }

  // resizeCanvas() {
  //   this.canvas.width = window.innerWidth;
  //   this.canvas.height = window.innerHeight;
  //   this.setDPR();
  //   this.render();
  // }

  // clear() {
  //   this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  //   this.context.beginPath();
  // }
  draw() {
    if (this.draw === undefined)
      throw new Error("draw() method not implemented");
  }

  render() {
    // this.clear();
    this.draw();
  }
}
