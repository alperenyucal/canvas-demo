export class CanvasDragEvent extends Event {
  constructor(
    type: string,
    public data?: {
      start: { x: number; y: number };
      mousePosition: { x: number; y: number };
    }
  ) {
    super(type);
  }
}
