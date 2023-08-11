export interface Shape {
  id: string
  draw(context: CanvasRenderingContext2D): void
  isPointInside(x: number, y: number): boolean
  highlight(context: CanvasRenderingContext2D): void
  select(context: CanvasRenderingContext2D): void
  move(x: number, y: number): void
  getDiff(x: number, y: number): { dx: number, dy: number }
  resize(x: number, y: number): void
}


export class Circle implements Shape {
  constructor(public r: number, public cx: number, public cy: number, public id: string
  ) {
  }

  getDiff(x: number, y: number): { dx: number; dy: number } {
    return { dx: x - this.cx, dy: y - this.cy }
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath()
    context.arc(this.cx, this.cy, this.r, 0, 2 * Math.PI)
    context.strokeStyle = 'rgba(52, 73, 94, 1)'
    context.lineWidth = 1
    context.stroke()
  }

  isPointInside(x: number, y: number) {
    return Math.sqrt((x - this.cx) ** 2 + (y - this.cy) ** 2) <= this.r
  }

  highlight(context: CanvasRenderingContext2D) {
    context.beginPath()
    context.arc(this.cx, this.cy, this.r + 2, 0, 2 * Math.PI)
    context.strokeStyle = 'rgba(30, 139, 195, 0.5)'
    context.lineWidth = 2
    context.stroke()
  }

  select(context: CanvasRenderingContext2D) {
    context.beginPath()
    context.rect(this.cx - this.r, this.cy - this.r, 2 * this.r, 2 * this.r)
    context.fillStyle = 'rgba(30, 139, 195, 0.5)'
    context.fill()
  }

  move(x: number, y: number) {
    this.cx = x
    this.cy = y
  }

  resize(x: number, y: number) {
    this.r = Math.sqrt((x - this.cx) ** 2 + (y - this.cy) ** 2)
  }
}

export class Rectangle implements Shape {
  constructor(public x: number, public y: number, public w: number, public h: number, public id: string) {
  }

  getDiff(x: number, y: number): { dx: number; dy: number } {
    return { dx: x - this.x, dy: y - this.y }
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath()
    context.rect(this.x, this.y, this.w, this.h)
    context.strokeStyle = 'rgba(52, 73, 94, 1)'
    context.lineWidth = 1
    context.stroke()
  }

  isPointInside(x: number, y: number) {
    return x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h
  }

  highlight(context: CanvasRenderingContext2D) {
    context.beginPath()
    context.rect(this.x - 2, this.y - 2, this.w + 4, this.h + 4)
    context.strokeStyle = 'rgba(30, 139, 195, 0.5)'
    context.lineWidth = 2
    context.stroke()
  }

  select(context: CanvasRenderingContext2D) {
    context.beginPath()
    context.rect(this.x, this.y, this.w, this.h)
    context.fillStyle = 'rgba(30, 139, 195, 0.5)'
    context.fill()
  }

  move(x: number, y: number) {
    this.x = x
    this.y = y
  }

  resize(x: number, y: number) {
    this.w = x - this.x
    this.h = y - this.y
  }

}