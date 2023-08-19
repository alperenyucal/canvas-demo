import React, { useEffect, useMemo, useRef, useState } from "react";
import { Shape } from "../../classes/Shape";
import { Button } from "../Button";
import { CanvasRenderer } from "../../classes/CanvasRenderer";
import { Rectangle } from "../../classes/Rectangle";
import { Circle } from "../../classes/Circle";
import { TextElement } from "../../classes/TextElement";

const RectangleEditor: React.FC<{
  rectangle: Rectangle;
  renderer: CanvasRenderer;
}> = ({ rectangle, renderer }) => {
  return (
    <>
      <label>
        Width
        <input
          defaultValue={rectangle.width}
          type="number"
          onChange={(event) => {
            renderer.updateRectangleProperties({
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
            renderer.updateRectangleProperties({
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
            renderer.updateRectangleProperties({
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
            renderer.updateRectangleProperties({
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
            renderer.updateRectangleProperties({
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
            renderer.updateRectangleProperties({
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
            renderer.updateRectangleProperties({
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
            renderer.updateRectangleProperties({
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
  renderer: CanvasRenderer;
}> = ({ circle, renderer }) => {
  return (
    <>
      <label>
        Radius
        <input
          defaultValue={circle.r}
          type="number"
          onChange={(event) => {
            renderer.updateCircleProperties({
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
            renderer.updateCircleProperties({
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
            renderer.updateCircleProperties({
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
            renderer.updateCircleProperties({
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
            renderer.updateCircleProperties({
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
            renderer.updateCircleProperties({
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
  renderer: CanvasRenderer;
}> = ({ textElement, renderer }) => {
  return (
    <>
      <label>
        Text
        <input
          defaultValue={textElement.text}
          type="text"
          onChange={(event) => {
            renderer.updateTextProperties({
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
            renderer.updateTextProperties({
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
            renderer.updateTextProperties({
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
            renderer.updateTextProperties({
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
            renderer.updateTextProperties({
              fontSize: Number(event.target.value),
            });
          }}
        />
      </label>
    </>
  );
};

interface AppCanvasProps {
  onSelect?: (element: Shape) => void;
  onDrag?: (element: Shape) => void;
}

export const AppCanvas: React.FC<AppCanvasProps> = ({ onSelect, onDrag }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState("draw");
  const [selectedShape, setSelectedShape] = useState<
    "circle" | "rectangle" | "text"
  >();
  const [renderer, setRenderer] = useState<CanvasRenderer>();
  const [selectedElement, setSelectedElement] = useState<Shape | null>();

  const elementTree = useMemo(() => {
    if (!renderer) return null;
    return renderer.elementTree;
  }, [renderer?.elementTree]);

  useEffect(() => {
    if (!canvasRef.current) return;
    setRenderer(new CanvasRenderer(canvasRef.current));
  }, []);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasRef.current) return;
    if (!renderer) return;

    let isMouseDown = false;

    let mouseDownPosition: { dx: number; dy: number } | undefined;

    const downListener = () => {
      isMouseDown = true;
      renderer.selectElementAtPosition();
      mouseDownPosition = renderer.selectedElement?.getDiff(
        renderer.mousePosition.x,
        renderer.mousePosition.y
      );
      onSelect?.(renderer.selectedElement!);
    };
    canvasRef.current.addEventListener("mousedown", downListener);
    const moveListener = () => {
      if (!isMouseDown) return;
      onDrag?.(renderer.selectedElement!);
      if (!mouseDownPosition) return;
      renderer.moveElement(mouseDownPosition.dx, mouseDownPosition.dy);
    };
    canvasRef.current.addEventListener("mousemove", moveListener);
    const upListener = () => {
      isMouseDown = false;
    };
    canvasRef.current.addEventListener("mouseup", upListener);
    return () => {
      canvasElement?.removeEventListener("mousedown", downListener);
      canvasElement?.removeEventListener("mousemove", moveListener);
      canvasElement?.removeEventListener("mouseup", upListener);
    };
  }, [onDrag, onSelect, renderer]);

  function handleMouseMove(
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {
    if (!renderer) return;
    renderer.mousePosition = {
      x: event.clientX,
      y: event.clientY,
    };
    renderer.highlightElement();
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        onClick={() => {
          if (!renderer) return;
          if (mode === "draw") {
            if (!selectedShape) return;
            if (selectedShape === "circle") {
              const circle = new Circle({
                r: 50,
                cx: renderer.mousePosition.x,
                cy: renderer.mousePosition.y,
              });
              renderer.addElement(circle);
            } else if (selectedShape === "rectangle") {
              const rectangle = new Rectangle({
                ...renderer.mousePosition,
                width: 100,
                height: 100,
              });
              renderer.addElement(rectangle);
            } else if (selectedShape === "text") {
              const text = new TextElement({
                ...renderer.mousePosition,
                text: "Hello World",
              });
              renderer.addElement(text);
            }
          }
          if (mode === "select") {
            renderer.selectElementAtPosition();
            onSelect?.(renderer.selectedElement!);
          }
          setSelectedElement(renderer.selectedElement);

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
            if (!renderer || !renderer.selectedElement) return;
            renderer.removeElement(renderer.selectedElement);
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
                    if (!renderer) return;
                    renderer.selectElement(element);
                    setSelectedElement(renderer.selectedElement);
                    onSelect?.(renderer.selectedElement!);
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
          if (renderer && selectedElement) {
            if (selectedElement instanceof Circle) {
              return (
                <CircleEditor
                  key={selectedElement.id}
                  circle={selectedElement}
                  renderer={renderer}
                />
              );
            }
            if (selectedElement instanceof Rectangle) {
              return (
                <RectangleEditor
                  key={selectedElement.id}
                  rectangle={selectedElement}
                  renderer={renderer}
                />
              );
            }
            if (selectedElement instanceof TextElement) {
              return (
                <TextEditor
                  key={selectedElement.id}
                  textElement={selectedElement}
                  renderer={renderer}
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
