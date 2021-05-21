const canvas = document.querySelector("canvas") as HTMLCanvasElement;

if (window.innerHeight > window.innerWidth)
{
    [canvas.height, canvas.width] = [canvas.width, canvas.height];
}

export { canvas };