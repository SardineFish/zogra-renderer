export async function loadImage(src: string)
{
    return new Promise<HTMLImageElement>((resolve, reject) =>
    {
        const img = new Image();
        img.src = src;
        if (img.complete)
        {
            resolve(img);
        }
        img.onload = () =>
        {
            resolve(img);
        };
        img.onerror = (event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) =>
        {
            reject(error);
        };
    });
}