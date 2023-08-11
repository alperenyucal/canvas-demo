import { Shape } from "./Shape"

function throttle(callback: () => void, delay: number) {
  let previousCall = new Date().getTime();
  return function () {
    const time = new Date().getTime();
    if ((time - previousCall) >= delay) {
      previousCall = time;
      callback();
    }
  };
}

export class CanvasRenderer {
  selectedElement: Shape | null = null
  highlightedElement: Shape | null = null
  moveStartPositon: { x: number, y: number } = { x: 0, y: 0 }
  elementTree: Record<string, Shape> = {}
  renderCount = 0
  mousePosition: { x: number, y: number } = { x: 0, y: 0 }

  constructor(public canvas: HTMLCanvasElement) {
    this.resizeCanvas()
    window.addEventListener('resize', () => this.resizeCanvas())
  }

  get context() {
    return this.canvas.getContext('2d')!
  }

  set moveStartPosition(position: { x: number, y: number }) {
    console.log(position)
    this.moveStartPositon = position
  }

  get moveStartPosition() {
    return this.moveStartPositon
  }

  setDPI(dpi: number) {
    // Set up CSS size.
    this.canvas.style.width = this.canvas.style.width || this.canvas.width + 'px';
    this.canvas.style.height = this.canvas.style.height || this.canvas.height + 'px';

    // Resize canvas and scale future draws.
    const scaleFactor = dpi / 96;
    this.canvas.width = Math.ceil(this.canvas.width * scaleFactor);
    this.canvas.height = Math.ceil(this.canvas.height * scaleFactor);
    this.context.scale(scaleFactor, scaleFactor);
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.setDPI(324)
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.beginPath()
  }

  draw = throttle(() => {
    this.clear()
    Object.values(this.elementTree).forEach(element => {
      element.draw(this.context)
    })
    this.highlightedElement?.highlight(this.context)
    this.selectedElement?.select(this.context)
    this.renderCount++
  }, 1000 / 60)

  addElement(element: Shape) {
    this.elementTree[element.id] = element
    this.draw()
  }

  moveElement() {
    if (!this.selectedElement) return
    this.selectedElement.move(this.mousePosition.x, this.mousePosition.y)
    this.draw()
  }

  removeElement(element: Shape) {
    delete this.elementTree[element.id]
  }

  getElementAtPosition(x: number, y: number) {
    const elements = Object.values(this.elementTree)
    for (let i = elements.length - 1; i >= 0; i--) {
      if (elements[i].isPointInside(x, y)) {
        return elements[i]
      }
    }
    return null
  }

  selectElement() {
    this.selectedElement = this.getElementAtPosition(this.mousePosition.x, this.mousePosition.y)
    this.draw()
  }

  highlightElement() {
    if (this.highlightedElement?.id !== this.getElementAtPosition(this.mousePosition.x, this.mousePosition.y)?.id) {
      this.highlightedElement = this.getElementAtPosition(this.mousePosition.x, this.mousePosition.y)
      this.draw()
    }
  }
}