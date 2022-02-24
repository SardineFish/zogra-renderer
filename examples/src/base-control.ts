import { ZograEngine, PreviewRenderer, InputManager, Camera, rgb, Entity, vec3, Keys, mat4, mul, plus, quat, RenderObject, MeshBuilder, LitLambertian, Deg2Rad, Debug, Color, ZograRenderPipeline } from "zogra-engine";
import { Constraint, DistanceConstraint, PhysicsSystem, Plane, Sphere } from "zogra-physics";

export function initBaseControl<RP extends ZograRenderPipeline>(engine: ZograEngine<RP>, physics?: PhysicsSystem) 
{
    const input = new InputManager();
    const camera = new Camera();

    function initCamera()
    {
        const wrapper = new Entity();
        engine.scene.add(wrapper);
        wrapper.position = vec3(0, 6, 20);


        camera.clearColor = rgb(.3, .3, .3);
        camera.FOV = 60;
        engine.scene.add(camera, wrapper);

        engine.on("update", (time) =>
        {
            // engine.renderer.clear(Color.white, true);
            // engine.renderer.drawMesh(mesh, mat4.identity(), new Mat());
            const sensity = 0.0001 * 10;

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
            if (input.getKeyDown(Keys.Mouse2))
                input.lockPointer();
            if (input.getKeyUp(Keys.Mouse2))
                input.releasePointer();

            if (input.getKey(Keys.Mouse2))
            {
                let look = input.pointerDelta;

                wrapper.rotation = quat.mul(wrapper.rotation, quat.axisAngle(up, -sensity * look.x));
                camera.localRotation = quat.mul(camera.localRotation, quat.axisAngle(vec3(1, 0, 0), -sensity * look.y));
                wrapper.position = plus(wrapper.position, mul(v, 5));
            }
        });
    }

    initCamera();

    engine.on('update', () => input.update());

    function initManipulator()
    {
        if (!physics)
            return;
        let constraint: Constraint | null = null;
        const particle = physics.addParticle(vec3.zero(), 0);
        let distance = 0;

        engine.on("update", () =>
        {
            if (input.getKeyDown(Keys.Mouse0))
            {
                const ray = camera.screenToRay(input.pointerPosition);
                const result = physics.raycast(ray.origin, ray.direction);
                if (result)
                {
                    Debug().drawRay(result.point, result.normal, 1, Color.red);

                    constraint = physics.addConstraint(new DistanceConstraint(result.entity, particle, 0, 0.0001));
                    distance = result.distance;
                }
            }
            else if (input.getKeyUp(Keys.Mouse0) && constraint)
            {
                physics.removeConstraint(constraint);
                constraint = null;
            }

            if (constraint)
            {
                const ray = camera.screenToRay(input.pointerPosition)
                const pos = vec3.mul(ray.direction, distance).plus(ray.origin);
                particle.position.set(pos);
            }
        });
    }

    initManipulator();
}