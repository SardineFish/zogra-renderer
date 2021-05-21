if (window.innerHeight > window.innerWidth)
{
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    [canvas.height, canvas.width] = [canvas.width, canvas.height];
}