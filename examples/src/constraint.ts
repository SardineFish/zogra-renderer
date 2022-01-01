import { ZograEngine, PreviewRenderer, InputManager, Camera, rgb, Entity, vec3, Keys, mat4, mul, plus, quat, RenderObject, MeshBuilder, LitLambertian } from "zogra-engine";
import { DistanceConstraint, PhysicsSystem } from "zogra-physics";
import "./css/base.css";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const engine = new ZograEngine(canvas, PreviewRenderer);
const input = new InputManager();

function initCamera()
{
    const wrapper = new Entity();
    engine.scene.add(wrapper);
    wrapper.position = vec3(0, 2, 20);
    
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
    for (let i = 0; i < 5; ++i)
    {
        const entity = new RenderObject();
        entities.push(entity);
        engine.scene.add(entity);
        entity.position = vec3(i * 1, 0, 0);
        entity.meshes[0] = MeshBuilder.cube(vec3.zero(), vec3.one().div(2));
        entity.materials[0] = new LitLambertian();

        physics.addParticle(entity.position, i === 0 ? 0 : 1);
        if (i > 0)
        {
            physics.addConstraint(new DistanceConstraint(physics.particles[i - 1], physics.particles[i], 1));
        }
    }
    engine.on("update", (time) =>
    {
        physics.simulate(1 / 60, 1);

        for (let i = 0; i < 5; ++i)
        {
            entities[i].position = physics.particles[i].position;
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