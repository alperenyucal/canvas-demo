import { useState } from "react";
import { Canvas2DApp } from "./canvas2D/Canvas2DApp";
import { CanvaskitApp } from "./canvaskit/CanvaskitApp";

type EngineType = "Canvas2D" | "Canvaskit";

function App() {
  const [engine, setEngine] = useState<EngineType>("Canvas2D");
  return (
    <div>
      {
        {
          Canvas2D: <Canvas2DApp />,
          Canvaskit: <CanvaskitApp />,
        }[engine]
      }
      <select
        className="absolute bottom-0 right-0 p-2 bg-white rounded-lg m-2"
        value={engine}
        onChange={(event) => setEngine(event.target.value as EngineType)}
      >
        <option>Canvas2D</option>
        <option>Canvaskit</option>
      </select>
    </div>
  );
}

export default App;
