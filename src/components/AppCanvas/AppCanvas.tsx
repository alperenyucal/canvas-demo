import React, { useEffect, useRef, useState } from "react";
import { Shape } from "../../classes/Elements/Shape";
import { Button } from "../Button";
import { Rectangle } from "../../classes/Elements/Rectangle";
import { Ellipse } from "../../classes/Elements/Ellipse";
import { TextElement } from "../../classes/Elements/TextElement";
import { CanvasManager } from "../../classes/CanvasManager/CanvasManager";
import { EllipseEditor } from "./EllipseEditor";
import { RectangleEditor } from "./RectangleEditor";
import { TextEditor } from "./TextElementEditor";
import { CanvasDragEvent } from "../../lib/DragEvent";
import * as PIXI from "pixi.js";

export const AppCanvas: React.FC = () => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState("draw");
  const [selectedShape, setSelectedShape] = useState<
    "ellipse" | "rectangle" | "text" | "group"
  >();
  const [manager, setRenderer] = useState<CanvasManager>();
  const [selectedElement, setSelectedElement] = useState<Shape | null>();

  useEffect(() => {
    async function init() {
      const app = new PIXI.Application();

      await app.init({
        backgroundAlpha: 0,
        resizeTo: window,
      });

      canvasContainerRef.current?.replaceChildren(app.canvas);

      setRenderer(new CanvasManager(app));
      app.stage.addChild(
        new PIXI.Graphics()
          .rect(300, 300, 100, 100)
          .fill(0x000000)
          .stroke(0x000000)
      );

      const basicText = new PIXI.Text({ text: "Basic text in pixi" });

      basicText.x = 50;
      basicText.y = 100;

      app.stage.addChild(basicText);
    }
    if (!manager) init();
  }, []);

  function handleMouseMove(
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {
    if (!manager) return;
    manager.mousePosition = {
      x: event.clientX,
      y: event.clientY,
    };
    manager.highlightElement();
  }

  useEffect(() => {
    try {
      const canvas = manager?.app.canvas;
      if (!canvas) return;
      if (!manager) return;

      let isMouseDown = false;

      let diff = { dx: 0, dy: 0 };

      const downListener = () => {
        isMouseDown = true;
        manager.selectElementAtPosition();
        diff = manager.selectedElement?.getDiff(
          manager.mousePosition.x,
          manager.mousePosition.y
        ) || { dx: 0, dy: 0 };
      };

      const moveListener = (e: any) => {
        handleMouseMove(e);
        if (!isMouseDown) return;
        if (!diff) return;
        canvas.dispatchEvent(
          new CanvasDragEvent("drag", {
            start: {
              x: manager.mousePosition.x - diff.dx,
              y: manager.mousePosition.y - diff.dy,
            },
            mousePosition: manager.mousePosition,
          })
        );
        manager.moveSelectedElement(diff.dx, diff.dy);
      };

      const upListener = () => {
        isMouseDown = false;
      };

      canvas.addEventListener("mousedown", downListener);
      canvas.addEventListener("mousemove", moveListener);
      canvas.addEventListener("mouseup", upListener);
      canvas.addEventListener("drag", () => {});

      return () => {
        canvas.removeEventListener("mousedown", downListener);
        canvas.removeEventListener("mousemove", moveListener);
        canvas.removeEventListener("mouseup", upListener);
      };
    } catch (e) {
      console.error(e);
    }
  }, [manager]);

  return (
    <div className="relative">
      <div ref={canvasContainerRef} className="absolute top-0 left-0" />
      {/* <canvas
        ref={canvasContainerRef}
        className="absolute"
        onClick={() => {
          if (!manager) return;
          if (mode === "draw") {
            if (!selectedShape) return;
            if (selectedShape === "ellipse") {
              const ellipse = new Ellipse({
                x: manager.mousePosition.x,
                y: manager.mousePosition.y,
                width: 100,
                height: 100,
              });
              manager.addElement(ellipse);
            } else if (selectedShape === "rectangle") {
              const rectangle = new Rectangle({
                ...manager.mousePosition,
                width: 100,
                height: 100,
              });
              manager.addElement(rectangle);
            } else if (selectedShape === "text") {
              const text = new TextElement({
                ...manager.mousePosition,
                text: "Hello World",
              });
              manager.addElement(text);
            } else if (selectedShape === "group") {
              const ellipse = new Ellipse({
                x: manager.mousePosition.x + 100,
                y: manager.mousePosition.y + 100,
                width: 100,
                height: 100,
                fillStyle: "red",
              });

              const rectangle = new Rectangle({
                ...manager.mousePosition,
                width: 100,
                height: 100,
              });

              const group = new Group([rectangle, ellipse]);

              manager.addElement(group);
            }
          }
          if (mode === "select") {
            manager.selectElementAtPosition();
          }
          setSelectedElement(manager.selectedElement);

          setMode("select");
        }}
        onMouseMove={handleMouseMove}
      /> */}
      <div className="absolute top-0 left-0 p-2 bg-white flex gap-2 rounded-lg m-2">
        <Button
          active={mode === "select"}
          onClick={() => {
            setMode("select");
          }}
        >
          Select
        </Button>
        <Button
          onClick={() => {
            if (!manager || !manager.selectedElement) return;
            manager.removeElement(manager.selectedElement);
            setSelectedElement(null);
          }}
        >
          Delete
        </Button>
        <Button
          active={mode === "draw" && selectedShape === "ellipse"}
          onClick={() => {
            setMode("draw");
            setSelectedShape("ellipse");
          }}
        >
          ○
        </Button>
        <Button
          active={mode === "draw" && selectedShape === "rectangle"}
          onClick={() => {
            setMode("draw");
            setSelectedShape("rectangle");
          }}
        >
          □
        </Button>
        <Button
          active={mode === "draw" && selectedShape === "text"}
          onClick={() => {
            setMode("draw");
            setSelectedShape("text");
          }}
        >
          T
        </Button>
        <Button
          active={mode === "draw" && selectedShape === "group"}
          onClick={() => {
            setMode("draw");
            setSelectedShape("group");
          }}
        >
          G
        </Button>
      </div>
      {manager?.elementTree && Object.keys(manager.elementTree).length > 0 && (
        <div className="absolute top-14 left-0 p-2 bg-white flex flex-col gap-2 overflow-auto max-h-screen rounded-lg m-2">
          {/* recursive tree render */}
          {/* {Object.values(manager.elementTree).map((element) => {
            return (
              <div
                key={element.id}
                className={`flex gap-2 justify-between ${
                  element === selectedElement ? "bg-gray-100" : ""
                }`}
                onClick={() => {
                  if (!manager) return;
                  manager.selectElement(element);
                  setSelectedElement(element);
                }}
              >
                <div>{element.constructor.name}</div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    if (!manager) return;
                    manager.removeElement(element);
                    setSelectedElement(null);
                  }}
                >
                  x
                </div>
              </div>
            );
          })} */}
        </div>
      )}
      <div className="absolute top-0 right-0 p-2 bg-white flex flex-col gap-2 rounded-lg m-2">
        {Object.keys(manager?.elementTree ?? {}).length}
        {(() => {
          if (manager && selectedElement) {
            if (selectedElement instanceof Ellipse) {
              return (
                <EllipseEditor
                  key={selectedElement.id}
                  ellipse={selectedElement}
                  manager={manager}
                />
              );
            }
            if (selectedElement instanceof Rectangle) {
              return (
                <RectangleEditor
                  key={selectedElement.id}
                  rectangle={selectedElement}
                  manager={manager}
                />
              );
            }
            if (selectedElement instanceof TextElement) {
              return (
                <TextEditor
                  key={selectedElement.id}
                  textElement={selectedElement}
                  manager={manager}
                />
              );
            }
          }
          return "Select an element to edit";
        })()}
      </div>
    </div>
  );
};
