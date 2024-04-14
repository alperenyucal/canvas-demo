import { BaseRenderer } from "./BaseRenderer";

// singleton
export class MeasuringRenderer extends BaseRenderer {
  private static instance: MeasuringRenderer;
  private constructor() {
    const canvas = document.createElement("canvas");
    super(canvas);
  }

  public static getInstance(): MeasuringRenderer {
    if (!MeasuringRenderer.instance) {
      MeasuringRenderer.instance = new MeasuringRenderer();
    }

    return MeasuringRenderer.instance;
  }

  public measureText(text: string, fontSize: number): TextMetrics {
    this.context.font = `${fontSize}px Arial`;
    return this.context.measureText(text);
  }
}
