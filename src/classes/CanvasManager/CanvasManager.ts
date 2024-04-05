import { CanvasElement } from "../Elements/CanvasElement";
import { Ellipse, EllipseProperties } from "../Elements/Ellipse";
import { Rectangle, RectangleProperties } from "../Elements/Rectangle";
import { TextElement, TextProperties } from "../Elements/TextElement";
import { ActionRenderer } from "../Renderers/ActionRenderer";
import { ElementTreeRenderer } from "../Renderers/ElementTreeRenderer";
import savedElements from "./mock-data.json";

export class CanvasManager {
  _mousePosition: { x: number; y: number } = { x: 0, y: 0 };
  elementTree: Record<string, CanvasElement>;
  elementTreeRenderer: ElementTreeRenderer;
  actionRenderer: ActionRenderer;
  private _selectedElement: CanvasElement | null = null;
  private _highlightedElement: CanvasElement | null = null;

  constructor(
    elementTreeCanvas: HTMLCanvasElement,
    actionCanvas: HTMLCanvasElement
  ) {
    this.elementTree = {};
    this.elementTreeRenderer = new ElementTreeRenderer(
      elementTreeCanvas,
      this.elementTree
    );
    this.actionRenderer = new ActionRenderer(
      actionCanvas,
      this.selectedElement,
      this.highlightedElement
    );
    this.loadElements();
  }

  get selectedElement() {
    return this._selectedElement;
  }

  set selectedElement(element: CanvasElement | null) {
    this.actionRenderer.selectedElement = element;
    this._selectedElement = element;
  }

  get highlightedElement() {
    return this._highlightedElement;
  }

  set highlightedElement(element: CanvasElement | null) {
    this.actionRenderer.highlightedElement = element;
    this._highlightedElement = element;
  }

  set mousePosition(position: { x: number; y: number }) {
    this._mousePosition = {
      x: position.x,
      y: position.y,
    };
  }

  get mousePosition() {
    return this._mousePosition;
  }

  addElement(element: CanvasElement, renderingAllowed: boolean = true) {
    this.elementTree[element.id] = element;
    this.selectedElement = element;
    if (renderingAllowed) {
      this.elementTreeRenderer.render();
      this.actionRenderer.render();
    }
  }

  moveSelectedElement(dx: number, dy: number) {
    if (!this.selectedElement) return;
    this.selectedElement.move(
      this.mousePosition.x - dx,
      this.mousePosition.y - dy
    );
    this.elementTreeRenderer.render();
    this.actionRenderer.render();
  }

  removeElement(element: CanvasElement) {
    this.selectedElement = null;
    delete this.elementTree[element.id];
    this.elementTreeRenderer.render();
    this.actionRenderer.render();
  }

  getElementAtPosition(x: number, y: number) {
    const elements = Object.values(this.elementTree);
    for (let i = elements.length - 1; i >= 0; i--) {
      if (elements[i].isPointInside(x, y)) {
        return elements[i];
      }
    }
    return null;
  }

  selectElement(element: CanvasElement) {
    this.selectedElement = element;
    this.actionRenderer.render();
  }

  selectElementAtPosition() {
    this.selectedElement = this.getElementAtPosition(
      this.mousePosition.x,
      this.mousePosition.y
    );
    this.actionRenderer.render();
  }

  highlightElement() {
    if (
      this.highlightedElement?.id !==
      this.getElementAtPosition(this.mousePosition.x, this.mousePosition.y)?.id
    ) {
      this.highlightedElement = this.getElementAtPosition(
        this.mousePosition.x,
        this.mousePosition.y
      );
      this.actionRenderer.render();
    }
  }

  updateElementProperties<T = {}>(properties: Partial<T>) {
    if (!this.selectedElement) return;
    this.selectedElement.setProperties(properties);
    this.elementTreeRenderer.render();
    this.actionRenderer.render();
  }

  updateRectangleProperties(properties: Partial<RectangleProperties>) {
    if (!this.selectedElement || !(this.selectedElement instanceof Rectangle))
      return;
    this.updateElementProperties<RectangleProperties>(properties);
  }

  updateEllipseProperties(properties: Partial<EllipseProperties>) {
    if (!this.selectedElement || !(this.selectedElement instanceof Ellipse))
      return;
    this.updateElementProperties<EllipseProperties>(properties);
  }

  updateTextProperties(properties: Partial<TextProperties>) {
    if (!this.selectedElement || !(this.selectedElement instanceof TextElement))
      return;
    this.updateElementProperties<TextProperties>(properties);
  }

  async loadElements() {
    for (let element of savedElements) {
      switch (element.type) {
        case "rectangle":
          this.addElement(new Rectangle(element as any), false);
          break;
        case "ellipse":
          this.addElement(new Ellipse(element as any), false);
          break;
        case "text":
          this.addElement(new TextElement(element as any), false);
          break;
      }
    }

    this.elementTreeRenderer.render();
    this.actionRenderer.render();
  }
}
