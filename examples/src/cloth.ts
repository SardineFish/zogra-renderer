import { ZograEngine, PreviewRenderer, InputManager, Camera, rgb, Entity, vec3, Keys, mat4, mul, plus, quat, RenderObject, MeshBuilder, LitLambertian, Deg2Rad, Debug, Color } from "zogra-engine";
import { Constraint, DistanceConstraint, PhysicsSystem, Plane, Sphere } from "zogra-physics";
import { Particle } from "../../zogra-physics/dist/entity";
import { initBaseControl } from "./base-control";
import "./css/base.css";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const engine = new ZograEngine(canvas, PreviewRenderer);
const input = new InputManager();
const camera = new Camera();

let physics = new PhysicsSystem();



function createConstraint()
{
    const entities: Entity[] = [];
    const transform = mat4.rts(quat.axisAngle(vec3.one().normalize(), Deg2Rad * 45), vec3(0, 5, 0), vec3.one());

    const sphere = MeshBuilder.sphereNormalizedCube(vec3.zero(), 2, 4);
    const mesh = MeshBuilder.sphereNormalizedCube(vec3.zero(), 0.2);
    const material = new LitLambertian();
    const particles: Particle[][] = [];

    const SIZE = 10;
    const DISTANCE = 1;

    const VERTICAL_COMPLIANCE = 0.005;
    const VERTICAL_DAMPING = 0.4;

    const HORIZONTAL_COMPLIANCE = 0.004;
    const HORIZONTAL_DAMPING = 0.4;

    const SHEAR_COMPLIANCE = 0.004;
    const SHEAR_DAMPING = 0.4;

    const BEND_COMPLIANCE = 0.01;
    const BEND_DAMPING = 0.4;

    const hangHeight = 10;

    // Spawn particles
    for (let y = 0; y <= SIZE; ++y)
    {
        particles.push([]);
        for (let x = 0; x <= SIZE; ++x)
        {
            const particle = physics.addParticle(vec3(x - SIZE / 2, hangHeight, -y).mul(DISTANCE), 1);
            physics.addShape(particle, Sphere, {
                offset: vec3.zero(),
                radius: 0.2
            });

            const entity = new RenderObject();
            entity.meshes[0] = mesh;
            entity.materials[0] = material;
            entity.on("update", () =>
            {
                entity.position = particle.position;
            });

            engine.scene.add(entity);

            particles[y].push(particle);
        }
    }

    for (let y = 0; y <= SIZE; ++y)
    {
        for (let x = 0; x <= SIZE; ++x)
        {
            // Horizontal constraint
            if (x < SIZE)
            {
                physics.addConstraint(new DistanceConstraint(
                    particles[y][x],
                    particles[y][x + 1],
                    DISTANCE,
                    HORIZONTAL_COMPLIANCE
                )
                    .damped(HORIZONTAL_DAMPING));
            }

            // Horizontal bend constraint
            if (x < SIZE - 1)
            {
                physics.addConstraint(new DistanceConstraint(
                    particles[y][x],
                    particles[y][x + 2],
                    DISTANCE * 2,
                    BEND_COMPLIANCE
                )
                    .damped(BEND_DAMPING));
            }

            // Vertical constraint
            if (y < SIZE)
            {
                physics.addConstraint(new DistanceConstraint(
                    particles[y][x],
                    particles[y + 1][x],
                    DISTANCE,
                    VERTICAL_COMPLIANCE
                )
                    .damped(VERTICAL_DAMPING));
            }

            // Vertical bend constraint
            if (y < SIZE - 1)
            {
                physics.addConstraint(new DistanceConstraint(
                    particles[y][x],
                    particles[y + 2][x],
                    DISTANCE * 2,
                    BEND_COMPLIANCE
                )
                    .damped(BEND_DAMPING));
            }
            
            if (x < SIZE && y < SIZE)
            {
                // Shear constraint
                physics.addConstraint(new DistanceConstraint(
                    particles[y][x],
                    particles[y + 1][x + 1],
                    vec3.distance(particles[y][x].center, particles[y + 1][x + 1].center),
                    SHEAR_COMPLIANCE
                )
                    .damped(SHEAR_DAMPING));
                physics.addConstraint(new DistanceConstraint(
                    particles[y][x + 1],
                    particles[y + 1][x],
                    vec3.distance(particles[y][x + 1].center, particles[y + 1][x].center),
                    SHEAR_COMPLIANCE
                )
                    .damped(SHEAR_DAMPING));
            }
        }
    }


    particles[0][0].invMass = 0;
    particles[0][0].position = vec3(-4, hangHeight + 1, 0);
    particles[0][SIZE].invMass = 0;
    particles[0][SIZE].position = vec3(4, hangHeight + 1, 0);


    const plane = physics.addRigidbody();
    physics.addShape(plane, Plane, {
        normal: vec3(0, 1, 0),
        offset: 0
    });

    {
        const body = physics.addParticle(vec3(0, 3, -3), 0.001);
        physics.addShape(body, Sphere, {
            offset: vec3.zero(),
            radius: 2
        });

        const entity = new RenderObject();
        entity.meshes[0] = MeshBuilder.sphereNormalizedCube(vec3.zero(), 2);
        entity.materials[0] = material;
        engine.scene.add(entity);

        entity.on("update", () =>
        {
            entity.position = body.position;
        });
    }

    engine.on("update", (time) =>
    {
        physics.simulate(1 / 60, 2);

        for (let i = 0; i < entities.length; ++i)
        {
            entities[i].position = physics.particles.getUnchecked(i).position;
        }
    });
}
createConstraint();
engine.start();

initBaseControl(engine, physics);