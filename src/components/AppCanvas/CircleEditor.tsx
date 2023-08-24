import { CanvasManager } from "../../classes/CanvasManager/CanvasManager";
import { Circle } from "../../classes/Elements/Circle";

export const CircleEditor: React.FC<{
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
