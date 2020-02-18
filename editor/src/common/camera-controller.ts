import { Time, mat4, Keys, mul, quat, plus } from "zogra-renderer";
import { ZograEditor } from "./zogra-editor";
import { ZograEngine, Camera, vec3, Entity, rgb } from "zogra-renderer";

export function initCamera(editor: ZograEditor)
{
    const wrapper = new Entity();
    editor.engine.scene.add(wrapper);
    wrapper.position = vec3(0, 2, 20);
    const camera = new Camera();
    editor.engine.scene.add(camera, wrapper);
    camera.clearColor = rgb(.3, .3, .3);
    camera.FOV = 60;
    editor.engine.on("update", (time) =>
    {
        const sensity = 0.0001 * 10;
        const input = editor.input;

        let v = vec3.zero();
        let forward = mat4.mulVector(camera.localToWorldMatrix, vec3(0, 0, -1));
        forward.y = 0;
        forward = forward.normalize();
        let right = mat4.mulVector(camera.localToWorldMatrix, vec3(1, 0, 0)).normalize();
        let up = vec3(0, 1, 0);


        if (input.getKey(Keys.Shift) || input.getKey(Keys.Space))
            v.plus(vec3(0, 1 * time.deltaTime, 0));
        if (input.getKey(Keys.Control))
            v.plus(vec3(0, -1 * time.deltaTime, 0));
        if (input.getKey(Keys.W))
            v.plus(mul(forward, time.deltaTime));
        if (input.getKey(Keys.S))
            v.plus(mul(forward, -time.deltaTime));
        if (input.getKey(Keys.D))
            v.plus(mul(right, time.deltaTime));
        if (input.getKey(Keys.A))
            v.plus(mul(right, -time.deltaTime));
        if (input.getKey(Keys.Mouse2))
        {

            let look = input.pointerDelta;

            wrapper.rotation = quat.mul(wrapper.rotation, quat.axis(up, -sensity * look.x));
            camera.localRotation = quat.mul(camera.localRotation, quat.axis(vec3(1, 0, 0), -sensity * look.y));
            wrapper.position = plus(wrapper.position, mul(v, 5)); 
        }
        if (input.wheelDelta !== 0)
        {
            const view = editor.camera.screenToRay(input.pointerPosition);
            wrapper.position = plus(wrapper.position, mul(view.direction, Math.sign(-input.wheelDelta) * 1));
        }
        
    });
    return camera;
}