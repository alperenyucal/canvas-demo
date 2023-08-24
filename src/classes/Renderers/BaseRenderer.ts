import _ from "lodash";

export class BaseRenderer {
  // renderCount = 0;
  // fps = 120;

  constructor(public canvas: HTMLCanvasElement) {
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
  }

  get context() {
    return this.canvas.getContext("2d")!;
  }

  setDPI(dpi: number) {
    // Set up CSS size.
    this.canvas.style.width =
      this.canvas.style.width || this.canvas.width + "px";
    this.canvas.style.height =
      this.canvas.style.height || this.canvas.height + "px";

    // Resize canvas and scale future draws.
    const scaleFactor = dpi / 96;
    this.canvas.width = Math.ceil(this.canvas.width * scaleFactor);
    this.canvas.height = Math.ceil(this.canvas.height * scaleFactor);
    this.context.scale(scaleFactor, scaleFactor);
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.setDPI(324);
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

  // render = _.throttle(() => {
  //   this.clear();
  //   this.draw();
  //   this.renderCount++;
  // }, 1000 / this.fps);

  render() {
    this.clear();
    this.draw();
    // this.renderCount++;
  }
}
