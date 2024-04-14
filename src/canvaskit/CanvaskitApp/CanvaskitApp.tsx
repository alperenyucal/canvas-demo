import React, { useEffect, useRef, useState } from "react";
import { Shape } from "../classes/Elements/Shape";
import { Rectangle } from "../classes/Elements/Rectangle";
import { Ellipse } from "../classes/Elements/Ellipse";
import { TextElement } from "../classes/Elements/TextElement";
import { CanvasManager } from "../classes/CanvasManager/CanvasManager";

import { CanvasDragEvent } from "../../common/lib/DragEvent";
import { CanvasKit } from "../lib/CanvasKitInit";
import { Button } from "../../common/components/Button";
import { EllipseEditor } from "./EllipseEditor";
import { RectangleEditor } from "./RectangleEditor";
import { TextEditor } from "./TextElementEditor";

export const CanvaskitApp: React.FC = () => {
  const elementTreeCanvasRef = useRef<HTMLCanvasElement>(null);
  const actionCanvasRef = useRef<HTMLCanvasElement>(null);

  const [fps, setFps] = useState(0);
  const [mode, setMode] = useState("draw");
  const [selectedShape, setSelectedShape] = useState<
    "ellipse" | "rectangle" | "text" | "group"
  >();
  const [manager, setManager] = useState<CanvasManager>();
  const [selectedElement, setSelectedElement] = useState<Shape | null>();

  useEffect(() => {
    const elementTreeSurface =
      CanvasKit.MakeWebGLCanvasSurface("elementTreeCanvas");
    const actionSurface = CanvasKit.MakeWebGLCanvasSurface("actionCanvas");
    if (!elementTreeSurface || !actionSurface) return;

    setManager(new CanvasManager(elementTreeSurface, actionSurface));
  }, []);

  useEffect(() => {
    const actionCanvas = actionCanvasRef.current;
    if (!actionCanvas) return;
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

    const moveListener = () => {
      if (!isMouseDown) return;
      if (!diff) return;
      actionCanvas.dispatchEvent(
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

    actionCanvas.addEventListener("mousedown", downListener);
    actionCanvas.addEventListener("mousemove", moveListener);
    actionCanvas.addEventListener("mouseup", upListener);
    actionCanvas.addEventListener("drag", () => {});

    return () => {
      actionCanvas.removeEventListener("mousedown", downListener);
      actionCanvas.removeEventListener("mousemove", moveListener);
      actionCanvas.removeEventListener("mouseup", upListener);
    };
  }, [manager]);

  function handleMouseMove(
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {
    if (!manager) return;
    manager.mousePosition = {
      x: event.clientX,
      y: event.clientY,
    };
    manager.highlightElement();
    setFps(manager.elementTreeRenderer.fps);
  }

  return (
    <div className="relative">
      <canvas
        id="elementTreeCanvas"
        ref={elementTreeCanvasRef}
        className="absolute"
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <canvas
        id="actionCanvas"
        className="absolute"
        ref={actionCanvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
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
              // manager.addElement(ellipse);
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
              // manager.addElement(text);
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

              // const group = new Group([rectangle, ellipse]);

              // manager.addElement(group);
            }
          }
          if (mode === "select") {
            manager.selectElementAtPosition();
          }
          setSelectedElement(manager.selectedElement);

          setMode("select");
        }}
        onMouseMove={handleMouseMove}
      />

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
        <div>FPS: {fps}</div>
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
