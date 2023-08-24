import React, { useEffect, useMemo, useRef, useState } from "react";
import { Shape } from "../../classes/Elements/Shape";
import { Button } from "../Button";
import { Rectangle } from "../../classes/Elements/Rectangle";
import { Circle } from "../../classes/Elements/Circle";
import { TextElement } from "../../classes/Elements/TextElement";
import { CanvasManager } from "../../classes/CanvasManager/CanvasManager";

const RectangleEditor: React.FC<{
  rectangle: Rectangle;
  manager: CanvasManager;
}> = ({ rectangle, manager }) => {
  return (
    <>
      <label>
        Width
        <input
          defaultValue={rectangle.width}
          type="number"
          onChange={(event) => {
            manager.updateRectangleProperties({
              width: Number(event.target.value),
            });
          }}
        />
      </label>
      <label>
        Height
        <input
          defaultValue={rectangle.height}
          type="number"
          onChange={(event) => {
            manager.updateRectangleProperties({
              height: Number(event.target.value),
            });
          }}
        />
      </label>
      <label>
        Radius
        <input
          defaultValue={rectangle.radius}
          type="number"
          onChange={(event) => {
            manager.updateRectangleProperties({
              radius: Number(event.target.value),
            });
          }}
        />
      </label>
      <label>
        X
        <input
          defaultValue={rectangle.x}
          type="number"
          onChange={(event) => {
            manager.updateRectangleProperties({
              x: Number(event.target.value),
            });
          }}
        />
      </label>
      <label>
        Y
        <input
          defaultValue={rectangle.y}
          type="number"
          onChange={(event) => {
            manager.updateRectangleProperties({
              y: Number(event.target.value),
            });
          }}
        />
      </label>
      <label>
        Fill
        <input
          defaultValue={rectangle.fillStyle}
          type="color"
          onChange={(event) => {
            manager.updateRectangleProperties({
              fillStyle: event.target.value,
            });
          }}
        />
      </label>
      <label>
        Stroke
        <input
          defaultValue={rectangle.strokeStyle}
          type="color"
          onChange={(event) => {
            manager.updateRectangleProperties({
              strokeStyle: event.target.value,
            });
          }}
        />
      </label>
      <label>
        Stroke Width
        <input
          defaultValue={rectangle.lineWidth}
          type="number"
          onChange={(event) => {
            manager.updateRectangleProperties({
              lineWidth: Number(event.target.value),
            });
          }}
        />
      </label>
    </>
  );
};

const CircleEditor: React.FC<{
  circle: Circle;
  manager: CanvasManager;
}> = ({ circle, manager }) => {
  return (
    <>
      <label>
        Radius
        <input
          defaultValue={circle.r}
          type="number"
          onChange={(event) => {
            manager.updateCircleProperties({
              r: Number(event.target.value),
            });
          }}
        />
      </label>
      <label>
        X
        <input
          defaultValue={circle.cx}
          type="number"
          onChange={(event) => {
            manager.updateCircleProperties({
              cx: Number(event.target.value),
            });
          }}
        />
      </label>
      <label>
        Y
        <input
          defaultValue={circle.cy}
          type="number"
          onChange={(event) => {
            manager.updateCircleProperties({
              cy: Number(event.target.value),
            });
          }}
        />
      </label>
      <label>
        Fill
        <input
          defaultValue={circle.fillStyle}
          type="color"
          onChange={(event) => {
            manager.updateCircleProperties({
              fillStyle: event.target.value,
            });
          }}
        />
      </label>
      <label>
        Stroke
        <input
          defaultValue={circle.strokeStyle}
          type="color"
          onChange={(event) => {
            manager.updateCircleProperties({
              strokeStyle: event.target.value,
            });
          }}
        />
      </label>
      <label>
        Stroke Width
        <input
          defaultValue={circle.lineWidth}
          type="number"
          onChange={(event) => {
            manager.updateCircleProperties({
              lineWidth: Number(event.target.value),
            });
          }}
        />
      </label>
    </>
  );
};

const TextEditor: React.FC<{
  textElement: TextElement;
  manager: CanvasManager;
}> = ({ textElement, manager }) => {
  return (
    <>
      <label>
        Text
        <input
          defaultValue={textElement.text}
          type="text"
          onChange={(event) => {
            manager.updateTextProperties({
              text: event.target.value,
            });
          }}
        />
      </label>
      <label>
        X
        <input
          defaultValue={textElement.x}
          type="number"
          onChange={(event) => {
            manager.updateTextProperties({
              x: Number(event.target.value),
            });
          }}
        />
      </label>
      <label>
        Y
        <input
          defaultValue={textElement.y}
          type="number"
          onChange={(event) => {
            manager.updateTextProperties({
              y: Number(event.target.value),
            });
          }}
        />
      </label>
      <label>
        Fill
        <input
          defaultValue={textElement.fillStyle}
          type="color"
          onChange={(event) => {
            manager.updateTextProperties({
              fillStyle: event.target.value,
            });
          }}
        />
      </label>
      <label>
        Font Size
        <input
          defaultValue={textElement.fontSize}
          type="number"
          onChange={(event) => {
            manager.updateTextProperties({
              fontSize: Number(event.target.value),
            });
          }}
        />
      </label>
    </>
  );
};

interface AppCanvasProps {}

export const AppCanvas: React.FC<AppCanvasProps> = () => {
  const elementTreeCanvasRef = useRef<HTMLCanvasElement>(null);
  const actionCanvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState("draw");
  const [selectedShape, setSelectedShape] = useState<
    "circle" | "rectangle" | "text"
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

    let mouseDownPosition: { dx: number; dy: number } | undefined;

    const downListener = () => {
      isMouseDown = true;
      manager.selectElementAtPosition();
      mouseDownPosition = manager.selectedElement?.getDiff(
        manager.mousePosition.x,
        manager.mousePosition.y
      );
    };
    actionCanvas.addEventListener("mousedown", downListener);
    const moveListener = () => {
      if (!isMouseDown) return;
      if (!mouseDownPosition) return;
      manager.moveElement(mouseDownPosition.dx, mouseDownPosition.dy);
    };
    actionCanvas.addEventListener("mousemove", moveListener);
    const upListener = () => {
      isMouseDown = false;
    };
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
