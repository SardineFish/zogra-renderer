import React, { useEffect, useRef, useContext } from "react";
import { ZograEngine } from "zogra-renderer";
import { EditorContext } from "../context/editor-context";

export function SceneView(props: {setupCallback: (engine: ZograEngine)=>void})
{
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const context = useContext(EditorContext);
    useEffect(() =>
    {
        if (!canvasRef.current)
            return;
        if (context)
            return;
        const engine = new ZograEngine(canvasRef.current);
        props.setupCallback(engine);
    }, [context, canvasRef.current]);
    useEffect(() =>
    {
        if (!context || !canvasRef.current)
            return;
        const rect = canvasRef.current.getBoundingClientRect();
        context.engine.renderer.setSize(rect.width, rect.height);
    }, [context]);
    return (
        <div className="scene-view">
            <canvas className="canvas" ref={canvasRef}></canvas>
        </div>
    );
}