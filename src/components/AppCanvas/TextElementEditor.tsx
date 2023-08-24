import { CanvasManager } from "../../classes/CanvasManager/CanvasManager";
import { TextElement } from "../../classes/Elements/TextElement";

export const TextEditor: React.FC<{
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
