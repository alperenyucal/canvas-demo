import { CanvasManager } from "../classes/CanvasManager/CanvasManager";
import { Rectangle } from "../classes/Elements/Rectangle";
import { Input } from "../../common/components/Input";

export const RectangleEditor: React.FC<{
  rectangle: Rectangle;
  manager: CanvasManager;
}> = ({ rectangle, manager }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <label className="flex gap-2 justify-between">
          W
          <Input
            defaultValue={rectangle.width}
            type="number"
            onChange={(event) => {
              manager.updateRectangleProperties({
                width: Number(event.target.value),
              });
            }}
          />
        </label>
        <label className="flex gap-2 justify-between">
          H
          <Input
            defaultValue={rectangle.height}
            type="number"
            onChange={(event) => {
              manager.updateRectangleProperties({
                height: Number(event.target.value),
              });
            }}
          />
        </label>
        <label className="flex gap-2 justify-between">
          X
          <Input
            defaultValue={rectangle.x}
            type="number"
            onChange={(event) => {
              manager.updateRectangleProperties({
                x: Number(event.target.value),
              });
            }}
          />
        </label>
        <label className="flex gap-2 justify-between">
          Y
          <Input
            defaultValue={rectangle.y}
            type="number"
            onChange={(event) => {
              manager.updateRectangleProperties({
                y: Number(event.target.value),
              });
            }}
          />
        </label>
      </div>
      <div>
        <label className="flex gap-2 justify-between">
          Radius
          <Input
            defaultValue={rectangle.radius}
            type="number"
            onChange={(event) => {
              manager.updateRectangleProperties({
                radius: Number(event.target.value),
              });
            }}
          />
        </label>
        <label className="flex gap-2 justify-between">
          Fill
          <Input
            defaultValue={rectangle.fillStyle}
            type="color"
            onChange={(event) => {
              manager.updateRectangleProperties({
                fillStyle: event.target.value,
              });
            }}
          />
        </label>
        <label className="flex gap-2 justify-between">
          Stroke
          <Input
            defaultValue={rectangle.strokeStyle}
            type="color"
            onChange={(event) => {
              manager.updateRectangleProperties({
                strokeStyle: event.target.value,
              });
            }}
          />
        </label>
        <label className="flex gap-2 justify-between">
          Stroke Width
          <Input
            defaultValue={rectangle.lineWidth}
            type="number"
            onChange={(event) => {
              manager.updateRectangleProperties({
                lineWidth: Number(event.target.value),
              });
            }}
          />
        </label>
      </div>
    </>
  );
};
