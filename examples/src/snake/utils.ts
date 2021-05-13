export function probability(args: { [key: number]: () => void })
{
    const probs = Object.keys(args)
        .map(key => ({ weight: Number(key), key: key, action: args[key as any] }));
    let total = probs.reduce((sum, p) => sum + p.weight, 0);
    for (const item of probs)
    {
        if (Math.random() <= item.weight / total)
        {
            item.action();
            return;
        }
        total -= item.weight;
    }
}
export function noise_fbm(octave: number, noise: (x: number) => number)
{
    return (x: number) =>
    {
        let n = 0;
        let amplitude = 1;
        let scale = 0.5;
        for (let i = 0; i < octave; i++)
        {
            amplitude *= 0.5;
            scale *= 2;
            n += amplitude * noise(x * scale);
        }
        n /= 1 - amplitude;
        return n;
    }
}
export type WeightedRandom<T> = Array<{
    weight: number,
    value: T,
}>;
export function WeightedRandom<T>(items: WeightedRandom<T>)
{
    const total = items.reduce((sum, item) => sum + item.weight, 0);
    return (t: number) =>
    {
        let sum = 0;
        for (const item of items)
        {
            sum += item.weight;
            if (t < sum / total)
                return item.value;
        }
        return items[items.length - 1].value;
    }
}