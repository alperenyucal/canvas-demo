import React, { useEffect, useMemo, useRef, useState } from "react";
import { Shape } from "../../classes/Elements/Shape";
import { Button } from "../Button";
import { Rectangle } from "../../classes/Elements/Rectangle";
import { Circle } from "../../classes/Elements/Circle";
import { TextElement } from "../../classes/Elements/TextElement";
import { CanvasManager } from "../../classes/CanvasManager/CanvasManager";
import { CircleEditor } from "./CircleEditor";
import { RectangleEditor } from "./RectangleEditor";
import { TextEditor } from "./TextElementEditor";
import { Group } from "../../classes/Elements/Group";

export const AppCanvas: React.FC = () => {
  const elementTreeCanvasRef = useRef<HTMLCanvasElement>(null);
  const actionCanvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState("draw");
  const [selectedShape, setSelectedShape] = useState<
    "circle" | "rectangle" | "text" | "group"
  >();
  const [manager, setRenderer] = useState<CanvasManager>();
  const [selectedElement, setSelectedElement] = useState<Shape | null>();

  const elementTree = useMemo(() => {
    if (!manager) return null;
    return manager.elementTree;
  }, [manager?.elementTree]);

  useEffect(() => {
    if (!elementTreeCanvasRef.current || !actionCanvasRef.current) return;
    setRenderer(
      new CanvasManager(elementTreeCanvasRef.current, actionCanvasRef.current)
    );
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
      manager.moveSelectedElement(diff.dx, diff.dy);
    };

    const upListener = () => {
      isMouseDown = false;
    };

    actionCanvas.addEventListener("mousedown", downListener);
    actionCanvas.addEventListener("mousemove", moveListener);
    actionCanvas.addEventListener("mouseup", upListener);

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
  }

  return (
    <div className="relative">
      <canvas ref={elementTreeCanvasRef} className="absolute" />
      <canvas
        ref={actionCanvasRef}
        className="absolute"
        onClick={() => {
          if (!manager) return;
          if (mode === "draw") {
            if (!selectedShape) return;
            if (selectedShape === "circle") {
              const circle = new Circle({
                r: 50,
                cx: manager.mousePosition.x,
                cy: manager.mousePosition.y,
              });
              manager.addElement(circle);
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
              const group = new Group([
                new Circle({
                  r: 15,
                  cx: manager.mousePosition.x,
                  cy: manager.mousePosition.y,
                }),
                new Rectangle({
                  ...manager.mousePosition,
                  width: 30,
                  height: 30,
                }),
                new TextElement({
                  ...manager.mousePosition,
                  text: "Group",
                }),
              ]);
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
      />
      <div className="absolute top-0 left-0 p-2 bg-white flex gap-2">
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
          active={mode === "draw" && selectedShape === "circle"}
          onClick={() => {
            setMode("draw");
            setSelectedShape("circle");
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
      <div className="absolute bottom-0 left-0 p-2 bg-white flex flex-col gap-2">
        {elementTree &&
          Object.entries(elementTree)?.map(([id, element]) => {
            return (
              <div key={id}>
                <button
                  onClick={() => {
                    if (!manager) return;
                    manager.selectElement(element);
                    setSelectedElement(manager.selectedElement);
                  }}
                >
                  {element.constructor.name}
                </button>
              </div>
            );
          })}
      </div>
      <div className="absolute top-0 right-0 p-2 bg-white flex flex-col gap-2">
        {(() => {
          if (manager && selectedElement) {
            if (selectedElement instanceof Circle) {
              return (
                <CircleEditor
                  key={selectedElement.id}
                  circle={selectedElement}
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
