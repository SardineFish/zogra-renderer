import { ZograEngine, PreviewRenderer, InputManager, Camera, rgb, Entity, vec3, Keys, mat4, mul, plus, quat, RenderObject, MeshBuilder, LitLambertian, Deg2Rad, Debug, Color } from "zogra-engine";
import { Constraint, DistanceConstraint, PhysicsSystem, Plane, Sphere } from "zogra-physics";
import { Particle } from "../../zogra-physics/dist/entity";
import "./css/base.css";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const engine = new ZograEngine(canvas, PreviewRenderer);
const input = new InputManager();
const camera = new Camera();

let physics = new PhysicsSystem();

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


function createConstraint()
{
    const entities: Entity[] = [];
    const transform = mat4.rts(quat.axisAngle(vec3.one().normalize(), Deg2Rad * 45), vec3(0, 5, 0), vec3.one());

    const sphere = MeshBuilder.sphereNormalizedCube(vec3.zero(), 2, 4);
    const mesh = MeshBuilder.sphereNormalizedCube(vec3.zero(), 0.2);
    const material = new LitLambertian();
    const sphereParticles: Particle[] = [];
    const center = physics.addParticle(mat4.mulPoint(transform, vec3.zero()), 0.1);

    for (const vertex of sphere.vertices)
    {
        const pos = mat4.mulPoint(transform, vertex.vert);
        const particle = physics.addParticle(pos, 1);
        const entity = new RenderObject();
        entity.meshes[0] = mesh;
        entity.materials[0] = material;

        entity.on("update", () =>
        {
            entity.position = particle.position;
        });
        physics.addShape(particle, Sphere, {
            offset: vec3.zero(),
            radius: 0.2
        });

        engine.scene.add(entity);

        sphereParticles.push(particle);

        physics.addConstraint(new DistanceConstraint(center, particle, vec3.distance(center.position, pos), 0.001));
    }

    for (let i = 0; i < sphere.indices.length; i += 3)
    {
        const p0 = sphereParticles[sphere.indices[i]];
        const p1 = sphereParticles[sphere.indices[i + 1]];
        const p2 = sphereParticles[sphere.indices[i + 2]];

        physics.addConstraint(new DistanceConstraint(p0, p1, vec3.distance(p0.position, p1.position), 0.001));
        physics.addConstraint(new DistanceConstraint(p1, p2, vec3.distance(p1.position, p2.position), 0.001));
        physics.addConstraint(new DistanceConstraint(p0, p2, vec3.distance(p0.position, p2.position), 0.001));
    }

    // for (let x = 0; x < 2; ++x)
    // {
    //     for (let y = 0; y < 2; ++y)
    //     {
    //         for (let z = 0; z < 2; ++z)
    //         {
    //             const entity = new RenderObject();
    //             entities.push(entity);
    //             engine.scene.add(entity);
    //             entity.position = mat4.mulPoint(transform, vec3(x, y + 3, z));
    //             entity.meshes[0] = MeshBuilder.sphereNormalizedCube(vec3.zero(), 0.2);
    //             entity.materials[0] = new LitLambertian();

    //             const particle = physics.addParticle(entity.position, 1);
    //             physics.addShape(particle, Sphere, {
    //                 radius: 0.2,
    //                 offset: vec3.zero(),
    //             });
    //         }
    //     }
    // }
    // physics.particles.buffer.forEach(p0 => physics.particles.buffer.forEach(p1 =>
    // {
    //     if (p0 === p1)
    //         return;
    //     physics.addConstraint(new DistanceConstraint(p0, p1, vec3.minus(p0.position, p1.position).magnitude, 30));
    // }))

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

initManipulator();

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