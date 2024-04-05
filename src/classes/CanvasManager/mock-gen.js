import fs from "fs";

const vw = 1440;
const vh = 900;
const maxWidth = 100;
const maxHeight = 100;

const elementCount = 100;

const colorPalette = [
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "pink",
  "black",
  "white",
];

const generateRandomRectangle = () => {
  const x = Math.floor(Math.random() * vw);
  const y = Math.floor(Math.random() * vh);
  const width = Math.floor(Math.random() * maxWidth);
  const height = Math.floor(Math.random() * maxHeight);
  const fillStyle =
    colorPalette[Math.floor(Math.random() * colorPalette.length)];
  return { x, y, width, height, fillStyle, type: "rectangle" };
};

const generateRandomEllipse = () => {
  const cx = Math.floor(Math.random() * vw);
  const cy = Math.floor(Math.random() * vh);
  const r = Math.floor(Math.random() * maxWidth);
  const fillStyle =
    colorPalette[Math.floor(Math.random() * colorPalette.length)];
  return { cx, cy, r, fillStyle, type: "ellipse" };
};

const generateRandomTextElement = () => {
  const x = Math.floor(Math.random() * vw);
  const y = Math.floor(Math.random() * vh);
  const text = Math.random().toString(36).substring(2, 15);
  const fillStyle =
    colorPalette[Math.floor(Math.random() * colorPalette.length)];
  return { x, y, text, fillStyle, type: "text" };
};

const mockGen = () => {
  const elements = [];
  for (let i = 0; i < elementCount; i++) {
    const rand = Math.random();
    if (rand < 0.33) {
      elements.push(generateRandomRectangle());
    }
    // else if (rand < 0.66) {
    //   elements.push(generateRandomEllipse());
    // }
    else {
      elements.push(generateRandomTextElement());
    }
  }
  return elements;
};

const elements = mockGen();

fs.writeFileSync(
  "./src/classes/CanvasManager/mock-data.json",
  JSON.stringify(elements)
);
