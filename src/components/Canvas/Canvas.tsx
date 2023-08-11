import React, { useEffect, useRef, useState } from "react"
import { Circle, Rectangle } from "../../classes/Shape";
import { Button } from "../Button";
import { nanoid } from "nanoid";
import { CanvasRenderer } from "../../classes/Renderer";



export const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mode, setMode] = useState('draw')
  const [selectedShape, setSelectedShape] = useState<'circle' | 'rectangle'>()
  const [renderer, setRenderer] = useState<CanvasRenderer>()

  useEffect(() => {
    if (!canvasRef.current) return
    setRenderer(new CanvasRenderer(canvasRef.current))
  }, [])

  useEffect(() => {
    const canvasElement = canvasRef.current
    if (!canvasRef.current) return
    if (!renderer) return
    let isMouseDown = false

    const downListener = () => {
      isMouseDown = true
      renderer.selectElement()
      renderer.moveStartPositon = renderer.mousePosition

    }
    canvasRef.current.addEventListener('mousedown', downListener)
    const moveListener = () => {
      if (!isMouseDown) return
      console.log(renderer.moveStartPositon)
      console.log(renderer.selectedElement)
      console.log(renderer.selectedElement?.getDiff(
        renderer.mousePosition.x,
        renderer.mousePosition.y
      ))
      renderer.moveElement()
    }
    canvasRef.current.addEventListener('mousemove', moveListener)
    const upListener = () => {
      isMouseDown = false
    }
    canvasRef.current.addEventListener('mouseup', upListener)
    return () => {

      // release memory
      canvasElement?.removeEventListener('mousedown', downListener)
      canvasElement?.removeEventListener('mousemove', moveListener)
      canvasElement?.removeEventListener('mouseup', upListener)
    }
  }, [renderer])

  function handleMouseMove(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (!renderer) return
    renderer.mousePosition =
    {
      x: event.clientX,
      y: event.clientY,
    }
    renderer.highlightElement()
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        onClick={() => {
          if (!renderer) return
          if (mode === 'draw') {
            if (!selectedShape) return
            if (selectedShape === 'circle') {
              const circle = new Circle(50, renderer.mousePosition.x, renderer.mousePosition.y, nanoid())
              renderer.addElement(circle)
            }
            else if (selectedShape === 'rectangle') {
              const rectangle = new Rectangle(
                renderer.mousePosition.x,
                renderer.mousePosition.y,
                100,
                100,
                nanoid()
              )
              renderer.addElement(rectangle)
            }
          }
          if (mode === 'select') {
            renderer.selectElement()
          }

          setMode('select')
        }
        }
        onMouseMove={handleMouseMove}
      />
      <div className="absolute top-0 left-0 p-2 bg-white flex gap-2">
        <Button onClick={() => setMode(prev => prev === 'draw' ? 'select' : 'draw')}>
          {mode === 'draw' ? 'Draw' : 'Select'}
        </Button>
        <Button onClick={() => {
          if (!renderer || !renderer.selectedElement) return
          renderer.removeElement(
            renderer.selectedElement
          )
        }}>
          Delete
        </Button>
        <Button onClick={() => {
          setSelectedShape('circle')
        }}>
          O
        </Button>
        <Button onClick={() => {
          setSelectedShape('rectangle')
        }
        }>
          []
        </Button>
      </div>
    </div>
  )
}