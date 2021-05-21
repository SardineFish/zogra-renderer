import { Camera, Color, Default2DRenderPipeline, InputManager, Projection, vec2, vec3, ZograEngine, TouchState, Vector2, vec4 } from "zogra-engine";
import { Debug } from "zogra-renderer/dist/core/global";
import { canvas } from "./page-base";
import "./css/base.css";

const engine = new ZograEngine(canvas, Default2DRenderPipeline);
engine.start();
const input = new InputManager();

const camera = new Camera();
camera.clearColor = Color.white;
camera.position = vec3(0, 0, 20);
camera.projection = Projection.Orthographic;
camera.viewHeight = 10;
engine.scene.add(camera);

engine.on("update", time =>
{
    input.update();
    
    for (const touch of input.touches)
    {
        const pos = camera.screenToWorld(touch.pos);
        const track = trackTouch[touch.id] || {
            color: Color.fromHSL(Math.random() * 360, 0.7, 0.7),
            pos: pos.toVec2(),
        };
        Debug().drawLine(track.pos.toVec3(0), pos.toVec2().toVec3(0), track.color);
        track.pos = pos.toVec2();
        // console.log(pos);
        trackTouch[touch.id] = track;
        if (touch.state & (TouchState.Ended | TouchState.Canceled))
        {
            trackTouch[touch.id] = undefined as any;
        }

        if (Vector2.distance(touch.pos, touch.startPos) > 100)
        {
            let delta = vec2.minus(touch.pos, touch.startPos);
            if (Math.abs(delta.x) > Math.abs(delta.y))
            {
                Debug().drawLine(camera.screenToWorld(touch.startPos).setY(0).setZ(0), camera.screenToWorld(touch.pos).setY(0).setZ(0), Color.red);
            }
            else
            {
                Debug().drawLine(camera.screenToWorld(touch.startPos).setX(0).setZ(0), camera.screenToWorld(touch.pos).setX(0).setZ(0), Color.red);
            }
        }
    }
});
const trackTouch: Record<number, { color: Color, pos: vec2 }> = {};