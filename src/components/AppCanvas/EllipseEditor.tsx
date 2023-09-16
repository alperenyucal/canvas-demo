import { CanvasManager } from "../../classes/CanvasManager/CanvasManager";
import { Ellipse } from "../../classes/Elements/Ellipse";

export const EllipseEditor: React.FC<{
  ellipse: Ellipse;
  manager: CanvasManager;
}> = ({ ellipse, manager }) => {
  return (
    <>
      <label>
        X
        <input
          defaultValue={ellipse.x}
          type="number"
          onChange={(event) => {
            manager.updateEllipseProperties({
              x: Number(event.target.value),
            });
          }}
        />
      </label>
      <label>
        Y
        <input
          defaultValue={ellipse.y}
          type="number"
          onChange={(event) => {
            manager.updateEllipseProperties({
              y: Number(event.target.value),
            });
          }}
        />
      </label>
      <label>
        Width
        <input
          defaultValue={ellipse.width}
          type="number"
          onChange={(event) => {
            manager.updateEllipseProperties({
              width: Number(event.target.value),
            });
          }}
        />
      </label>
      <label>
        Height
        <input
          defaultValue={ellipse.height}
          type="number"
          onChange={(event) => {
            manager.updateEllipseProperties({
              height: Number(event.target.value),
            });
          }}
        />
      </label>
      <label>
        Fill
        <input
          defaultValue={ellipse.fillStyle}
          type="color"
          onChange={(event) => {
            manager.updateEllipseProperties({
              fillStyle: event.target.value,
            });
          }}
        />
      </label>
      <label>
        Stroke
        <input
          defaultValue={ellipse.strokeStyle}
          type="color"
          onChange={(event) => {
            manager.updateEllipseProperties({
              strokeStyle: event.target.value,
            });
          }}
        />
      </label>
      <label>
        Stroke Width
        <input
          defaultValue={ellipse.lineWidth}
          type="number"
          onChange={(event) => {
            manager.updateEllipseProperties({
              lineWidth: Number(event.target.value),
            });
          }}
        />
      </label>
    </>
  );
};
