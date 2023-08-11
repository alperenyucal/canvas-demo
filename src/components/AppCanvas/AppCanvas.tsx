import React, { useEffect, useRef, useState } from "react";
import { Shape } from "../../classes/Shape";
import { Button } from "../Button";
import { nanoid } from "nanoid";
import { CanvasRenderer } from "../../classes/CanvasRenderer";
import { Rectangle } from "../../classes/Rectangle";
import { Circle } from "../../classes/Circle";
import { Text } from "../../classes/Text";

const RectangleEditor: React.FC<{
  rectangle: Rectangle;
  renderer: CanvasRenderer;
}> = ({ rectangle, renderer }) => {
  return (
    <>
      <label>
        Width
        <input
          defaultValue={rectangle.w}
          type="number"
          onChange={(event) => {
            renderer.updateRectangleProperties({
              w: Number(event.target.value),
            });
          }}
        />
      </label>
      <label>
        Height
        <input
          defaultValue={rectangle.h}
          type="number"
          onChange={(event) => {
            renderer.updateRectangleProperties({
              h: Number(event.target.value),
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
              r: Number(event.target.value),
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
      renderer.selectElement();
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
              const circle = new Circle(
                50,
                renderer.mousePosition.x,
                renderer.mousePosition.y,
                nanoid()
              );
              renderer.addElement(circle);
            } else if (selectedShape === "rectangle") {
              const rectangle = new Rectangle(
                renderer.mousePosition.x,
                renderer.mousePosition.y,
                100,
                100,
                nanoid()
              );
              renderer.addElement(rectangle);
            } else if (selectedShape === "text") {
              const text = new Text(
                renderer.mousePosition.x,
                renderer.mousePosition.y,
                "Hello World",
                nanoid()
              );
              renderer.addElement(text);
            }
          }
          if (mode === "select") {
            renderer.selectElement();
            onSelect?.(renderer.selectedElement!);
            setSelectedElement(renderer.selectedElement);
          }

          setMode("select");
        }}
        onMouseMove={handleMouseMove}
      />
      <div className="absolute top-0 left-0 p-2 bg-white flex gap-2">
        <Button onClick={() => setMode("select")}>Select</Button>
        <Button
          onClick={() => {
            if (!renderer || !renderer.selectedElement) return;
            renderer.removeElement(renderer.selectedElement);
          }}
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            setMode("draw");
            setSelectedShape("circle");
          }}
        >
          ○
        </Button>
        <Button
          onClick={() => {
            setMode("draw");
            setSelectedShape("rectangle");
          }}
        >
          □
        </Button>
        <Button
          onClick={() => {
            setMode("draw");
            setSelectedShape("text");
          }}
        >
          T
        </Button>
      </div>
      <div className="absolute top-0 right-0 p-2 bg-white flex flex-col gap-2">
        {renderer && selectedElement && selectedElement instanceof Rectangle ? (
          <RectangleEditor
            key={selectedElement.id}
            rectangle={selectedElement}
            renderer={renderer}
          />
        ) : (
          "nope"
        )}
      </div>
    </div>
  );
};
