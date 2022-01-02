import { ZograEngine, PreviewRenderer, InputManager, Camera, rgb, Entity, vec3, Keys, mat4, mul, plus, quat, RenderObject, MeshBuilder, LitLambertian, Deg2Rad } from "zogra-engine";
import { DistanceConstraint, PhysicsSystem, Plane, Sphere } from "zogra-physics";
import "./css/base.css";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const engine = new ZograEngine(canvas, PreviewRenderer);
const input = new InputManager();

function initCamera()
{
    const wrapper = new Entity();
    engine.scene.add(wrapper);
    wrapper.position = vec3(0, 6, 20);
    
    const camera = new Camera();

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


function createConstraint()
{
    let physics = new PhysicsSystem();
    const entities: Entity[] = [];
    const transform = mat4.rts(quat.axisAngle(vec3.one().normalize(), Deg2Rad * 45), vec3(0, 3, 0), vec3.one());
    for (let x = 0; x < 2; ++x)
    {
        for (let y = 0; y < 2; ++y)
        {
            for (let z = 0; z < 2; ++z)
            {
                const entity = new RenderObject();
                entities.push(entity);
                engine.scene.add(entity);
                entity.position = mat4.mulPoint(transform, vec3(x, y + 3, z));
                entity.meshes[0] = MeshBuilder.sphereNormalizedCube(vec3.zero(), 0.2);
                entity.materials[0] = new LitLambertian();

                const particle = physics.addParticle(entity.position, 1);
                physics.addShape(particle, Sphere, {
                    radius: 0.2,
                    offset: vec3.zero(),
                });
            }
        }
    }
    physics.particles.buffer.forEach(p0 => physics.particles.buffer.forEach(p1 =>
    {
        if (p0 === p1)
            return;
        physics.addConstraint(new DistanceConstraint(p0, p1, vec3.minus(p0.position, p1.position).magnitude));
    }))

    // for (let i = 0; i < 7; ++i)
    // {
    //     const entity = new RenderObject();
    //     entities.push(entity);
    //     engine.scene.add(entity);
    //     entity.position = vec3(i * 1, 3, 0);
    //     entity.meshes[0] = MeshBuilder.sphereNormalizedCube();
    //     entity.materials[0] = new LitLambertian();

    //     const particle = physics.addParticle(entity.position, i === 0 ? 0 : 1);
    //     if (i > 0)
    //     {
    //         physics.addConstraint(new DistanceConstraint(physics.particles.getUnchecked(i - 1), physics.particles.getUnchecked(i), 1));
    //         physics.addShape(particle, Sphere, {
    //             offset: vec3.zero(),
    //             radius: 0.5
    //         });
    //     }
    // }

    const plane = physics.addRigidbody();
    physics.addShape(plane, Plane, {
        normal: vec3(0, 1, 0),
        offset: 0
    });

    engine.on("update", (time) =>
    {
        physics.simulate(1 / 60, 1);

        for (let i = 0; i < entities.length; ++i)
        {
            entities[i].position = physics.particles.getUnchecked(i).position;
        }
    });
}
createConstraint();
engine.start();

let _totalTime = 0;
// window.addEventListener("keydown", e =>
// {
//     if (e.code === "Space")
//         engine.update({
//             deltaTime: 1 / 60,
//             time: _totalTime += 1 / 60
//         });
//     console.log(e);
// })