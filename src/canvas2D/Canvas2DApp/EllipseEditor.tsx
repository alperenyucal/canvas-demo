import { CanvasManager } from "../classes/CanvasManager/CanvasManager";
import { Ellipse } from "../classes/Elements/Ellipse";
import { Input } from "../../common/components/Input";

export const EllipseEditor: React.FC<{
  ellipse: Ellipse;
  manager: CanvasManager;
}> = ({ ellipse, manager }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <label className="flex gap-2 justify-between">
          W
          <Input
            defaultValue={ellipse.width}
            type="number"
            onChange={(event) => {
              manager.updateEllipseProperties({
                width: Number(event.target.value),
              });
            }}
          />
        </label>
        <label className="flex gap-2 justify-between">
          H
          <Input
            defaultValue={ellipse.height}
            type="number"
            onChange={(event) => {
              manager.updateEllipseProperties({
                height: Number(event.target.value),
              });
            }}
          />
        </label>
        <label className="flex gap-2 justify-between">
          X
          <Input
            defaultValue={ellipse.x}
            type="number"
            onChange={(event) => {
              manager.updateEllipseProperties({
                x: Number(event.target.value),
              });
            }}
          />
        </label>
        <label className="flex gap-2 justify-between">
          Y
          <Input
            defaultValue={ellipse.y}
            type="number"
            onChange={(event) => {
              manager.updateEllipseProperties({
                y: Number(event.target.value),
              });
            }}
          />
        </label>
      </div>
      <div>
        <label className="flex gap-2 justify-between">
          Fill
          <Input
            defaultValue={ellipse.fillStyle}
            type="color"
            onChange={(event) => {
              manager.updateEllipseProperties({
                fillStyle: event.target.value,
              });
            }}
          />
        </label>
        <label className="flex gap-2 justify-between">
          Stroke
          <Input
            defaultValue={ellipse.strokeStyle}
            type="color"
            onChange={(event) => {
              manager.updateEllipseProperties({
                strokeStyle: event.target.value,
              });
            }}
          />
        </label>
        <label className="flex gap-2 justify-between">
          Stroke Width
          <Input
            defaultValue={ellipse.lineWidth}
            type="number"
            onChange={(event) => {
              manager.updateEllipseProperties({
                lineWidth: Number(event.target.value),
              });
            }}
          />
        </label>
      </div>
    </>
  );
};
