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