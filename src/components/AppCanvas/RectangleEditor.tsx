import { CanvasManager } from "../../classes/CanvasManager/CanvasManager";
import { Rectangle } from "../../classes/Elements/Rectangle";

export const RectangleEditor: React.FC<{
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
