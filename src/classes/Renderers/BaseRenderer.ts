import _ from "lodash";

export class BaseRenderer {
  fps = 0;
  lastLoop = new Date();
  renderCount = 0;

  constructor(public canvas: HTMLCanvasElement) {
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
  }

  get context() {
    return this.canvas.getContext("2d")!;
  }

  setDPR() {
    // Get the DPR and size of the canvas
    const dpr = window.devicePixelRatio;
    const rect = this.canvas.getBoundingClientRect();

    // Set the "actual" size of the canvas
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    // Scale the context to ensure correct drawing operations
    this.context.scale(dpr, dpr);

    // Set the "drawn" size of the canvas
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.setDPR();
    this.render();
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
  }

  draw() {
    if (this.draw === undefined)
      throw new Error("draw() method not implemented");
  }

  render() {
    this.clear();
    this.draw();
    this.renderCount++;

    const currentLoop = new Date();
    this.fps = 1000 / (currentLoop.getTime() - this.lastLoop.getTime());
    this.lastLoop = currentLoop;
  }
}
